import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { addNewAppointment } from "../../features/appointment/appointmentSlice";
import { fetchDepartment } from "../../features/department/departmentSlice";
import { fetchSpecies } from "../../features/specie/speciesSlice";
import bdData from "../../public/data.json";
import axiosInstance from "../../utils/axiosInstance";

// Define custom styles
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2d323f",
    borderColor: state.isFocused ? "#15a362" : "white",
    "&:hover": {
      borderColor: state.isFocused ? "#15a362" : "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#fff",
    backgroundColor: state.isSelected ? "#15a362" : "#2d323f",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

const AppointmentHome = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [oldPatent, setOldPatent] = useState(false);
  const [oldPatentData, setOldPatentData] = useState({});
  const [speciesByBreeds, setSpeciesByBreeds] = useState([]);
  const [speciesByComplaints, setSpeciesByComplaint] = useState([]);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setDistrict("");
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  // Get the list of districts based on the selected division
  const filteredDistricts = bdData?.find((data) => data.division === division)?.districts || [];

  // Get the list of upazilas based on the selected district
  const filteredUpazilas = filteredDistricts?.find((dist) => dist.district === district)?.upazilas || [];

  const { departments } = useSelector((state) => state.department);
  const { species } = useSelector((state) => state.specie);

  const getUserByPhone = async () => {
    try {
      if (searchPhone === "") return;

      const res = await axiosInstance.get(`/staffs/user/${searchPhone}`);
      const existingPatentData = res?.data?.data;
      if (existingPatentData) {
        setOldPatent(true);
        setOldPatentData(existingPatentData);
        setValue("ownerName", existingPatentData.fullName || "");
        setValue("phone", existingPatentData.phone || "");
        setValue("address", existingPatentData.address || "");
        setValue("division", existingPatentData.division || "");
        setValue("district", existingPatentData.district || "");
        setValue("upazila", existingPatentData.upazila || "");
      }
    } catch (error) {
      toast.error("No Data Found!");
      reset();
      setOldPatent(false);
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getUserByPhone();
    }
  };

  const fetchBreedsAndComplaint = async (speciesId) => {
    try {
      if (!speciesId) return;

      const response = await axiosInstance.get(`/breed/species/${speciesId}`);
      const breeds = response?.data?.data;
      if (breeds.length > 0) {
        setSpeciesByBreeds(breeds);
      } else {
        setSpeciesByBreeds([]);
      }

      const complaintResponse = await axiosInstance.get(`/complaint/species/${speciesId}`);
      const data = complaintResponse?.data?.data;
      if (data?.length > 0) {
        setSpeciesByComplaint(data);
      } else {
        setSpeciesByComplaint([]);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  // transform complaints data
  const complaintOptions = speciesByComplaints?.map((complaint) => ({
    value: complaint._id,
    label: complaint.complaint,
  }));

  const {
    handleSubmit,
    register,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // animal related calculation
  const totalAnimals = watch("totalAnimals");
  const totalSickAnimals = watch("totalSickAnimals");
  const totalDeadAnimals = watch("totalDeadAnimals");

  useEffect(() => {
    if (totalAnimals > 0 && totalSickAnimals >= 0) {
      const totalMortality = (totalSickAnimals / totalAnimals) * 100;
      setValue("totalMortality", Number(totalMortality).toFixed(2));
    }
  }, [totalAnimals, totalSickAnimals, setValue]);

  useEffect(() => {
    if (totalSickAnimals > 0 && totalDeadAnimals >= 0) {
      const totalFatality = (totalDeadAnimals / totalSickAnimals) * 100;
      setValue("totalFatality", Number(totalFatality).toFixed(2));
    }
  }, [totalSickAnimals, totalDeadAnimals, setValue]);

  const onSubmit = async (appointmentData) => {
    try {
      if (oldPatent) {
        appointmentData.owner = oldPatentData._id;
      }
      appointmentData.complaint = appointmentData?.complaint?.value;

      // Convert appointment date to UTC
      appointmentData.date = new Date(appointmentData.date).toISOString();

      const response = await dispatch(addNewAppointment(appointmentData));

      if (response?.payload?.success) {
        router.push("/appointment/view");
        reset();
        toast.success("Appointment added successfully!");
      } else {
        toast.error("Failed to add appointment! Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding appointment. Please try again later.");
    }
  };

  useEffect(() => {
    dispatch(fetchDepartment({ limit: 500 }));
    dispatch(fetchSpecies({ limit: 1000 }));
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card pb-4">
            <div className="card-header">
              <h4 className="card-header-title text-center">Add Appointment</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    onChange={(e) => {
                      setSearchPhone(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                    type="text"
                    className="form-control"
                    placeholder="Recipient's Phone"
                    aria-label="Recipient's phone"
                    aria-describedby="button-addon2"
                  />
                  <button onClick={getUserByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="small opacity-75 ps-2">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input type="text" {...register("ownerName", { required: true })} className={`form-control ${errors.ownerName && "border-danger"}`} />
                    {errors.ownerName && <small className="text-danger">Please write owner name</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" {...register("phone", { required: true })} className={`form-control ${errors.phone && "border-danger"}`} />
                    {errors.phone && <small className="text-danger">Please write phone number</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Division</label>
                    <select
                      {...register("division", { required: true })}
                      value={division}
                      onChange={handleDivisionChange}
                      className={`form-select ${errors.division && "border-danger"}`}
                      aria-label="Default select example"
                    >
                      <option value="">Select</option>
                      {bdData?.map((data, idx) => (
                        <option key={idx} value={data.division}>
                          {data.division}
                        </option>
                      ))}
                    </select>
                    {errors.division && <small className="text-danger">Please select any division</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District</label>
                    <select {...register("district", { required: true })} value={district} onChange={handleDistrictChange} className={`form-select ${errors.district && "border-danger"}`}>
                      <option value="">Select</option>
                      {filteredDistricts?.map((dist, idx) => (
                        <option key={idx} value={dist.district}>
                          {dist.district}
                        </option>
                      ))}
                    </select>
                    {errors.district && <small className="text-danger">Please select any district</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Upazila</label>
                    <select {...register("upazila", { required: true })} className={`form-select ${errors.upazila && "border-danger"}`}>
                      <option value="">Select</option>
                      {filteredUpazilas?.map((upazila, idx) => (
                        <option key={idx} value={upazila}>
                          {upazila}
                        </option>
                      ))}
                    </select>
                    {errors.upazila && <small className="text-danger">Please select any upazilla</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Address</label>
                    <textarea type="text" {...register("address", { required: true })} className={`form-control ${errors.address && "border-danger"}`}></textarea>
                    {errors.address && <small className="text-danger">Please write address</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Species (Animal Type)</label>
                    <select
                      {...register("species", { required: true })}
                      onChange={(e) => fetchBreedsAndComplaint(e.target.value)}
                      className={`form-select ${errors.species && "border-danger"}`}
                      aria-label="Default select example"
                    >
                      <option value="">Select</option>
                      {species?.data?.map((specie) => (
                        <option key={specie._id} value={specie._id}>
                          {specie.name}
                        </option>
                      ))}
                    </select>
                    {errors.species && <small className="text-danger">Please select any species</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Complaints</label>
                    <Controller
                      name="complaint"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => <CreatableSelect styles={customStyles} placeholder="Select complaint" isClearable options={complaintOptions} {...field} />}
                    />
                    {/* <select {...register("complaint")} className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      {speciesByComplaints?.map((complaint) => (
                        <option key={complaint._id} value={complaint._id}>
                          {complaint.complaint}
                        </option>
                      ))}
                    </select> */}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Breed</label>
                    <select {...register("breed", { required: true })} className={`form-select ${errors.breed && "border-danger"}`} aria-label="Default select example">
                      <option value="">Select</option>
                      {speciesByBreeds?.map((breed) => (
                        <option key={breed._id} value={breed._id}>
                          {breed.breed}
                        </option>
                      ))}
                    </select>
                    {errors.breed && <small className="text-danger">Please select any breed</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Age</label>
                    <input type="text" {...register("age", { required: true })} className={`form-control ${errors.age && "border-danger"}`} />
                    {errors.age && <small className="text-danger">Please write age</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Body Weight</label>
                    <input type="text" {...register("weight", { required: true })} className={`form-control ${errors.weight && "border-danger"}`} />
                    {errors.weight && <small className="text-danger">Please write weight</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Sex (M/F)</label>
                    <select {...register("sex", { required: true })} className={`form-select ${errors.sex && "border-danger"}`} aria-label="Default select example">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.sex && <small className="text-danger">Please select an sex</small>}
                  </div>
                </div>

                {/* <h6 className="text-center text-decoration-underline pb-2">Disease History</h6> */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Duration of Illness</label>
                    <input type="text" {...register("illnessDuration", { required: true })} className={`form-control ${errors.illnessDuration && "border-danger"}`} />
                    {errors.illnessDuration && <small className="text-danger">Please write illness duration</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Total number of animals</label>
                    <input
                      type="number"
                      {...register("totalAnimals", {
                        required: true,
                        valueAsNumber: true,
                        min: 0,
                      })}
                      className={`form-control ${errors.totalAnimals && "border-danger"}`}
                    />
                    {errors.totalAnimals && <small className="text-danger">Please write total animals</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Total number of sick animals</label>
                    <input
                      type="number"
                      {...register("totalSickAnimals", {
                        required: true,
                        valueAsNumber: true,
                        min: 0,
                      })}
                      className={`form-control ${errors.totalSickAnimals && "border-danger"}`}
                    />
                    {errors.totalSickAnimals && <small className="text-danger">Please write total sick animals</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Morbidity (%)</label>
                    <Controller
                      name="totalMortality"
                      control={control}
                      render={({ field }) => <input type="number" {...field} readOnly className={`form-control ${errors.totalMortality && "border-danger"}`} />}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Total number of dead animals</label>
                    <input
                      type="number"
                      {...register("totalDeadAnimals", {
                        required: true,
                        valueAsNumber: true,
                        min: 0,
                      })}
                      className={`form-control ${errors.totalDeadAnimals && "border-danger"}`}
                    />
                    {errors.totalDeadAnimals && <small className="text-danger">Please write total dead animals</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Case fatality (%)</label>
                    <Controller
                      name="totalFatality"
                      control={control}
                      render={({ field }) => <input type="number" {...field} readOnly className={`form-control ${errors.totalFatality && "border-danger"}`} />}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Status</label>
                    <select {...register("status", { required: true })} className={`form-select ${errors.status && "border-danger"}`} aria-label="Default select example">
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </select>
                    {errors.status && <small className="text-danger">Please select any status</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Department</label>
                    <select {...register("department", { required: true })} className={`form-select ${errors.department && "border-danger"}`} aria-label="Default select example">
                      <option value="">Select</option>
                      {departments?.data?.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                    {errors.department && <small className="text-danger">Please select any department</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Registration Type</label>
                    <select {...register("registrationType", { required: true })} className={`form-select ${errors.registrationType && "border-danger"}`} aria-label="Default select example">
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                    </select>
                    {errors.registrationType && <small className="text-danger">Please select any registration type</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Patent Type</label>
                    <select {...register("patientType", { required: true })} className={`form-select ${errors.patientType && "border-danger"}`} aria-label="Default select example">
                      {oldPatent ? (
                        <>
                          <option value="old">Old</option> <option value="new">New</option>
                        </>
                      ) : (
                        <>
                          <option value="new">New</option> <option value="old">Old</option>
                        </>
                      )}
                    </select>
                    {errors.registrationType && <small className="text-danger">Please select any registration type</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Date & Time</label>
                    <input type="datetime-local" {...register("date", { required: true })} className={`form-control ${errors.date && "border-danger"}`} />
                    {errors.date && <small className="text-danger">Please select date & time</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Amount (TK) </label>
                    <input type="number" {...register("amount", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.amount && "border-danger"}`} />
                    {errors.amount && <small className="text-danger">Please write pay amount</small>}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea type="text" {...register("notes")} className="form-control"></textarea>
                </div>
                <div className="my-4 d-flex justify-content-center gap-4">
                  <button type="reset" className="btn btn-danger text-white">
                    Reset
                  </button>
                  <button type="submit" className="btn app-btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHome;
