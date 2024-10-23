import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchPatient, fetchSinglePatient, updatePatientData } from "../../features/patient-registration/patientRegistrationSlice";
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

const UpdatePatientRegistration = () => {
  const [activeTab, setActiveTab] = useState("ownerInfo");
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { patient, status } = useSelector((state) => state.patient);
  const { tests } = useSelector((state) => state.test);

  // convert date string to a Date object and Format the date
  const dop = patient?.dop ? new Date(patient.dop).toISOString().split("T")[0] : "";
  const doo = patient?.doo ? new Date(patient.doo).toISOString().split("T")[0] : "";

  const testOptions = tests?.data?.map((test) => ({
    value: test._id,
    label: test.testName,
  }));

  // find selected tests then matching
  const selectedTests = patient?.tests;
  const matchingTests = testOptions?.filter((data) => selectedTests?.includes(data.value));

  const {
    handleSubmit,
    register,
    trigger,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ values: { ...patient, dop, doo, tests: matchingTests } });

  const onSubmit = async (patientData) => {
    try {
      patientData.id = id;
      patientData.tests = patientData?.tests?.map((test) => test.value);

      const response = await dispatch(updatePatientData(patientData));

      if (response?.payload?.success) {
        dispatch(fetchPatient({}));
        router.push("/patient-registration/view");
        toast.success("Patient data updated successfully!");
      } else {
        toast.error("Failed to update patient data! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while updating patient data. Please try again later.");
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
    dispatch(fetchTest({ limit: 3000 }));
  }, [dispatch, id]);

  //   loader
  if (status === "loading") return <Loader />;

  return (
    <>
      {/* tabs */}
      <div className="d-flex justify-content-center my-3 sticky-tabs">
        <div className="btn-group" role="group">
          <button className={`btn text-white ${activeTab === "ownerInfo" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => handleTabSwitch("ownerInfo")}>
            Owner Information
          </button>
          <button className={`btn text-white ${activeTab === "patientHistory" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => handleTabSwitch("patientHistory")}>
            Patient History
          </button>
          <button className={`btn text-white ${activeTab === "clinicalSigns" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => handleTabSwitch("clinicalSigns")}>
            Clinical Signs
          </button>
          <button className={`btn text-white ${activeTab === "tests" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => handleTabSwitch("tests")}>
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
                <h4 className="card-header-title text-center">Edit Patient Registration</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} id="patient-registration">
                  {/* owner & patient information */}
                  {activeTab === "ownerInfo" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">Owner Information</h5>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Selected Appointment</label>
                          <input
                            type="text"
                            readOnly
                            required
                            value={`${patient?.appointmentId?.caseNo} ${patient?.appointmentId?.ownerName} ${formatDate(patient?.appointmentId?.date)}`}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">CASE NO</label>
                          <input type="number" readOnly required value={patient?.appointmentId?.caseNo} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Owner Name</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.ownerName} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Phone</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.phone} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">District</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.district} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Upazila</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.upazila} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Address</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.address} className="form-control"></input>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">NID</label>
                          <input type="text" {...register("nid")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Patient Type</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.patientType} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Registration Type</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.registrationType} className="form-control" />
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Patient Information</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Species (Animal Type)</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.species?.name} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breed</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.breed?.breed} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Owner Complaints</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.complaint?.complaint} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Age</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.age} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Body Weight</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.weight} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Sex (M/F)</label>
                          <input type="text" readOnly required value={patient?.appointmentId?.sex} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date Of Parturition</label>
                          <input type="date" {...register("dop")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date Of Oestrus</label>
                          <input type="date" {...register("doo")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Milk Yield</label>
                          <input type="text" {...register("milkYield")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Pregnancy Status</label>
                          <select {...register("pregnancyStatus")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Parity</label>
                          <input type="text" {...register("parity")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">BCS</label>
                          <input type="text" {...register("bcs")} className="form-control" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* History of patient */}
                  {activeTab === "patientHistory" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">History of Patient</h5>
                      <h6 className="text-center text-decoration-underline py-2">Treatment History</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Treated before</label>
                          <select {...register("treatedBefore", { required: true })} className={`form-select ${errors.treatedBefore && "border-danger"}`} aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          {errors.treatedBefore && <small className="text-danger">Please select treated before</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Drugs</label>
                          <input type="text" {...register("drugs", { required: true })} className={`form-control ${errors.drugs && "border-danger"}`} />
                          {errors.drugs && <small className="text-danger">Please write drugs</small>}
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Management History</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breeding</label>
                          <input type="text" {...register("breeding", { required: true })} className={`form-control ${errors.breeding && "border-danger"}`} />
                          {errors.breeding && <small className="text-danger">Please write breeding</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Feed provided</label>
                          <input type="text" {...register("feedProvided", { required: true })} className={`form-control ${errors.feedProvided && "border-danger"}`} />
                          {errors.feedProvided && <small className="text-danger">Please write feed provided</small>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Vaccinations</label>
                          <input type="text" {...register("vaccinations", { required: true })} className={`form-control ${errors.vaccinations && "border-danger"}`} />
                          {errors.vaccinations && <small className="text-danger">Please write vaccinations</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Deworming</label>
                          <select {...register("deworming", { required: true })} className={`form-select ${errors.deworming && "border-danger"}`} aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          {errors.deworming && <small className="text-danger">Please select deworming</small>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clinical (presenting & physical) signs */}
                  {activeTab === "clinicalSigns" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">Clinical Signs</h5>
                      <h6 className="text-center text-decoration-underline pb-2">Presenting signs</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Diarrhea</label>
                          <select {...register("diarrhea")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Demeanour</label>
                          <select {...register("demeanour")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="dull">Dull</option>
                            <option value="bright">Bright</option>
                            <option value="excited">Excited</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Physical Condition</label>
                          <select {...register("physicalCondition")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="thin">Thin</option>
                            <option value="normal">Normal</option>
                            <option value="obese">Obese</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Rumination: P/A</label>
                          <select {...register("rumination")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Salvation: P/A</label>
                          <select {...register("salvation")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Lacrimation: P/A</label>
                          <select {...register("lacrimation")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Nasal Discharge: P/A</label>
                          <select {...register("nasalDischarge")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Physical signs</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Dehydration</label>
                          <input type="text" {...register("dehydration")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Resp. Rate /minute</label>
                          <input type="text" {...register("respRate")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Temp (°F)</label>
                          <input type="text" {...register("temp")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Pulse Rate /minute</label>
                          <input type="text" {...register("pulseRate")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Rumen motility</label>
                          <input type="text" {...register("rumenMotility")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Heart beat /minute</label>
                          <input type="text" {...register("heartBeat")} className="form-control" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Others</label>
                        <textarea {...register("others")} className="form-control" />
                      </div>
                    </div>
                  )}

                  {activeTab === "tests" && (
                    <>
                      <div className="row info-group">
                        <div className="mb-3">
                          <label className="form-label">Tests</label>
                          <Controller name="tests" control={control} defaultValue={matchingTests} render={({ field }) => <Select options={testOptions} isMulti {...field} styles={customStyles} />} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <button type="submit" className="btn btn-primary text-white">
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
