import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/staff/staffSlice";
import AddUser from "./modals/AddUser";

const UsersHome = () => {
  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (users.length == 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch]);

  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          {/* also create Actions tr, with edit and delete */}
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <AddUser />
            <div className="app-card p-5 text-center shadow-sm mt-5">
              <div className="d-flex justify-content-between">
                <h1 className="page-title mb-4">Users</h1>
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn app-btn-primary">
                    Add User
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user1, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {user1.fullName} {user1?._id === user?._id && "(You)"}
                          </td>
                          <td>{user1.phone}</td>
                          <td>{user1.role}</td>
                          <td>
                            <button className="btn app-btn-primary mb-2">Edit</button>
                            <button className="btn app-btn-primary mx-2 mb-2">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersHome;
