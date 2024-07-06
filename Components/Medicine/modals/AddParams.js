import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createMedicineParams, fetchMedicineParams } from "../../../features/medicineParam/MedicineParamsSlice";
const AddParams = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (params) => {
    try {
      const response = await dispatch(createMedicineParams(params));

      if (response?.payload?.success) {
        await dispatch(fetchMedicineParams());
        reset();
        toast.success("params added successfully!");
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add params! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding params. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="addParams" tabIndex="-1" aria-labelledby="addParamsLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">Add Params</h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-4">
                <label className="form-label pb-2">Select Params</label>
                <select type="text" {...register("param_category", { required: true })} className={`form-select ${errors.param_category && "border-danger"}`}>
                  <option value="">Select</option>
                  <option value="first">First Params</option>
                  <option value="second">Second Params</option>
                  <option value="third">Third Params</option>
                </select>
                {errors.param_category && <small className="text-danger">Please select param category</small>}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Params Name</label>
                <input type="text" {...register("param_name", { required: true })} className={`form-control ${errors.param_name && "border-danger"}`} />
                {errors.param_name && <small className="text-danger">Please write param name</small>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" id="closeModal" className="btn app-btn-primary">
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

export default AddParams;
