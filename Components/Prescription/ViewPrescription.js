import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePrescriptionData, fetchPrescription } from "../../features/prescription/prescriptionSlice";
import Loader from "../UI/Loader";

const ViewPrescription = () => {
  const dispatch = useDispatch();
  const { prescriptions, status } = useSelector((state) => state.prescription);

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
            dispatch(fetchPrescription());

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

  useEffect(() => {
    dispatch(fetchPrescription());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <h3 className="page-title mb-4 text-center">All Prescription</h3>
        <div className="pb-4">
          <input type="text" className="form-control w-25" placeholder="Search by name brand" />
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Patent Name</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions?.data?.map((prescription, idx) => (
                  <tr key={prescription._id}>
                    <td>{idx + 1}</td>
                    <td className="text-nowrap">{prescription?.appointment?.ownerName}</td>
                    <td className="">{prescription?.appointment?.department?.name}</td>
                    <td className="">{prescription?.appointment?.date}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/prescription/${prescription._id}`}>
                        <button className="btn btn-info text-white">Edit</button>
                      </Link>
                      <button onClick={() => handleDeletePrescription(prescription._id)} className="btn btn-danger text-white">
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
              <option selected>10</option>
              <option value="1">20</option>
              <option value="2">50</option>
              <option value="3">100</option>
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

export default ViewPrescription;
