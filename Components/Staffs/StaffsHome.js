import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffs } from "../../features/staff/staffSlice";
import AddStaff from "./modals/AddStaff";
import UpdateStaff from "./modals/UpdateStaff";

const StaffsHome = () => {
  const dispatch = useDispatch();
  const { staffs, status } = useSelector((state) => state.staff);

  // console.log(staffs);

  useEffect(() => {
    dispatch(fetchStaffs);
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add staff modal */}
            <AddStaff />
            {/* update staff modal */}
            <UpdateStaff />
            <div className="app-card p-5 text-center shadow-sm">
              <h2 className="page-title">All Staffs</h2>
              <div className="d-flex justify-content-between mb-4">
                <input type="text" className="form-control w-25" placeholder="Search by name" />
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn gap-2 d-flex align-items-center app-btn-primary">
                    <FaPlus /> Add Staff
                  </button>
                </div>
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
                      {/* {staffs?.map((staff) => (
                      <tr key={staff._id}>
                        <td>{staff.fullName}</td>
                        <td>{staff.phone}</td>
                        <td>{staff.role}</td>
                        <td className="d-flex gap-3 justify-content-center">
                          <button onClick={() => handleGetStaff(staff)} data-bs-toggle="modal" data-bs-target="#updateUser" className="btn btn-info text-white">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteStaff(staff._id)} className="btn btn-danger text-white">
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

export default StaffsHome;
