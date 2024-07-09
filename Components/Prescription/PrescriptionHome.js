import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdPrint } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { fetchMedicineBrandName } from "../../features/medicine/medicineSlice";
import { fetchMedicineParams } from "../../features/medicineParam/MedicineParamsSlice";
import { createPrescription } from "../../features/prescription/prescriptionSlice";
import { formatDate } from "../../utils/formatDate";
import { handleDownloadPrescription } from "./PrescriptionPdf";

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
  const [singlePrescription, setSinglePrescription] = useState({});
  const [selectedPatentInfo, setSelectedPatentInfo] = useState({});
  const [isPrint, setIsPrint] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const dispatch = useDispatch();

  const { medicinesBrandName } = useSelector((state) => state.medicine);
  const { medicineParams } = useSelector((state) => state.medicineParam);

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getPatentByPhone();
    }
  };

  const getPatentInfo = (id) => {
    const selectedPatent = patentInfo?.find((patent) => patent._id === id);
    setSelectedPatentInfo(selectedPatent);
  };

  const onSubmit = async (data) => {
    try {
      const therapeutics = selectedMedicines?.map((medicine, index) => ({
        medicine_name: medicine.label,
        medicine_id: medicine.value,
        first: data[`first_${index}`],
        second: data[`second_${index}`],
        third: data[`third_${index}`],
      }));

      const prescriptionData = {
        ...data,
        medicines: data?.medicines?.map((medicine) => medicine.value),
        therapeutics,
      };

      const response = await dispatch(createPrescription(prescriptionData));

      if (response?.payload?.success) {
        toast.success("Prescription added successfully!");
        setSinglePrescription(response?.payload?.data?.data);
        setIsPrint(true);
        setSearchPhone("");
        setSelectedPatentInfo({});
        setPatentInfo([]);
        setSelectedMedicines([]);
        reset();
      } else {
        toast.error("Failed to add prescription! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding prescription. Please try again later.");
      console.error(error);
    }
  };

  // Transforming medicines data
  const medicineOptions = medicinesBrandName?.data?.map((medicine) => ({
    value: medicine._id,
    label: medicine.brandName,
  }));

  useEffect(() => {
    dispatch(fetchMedicineBrandName({ limit: 3000 }));
    dispatch(fetchMedicineParams());
  }, [dispatch]);

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
                    onKeyDown={handleKeyPress}
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
                    <select {...register("appointment", { required: true })} onChange={(e) => getPatentInfo(e.target.value)} className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      {patentInfo?.map((patent) => (
                        <option key={patent._id} value={patent._id}>
                          {patent.caseNo} {patent.ownerName} {formatDate(patent.date)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">CASE NO</label>
                    <input type="number" readOnly required value={selectedPatentInfo?.caseNo} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input type="text" readOnly required value={selectedPatentInfo?.ownerName} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" readOnly required value={selectedPatentInfo?.phone} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District</label>
                    <input type="text" readOnly required value={selectedPatentInfo?.district} className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Upazila</label>
                    <input type="text" readOnly required value={selectedPatentInfo?.upazila} className="form-control" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input readOnly required value={selectedPatentInfo?.address} className="form-control"></input>
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
                      defaultValue={[]}
                      render={({ field }) => (
                        <Select
                          options={medicineOptions}
                          isMulti
                          {...field}
                          styles={customStyles}
                          onChange={(selected) => {
                            field.onChange(selected);
                            setSelectedMedicines(selected);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                {/* here show dynamic params based on select medicine name */}
                {selectedMedicines?.length > 0 &&
                  selectedMedicines?.map((medicine, index) => (
                    <div className="row g-2 mb-3" id="therapeutics" key={index}>
                      <div className="col-12 col-md-3 border rounded-1 p-2">
                        <div className="mb-3">
                          <label className="form-label">Medicine Name</label>
                          <input readOnly type="text" value={medicine.label} className="form-control"></input>
                        </div>
                      </div>
                      {/* example parameter inputs */}
                      <div className="col-12 col-md-3 border rounded-1 p-2">
                        <div>
                          <label className="form-label pb-1">Dose</label>
                          <select type="text" {...register(`first_${index}`)} className="form-select">
                            <option value="">Select</option>
                            {medicineParams?.first?.map((param, idx) => (
                              <option key={idx} value={param.param_name}>
                                {param.param_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 border rounded-1 p-2">
                        <div>
                          <label className="form-label pb-1">Route</label>
                          <select type="text" {...register(`second_${index}`)} className="form-select">
                            <option value="">Select</option>
                            {medicineParams?.second?.map((param, idx) => (
                              <option key={idx} value={param.param_name}>
                                {param.param_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 border rounded-1 p-2">
                        <div>
                          <label className="form-label pb-1">Frequency</label>
                          <select type="text" {...register(`third_${index}`)} className="form-select">
                            <option value="">Select</option>
                            {medicineParams?.third?.map((param, idx) => (
                              <option key={idx} value={param.param_name}>
                                {param.param_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
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
                <div className="row">
                  <h6>Only For Surgery:</h6>
                  <div className="border rounded-2">
                    <p className="text-center py-2">
                      Surgical Note <small>(optional)</small>
                    </p>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Pre-Anesthetic used</label>
                        <input type="text" {...register("preAnestheticUsed")} className="form-control" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Suture materials used</label>
                        <input type="text" {...register("sutureMaterialsUsed")} className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Type of surgery</label>
                        <input type="text" {...register("typeOfSurgery")} className="form-control" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Post operative care</label>
                        <input type="text" {...register("postOperativeCare")} className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="">
                        <label className="form-label">Brief Surgical Procedure</label>
                        <input type="text" {...register("briefSurgical")} className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-3 d-flex justify-content-center gap-4">
                  {/* <button type="reset" className="btn btn-danger text-white">
                    Reset
                  </button> */}
                  <button type="submit" className="btn app-btn-primary">
                    Submit
                  </button>
                </div>
              </form>
              <div className="pb-3 d-flex justify-content-end">
                <button disabled={!isPrint} onClick={() => handleDownloadPrescription(singlePrescription)} className="btn btn-info text-white">
                  <MdPrint size={18} /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionHome;
