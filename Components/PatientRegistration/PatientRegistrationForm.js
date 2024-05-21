import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { createPatient } from "../../features/patient-registration/patientRegistrationSlice";
import { formatDate } from "../../utils/formatDate";

const PatientRegistrationForm = () => {
  const [activeTab, setActiveTab] = useState("ownerInfo");
  const [searchPhone, setSearchPhone] = useState("");
  const [patientInfo, setPatientInfo] = useState([]);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState({});
  const dispatch = useDispatch();

  const getPatientByPhone = async () => {
    try {
      if (searchPhone === "") return;
      console.log(searchPhone);
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
    formState: { errors },
  } = useForm();

  const onSubmit = async (patientData) => {
    console.log(patientData);
    // try {
    //   const response = await dispatch(createPatient(patientData));

    //   if (response?.payload?.success) {
    //     toast.success("Patient registration successfully!");
    //     setSearchPhone("");
    //     setSelectedPatientInfo({});
    //     setPatientInfo([]);
    //     reset();
    //   } else {
    //     toast.error("Failed to registration! Please try again later.");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while registration. Please try again later.");
    //   console.error(error);
    // }
  };

  const handleTabSwitch = async (tab) => {
    const valid = await trigger();
    if (valid) {
      setActiveTab(tab);
    } else {
      toast.error("Please fill in all required fields before switching tabs.");
    }
  };

  return (
    <>
      {/* tabs */}
      <div className="d-flex justify-content-center my-3">
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
                        type="text"
                        className="form-control"
                        placeholder="Patent's Phone"
                        aria-label="Patent's phone"
                        aria-describedby="button-addon2"
                      />
                      <button onClick={getPatientByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                        Search
                      </button>
                      <span className="small opacity-75">(First search appointment using owner's phone)</span>
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
                          <input type="text" {...register("nid", { required: true })} className={`form-control ${errors.nid && "border-danger"}`} />
                          {errors.nid && <small className="text-danger">Please write nid number</small>}
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
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date</label>
                          <input type="date" {...register("date", { required: true })} className={`form-control ${errors.date && "border-danger"}`} />
                          {errors.date && <small className="text-danger">Please select date</small>}
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Patient Information</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Species (Animal Type)</label>
                          <input type="text" {...register("species", { required: true })} className={`form-control ${errors.species && "border-danger"}`} />
                          {errors.species && <small className="text-danger">Please write species</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Owner Complaints <small>(optional)</small>
                          </label>
                          <textarea {...register("ownerComplaints")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Age</label>
                          <input type="number" {...register("age", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.age && "border-danger"}`} />
                          {errors.age && <small className="text-danger">Please write age</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Sex (M/F)</label>
                          <select {...register("sex", { required: true })} className={`form-select ${errors.sex && "border-danger"}`} aria-label="Default select example">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {errors.sex && <small className="text-danger">Please select sex (m/f)</small>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Weight (kg)</label>
                          <input type="number" {...register("weight", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.weight && "border-danger"}`} />
                          {errors.weight && <small className="text-danger">Please write weight</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">BCS</label>
                          <input type="text" {...register("bcs", { required: true })} className={`form-control ${errors.bcs && "border-danger"}`} />
                          {errors.tagNo && <small className="text-danger">Please write BCS</small>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date Of Parturition</label>
                          <input type="date" {...register("dop", { required: true })} className={`form-control ${errors.dop && "border-danger"}`} />
                          {errors.dop && <small className="text-danger">Please select parturition date</small>}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date Of Oestrus</label>
                          <input type="date" {...register("doo", { required: true })} className={`form-control ${errors.doo && "border-danger"}`} />
                          {errors.doo && <small className="text-danger">Please select oestrus date</small>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Milk Yield <small>(optional)</small>
                          </label>
                          <input type="text" {...register("milkYield")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Pregnancy Status <small>(optional)</small>
                          </label>
                          <select {...register("pregnancyStatus")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Parity <small>(optional)</small>
                          </label>
                          <input type="text" {...register("parity")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Breed</label>
                          <input type="text" {...register("breed", { required: true })} className={`form-control ${errors.breed && "border-danger"}`} />
                          {errors.breed && <small className="text-danger">Please write breed</small>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* History of patient */}
                  {activeTab === "patientHistory" && (
                    <div className="info-group">
                      <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">History of Patient</h5>
                      <h6 className="text-center text-decoration-underline pb-2">Disease History</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Duration of Illness <small>(optional)</small>
                          </label>
                          <input type="text" {...register("illnessDuration")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total number of animals <small>(optional)</small>
                          </label>
                          <input type="number" {...register("totalNumberOfAnimals", { valueAsNumber: true })} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total number of sick animals <small>(optional)</small>
                          </label>
                          <input type="number" {...register("totalNumberOfSickAnimals", { valueAsNumber: true })} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Total number of deed animals <small>(optional)</small>
                          </label>
                          <input type="number" {...register("totalNumberOfDeedAnimals", { valueAsNumber: true })} className="form-control" />
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Treatment History</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Treated before <small>(optional)</small>
                          </label>
                          <select {...register("treatedBefore")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Drags <small>(optional)</small>
                          </label>
                          <input type="text" {...register("drags")} className="form-control" />
                        </div>
                      </div>
                      <h6 className="text-center text-decoration-underline py-2">Management History</h6>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Breading <small>(optional)</small>
                          </label>
                          <input type="text" {...register("breading")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Feed provided <small>(optional)</small>
                          </label>
                          <input type="text" {...register("feedProvided")} className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">
                            Vaccinations <small>(optional)</small>
                          </label>
                          <input type="text" {...register("vaccinations")} className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label text-danger">
                            confusion words <small>(optional)</small>
                          </label>
                          <select {...register("treatedBefore")} className="form-select" aria-label="Default select example">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clinical (presenting & physical) signs */}
                  {activeTab === "clinicalSigns" && (
                    <>
                      <div className="info-group">
                        <h5 className="text-center bg-opacity-25 rounded-2 bg-secondary py-1 text-white mb-3">Clinical Signs</h5>
                        <h6 className="text-center text-decoration-underline pb-2">Presenting signs</h6>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Appetite <small>(optional)</small>
                            </label>
                            <input type="text" {...register("appetite")} className="form-control" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Demeanour <small>(optional)</small>
                            </label>
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
                            <label className="form-label">
                              Physical Condition <small>(optional)</small>
                            </label>
                            <select {...register("physicalCondition")} className="form-select" aria-label="Default select example">
                              <option value="">Select</option>
                              <option value="thin">Thin</option>
                              <option value="normal">Normal</option>
                              <option value="obese">Obese</option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Rumination: P/A <small>(optional)</small>
                            </label>
                            <input type="text" {...register("rumination")} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Salvation: P/A <small>(optional)</small>
                            </label>
                            <input type="text" {...register("salvation")} className="form-control" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Lacrimation: P/A <small>(optional)</small>
                            </label>
                            <input type="text" {...register("lacrimation")} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Nasal Discharge: P/A <small>(optional)</small>
                            </label>
                            <input type="text" {...register("nasalDischarge")} className="form-control" />
                          </div>
                        </div>
                        <h6 className="text-center text-decoration-underline py-2">Physical signs</h6>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Dehydration <small>(optional)</small>
                            </label>
                            <input type="text" {...register("dehydration")} className="form-control" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              MM <small>(optional)</small>
                            </label>
                            <input type="text" {...register("mm")} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Resp. Rate/Minute <small>(optional)</small>
                            </label>
                            <input type="text" {...register("respRate")} className="form-control" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Pulse Rate/Minute <small>(optional)</small>
                            </label>
                            <input type="text" {...register("lacrimation")} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Temp (°F) <small>(optional)</small>
                            </label>
                            <input type="text" {...register("temp")} className="form-control" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              Rumen, Motility <small>(optional)</small>
                            </label>
                            <input type="text" {...register("rumenMotility")} className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 ">
                            <label className="form-label">
                              Others <small>(optional)</small>
                            </label>
                            <textarea {...register("others")} className="form-control" />
                          </div>
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
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientRegistrationForm;
