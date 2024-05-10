import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteDepartmentData, fetchDepartment } from "../../features/department/departmentSlice";
import Loader from "../UI/Loader";
import AddDepartment from "./modals/AddDepartment";
import UpdateDepartment from "./modals/UpdateDepartment";

const DepartmentHome = () => {
  const dispatch = useDispatch();
  const [existingData, setExistingData] = useState({});
  const { departments, status } = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  // handle get single department for update
  const handleGetDepartment = (department) => {
    setExistingData(department);
  };

  // handling delete single department
  const handleDeleteDepartment = async (id) => {
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
          const response = await dispatch(deleteDepartmentData(id));

          if (response?.payload?.success) {
            dispatch(fetchDepartment());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Department has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete department. Please try again later.",
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

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add department modal */}
            <AddDepartment />
            {/* update department modal */}
            <UpdateDepartment existingData={existingData} />

            <div className="app-card p-5 text-center shadow-sm mt-5">
              <h2>All Department</h2>
              <div className="d-flex justify-content-between mb-4">
                <input type="email" className="form-control w-25" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search by title" />

                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addDepartment" className="btn app-btn-primary">
                    <FaPlus /> Add Department
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover table-borderless table-striped table-dark">
                  <thead>
                    <tr>
                      <th>SL.No</th>
                      <th>Department Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments?.map((department, index) => (
                      <tr key={department._id}>
                        <td>{index + 1}</td>
                        <td>{department.name}</td>
                        <td className="d-flex gap-3 justify-content-center">
                          <button onClick={() => handleGetDepartment(department)} data-bs-toggle="modal" data-bs-target="#updateDepartment" className="btn btn-info text-white">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteDepartment(department._id)} className="btn btn-danger text-white">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default DepartmentHome;
