import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteSpeciesData, fetchSpecies } from "../../features/specie/speciesSlice";
import Loader from "../UI/Loader";
import AddSpecies from "./modals/AddSpecies";
import UpdateSpecies from "./modals/UpdateSpecies";

const SpeciesHome = () => {
  const dispatch = useDispatch();
  const [existingData, setExistingData] = useState({});
  const { species, status } = useSelector((state) => state.specie);

  // handle get single species for update
  const handleGetSpecies = (species) => {
    setExistingData(species);
  };

  // handling delete single Species
  const handleDeleteSpecies = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15a362",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      color: "#eaeaea",
      background: "#161719",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dispatch(deleteSpeciesData(id));

          if (response?.payload?.success) {
            dispatch(fetchSpecies());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Species has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete Species. Please try again later.",
              confirmButtonColor: "#15a362",
              color: "#eaeaea",
              background: "#161719",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Something is wrong",
            text: error,
            color: "#eaeaea",
            background: "#161719",
          });
        }
      }
    });
  };

  useEffect(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add species modal */}
            <AddSpecies />
            {/* update species modal */}
            <UpdateSpecies existingData={existingData} />
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
                      {species?.map((specie, index) => (
                        <tr key={specie._id}>
                          <td>{index + 1}</td>
                          <td className="text-capitalize">{specie.name}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetSpecies(specie)} data-bs-toggle="modal" data-bs-target="#updateSpecies" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteSpecies(specie._id)} title="delete" className="delete-icon" />
                          </td>
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

export default SpeciesHome;
