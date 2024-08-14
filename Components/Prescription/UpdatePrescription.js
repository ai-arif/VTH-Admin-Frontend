import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { fetchMedicineBrandName } from "../../features/medicine/medicineSlice";
import { fetchMedicineParams } from "../../features/medicineParam/MedicineParamsSlice";
import { fetchPrescription, fetchSinglePrescription, updatePrescriptionData } from "../../features/prescription/prescriptionSlice";
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
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { prescription, status } = useSelector((state) => state.prescription);
  const { medicinesBrandName } = useSelector((state) => state.medicine);
  const { medicineParams } = useSelector((state) => state.medicineParam);

  // transforming tests and medicines data
  const medicineOptions = medicinesBrandName?.data?.map((medicine) => ({
    value: medicine._id,
    label: medicine.brandName,
  }));

  const selectedMedicineOptions = prescription?.data?.therapeutics?.map((medicine) => ({
    value: medicine.medicine_id,
    label: medicine.medicine_name,
  }));

  // convert date string to a Date object and Format the date
  const nextVisitDate = prescription?.data?.nextVisit ? new Date(prescription.data.nextVisit).toISOString().split("T")[0] : "";

  const { handleSubmit, register, control, reset, setValue } = useForm({
    values: {
      ...prescription?.data,
      medicines: selectedMedicineOptions,
      nextVisit: nextVisitDate,
    },
  });

  const onSubmit = async (data) => {
    try {
      const therapeutics = selectedMedicines.map((medicine, index) => ({
        medicine_name: medicine.label,
        medicine_id: medicine.value,
        first: data[`first_${index}`],
        second: data[`second_${index}`],
        third: data[`third_${index}`],
      }));

      // Create a new object excluding the unwanted keys
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (!key.startsWith("first_") && !key.startsWith("second_") && !key.startsWith("third_")) {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      const prescriptionData = {
        ...filteredData,
        id: id,
        medicines: data?.medicines?.map((medicine) => medicine.value),
        therapeutics,
      };

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
      dispatch(fetchSinglePrescription(id)).then((res) => {
        const medicinesTherap = res?.payload?.data?.data?.therapeutics;
        const selectedMedicineOptions = medicinesTherap?.map((medicine) => ({
          value: medicine.medicine_id,
          label: medicine.medicine_name,
        }));
        setSelectedMedicines(selectedMedicineOptions);
      });
    }
    dispatch(fetchMedicineBrandName({ limit: 3000 }));
    dispatch(fetchMedicineParams());
  }, [dispatch, id]);

  useEffect(() => {
    if (prescription?.data?.therapeutics) {
      prescription?.data?.therapeutics?.forEach((therapeutic, index) => {
        // setValue("medicine_name", therapeutic.medicine_name);
        setValue(`first_${index}`, therapeutic.first);
        setValue(`second_${index}`, therapeutic.second);
        setValue(`third_${index}`, therapeutic.third);
      });
    }
  }, [prescription, setValue]);

  //   loader
  // if (status === "loading") return <Loader />;

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
                      defaultValue={selectedMedicineOptions}
                      render={({ field }) => (
                        <CreatableSelect
                          options={medicineOptions}
                          isMulti
                          isClearable
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
