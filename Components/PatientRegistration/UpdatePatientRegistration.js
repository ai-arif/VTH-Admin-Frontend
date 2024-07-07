import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  fetchPatient,
  fetchSinglePatient,
  updatePatientData,
} from "../../features/patient-registration/patientRegistrationSlice";
import { fetchSpecies } from "../../features/specie/speciesSlice";
import { fetchTest } from "../../features/test/testSlice";
import axiosInstance from "../../utils/axiosInstance";
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

const UpdatePatientRegistration = () => {
  const [activeTab, setActiveTab] = useState("ownerInfo");
  const [speciesByComplaints, setSpeciesByComplaint] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { patient, status } = useSelector((state) => state.patient);
  const { species } = useSelector((state) => state.specie);
  const { tests } = useSelector((state) => state.test);

  // convert date string to a Date object and Format the date
  const date = patient?.date
    ? new Date(patient.date).toISOString().split("T")[0]
    : "";
  const dop = patient?.dop
    ? new Date(patient.dop).toISOString().split("T")[0]
    : "";
  const doo = patient?.doo
    ? new Date(patient.doo).toISOString().split("T")[0]
    : "";

  const testOptions = tests?.data?.map((test) => ({
    value: test._id,
    label: test.testName,
  }));

  // find selected tests then matching
  const selectedTests = patient?.tests;
  const matchingTests = testOptions?.filter((data) =>
    selectedTests?.includes(data.value)
  );

  const fetchComplaints = async (speciesId) => {
    try {
      if (!speciesId) return;

      const response = await axiosInstance.get(
        `/complaint/species/${speciesId}`
      );
      setSpeciesByComplaint(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
    const breedResponse = await axiosInstance.get(
      `/breed/species/${speciesId}`
    );
    const breedData = breedResponse?.data?.data;
    console.log(breedData, "breedData");
    if (breedData.length > 0) {
      setBreeds(breedData);
    }
  };

  const {
    handleSubmit,
    register,
    trigger,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ values: { ...patient, date, dop, doo, tests: matchingTests } });

  const totalAnimals = watch("totalAnimals");
  const totalSickAnimals = watch("totalSickAnimals");
  const totalDeadAnimals = watch("totalDeadAnimals");

  useEffect(() => {
    if (totalAnimals > 0 && totalSickAnimals >= 0) {
      const totalMortality = (totalSickAnimals / totalAnimals) * 100;
      setValue("totalMortality", Number(totalMortality));
    }
  }, [totalAnimals, totalSickAnimals, setValue]);

  useEffect(() => {
    if (totalSickAnimals > 0 && totalDeadAnimals >= 0) {
      const totalFatality = (totalDeadAnimals / totalSickAnimals) * 100;
      setValue("totalFatality", Number(totalFatality));
    }
  }, [totalSickAnimals, totalDeadAnimals, setValue]);

  const onSubmit = async (patientData) => {
    try {
      patientData.id = id;
      patientData.tests = patientData?.tests?.map((test) => test.value);

      const response = await dispatch(updatePatientData(patientData));

      if (response?.payload?.success) {
        toast.success("Patient data updated successfully!");
        dispatch(fetchPatient({}));
        router.push("/patient-registration/view");
      } else {
        toast.error("Failed to update patient data! Please try again later.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating patient data. Please try again later."
      );
      console.error(error);
    }
  };

  const handleTabSwitch = async (tab) => {
    const valid = await trigger();
    if (valid) {
      setActiveTab(tab);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePatient(id));
    }
    dispatch(fetchSpecies({ limit: 1000 }));
    dispatch(fetchTest({ limit: 3000 }));
  }, [dispatch, id]);

  useEffect(() => {
    if (patient && patient.species) {
      fetchComplaints(patient.species);
    }
  }, [patient]);

  //   loader
  if (status === "loading") return <Loader />;

  return (
    <>
      {/* tabs */}
      <div className="d-flex justify-content-center my-3 sticky-tabs">
        <div className="btn-group" role="group">
          <button
            className={`btn text-white ${
              activeTab === "ownerInfo"
                ? "btn-primary"
                : "btn-outline-primary border"
            }`}
            onClick={() => handleTabSwitch("ownerInfo")}
          >
            Owner Information
          </button>
          <button
            className={`btn text-white ${
              activeTab === "patientHistory"
                ? "btn-primary"
                : "btn-outline-primary border"
            }`}
            onClick={() => handleTabSwitch("patientHistory")}
          >
            Patient History
          </button>
          <button
            className={`btn text-white ${
              activeTab === "clinicalSigns"
                ? "btn-primary"
                : "btn-outline-primary border"
            }`}
            onClick={() => handleTabSwitch("clinicalSigns")}
          >
            Clinical Signs
          </button>
          <button
            className={`btn text-white ${
              activeTab === "tests"
                ? "btn-primary"
                : "btn-outline-primary border"
            }`}
            onClick={() => handleTabSwitch("tests")}
          >
            Tests
          </button>
        </div>
      </div>
      {/* form container */}
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title text-center">
                  Edit Patient Registration
                </h4>
              </div>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="patient-registration"
                >
                  {/* owner & patient information */}
                  {activeTab === "ownerInfo" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">
                        Owner Information
                      </h5>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Selected Appointment
                          </label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={`${patient?.appointmentId?.caseNo} ${
                              patient?.appointmentId?.ownerName
                            } ${formatDate(patient?.appointmentId?.date)}`}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">CASE NO</label>
                          <input
                            type="number"
                            readOnly
                            required
                            value={patient?.appointmentId?.caseNo}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Owner Name</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.ownerName}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Phone</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.phone}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">District</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.district}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Upazila</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.upazila}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.address}
                            className="form-control"
                          ></input>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            NID <small>(optional)</small>
                          </label>
                          <input
                            type="text"
                            {...register("nid")}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Patient Type</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.patientType}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Registration Type
                          </label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={patient?.appointmentId?.registrationType}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            {...register("date", { required: true })}
                            className={`form-control ${
                              errors.date && "border-danger"
                            }`}
                          />
                          {errors.date && (
                            <small className="text-danger">
                              Please select date
                            </small>
                          )}
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">
                        Patient Information
                      </h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Species (Animal Type)
                          </label>
                          <select
                            {...register("species", { required: true })}
                            onChange={(e) => fetchComplaints(e.target.value)}
                            className={`form-select ${
                              errors.species && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            {species?.data?.map((specie) => (
                              <option key={specie._id} value={specie._id}>
                                {specie.name}
                              </option>
                            ))}
                          </select>
                          {errors.species && (
                            <small className="text-danger">
                              Please select an species
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Owner Complaints</label>
                          <select
                            {...register("complaints", { required: true })}
                            className={`form-select ${
                              errors.complaints && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            {/* <option value="">Select</option> */}
                            {speciesByComplaints?.map((complaint) => (
                              <option key={complaint._id} value={complaint._id}>
                                {complaint.complaint}
                              </option>
                            ))}
                          </select>
                          {errors.complaints && (
                            <small className="text-danger">
                              Please select an complaints
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Age</label>
                          <input
                            type="text"
                            {...register("age", { required: true })}
                            className={`form-control ${
                              errors.age && "border-danger"
                            }`}
                          />
                          {errors.age && (
                            <small className="text-danger">
                              Please write age
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Sex (M/F)</label>
                          <select
                            {...register("sex", { required: true })}
                            className={`form-select ${
                              errors.sex && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {errors.sex && (
                            <small className="text-danger">
                              Please select an sex
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Weight (kg)</label>
                          <input
                            type="text"
                            {...register("weight", { required: true })}
                            className={`form-control ${
                              errors.weight && "border-danger"
                            }`}
                          />
                          {errors.weight && (
                            <small className="text-danger">
                              Please write weight
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            BCS <small>(optional)</small>
                          </label>
                          <input
                            type="text"
                            {...register("bcs")}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Date Of Parturition <small>(optional)</small>
                          </label>
                          <input
                            type="date"
                            {...register("dop")}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Date Of Oestrus <small>(optional)</small>
                          </label>
                          <input
                            type="date"
                            {...register("doo")}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Milk Yield <small>(optional)</small>
                          </label>
                          <input
                            type="text"
                            {...register("milkYield")}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Pregnancy Status <small>(optional)</small>
                          </label>
                          <select
                            {...register("pregnancyStatus")}
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Parity <small>(optional)</small>
                          </label>
                          <input
                            type="text"
                            {...register("parity")}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breed</label>
                          <select
                            {...register("breed", { required: false })}
                            className={`form-control ${
                              errors.breed && "border-danger"
                            }`}
                          >
                            <option value="">Select</option>
                            {breeds?.map((breed) => (
                              <option key={breed._id} value={breed.breed}>
                                {breed.breed}
                              </option>
                            ))}
                          </select>
                          {errors.breed && (
                            <small className="text-danger">
                              Please write breed
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* History of patient */}
                  {activeTab === "patientHistory" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">
                        History of Patient
                      </h5>
                      <h6 className="text-center text-decoration-underline pb-2">
                        Disease History
                      </h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Duration of Illness
                          </label>
                          <input
                            type="text"
                            {...register("illnessDuration", { required: true })}
                            className={`form-control ${
                              errors.illnessDuration && "border-danger"
                            }`}
                          />
                          {errors.illnessDuration && (
                            <small className="text-danger">
                              Please write illness duration
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total number of animals
                          </label>
                          <input
                            type="number"
                            {...register("totalAnimals", {
                              required: true,
                              valueAsNumber: true,
                            })}
                            className={`form-control ${
                              errors.totalAnimals && "border-danger"
                            }`}
                          />
                          {errors.totalAnimals && (
                            <small className="text-danger">
                              Please write total animals
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total number of sick animals
                          </label>
                          <input
                            type="number"
                            {...register("totalSickAnimals", {
                              required: true,
                              valueAsNumber: true,
                            })}
                            className={`form-control ${
                              errors.totalSickAnimals && "border-danger"
                            }`}
                          />
                          {errors.totalSickAnimals && (
                            <small className="text-danger">
                              Please write total sick animals
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total of mortality <small>(readonly)</small>
                          </label>
                          <Controller
                            name="totalMortality"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                readOnly
                                className={`form-control ${
                                  errors.totalMortality && "border-danger"
                                }`}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total number of dead animals
                          </label>
                          <input
                            type="number"
                            {...register("totalDeadAnimals", {
                              required: true,
                              valueAsNumber: true,
                            })}
                            className={`form-control ${
                              errors.totalDeadAnimals && "border-danger"
                            }`}
                          />
                          {errors.totalDeadAnimals && (
                            <small className="text-danger">
                              Please write total dead animals
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total of case fatality <small>(readonly)</small>
                          </label>
                          <Controller
                            name="totalFatality"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                readOnly
                                className={`form-control ${
                                  errors.totalFatality && "border-danger"
                                }`}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">
                        Treatment History
                      </h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Treated before</label>
                          <select
                            {...register("treatedBefore", { required: true })}
                            className={`form-select ${
                              errors.treatedBefore && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          {errors.treatedBefore && (
                            <small className="text-danger">
                              Please select treated before
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Drags</label>
                          <input
                            type="text"
                            {...register("drags", { required: true })}
                            className={`form-control ${
                              errors.drags && "border-danger"
                            }`}
                          />
                          {errors.drags && (
                            <small className="text-danger">
                              Please write drags
                            </small>
                          )}
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">
                        Management History
                      </h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breading</label>
                          <input
                            type="text"
                            {...register("breading", { required: true })}
                            className={`form-control ${
                              errors.breading && "border-danger"
                            }`}
                          />
                          {errors.breading && (
                            <small className="text-danger">
                              Please write breading
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Feed provided</label>
                          <input
                            type="text"
                            {...register("feedProvided", { required: true })}
                            className={`form-control ${
                              errors.feedProvided && "border-danger"
                            }`}
                          />
                          {errors.feedProvided && (
                            <small className="text-danger">
                              Please write feed provided
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Vaccinations</label>
                          <input
                            type="text"
                            {...register("vaccinations", { required: true })}
                            className={`form-control ${
                              errors.vaccinations && "border-danger"
                            }`}
                          />
                          {errors.vaccinations && (
                            <small className="text-danger">
                              Please write vaccinations
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label text-danger">
                            Deworming
                          </label>
                          <select
                            {...register("deworming", { required: true })}
                            className={`form-select ${
                              errors.confusionWords && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          {errors.deworming && (
                            <small className="text-danger">
                              Please select confusionWords
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clinical (presenting & physical) signs */}
                  {activeTab === "clinicalSigns" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">
                        Clinical Signs
                      </h5>
                      <h6 className="text-center text-decoration-underline pb-2">
                        Presenting signs
                      </h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Appetite</label>
                          <input
                            type="text"
                            {...register("appetite", { required: true })}
                            className={`form-control ${
                              errors.appetite && "border-danger"
                            }`}
                          />
                          {errors.appetite && (
                            <small className="text-danger">
                              Please write appetite
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Demeanour</label>
                          <select
                            {...register("demeanour", { required: true })}
                            className={`form-select ${
                              errors.demeanour && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="dull">Dull</option>
                            <option value="bright">Bright</option>
                            <option value="excited">Excited</option>
                          </select>
                          {errors.demeanour && (
                            <small className="text-danger">
                              Please select demeanour
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Physical Condition
                          </label>
                          <select
                            {...register("physicalCondition", {
                              required: true,
                            })}
                            className={`form-select ${
                              errors.physicalCondition && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="thin">Thin</option>
                            <option value="normal">Normal</option>
                            <option value="obese">Obese</option>
                          </select>
                          {errors.physicalCondition && (
                            <small className="text-danger">
                              Please select physical condition
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Rumination: P/A <small>(optional)</small>
                          </label>
                          <select
                            {...register("rumination")}
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Salvation: P/A</label>
                          <select
                            {...register("salvation", { required: true })}
                            className={`form-select ${
                              errors.salvation && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                          {errors.salvation && (
                            <small className="text-danger">
                              Please select salvation
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Lacrimation: P/A</label>
                          <select
                            {...register("lacrimation", { required: true })}
                            className={`form-select ${
                              errors.lacrimation && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                          {errors.lacrimation && (
                            <small className="text-danger">
                              Please select lacrimation
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Nasal Discharge: P/A
                          </label>
                          <select
                            {...register("nasalDischarge", { required: true })}
                            className={`form-select ${
                              errors.nasalDischarge && "border-danger"
                            }`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                          {errors.nasalDischarge && (
                            <small className="text-danger">
                              Please select nasal discharge
                            </small>
                          )}
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">
                        Physical signs
                      </h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Dehydration <small>(optional)</small>
                          </label>
                          <input
                            type="text"
                            {...register("dehydration")}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Resp. Rate/Minute
                          </label>
                          <input
                            type="text"
                            {...register("respRate", { required: true })}
                            className={`form-control ${
                              errors.respRate && "border-danger"
                            }`}
                          />
                          {errors.respRate && (
                            <small className="text-danger">
                              Please write resp. rate
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Temp (°F)</label>
                          <input
                            type="text"
                            {...register("temp", { required: true })}
                            className={`form-control ${
                              errors.temp && "border-danger"
                            }`}
                          />
                          {errors.temp && (
                            <small className="text-danger">
                              Please write temp
                            </small>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Pulse Rate/Minute
                          </label>
                          <input
                            type="text"
                            {...register("pulseRate", { required: true })}
                            className={`form-control ${
                              errors.pulseRate && "border-danger"
                            }`}
                          />
                          {errors.pulseRate && (
                            <small className="text-danger">
                              Please write pulse rate
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Rumen, Motility <small>(optional)</small>
                          </label>
                          <input
                            type="text"
                            {...register("rumenMotility")}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Others <small>(optional)</small>
                          </label>
                          <textarea
                            {...register("others")}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "tests" && (
                    <>
                      <div className="row info-group">
                        <div className="mb-3">
                          <label className="form-label">
                            Tests <small>(optional)</small>
                          </label>
                          <Controller
                            name="tests"
                            control={control}
                            defaultValue={matchingTests}
                            render={({ field }) => (
                              <Select
                                options={testOptions}
                                isMulti
                                {...field}
                                styles={customStyles}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <button
                          type="submit"
                          className="btn btn-primary text-white"
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePatientRegistration;
