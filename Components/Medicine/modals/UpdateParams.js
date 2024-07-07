import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  fetchMedicineParams,
  updateMedicineParamsData,
} from "../../../features/medicineParam/MedicineParamsSlice";

const UpdateParams = ({ existingData }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: existingData });

  const onSubmit = async (params) => {
    try {
      params.id = existingData.id;
      const response = await dispatch(updateMedicineParamsData(params));

      if (response?.payload?.success) {
        await dispatch(fetchMedicineParams());
        toast.success("params updated successfully!");
        document.getElementById("closeUpdateModal").click();
      } else {
        toast.error("Failed to update params! Please try again later.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating params. Please try again later."
      );
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updateParams"
        tabIndex="-1"
        aria-labelledby="updateParamsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">Edit Params</h2>
              <button
                id="closeUpdateModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-4">
                <label className="form-label pb-2">Select Params</label>
                <select
                  type="text"
                  {...register("param_category", { required: true })}
                  className={`form-select ${
                    errors.param_category && "border-danger"
                  }`}
                >
                  <option value="">Select</option>
                  <option value="first">Dose</option>
                  <option value="second">Route</option>
                  <option value="third">Frequency</option>
                </select>
                {errors.param_category && (
                  <small className="text-danger">
                    Please select param category
                  </small>
                )}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Param Name</label>
                <input
                  type="text"
                  {...register("param_name", { required: true })}
                  className={`form-control ${
                    errors.param_name && "border-danger"
                  }`}
                />
                {errors.param_name && (
                  <small className="text-danger">Please write param name</small>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  id="closeUpdateModal"
                  className="btn app-btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateParams;
