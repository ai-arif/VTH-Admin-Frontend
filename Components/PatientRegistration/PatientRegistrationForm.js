import React, { useState } from "react";
import { appendErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { createPatient } from "../../features/patient-registration/patientRegistrationSlice";

const PatientRegistrationForm = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [patientInfo, setPatientInfo] = useState([]);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState({});
  const dispatch = useDispatch();

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

  const getPatientInfo = (id) => {
    const selectedPatient = patientInfo?.find((patent) => patent._id === id);
    setSelectedPatientInfo(selectedPatient);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (patientData) => {
    try {
      console.log(patientData);
      const response = await dispatch(createPatient(patientData));

      if (response?.payload?.success) {
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

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title text-center">Patient Registration</h4>
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
                  <button onClick={getPatientByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="small opacity-75">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} id="patient-registration">
                {/* owner information */}
                <div className="info-group">
                  <h5 className="text-center pb-2">Owner Information :</h5>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Select Appointment</label>
                      {/* show case no, owner name & date */}
                      <select {...register("appointmentId", { required: true })} onChange={(e) => getPatientInfo(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {patientInfo?.map((patent) => (
                          <option key={patent._id} value={patent._id}>
                            {patent.caseNo} {patent.ownerName} {patent.date}
                          </option>
                        ))}
                      </select>
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
                </div>

                {/* patient information */}
                <div className="info-group">
                  <h5 className="text-center pb-2">Patient Information :</h5>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Patient Name</label>
                      <input type="text" {...register("patientName", { required: true })} className={`form-control ${errors.patientName && "border-danger"}`} />
                      {errors.patientName && <small className="text-danger">Please write patient name</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Age</label>
                      <input type="number" {...register("age", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.age && "border-danger"}`} />
                      {errors.age && <small className="text-danger">Please write age</small>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Date Of Birth</label>
                      <input type="date" {...register("dob", { required: true })} className={`form-control ${errors.dob && "border-danger"}`} />
                      {errors.dob && <small className="text-danger">Please write birth date</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Tag No</label>
                      <input type="text" {...register("tagNo", { required: true })} className={`form-control ${errors.tagNo && "border-danger"}`} />
                      {errors.tagNo && <small className="text-danger">Please write tag no</small>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Sex</label>
                      <select {...register("sex", { required: true })} className={`form-select ${errors.sex && "border-danger"}`} aria-label="Default select example">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.sex && <small className="text-danger">Please select sex</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Weight</label>
                      <input type="number" {...register("weight", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.weight && "border-danger"}`} />
                      {errors.weight && <small className="text-danger">Please write weight</small>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Species</label>
                      <input type="text" {...register("species", { required: true })} className={`form-control ${errors.species && "border-danger"}`} />
                      {errors.species && <small className="text-danger">Please write species</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Breed</label>
                      <input type="text" {...register("breed", { required: true })} className={`form-control ${errors.breed && "border-danger"}`} />
                      {errors.breed && <small className="text-danger">Please write breed</small>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Milk Yield</label>
                      <input type="number" {...register("milkYield", { valueAsNumber: true })} className="form-control" />
                    </div>
                  </div>
                </div>

                {/* History of patient */}
                <div className="info-group">
                  <h5 className="text-center pb-2">History of Patient :</h5>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Disease History <small>(optional)</small>
                      </label>
                      <textarea {...register("diseaseHistory")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Treatment History <small>(optional)</small>
                      </label>
                      <textarea {...register("treatmentHistory")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Management History <small>(optional)</small>
                      </label>
                      <textarea {...register("managementHistory")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Clinical Signs <small>(optional)</small>
                      </label>
                      <textarea {...register("clinicalSigns")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Patient Complaint <small>(optional)</small>
                      </label>
                      <textarea {...register("patientComplaint")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Service Requested <small>(optional)</small>
                      </label>
                      <textarea {...register("serviceRequested")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Rectal Palpation <small>(optional)</small>
                      </label>
                      <select {...register("rectalPalpation")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="necropsy">Necropsy</option>
                        <option value="x-ray">X-ray</option>
                        <option value="ultrasound">Ultrasound</option>
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Laboratory Findings <small>(optional)</small>
                      </label>
                      <select {...register("laboratoryFindings")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="simple type">Simple Type</option>
                        <option value="findings">Findings</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Diagnosis <small>(optional)</small>
                      </label>
                      <select {...register("diagnosis")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="presumptive">Presumptive</option>
                        <option value="confirmatory">Confirmatory</option>
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Prognosis <small>(optional)</small>
                      </label>
                      <select {...register("prognosis")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="questionable">Questionable</option>
                        <option value="unfavorable">Unfavorable</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Pregnancy Status <small>(optional)</small>
                      </label>
                      <select {...register("pregnancyStatus")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value={true}>Yest</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Case Type</label>
                      <select {...register("caseType", { required: true })} className={`form-select ${errors.caseType && "border-danger"}`} aria-label="Default select example">
                        <option value="new">New</option>
                        <option value="old">Old</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Identification Mark</label>
                      <input type="text" {...register("identificationMark", { required: true })} className={`form-control ${errors.identificationMark && "border-danger"}`} />
                      {errors.identificationMark && <small className="text-danger">Please write identification mark</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Attendee Info</label>
                      <input type="text" {...register("attendeeInfo", { required: true })} className={`form-control ${errors.attendeeInfo && "border-danger"}`} />
                      {errors.attendeeInfo && <small className="text-danger">Please write attendee info</small>}
                    </div>
                  </div>
                </div>
                {/* add a submit button */}
                <div className="d-flex d-flex justify-content-center gap-4 my-3">
                  <button type="reset" className="btn btn-danger text-white">
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
