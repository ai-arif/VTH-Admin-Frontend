import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchMedicine } from "../../features/medicine/medicineSlice";
import { fetchPrescription, fetchSinglePrescription, updatePrescriptionData } from "../../features/prescription/prescriptionSlice";
import { fetchTest } from "../../features/test/testSlice";
import { formatDate } from "../../utils/formatDate";
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

  // transforming tests and medicines data
  const medicineOptions = medicines?.data?.map((medicine) => ({
    value: medicine._id,
    label: medicine.name,
  }));
  const testOptions = tests?.data?.map((test) => ({
    value: test._id,
    label: test.testName,
  }));

  // find selected medicines and tests then matching
  const selectedMedicines = prescription?.data?.medicines;
  const selectedTests = prescription?.data?.tests;
  const matchingMedicines = medicineOptions?.filter((data) => selectedMedicines?.includes(data.value));
  const matchingTests = testOptions?.filter((data) => selectedTests?.includes(data.value));

  console.log(matchingMedicines);

  // convert date string to a Date object and Format the date
  const nextVisitDate = prescription?.data?.nextVisit ? new Date(prescription.data.nextVisit).toISOString().split("T")[0] : "";

  const { handleSubmit, register, reset, control } = useForm({ values: { ...prescription?.data, medicines: matchingMedicines, tests: matchingTests, nextVisit: nextVisitDate } });

  const onSubmit = async (prescriptionData) => {
    try {
      prescriptionData.id = id;
      prescriptionData.medicines = prescriptionData?.medicines?.map((medicine) => medicine.value);
      prescriptionData.tests = prescriptionData?.tests?.map((test) => test.value);

      const response = await dispatch(updatePrescriptionData(prescriptionData));

      if (response?.payload?.success) {
        toast.success("Prescription updated successfully!");
        await dispatch(fetchPrescription({}));
        router.push("/prescription/view");
      } else {
        toast.error("Failed to update prescription! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while updating prescription. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePrescription(id));
    }
    dispatch(fetchMedicine({ limit: 3000 }));
    dispatch(fetchTest({ limit: 3000 }));
  }, [dispatch, id]);

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
                    <input
                      type="text"
                      readOnly
                      required
                      value={`${prescription?.data?.appointment?.caseNo} ${prescription?.data?.appointment?.ownerName} ${formatDate(prescription?.data?.appointment?.date)}`}
                      className="form-control"
                    />
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
                    <label className="form-label">Diagnosis</label>
                    <textarea type="text" {...register("diagnosis")} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Medicine</label>
                    <Controller
                      name="medicines"
                      control={control}
                      defaultValue={matchingMedicines}
                      render={({ field }) => <Select options={medicineOptions} isMulti {...field} styles={customStyles} />}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Therapeutics</label>
                    <input type="text" {...register("therapeutics")} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Tests</label>
                    <Controller name="tests" control={control} defaultValue={matchingTests} render={({ field }) => <Select options={testOptions} isMulti {...field} styles={customStyles} />} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Next Visit</label>
                    <input type="date" {...register("nextVisit")} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Prognosis</label>
                    <textarea type="text" {...register("prognosis")} className="form-control" />
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
