import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteDepartmentData, fetchDepartment, searchDepartmentData } from "../../features/department/departmentSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import AddDepartment from "./modals/AddDepartment";
import UpdateDepartment from "./modals/UpdateDepartment";

const DepartmentHome = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [existingData, setExistingData] = useState({});
  const { departments, status, totalPages } = useSelector((state) => state.department);
  const currentPage = parseInt(router.query.page) || 1;

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
            dispatch(fetchDepartment({ page: currentPage }));

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

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchDepartmentData({ search }));
        console.log(res);
        if (res?.payload?.data?.data?.length <= 0) {
          toast.error("Data Not Found!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = async (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchDepartment({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add department modal */}
            <AddDepartment />
            {/* update department modal */}
            <UpdateDepartment existingData={existingData} />

            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="pb-3">All Department</h3>
              <div className="d-flex justify-content-between mb-4">
                <div className="input-group w-50">
                  <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name, phone, case no" />
                  <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addDepartment" className="btn app-btn-primary">
                    <FaPlus /> Add Department
                  </button>
                </div>
              </div>
              <div className="table-responsive mb-3">
                <table className="table table-hover table-borderless table-striped table-dark">
                  <thead>
                    <tr>
                      <th>SL.No</th>
                      <th>Department Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments?.data?.map((department, idx) => (
                      <tr key={department._id}>
                        <td>{(currentPage - 1) * 2 + idx + 1}</td>
                        <td>{department.name}</td>
                        <td className="d-flex gap-3 justify-content-center">
                          <TiEdit type="button" onClick={() => handleGetDepartment(department)} data-bs-toggle="modal" data-bs-target="#updateDepartment" title="edit" className="edit-icon" />
                          <RiDeleteBinLine type="button" onClick={() => handleDeleteDepartment(department._id)} title="delete" className="delete-icon" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHome;
