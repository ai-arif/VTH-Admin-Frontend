import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../features/department/departmentSlice";

const AddUser = () => {
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const { departments } = useSelector((state) => state.department);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  console.log(department);

  const handleChange = (e) => {
    console.log(e);
    // if (e.target.value === "doctor") {
    //   setIsDoctor(true);
    // } else {
    //   setIsDoctor(false);
    // }
  };

  // password show hide toggle
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (staffData) => {
    console.log(staffData);
    // try {
    //   const response = await dispatch(createDepartment(department));

    //   if (response?.payload?.success) {
    //     toast.success("Department added successfully!");
    //     reset();
    //     document.getElementById("closeModal").click();
    //   } else {
    //     toast.error("Failed to add department! Please try again later.");
    //   }
    // } catch (error) {
    //   console.error("An error occurred while adding department:", error);
    //   toast.error("An error occurred while adding department. Please try again later.");
    // }
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
                User
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
                  <select onChange={(e) => handleChange(e)} {...register("role", { required: true })} className={`form-select ${errors.role && "border-danger"}`} aria-label="Default select example">
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

export default AddUser;
