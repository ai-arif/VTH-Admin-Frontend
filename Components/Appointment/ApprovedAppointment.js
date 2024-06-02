import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine, RiImageLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteExistingAppointment, fetchApprovedAppointments, fetchPendingAppointments, searchApprovedAppointmentData } from "../../features/appointment/appointmentSlice";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDate";
import TestPaymentModal from "../IncomingTest/TestPaymentModal";
import Loader from "../UI/Loader";
import AppointmentImagesModal from "./modals/appointmentImagesModal";

const ApprovedAppointment = () => {
  const search = useRef("");
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointment);
  const [modalImages, setModalImages] = useState([]);
  const [amount, setAmount] = useState(null);
  const [appointmentId, setAppointmentId] = useState("");

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

  const handlePaymentAndStatus = (amount) => {
    axiosInstance.patch(`/appointment/${appointmentId}`, { payment: "paid", amount: amount }).then((res) => {
      let result = res.data;

      if (result.success) {
        setAmount(null);
        dispatch(fetchApprovedAppointments());
        toast.success("Payment and status updated successfully!");
      }
    });
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
                  <th className="text-nowrap">Payment</th>
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
                    <td className="text-center">
                      {appointment?.amount ? (
                        appointment?.amount
                      ) : (
                        <button
                          className="btn-info btn text-white"
                          onClick={() => {
                            setAppointmentId(appointment?._id);
                          }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#paymentModal"
                        >
                          Pay
                        </button>
                      )}
                    </td>

                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/appointment/${appointment.caseNo}`}>
                        <TiEdit type="button" title="edit" className="edit-icon" />
                      </Link>
                      <RiDeleteBinLine type="button" onClick={() => handleDeleteAppointment(appointment.caseNo)} title="delete" className="delete-icon" />
                      <button
                        disabled={appointment?.images?.length == 0}
                        title={appointment?.images?.length == 0 ? "No image available" : "View images"}
                        className="bg-transparent border-0"
                        onClick={() => {
                          setModalImages(appointment?.images);
                        }}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#showImages"
                      >
                        <RiImageLine className="download-icon" />
                      </button>
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
      {/* modals  */}
      <AppointmentImagesModal modalImages={modalImages} />
      <TestPaymentModal handleTestCost={handlePaymentAndStatus} setAmount={setAmount} amount={amount} title={"appointment"} />
    </div>
  );
};

export default ApprovedAppointment;
