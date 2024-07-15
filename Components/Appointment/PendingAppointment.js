import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine, RiImageLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteExistingAppointment, fetchPendingAppointments, searchPendingAppointmentsData } from "../../features/appointment/appointmentSlice";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDate";
import TestPaymentModal from "../IncomingTest/TestPaymentModal";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import AppointmentImagesModal from "./modals/appointmentImagesModal";

const PendingAppointment = () => {
  const [search, setSearch] = useState("");
  // const [modalImages, setModalImages] = useState([]);
  const [appointmentId, setAppointmentId] = useState("");
  const [amount, setAmount] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { pendingAppointments, status, totalPages } = useSelector((state) => state.appointment);
  const currentPage = parseInt(router.query.page) || 1;

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
            await dispatch(fetchPendingAppointments({ page: currentPage }));

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

  const handlePaymentAndStatus = (amount) => {
    axiosInstance.patch(`/appointment/${appointmentId}`, { payment: "paid", amount: amount }).then((res) => {
      let result = res.data;

      if (result.success) {
        setAmount(null);
        dispatch(fetchPendingAppointments());
        toast.success("Payment and status updated successfully!");
      }
    });
  };

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchPendingAppointmentsData({ search }));
        if (res?.payload?.data?.appointments?.length <= 0) {
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
      dispatch(fetchPendingAppointments({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 mt-4 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name, phone, case no" />
            <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
              Search
            </button>
          </div>
          <h3 className="page-title">Pending Appointment</h3>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th className="text-nowrap">SL. No.</th>
                  <th className="text-nowrap">Case No.</th>
                  <th className="text-nowrap">Owner Name</th>
                  <th className="text-nowrap">Phone No.</th>
                  <th className="text-nowrap">Date & Time</th>
                  <th className="text-nowrap">Payment</th>
                  <th className="text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments?.appointments?.map((appointment, idx) => (
                  <tr key={appointment._id}>
                    <td>{(currentPage - 1) * 5 + idx + 1}</td>
                    <td>{appointment.caseNo}</td>
                    <td>{appointment.ownerName}</td>
                    <td>{appointment.phone}</td>
                    <td className={`${!appointment?.date && "text-danger"}`}>{appointment?.date ? formatDate(appointment.date) : "Not Assigned Yet"}</td>
                    <td className="text-center">
                      {appointment?.amount ? (
                        appointment?.amount
                      ) : (
                        <button
                          className="pay-btn"
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
                      {/* <button
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
                      </button> */}
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

      {/* modals  */}
      {/* <AppointmentImagesModal modalImages={modalImages} /> */}
      <TestPaymentModal handleTestCost={handlePaymentAndStatus} setAmount={setAmount} amount={amount} title={"appointment"} />
    </div>
  );
};

export default PendingAppointment;
