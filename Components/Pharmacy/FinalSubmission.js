import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { createPharmacy, fetchPharmacy } from "../../features/pharmacy/pharmacySlice";

const customMultiStyles = {
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

const FinalSubmission = ({ id, pharmacyMedicines, totalPrice, totalQuantity }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    data.unavailableMedicines = data.unavailableMedicines?.map((medicine) => medicine.value);
    data.availableMedicines = pharmacyMedicines;
    data.totalQuantity = Number(totalQuantity);
    data.totalPrice = Number(totalPrice);
    data.prescriptionID = id;

    try {
      const response = await dispatch(createPharmacy(data));

      if (response?.payload?.success) {
        toast.success("Medicine added successfully!");
        reset();
        router.push("/pharmacy");
      } else {
        toast.error("Failed to submit! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title text-center">Final Submission</h4>
        </div>
        <div className="card-body">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <div className="col-md-4 fw-medium">Total Medicine: {pharmacyMedicines?.length}</div>
                <div className="col-md-4 fw-medium">Total Quantity: {totalQuantity}</div>
                <div className="col-md-4 fw-medium">Total Price (৳): {totalPrice}</div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <label className="form-label">Unavailable Medicines:</label>
                  <Controller name="unavailableMedicines" control={control} render={({ field }) => <CreatableSelect isMulti isClearable {...field} styles={customMultiStyles} />} />
                </div>
              </div>
              <div className="my-3 d-flex gap-3 justify-content-center">
                <button type="submit" className="btn app-btn-primary">
                  Submit
                </button>
                <button className="btn app-btn-primary">Download</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalSubmission;
