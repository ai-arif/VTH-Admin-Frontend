import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createDepartment, fetchDepartment } from "../../../features/department/departmentSlice";

const AddDepartment = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (department) => {
    try {
      const response = await dispatch(createDepartment(department));

      if (response?.payload?.success) {
        toast.success("Department added successfully!");
        await dispatch(fetchDepartment({}));
        reset();
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add department! Please try again later.");
      }
    } catch (error) {
      console.error("An error occurred while adding department:", error);
      toast.error("An error occurred while adding department. Please try again later.");
    }
  };

  return (
    <div>
      <div className="modal fade" id="addDepartment" tabIndex="-1" aria-labelledby="addDepartmentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="addDepartmentLabel">
                Add Department
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-5">
                <label className="form-label pb-2">Department Name</label>
                <input type="text" {...register("name", { required: true })} className={`form-control ${errors.name && "border-danger"}`} />
                {errors.name && <small className="text-danger">Please write department</small>}
              </div>

              <div className="modal-footer">
                <button id="closeModal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn app-btn-primary">
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

export default AddDepartment;
