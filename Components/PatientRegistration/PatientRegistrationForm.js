import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { createPatient } from "../../features/patient-registration/patientRegistrationSlice";
import { fetchTest } from "../../features/test/testSlice";
import { formatDate } from "../../utils/formatDate";

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

const PatientRegistrationForm = () => {
  const [activeTab, setActiveTab] = useState("ownerInfo");
  const [searchPhone, setSearchPhone] = useState("");
  const [patientInfo, setPatientInfo] = useState([]);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const { tests } = useSelector((state) => state.test);

  const getPatientByPhone = async () => {
    try {
      if (searchPhone === "") return;

      const res = await dispatch(fetchAppointmentsByPhone(searchPhone));
      const existingPatentData = res?.payload?.data;

      if (existingPatentData.length > 0) {
        setPatientInfo(existingPatentData);
        toast.success("Patent's Data Found");
      } else {
        toast.error("No Data Found!");
        setSelectedPatientInfo({});
        setPatientInfo([]);
        reset();
      }
    } catch (error) {
      toast.error("No Data Found!");
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getPatientByPhone();
    }
  };

  const getPatientInfo = (id) => {
    const selectedPatient = patientInfo?.find((patent) => patent._id === id);
    setSelectedPatientInfo(selectedPatient);
  };

  const {
    handleSubmit,
    register,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      totalAnimals: 0,
      totalSickAnimals: 0,
      totalMortality: 0,
      totalDeadAnimals: 0,
      totalFatality: 0,
    },
  });

  const onSubmit = async (patientData) => {
    try {
      patientData.tests = patientData?.tests?.map((test) => test.value);
      const response = await dispatch(createPatient(patientData));

      if (response?.payload?.success) {
        router.push("/patient-registration/view");
        toast.success("Patient registration successfully!");
        setSearchPhone("");
        setSelectedPatientInfo({});
        setPatientInfo([]);
        reset();
      } else {
        toast.error("Failed to registration! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while registration. Please try again later.");
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

  // Transforming tests and medicines data
  const testOptions = tests?.data?.map((test) => ({
    value: test._id,
    label: test.testName,
  }));

  useEffect(() => {
    dispatch(fetchTest({ limit: 3000 }));
  }, [dispatch]);

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
                <h4 className="card-header-title text-center">Patient Registration</h4>
              </div>
              <div className="card-body">
                {activeTab === "ownerInfo" && (
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <input
                        onChange={(e) => {
                          setSearchPhone(e.target.value);
                        }}
                        onKeyDown={handleKeyPress}
                        type="search"
                        className="form-control"
                        placeholder="Recipient's name, phone, case no"
                        aria-label="Patent's phone"
                        aria-describedby="button-addon2"
                      />
                      <button onClick={getPatientByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                        Search
                      </button>
                      <span className="small opacity-75 ps-2">(First search using recipient's name, phone, case no)</span>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} id="patient-registration">
                  {/* owner & patient information */}
                  {activeTab === "ownerInfo" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">Owner Information</h5>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Select Appointment</label>
                          <select
                            {...register("appointmentId", { required: true })}
                            onChange={(e) => getPatientInfo(e.target.value)}
                            className={`form-select ${errors.appointmentId && "border-danger"}`}
                            aria-label="Default select example"
                          >
                            <option value="">Select</option>
                            {patientInfo?.map((patent) => (
                              <option key={patent._id} value={patent._id}>
                                {patent.caseNo} {patent.ownerName} {formatDate(patent.date)}
                              </option>
                            ))}
                          </select>
                          {errors.appointmentId && <small className="text-danger">Please select an appointment</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">CASE NO</label>
                          <input type="number" readOnly required value={selectedPatientInfo?.caseNo} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Owner Name</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.ownerName} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Phone</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.phone} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">District</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.district} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Upazila</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.upazila} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Address</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.address} className="form-control"></input>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">NID</label>
                          <input type="text" {...register("nid")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Patient Type</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.patientType} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Registration Type</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.registrationType} className="form-control" />
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Patient Information</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Species (Animal Type)</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.species?.name} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breed</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.breed?.breed} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Owner Complaints</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.complaint?.complaint} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Age</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.age} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Body Weight</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.weight} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Sex (M/F)</label>
                          <input type="text" readOnly required value={selectedPatientInfo?.sex} className="form-control" />
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
                          <select {...register("treatedBefore", { required: false })} className={`form-select ${errors.treatedBefore && "border-danger"}`} aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          {errors.treatedBefore && <small className="text-danger">Please select treated before</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Drugs</label>
                          <input type="text" {...register("drugs", { required: false })} className={`form-control ${errors.drugs && "border-danger"}`} />
                          {errors.drugs && <small className="text-danger">Please write drugs</small>}
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Management History</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breeding</label>
                          <input type="text" {...register("breeding", { required: false })} className={`form-control ${errors.breeding && "border-danger"}`} />
                          {errors.breeding && <small className="text-danger">Please write breeding</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Feed provided</label>
                          <input type="text" {...register("feedProvided", { required: false })} className={`form-control ${errors.feedProvided && "border-danger"}`} />
                          {errors.feedProvided && <small className="text-danger">Please write feed provided</small>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Vaccinations</label>
                          <input type="text" {...register("vaccinations", { required: false })} className={`form-control ${errors.vaccinations && "border-danger"}`} />
                          {errors.vaccinations && <small className="text-danger">Please write vaccinations</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Deworming</label>
                          <select {...register("deworming", { required: false })} className={`form-select ${errors.deworming && "border-danger"}`} aria-label="Default select example">
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
                          <Controller name="tests" control={control} defaultValue={[]} render={({ field }) => <Select options={testOptions} isMulti {...field} styles={customStyles} />} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <button type="submit" className="btn btn-primary text-white">
                          Submit
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

export default PatientRegistrationForm;
