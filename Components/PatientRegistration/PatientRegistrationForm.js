import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { createPatient } from "../../features/patient-registration/patientRegistrationSlice";
import { formatDate } from "../../utils/formatDate";
import {
  appetiteOptions,
  clinicalSignsOptions,
  defecationOptions,
  dehydrationOptions,
  earsOptions,
  externalParasitesOptions,
  eyeOptions,
  gaitOptions,
  hairCoatOptions,
  lesionsIntegumentaryOptions,
  nasalDischargeOptions,
  ocularDischargeOptions,
  physicalConditionOptions,
  postureOptions,
  salivationOptions,
  skinLesionsOptions,
  urinationOptions,
  waterIntakeOptions,
} from "./registrationData";

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
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (patientData) => {
    try {
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
                      <select {...register("appointmentId", { required: true })} onChange={(e) => getPatientInfo(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {patientInfo?.map((patent) => (
                          <option key={patent._id} value={patent._id}>
                            {patent.caseNo} {patent.ownerName} {formatDate(patent.date)}
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
                      <input type="text" {...register("milkYield")} className="form-control" />
                    </div>
                  </div>
                </div>

                {/* Clinical History */}
                <div className="info-group">
                  <h5 className="text-center rounded-2 bg-secondary py-1 text-white mb-3">Clinical History</h5>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Disease History</span>{" "}
                        <small>
                          (Duration of illness, Clinical abnormalities observed by the owner, History of illness of other animals in the farm, History of previous illness, Exposure history etc)
                        </small>
                      </label>
                      <textarea {...register("diseaseHistory")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Management History</span>{" "}
                        <small>
                          (Housing, Stocking density, Floor type, Ventilation, Feeding, Lighting, Grazing, Vaccination, Drainage system, Milking, Castration, Breeding, Abortion, Exercise, Use of foot
                          bath, Insect control etc)
                        </small>
                      </label>
                      <textarea {...register("managementHistory")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Treatment History</span> <small>(Previous treatment, Present treatment, and Previous surgical procedures etc)</small>
                      </label>
                      <textarea {...register("treatmentHistory")} className="form-control mt-4" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Environmental History</span>{" "}
                        <small>
                          (Climate, Presence of insects, Presence of wildlife, Poisonous plants in the area, Use of fertilizer in the crop field, Waste disposal, and Grazing land type etc)
                        </small>
                      </label>
                      <textarea {...register("environmentalHistory")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">No. of affected animals/birds</label>
                      <input type="number" {...register("noOfAffectedAnimals", { valueAsNumber: true })} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">No. of dead animals/birds</label>
                      <input type="number" {...register("noOfDeadAnimals", { valueAsNumber: true })} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">No. of susceptible animals/birds</label>
                      <input type="number" {...register("noOfSusceptibleAnimals", { valueAsNumber: true })} className="form-control" />
                    </div>
                  </div>
                </div>

                {/* Clinical Signs */}
                <div className="info-group">
                  <h5 className="text-center rounded-2 bg-secondary py-1 mb-3">Clinical Signs</h5>
                  <h6 className="text-center text-decoration-underline pb-2">Presenting Signs</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Clinical Signs</label>
                      <select {...register("clinicalSigns")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {clinicalSignsOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Rumination</label>
                      <select {...register("rumination")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Physical condition / BCS</label>
                      <select {...register("physicalCondition")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {physicalConditionOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Posture</label>
                      <Controller name="posture" control={control} render={({ field }) => <Select options={postureOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Gait</label>
                      <Controller name="gait" control={control} render={({ field }) => <Select options={gaitOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Muzzle</label>
                      <select {...register("muzzle")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="Moist">Moist</option>
                        <option value="Dry">Dry</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Salivation</label>
                      <Controller name="salivation" control={control} render={({ field }) => <Select options={salivationOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Abdomen</label>
                      <select {...register("abdomen")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="Normal">Normal</option>
                        <option value="Distended">Distended</option>
                        <option value="Tucked">Tucked</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Nasal discharge</label>
                      <Controller name="nasalDischarge" control={control} render={({ field }) => <Select options={nasalDischargeOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Ocular discharge</label>
                      <Controller name="ocularDischarge" control={control} render={({ field }) => <Select options={ocularDischargeOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Hair coat</label>
                      <Controller name="hairCoat" control={control} render={({ field }) => <Select options={hairCoatOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Skin lesions</label>
                      <Controller name="skinLesions" control={control} render={({ field }) => <Select options={skinLesionsOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Defecation</label>
                      <Controller name="defecation" control={control} render={({ field }) => <Select options={defecationOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Urination</label>
                      <Controller name="urination" control={control} render={({ field }) => <Select options={urinationOptions} isMulti {...field} styles={customStyles} />} />
                    </div>
                  </div>
                  <h6 className="text-center text-decoration-underline py-2">Vital Signs</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Temperature (°F)</label>
                      <input type="text" {...register("temperature")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Respiratory <small>rate/min</small>
                      </label>
                      <input type="text" {...register("respiratoryRate")} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Pulse <small>rate/min</small>
                      </label>
                      <input type="text" {...register("pulseRate")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Hear beat <small>rate/min</small>
                      </label>
                      <input type="text" {...register("hearBeat")} className="form-control" />
                    </div>
                  </div>
                  <h6 className="text-center text-decoration-underline py-2">Digestive System</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Rumen motility <small>(min)</small>
                      </label>
                      <input type="text" {...register("rumenMotility")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Appetite</label>
                      <select {...register("appetite")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {appetiteOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Water intake</label>
                      <select {...register("waterIntake")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {waterIntakeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Dehydration</label>
                      <select {...register("dehydration")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {dehydrationOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <h6 className="text-center text-decoration-underline py-2">Oral, Palpation, Percussion Rectal & Integumentary</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Oral cavity <small>(Lips)</small>
                      </label>
                      <input type="text" {...register("lipsOral")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Oral cavity <small>(Mucous membranes)</small>
                      </label>
                      <input type="text" {...register("muscousOral")} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Oral cavity <small>(Teeth: Normal/ Brocken/caries)</small>
                      </label>
                      <input type="text" {...register("teetOral")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Oral cavity <small>(Gum: Normal/ inflamed/eroded)</small>
                      </label>
                      <input type="text" {...register("gumOral")} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Oral cavity <small>(Tonsils: Hard and soft palate, tongue, pharynx, tonsils)</small>
                      </label>
                      <input type="text" {...register("tonsilsOral")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Oral cavity <small>(Tongue: Eroded lesions and/or gum, wooden, Protrusion)</small>
                      </label>
                      <input type="text" {...register("tongueOral")} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Palpation of the abdomen <small>(pain, discomfort, abnormal mass)</small>
                      </label>
                      <input type="text" {...register("palpationOfAbdomen")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Percussion of the abdomen <small>(adventitious sounds)</small>
                      </label>
                      <input type="text" {...register("percussionOfAbdomen")} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Integumentary <small>(Lesions)</small>
                      </label>
                      <select {...register("integumentaryLesions")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {lesionsIntegumentaryOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Integumentary <small>(Location)</small>
                      </label>
                      <input type="text" {...register("integumentaryLocation")} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        Rectal examination <small>(rectum and distal colon, pregnancy)</small>
                      </label>
                      <input type="text" {...register("rectalExamination")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">External Parasites</label>
                      <select {...register("externalParasites")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {externalParasitesOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <h6 className="text-center text-decoration-underline py-2">Eye & Ears</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Eyelids</label>
                      <select {...register("eyelidsEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Protrusion of eyeball</label>
                      <select {...register("protrusionEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Recession of eyeball (Enophthalmos)</label>
                      <select {...register("recessionEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Conjunctiva</label>
                      <select {...register("conjunctivaEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Corneal opacity</label>
                      <select {...register("cornealOpacityEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Pupil</label>
                      <select {...register("pupilEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Discharge from eyes</label>
                      <select {...register("dischargeFromEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Eye worm</label>
                      <select {...register("wormEye")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {eyeOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Eye - Intraoccular pressure</label>
                      <input type="text" {...register("intraoccularPressureEye")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Ears - Pinnae</label>
                      <select {...register("pinnaeEars")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {earsOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Ears - Ear canal</label>
                      <select {...register("canalEars")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        {earsOptions?.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <h6 className="text-center text-decoration-underline py-2">Cardiovascular system</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Heart Rate and Rhythm</span>{" "}
                        <small>(Assess the heart rate and rhythm by palpating the pulse or listening to the heartbeat with a stethoscope.)</small>
                      </label>
                      <textarea {...register("heartRateAndRhythm")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Mucous Membranes</span>{" "}
                        <small>(Check for the color and capillary refill time of the mucous membranes, which can indicate circulatory status.)</small>
                      </label>
                      <textarea {...register("mucousMembranes")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Pulse Quality</span> <small>(Evaluate the strength and regularity of the pulse.)</small>
                      </label>
                      <textarea {...register("pulseQuality")} className="form-control mt-4" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Auscultation of the Heart</span> <small>(Identify any murmurs, irregularities, or abnormal sounds)</small>
                      </label>
                      <textarea {...register("auscultationOfHeart")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Blood Pressure Measurement</span>{" "}
                        <small>(Blood pressure may be measured to assess the function of the cardiovascular system more accurately.)</small>
                      </label>
                      <textarea {...register("bloodPressureMeasurement")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Palpation of Peripheral Pulses</span> <small>(Femoral, dorsal pedal: to check for abnormalities or discrepancies)</small>
                      </label>
                      <textarea {...register("palpationOfPeripheralPulses")} className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Respiratory Examination</span>{" "}
                        <small>(Assess the respiratory rate and look for signs of respiratory distress, as the cardiovascular and respiratory systems are closely linked)</small>
                      </label>
                      <textarea {...register("respiratoryExamination")} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        <span className="fw-medium">Edema (ascites) Assessment</span>{" "}
                        <small>(Check for the presence of edema (fluid accumulation) in dependent areas, such as the limbs or abdomen)</small>
                      </label>
                      <textarea {...register("edemaAssessment")} className="form-control mt-4" rows="3"></textarea>
                    </div>
                  </div>
                  <h6 className="text-center text-decoration-underline py-2">Respiratory system</h6>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Nose and nares (Conformation)</label>
                      <select {...register("NoseAndNaresConformation")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="Normal and symmetrical">Normal and symmetrical</option>
                        <option value="Presence of polyps">Presence of polyps</option>
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Nose and nares (Discharge)</label>
                      <select {...register("NoseAndNaresDischarge")} className="form-select" aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="Serous">Serous</option>
                        <option value="Purulent">Purulent</option>
                        <option value="Hemorrhagic">Hemorrhagic</option>
                        <option value="Mucoid or mucopurulent">Mucoid or mucopurulent</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* History of patient */}
                <div className="info-group">
                  <h5 className="text-center pb-2">History of Patient :</h5>
                  <div className="row"></div>
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
                        <option value={true}>Yes</option>
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
