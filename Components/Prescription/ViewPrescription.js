import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrTest } from "react-icons/gr";
import { MdPrint } from "react-icons/md";
import { RiDeleteBinLine, RiImageLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePrescriptionData, fetchPrescription, searchPrescriptionData } from "../../features/prescription/prescriptionSlice";
import { formatDate } from "../../utils/formatDate";
import AppointmentImagesModal from "../Appointment/modals/appointmentImagesModal";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import { handleDownloadPrescription } from "./PrescriptionPdf";

const ViewPrescription = () => {
  const [search, setSearch] = useState("");
  // const [modalImages, setModalImages] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { prescriptions, status, totalPages } = useSelector((state) => state.prescription);
  const currentPage = parseInt(router.query.page) || 1;

  // console.log(prescriptions);

  // handling delete single prescription
  const handleDeletePrescription = async (id) => {
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
          const response = await dispatch(deletePrescriptionData(id));

          if (response?.payload?.success) {
            await dispatch(fetchPrescription({ page: currentPage }));

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Prescription has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete prescription. Please try again later.",
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
        const res = await dispatch(searchPrescriptionData({ search }));
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
      dispatch(fetchPrescription({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name or phone" />
            <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
              Search
            </button>
          </div>
          <h3 className="page-title">All Prescription</h3>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th className="text-nowrap">SL.No.</th>
                  <th className="text-nowrap">Patent Name</th>
                  <th className="text-nowrap">Department</th>
                  <th className="text-nowrap">Date & Time</th>
                  <th className="text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions?.data?.map((prescription, idx) => (
                  <tr key={prescription._id}>
                    <td>{(currentPage - 1) * 15 + idx + 1}</td>
                    <td className="text-nowrap">{prescription?.appointment?.ownerName}</td>
                    <td className="">{prescription?.department?.name}</td>
                    <td className="">{formatDate(prescription?.appointment?.date)}</td>
                    <td className="d-flex gap-3 justify-content-end">
                      {prescription?.tests?.length > 0 && (
                        <Link href={`/prescription/view/${prescription?.appointment?._id}`}>
                          <GrTest type="button" title="Test result" className="download-icon" />
                        </Link>
                      )}
                      <Link href={`/prescription/${prescription._id}`}>
                        <TiEdit type="button" title="edit" className="edit-icon" />
                      </Link>
                      <MdPrint type="button" onClick={() => handleDownloadPrescription(prescription)} className="download-icon" />
                      <RiDeleteBinLine type="button" onClick={() => handleDeletePrescription(prescription._id)} title="delete" className="delete-icon" />
                      {/* <button
                        disabled={prescription?.appointment?.images?.length == 0}
                        title={prescription?.appointment?.images?.length == 0 ? "No image available" : "View images"}
                        className="bg-transparent border-0"
                        onClick={() => {
                          setModalImages(prescription?.appointment?.images);
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
    </div>
  );
};

export default ViewPrescription;
