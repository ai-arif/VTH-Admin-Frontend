import React from "react";
import { FaPlus } from "react-icons/fa6";
import AddSpecies from "./modals/AddSpecies";

const SpeciesHome = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add species modal */}
            <AddSpecies />
            {/* update staff modal */}
            {/* <UpdateStaff /> */}
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">All Species (Animal Type)</h3>
              <div className="d-flex justify-content-between mb-4">
                <div className="input-group w-50">
                  <input type="text" className="form-control" placeholder="Search by name" />
                  <button className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addSpecies" className="btn gap-2 d-flex align-items-center app-btn-primary">
                    <FaPlus /> Add Species
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {staffs?.users?.map((staff, index) => (
                        <tr key={staff._id}>
                          <td>{index + 1}</td>
                          <td>{staff.name}</td>
                          <td className="d-flex gap-3 justify-content-center">
                            <button onClick={() => handleGetStaff(staff)} data-bs-toggle="modal" data-bs-target="#updateUser" className="btn btn-sm btn-info text-white">
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

export default SpeciesHome;
