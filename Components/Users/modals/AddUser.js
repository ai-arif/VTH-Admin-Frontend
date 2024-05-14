import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../../features/department/departmentSlice";
import { createUserAsync } from "../../../features/staff/staffSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const { departments } = useSelector((state) => state.department);
  const [userObj, setUserObj] = useState({ fullName: "", phone: "", password: "", role: "" });

  const handleChange = (e) => {
    if (e.target.value === "doctor") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }
    setUserObj({ ...userObj, [e.target.name]: e.target.value });
  };
  // password show hide toggle
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(userObj);
      await dispatch(createUserAsync(userObj));
      setLoading(false);
      setUserObj({ fullName: "", phone: "", password: "", role: "" });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // close modal
    document.getElementById("closeModal").click();
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
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input value={userObj.fullName} onChange={handleChange} name="fullName" type="text" className="form-control" id="fullName" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input value={userObj.phone} onChange={handleChange} name="phone" type="text" className="form-control" id="phone" />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input value={userObj.password} onChange={handleChange} name="password" type={showPassword ? "text" : "password"} className="form-control" id="password" />
                  <div onClick={handleTogglePassword} type="button" className="position-absolute" id="user-eye">
                    {showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select value={userObj.role} onChange={handleChange} name="role" className="form-select" id="role">
                    <option>Open this select menu</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="lab">Lab</option>
                    <option value="pharmacy">Pharmary</option>
                  </select>
                </div>
                {isDoctor && (
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select name="department" className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      {departments?.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="d-flex gap-4 justify-content-end">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  {loading ? (
                    <button className="btn app-btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                  ) : (
                    <button onClick={handleSubmit} type="submit" className="btn app-btn-primary">
                      Submit
                    </button>
                  )}
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
