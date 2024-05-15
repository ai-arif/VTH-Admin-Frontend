import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../features/department/departmentSlice";
import { createStaff, fetchStaffs } from "../../../features/staff/staffSlice";

const AddStaff = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);

  // password show hide toggle
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

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
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (staffData) => {
    try {
      if (staffData.role !== "doctor") {
        delete staffData.department;
      }

      const response = await dispatch(createStaff(staffData));

      if (response?.payload?.success) {
        toast.success("Account created successfully!");
        reset();
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to create account! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while crating account. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  return (
    <div>
      <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addUserLabel">
                Create Staff Account
              </h1>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type={showPassword ? "text" : "password"} {...register("password", { required: true })} className={`form-control ${errors.password && "border-danger"}`} />
                  {errors.password && <small className="text-danger">Please write password</small>}

                  <div onClick={handleTogglePassword} type="button" className="position-absolute" id="user-eye">
                    {showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                  </div>
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
                      {departments?.map((department) => (
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
                  <button type="submit" className="btn app-btn-primary">
                    Submit
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

export default AddStaff;
