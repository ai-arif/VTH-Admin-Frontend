import React from "react";

const RegistrationList = () => {
  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm mt-5">
        <div className="d-flex justify-content-between">
          <h3 className="page-title mb-4">Registration List</h3>
          <div>{/* <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn app-btn-primary">Add User</button> */}</div>
        </div>
        <div className="mb-4">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Case NO</th>
                <th>Owner Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>x4sdsf</td>
                <td>Ariful Islam</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td>
                  <button className="btn app-btn-primary mb-2">Edit</button>
                  <button className="btn app-btn-primary mx-2 mb-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrationList;
