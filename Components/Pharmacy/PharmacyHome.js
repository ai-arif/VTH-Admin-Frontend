import Link from "next/link";
import React, { useEffect } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePharmacyData, fetchPharmacy } from "../../features/pharmacy/pharmacySlice";
import Loader from "../UI/Loader";

const PharmacyHome = () => {
  const dispatch = useDispatch();
  const { pharmacies, status } = useSelector((state) => state.pharmacy);

  // console.log(pharmacies);

  // handling delete single prescription
  const handleDeletePharmacy = async (id) => {
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
          const response = await dispatch(deletePharmacyData(id));

          if (response?.payload?.success) {
            dispatch(fetchPharmacy());

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
    dispatch(fetchPharmacy());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input type="text" className="form-control" placeholder="Recipient's name, phone, case no" />
            <button className="btn btn-primary text-white" type="button" id="button-addon2">
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
                  <th className="text-nowrap">Case No.</th>
                  <th className="text-nowrap">Owner Name</th>
                  <th className="text-nowrap">Phone</th>
                  <th className="text-nowrap">Status</th>
                  <th className="text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pharmacies?.data?.map((pharmacy, idx) => (
                  <tr key={pharmacy._id}>
                    <td>{idx + 1}</td>
                    <td>{pharmacy?.appointment?.caseNo}</td>
                    <td>{pharmacy?.appointment?.ownerName}</td>
                    <td>{pharmacy?.appointment?.phone}</td>
                    <td className={`${pharmacy?.takesMedicinesBefore ? "text-success" : "text-danger"}`}>{`${pharmacy?.takesMedicinesBefore ? "Success" : "Pending"}`}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/pharmacy/${pharmacy._id}`}>
                        <FaPlusSquare type="button" title="edit" className="edit-icon" />
                      </Link>
                      <RiDeleteBinLine type="button" onClick={() => handleDeletePharmacy(pharmacy._id)} title="delete" className="delete-icon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* footer part pagination */}
        <div className="d-flex justify-content-end align-items-center">
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

export default PharmacyHome;
