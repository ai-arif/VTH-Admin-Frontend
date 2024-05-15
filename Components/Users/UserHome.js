import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserPatient } from "../../features/userPatient/userPatientSlice";

const UserHome = () => {
  const dispatch = useDispatch();
  const { userPatients, status } = useSelector((state) => state.userPatient);

  console.log(userPatients);
  console.log(status);

  useEffect(() => {
    dispatch(fetchAllUserPatient);
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <div className="app-card p-5 text-center shadow-sm">
              <div className="d-flex justify-content-between mb-4">
                <h2 className="page-title">All Users</h2>
                <input type="text" className="form-control w-25" placeholder="Search by name" />
              </div>
              <div className="mb-4">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {userPatients?.map((user) => (
                    <tr key={user._id}>
                      <td>{user.fullName}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td className="d-flex gap-3 justify-content-center">
                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))} */}
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
