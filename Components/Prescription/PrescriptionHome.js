import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { fetchMedicine } from "../../features/medicine/medicineSlice";
import { fetchTest } from "../../features/test/testSlice";

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
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#15a362",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

const PrescriptionHome = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [patentInfo, setPatentInfo] = useState([]);
  const [selectedPatentInfo, setSelectedPatentInfo] = useState({});
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.test);
  const { medicines } = useSelector((state) => state.medicine);

  const { handleSubmit, register, control, reset } = useForm();

  const getPatentByPhone = async () => {
    try {
      if (searchPhone === "") return;

      const res = await dispatch(fetchAppointmentsByPhone(searchPhone));
      const existingPatentData = res?.payload?.data;

      if (existingPatentData.length > 0) {
        setPatentInfo(existingPatentData);
        toast.success("Patent's Data Found");
      } else {
        toast.error("No Data Found!");
        setSelectedPatentInfo({});
        setPatentInfo([]);
        reset();
      }
    } catch (error) {
      toast.error("No Data Found!");
      console.error(error);
    }
  };

  const getPatentInfo = (id) => {
    const selectedPatent = patentInfo?.find((patent) => patent._id === id);
    setSelectedPatentInfo(selectedPatent);
  };

  const onSubmit = async (data) => {
    data.medicines = data?.medicines?.map((medicine) => medicine.value);
    data.tests = data?.tests?.map((test) => test.value);
    console.log(data);
    // try {
    //   data.medicines = data?.medicines?.map((medicine) => medicine.value);
    //   data.tests = data?.tests?.map((test) => test.value);
    //   const response = await dispatch(create(data));
    //   if (response?.payload?.success) {
    //     toast.success("Prescription added successfully!");
    //     reset();
    //   } else {
    //     toast.error("Failed to add prescription! Please try again later.");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while adding prescription. Please try again later.");
    //   console.error(error);
    // }
  };

  useEffect(() => {
    dispatch(fetchMedicine());
    dispatch(fetchTest());
  }, [dispatch]);

  // Transforming tests and medicines data
  const testOptions = tests?.data?.map((test) => ({
    value: test._id,
    label: test.testName,
  }));

  const medicineOptions = medicines?.data?.map((medicine) => ({
    value: medicine._id,
    label: medicine.name,
  }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title text-center">Prescription</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    onChange={(e) => {
                      setSearchPhone(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Patent's Phone"
                    aria-label="Patent's phone"
                    aria-describedby="button-addon2"
                  />
                  <button onClick={getPatentByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="small opacity-75 ps-2">(Search patent's phone for prescription)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Select Appointment</label>
                    {/* show case no, owner name & date */}
                    <select {...register("appointment", { required: true })} onChange={(e) => getPatentInfo(e.target.value)} className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      {patentInfo?.map((patent) => (
                        <option key={patent._id} value={patent._id}>
                          {patent.caseNo} {patent.ownerName} {patent.date}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">CASE NO</label>
                    <input type="number" readOnly value={selectedPatentInfo?.caseNo} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input type="text" readOnly value={selectedPatentInfo?.ownerName} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" readOnly value={selectedPatentInfo?.phone} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District</label>
                    <input type="text" readOnly value={selectedPatentInfo?.district} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Upazila</label>
                    <input type="text" readOnly value={selectedPatentInfo?.upazila} className="form-control" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input readOnly value={selectedPatentInfo?.address} className="form-control"></input>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Medicine</label>
                    <Controller name="medicines" control={control} defaultValue={[]} render={({ field }) => <Select options={medicineOptions} isMulti {...field} styles={customStyles} />} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Tests</label>
                    <Controller name="tests" control={control} defaultValue={[]} render={({ field }) => <Select options={testOptions} isMulti {...field} styles={customStyles} />} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Diagnosis</label>
                    <input type="text" {...register("diagnosis")} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Next Visit</label>
                    <input type="date" {...register("nextVisit")} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Advice</label>
                    <textarea {...register("advice")} className="form-control" rows="5"></textarea>
                  </div>
                </div>
                <div className="my-3 d-flex justify-content-center gap-4">
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

export default PrescriptionHome;
