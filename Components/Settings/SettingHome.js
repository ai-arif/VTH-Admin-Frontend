import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const SettingsHome = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data } = useSelector((state) => state.loggedInUser);

  // password show hide toggle
  const handleTogglePassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = (event) => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (passwordObj) => {
    if (passwordObj.newPassword !== passwordObj.confirmNewPassword) {
      return toast.error("password doesn't match");
    }
    delete passwordObj.confirmNewPassword;

    try {
      const response = await axiosInstance.patch(`staffs/${data._id}`, passwordObj);
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
      }
    } catch (error) {
      toast.error("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div className="w-50 mx-auto my-5">
      <h3 className="text-center mb-3">Change Your Password</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label text-white opacity-75">Old Password</label>
          <input type="password" {...register("oldPassword", { required: true })} className={`form-control ${errors.oldPassword && "border-danger"}`} />
        </div>
        <div className="mb-3 position-relative">
          <label className="form-label text-white opacity-75">New Password</label>
          <input type={showPassword ? "text" : "password"} {...register("newPassword", { required: true })} className={`form-control ${errors.newPassword && "border-danger"}`} />

          <div onClick={handleTogglePassword} type="button" className="position-absolute text-white opacity-75" id="user-eye">
            {showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
          </div>
        </div>
        <div className="mb-3 position-relative">
          <label className="form-label text-white opacity-75">Confirm New Password</label>
          <input type={showConfirmPassword ? "text" : "password"} {...register("confirmNewPassword", { required: true })} className={`form-control ${errors.confirmNewPassword && "border-danger"}`} />

          <div onClick={handleToggleConfirmPassword} type="button" className="position-absolute text-white opacity-75" id="user-eye">
            {showConfirmPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" className="btn-primary btn text-white w-100">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsHome;
