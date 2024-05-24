import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteExistingAppointment, fetchApprovedAppointments, searchApprovedAppointmentData } from "../../features/appointment/appointmentSlice";
import { formatDate } from "../../utils/formatDate";
import Loader from "../UI/Loader";

const ApprovedAppointment = () => {
  const search = useRef("");
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointment);

  // handling delete single appointment
  const handleDeleteAppointment = async (caseNo) => {
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
          const response = await dispatch(deleteExistingAppointment(caseNo));
          if (response?.payload?.success) {
            dispatch(fetchApprovedAppointments());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Appointment has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete appointment. Please try again later.",
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
      const searchValue = search.current.value;
      if (searchValue.trim()) {
        // const res = await dispatch(searchApprovedAppointmentData(searchValue));
        // console.log(res);
        // if (res?.payload?.data?.data?.length <= 0) {
        //   toast.error("Data Not Found!");
        // }
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

  useEffect(() => {
    dispatch(fetchApprovedAppointments());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 mt-4 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input ref={search} onKeyDown={handleKeyPress} type="text" className="form-control" placeholder="Recipient's name, phone, case no" />
            <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
              Search
            </button>
          </div>
          <h3 className="page-title">Approved Appointment</h3>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th className="text-nowrap">SL.No.</th>
                  <th className="text-nowrap">Case No.</th>
                  <th className="text-nowrap">Owner Name</th>
                  <th className="text-nowrap">Phone No.</th>
                  <th className="text-nowrap">Date & Time</th>
                  <th className="text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.appointments?.map((appointment, idx) => (
                  <tr key={appointment._id}>
                    <td>{idx + 1}</td>
                    <td>{appointment.caseNo}</td>
                    <td>{appointment.ownerName}</td>
                    <td>{appointment.phone}</td>
                    <td>{formatDate(appointment.date)}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/appointment/${appointment.caseNo}`}>
                        <TiEdit type="button" title="edit" className="edit-icon" />
                      </Link>
                      <RiDeleteBinLine type="button" onClick={() => handleDeleteAppointment(appointment.caseNo)} title="delete" className="delete-icon" />
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
  );
};

export default ApprovedAppointment;
