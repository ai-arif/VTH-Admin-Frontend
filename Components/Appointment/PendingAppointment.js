import React from "react";

const PendingAppointment = () => {
  return (
    <div className="container">
      <h1>This is pending appointment</h1>
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
          <tr>
            <td>safg</td>
            <td>44</td>
            <td>2</td>
            <td>
              <button className="btn app-btn-primary mb-2">Edit</button>
              <button className="btn app-btn-primary mx-2 mb-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PendingAppointment;
