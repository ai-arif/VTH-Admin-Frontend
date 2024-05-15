import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserPatient, searchUserPatientAsync } from "../../features/userPatient/userPatientSlice";
import Loader from "../UI/Loader";

const UserHome = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const dispatch = useDispatch();
  const { userPatients, status } = useSelector((state) => state.userPatient);

  const getUserByPhone = async () => {
    try {
      if (searchPhone === "") return;
      const res = await dispatch(searchUserPatientAsync(searchPhone));
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUserPatient());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <div className="app-card p-5 text-center shadow-sm">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="input-group w-50">
                  <input
                    onChange={(e) => {
                      setSearchPhone(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Recipient's name or phone"
                  />
                  <button onClick={getUserByPhone} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>
                <h2 className="page-title">All Users</h2>
              </div>
              <div className="mb-4">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL.No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPatients?.users?.map((user, idx) => (
                        <tr key={user._id}>
                          <td>{idx + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* footer part pagination */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  <span className="text-nowrap">Items per page</span>
                  <select className="form-select form-select-sm">
                    <option value="1">10</option>
                    <option value="2">20</option>
                    <option value="3">50</option>
                    <option value="4">100</option>
                  </select>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
