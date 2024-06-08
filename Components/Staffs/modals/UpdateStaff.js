import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../features/department/departmentSlice";
import { fetchStaffs, updateStaffData } from "../../../features/staff/staffSlice";

const UpdateStaff = ({ existingData }) => {
  const [isDoctor, setIsDoctor] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);
  const currentPage = parseInt(router.query.page) || 1;

  const handleGetRole = (role) => {
    if (role === "doctor") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: existingData });

  const onSubmit = async (staffData) => {
    try {
      if (staffData.role !== "doctor") {
        delete staffData.department;
      }

      staffData.id = existingData._id;
      const response = await dispatch(updateStaffData(staffData));

      if (response?.payload?.success) {
        await dispatch(fetchStaffs({ page: currentPage }));
        toast.success("Account updated successfully!");
        document.getElementById("closeUpdateModal").click();
      } else {
        toast.error("Failed to update account! Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while crating account. Please try again later.");
    }
  };

  useEffect(() => {
    if (isDoctor) {
      dispatch(fetchDepartment({ limit: 500 }));
    }
  }, [dispatch, isDoctor]);

  useEffect(() => {
    if (existingData?.role === "doctor") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }
  }, [existingData]);

  return (
    <div className="modal fade" id="updateUser" tabIndex="-1" aria-labelledby="updateUserLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updateUserLabel">
              Create Staff Account
            </h1>
            <button id="closeUpdateModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input type="text" {...register("fullName", { required: true })} className={`form-control ${errors.fullName && "border-danger"}`} />
                {errors.fullName && <small className="text-danger">Please write full name</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input type="text" {...register("phone", { required: true })} className={`form-control ${errors.phone && "border-danger"}`} />
                {errors.phone && <small className="text-danger">Please write phone</small>}
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  {...register("role", { required: true })}
                  onChange={(e) => handleGetRole(e.target.value)}
                  className={`form-select ${errors.role && "border-danger"}`}
                  aria-label="Default select example"
                >
                  <option value="">Open this select menu</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="lab">Lab</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="receptionist">Receptionist</option>
                </select>
                {errors.role && <small className="text-danger">Please select any role</small>}
              </div>
              {isDoctor && (
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <select {...register("department", { required: true })} className={`form-select ${errors.department && "border-danger"}`} aria-label="Default select example">
                    <option value="">Select</option>
                    {departments?.data?.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && <small className="text-danger">Please select any department</small>}
                </div>
              )}
              <div className="d-flex gap-4 justify-content-end">
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

export default UpdateStaff;
