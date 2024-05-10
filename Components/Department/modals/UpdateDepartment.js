import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchDepartment, updateDepartmentData } from "../../../features/department/departmentSlice";

const UpdateDepartment = ({ existingData }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (existingData) {
      setValue("name", existingData.name || "");
    }
  }, [existingData, setValue]);

  const onSubmit = async (departmentData) => {
    try {
      departmentData.id = existingData._id;

      const response = await dispatch(updateDepartmentData(departmentData));

      if (response?.payload?.success) {
        toast.success("Department updated successfully!");
        reset();
        await dispatch(fetchDepartment());
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to update department! Please try again later.");
      }
    } catch (error) {
      console.error("An error occurred while updating department:", error);
      toast.error("An error occurred while updating department. Please try again later.");
    }
  };
  return (
    <div>
      <div className="modal fade" id="updateDepartment" tabIndex="-1" aria-labelledby="updateDepartmentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateDepartmentLabel">
                Update Test
              </h1>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-5">
                <label htmlFor="testName" className="form-label pb-2">
                  Department Name
                </label>
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

export default UpdateDepartment;
