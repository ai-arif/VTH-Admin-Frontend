import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteStaffData, fetchStaffs, searchStaffData, setCurrentPage } from "../../features/staff/staffSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import AddStaff from "./modals/AddStaff";
import UpdateStaff from "./modals/UpdateStaff";

const StaffsHome = () => {
  const [search, setSearch] = useState("");
  const [existingData, setExistingData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const { staffs, status, currentPage, totalPages } = useSelector((state) => state.staff);

  // handle get single staff data for update
  const handleGetStaff = (staff) => {
    setExistingData(staff);
  };

  // handling delete staff
  const handleDeleteStaff = async (id) => {
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
          const response = await dispatch(deleteStaffData(id));

          if (response?.payload?.success) {
            await dispatch(fetchStaffs({}));

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

  const handleSearch = async (page = 1) => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchStaffData({ search, page }));
        if (res?.payload?.data?.users?.length <= 0) {
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
    await dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const page = parseInt(router.query.page) || 1;

    dispatch(setCurrentPage(page));

    if (search) {
      dispatch(searchStaffData({ search, page }));
    } else {
      dispatch(fetchStaffs({ page }));
    }
  }, [dispatch, router.query.page]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add staff modal */}
            <AddStaff />
            {/* update staff modal */}
            <UpdateStaff existingData={existingData} />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">All Staffs</h3>
              <div className="d-flex justify-content-between mb-4">
                <div className="input-group w-50">
                  <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name or phone" />
                  <button onClick={() => handleSearch(currentPage)} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>
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
                        <th>SL. No.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffs?.users?.map((staff, idx) => (
                        <tr key={staff._id}>
                          <td>{(currentPage - 1) * 15 + idx + 1}</td>
                          <td>{staff.fullName}</td>
                          <td>{staff.phone}</td>
                          <td className="text-capitalize">{staff.role}</td>
                          <td className="d-flex gap-3 justify-content-center">
                            <TiEdit type="button" onClick={() => handleGetStaff(staff)} data-bs-toggle="modal" data-bs-target="#updateUser" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteStaff(staff._id)} title="delete" className="delete-icon" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

export default StaffsHome;
