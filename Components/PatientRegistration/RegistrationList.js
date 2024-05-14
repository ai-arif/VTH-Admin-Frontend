import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePatientData, fetchPatient } from "../../features/patient-registration/patientRegistrationSlice";
import { formatDate } from "../../utils/formatDate";
import Loader from "../UI/Loader";

const RegistrationList = () => {
  const dispatch = useDispatch();
  const { patients, status } = useSelector((state) => state.patient);

  // handling delete single patient
  const handleDeletePatient = async (id) => {
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
          const response = await dispatch(deletePatientData(id));

          if (response?.payload?.success) {
            dispatch(fetchPatient());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Patient has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete patient. Please try again later.",
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
    dispatch(fetchPatient());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <h3 className="page-title mb-4 text-center">Registration List</h3>
        <div className="pb-4">
          <input type="text" className="form-control w-25" placeholder="Search by name brand" />
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Case No</th>
                  <th>Owner Name</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients?.data?.map((patientInfo, idx) => (
                  <tr key={patientInfo._id}>
                    <td>{idx + 1}</td>
                    <td className="text-nowrap">{patientInfo?.appointmentId?.caseNo}</td>
                    <td className="">{patientInfo?.appointmentId?.ownerName}</td>
                    <td className="">{formatDate(patientInfo?.appointmentId?.date)}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/patient-registration/${patientInfo._id}`}>
                        <button className="btn btn-info text-white">Edit</button>
                      </Link>
                      <button onClick={() => handleDeletePatient(patientInfo._id)} className="btn btn-danger text-white">
                        Delete
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
    </div>
  );
};

export default RegistrationList;
