import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentById, fetchApprovedAppointments, fetchPendingAppointments, updateExistingAppointment } from "../../features/appointment/appointmentSlice";
import { fetchDepartment } from "../../features/department/departmentSlice";
import { fetchSpecies } from "../../features/specie/speciesSlice";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../UI/Loader";

const UpdateAppointment = () => {
  const [speciesByBreeds, setSpeciesByBreeds] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { appointment, status } = useSelector((state) => state.appointment);
  const { departments } = useSelector((state) => state.department);
  const { species } = useSelector((state) => state.specie);

  const fetchBreeds = async (speciesId) => {
    try {
      if (!speciesId) return;

      const response = await axiosInstance.get(`/breed/species/${speciesId}`);
      const breeds = response?.data?.data;
      if (breeds?.length > 0) {
        setSpeciesByBreeds(response?.data?.data);
      } else {
        setSpeciesByBreeds([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (appointment && speciesByBreeds) {
  //     console.log("Appointment:", appointment);
  //     console.log("Species by breeds:", speciesByBreeds);
  //     const selectedBreed = speciesByBreeds?.find((breed) => {
  //       console.log("Comparing:", breed, appointment?.breed);
  //       return breed == appointment?.breed;
  //     });
  //     console.log("Selected breed:", selectedBreed);
  //   }
  // }, [appointment, speciesByBreeds]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ values: appointment });

  const onSubmit = async (appointmentData) => {
    try {
      appointmentData.id = Number(id);
      const response = await dispatch(updateExistingAppointment(appointmentData));

      if (response?.payload?.success) {
        await dispatch(fetchApprovedAppointments({}));
        await dispatch(fetchPendingAppointments({}));
        router.push("/appointment/view");
        toast.success("Appointment updated successfully!");
      } else {
        toast.error("Failed to update appointment! Please try again later.");
      }
    } catch (error) {
      console.error("An error occurred while updating appointment:", error);
      toast.error("An error occurred while updating appointment. Please try again later.");
    }
  };

  useEffect(() => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    if (appointment && appointment.date) {
      setValue("date", formatDate(appointment.date));
    }
  }, [appointment]);

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentById(id));
    }
    dispatch(fetchDepartment({ limit: 500 }));
    dispatch(fetchSpecies({ limit: 1000 }));
  }, [dispatch, id]);

  useEffect(() => {
    if (appointment && appointment.species) {
      fetchBreeds(appointment.species);
    }
  }, [appointment]);

  //   loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card pb-4">
            <div className="card-header">
              <h4 className="card-header-title text-center">Edit Appointment</h4>
            </div>
            <div className="card-body">
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
                    <label className="form-label">District</label>
                    <select {...register("district", { required: true })} className={`form-select ${errors.district && "border-danger"}`} aria-label="Default select example">
                      <option defaultValue>Mymensingh</option>
                    </select>
                    {errors.district && <small className="text-danger">Please select district</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Upazila</label>
                    <select {...register("upazila", { required: true })} className={`form-select ${errors.upazila && "border-danger"}`} aria-label="Default select example">
                      <option value="">Select</option>
                      <option value="Mymensingh Sadar">Mymensingh Sadar</option>
                      <option value="Trishal">Trishal</option>
                      <option value="Bhaluka">Bhaluka</option>
                      <option value="Fulbaria">Fulbaria</option>
                      <option value="Muktagacha">Muktagacha</option>
                      <option value="Gafargaon">Gafargaon</option>
                      <option value="Gauripur">Gauripur</option>
                      <option value="Ishwarganj">Ishwarganj</option>
                      <option value="Nandail">Nandail</option>
                      <option value="Tarakanda">Tarakanda</option>
                      <option value="Fulpur">Fulpur</option>
                      <option value="Haluaghat">Haluaghat</option>
                      <option value="Dhubaura">Dhubaura</option>
                      <option value="Pagla">Pagla</option>
                    </select>
                    {errors.upazila && <small className="text-danger">Please select any upazilla</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
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
                      onChange={(e) => fetchBreeds(e.target.value)}
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
                    <label className="form-label">Breed</label>
                    <select {...register("breed")} className="form-select" aria-label="Default select example">
                      <option value="">{appointment?.breed || "Select"}</option>
                      {speciesByBreeds?.map((breed) => (
                        <option key={breed._id} value={breed.breed}>
                          {breed.breed}
                        </option>
                      ))}
                    </select>
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
                      <option value="new">New</option>
                      <option value="old">Old</option>
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
                <div className="my-4 d-flex justify-content-center">
                  <button type="submit" className="btn app-btn-primary">
                    Update Appointment
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

export default UpdateAppointment;
