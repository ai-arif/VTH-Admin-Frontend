import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchDepartment, updateDepartmentData } from "../../../features/department/departmentSlice";

const UpdateDepartment = ({ existingData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = parseInt(router.query.page) || 1;

  const {
    handleSubmit,
    register,
    setValue,
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
        await dispatch(fetchDepartment({ page: currentPage }));
        toast.success("Department updated successfully!");
        document.getElementById("closeUpdateModal").click();
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
              <h2 className="modal-title fs-5" id="updateDepartmentLabel">
                Update Department
              </h2>
              <button id="closeUpdateModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" id="closeUpdateModal" className="btn app-btn-primary">
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
