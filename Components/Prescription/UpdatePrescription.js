import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchMedicine } from "../../features/medicine/medicineSlice";
import { fetchSinglePrescription } from "../../features/prescription/prescriptionSlice";
import { fetchTest } from "../../features/test/testSlice";
import Loader from "../UI/Loader";

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

const UpdatePrescription = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { prescription, status } = useSelector((state) => state.prescription);
  const { tests } = useSelector((state) => state.test);
  const { medicines } = useSelector((state) => state.medicine);
  console.log(prescription?.data);

  const { handleSubmit, register, control } = useForm({ values: prescription?.data });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    dispatch(fetchSinglePrescription(id));
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

  //   loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title text-center">Edit Prescription</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Selected Appointment</label>
                    {/* show case no, owner name & date */}
                    <select {...register("appointment", { required: true })} className="form-select" aria-label="Default select example">
                      <option selected>
                        {prescription?.data?.appointment?.caseNo} {prescription?.data?.appointment?.ownerName} {prescription?.data?.appointment?.date}
                      </option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">CASE NO</label>
                    <input type="number" readOnly required value={prescription?.data?.appointment?.caseNo} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input type="text" readOnly required value={prescription?.data?.appointment?.ownerName} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" readOnly required value={prescription?.data?.appointment?.phone} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District</label>
                    <input type="text" readOnly required value={prescription?.data?.appointment?.district} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Upazila</label>
                    <input type="text" readOnly required value={prescription?.data?.appointment?.upazila} className="form-control" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input readOnly required value={prescription?.data?.appointment?.address} className="form-control"></input>
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
                <div className="my-3 d-flex justify-content-center">
                  <button type="submit" className="btn app-btn-primary">
                    Update Prescription
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

export default UpdatePrescription;
