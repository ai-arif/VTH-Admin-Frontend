import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteMedicineData, fetchMedicine } from "../../features/medicine/medicineSlice";
import Loader from "../UI/Loader";

const ViewMedicine = () => {
  const dispatch = useDispatch();
  const { medicines, status } = useSelector((state) => state.medicine);

  useEffect(() => {
    dispatch(fetchMedicine());
  }, [dispatch]);

  // handling delete single medicine
  const handleDeleteMedicine = async (id) => {
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
          const response = await dispatch(deleteMedicineData(id));

          if (response?.payload?.success) {
            dispatch(fetchMedicine());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Medicine has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete medicine. Please try again later.",
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
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <h3 className="page-title mb-4 text-center">All Medicines</h3>
        <div className="pb-4">
          <input type="text" className="form-control w-25" placeholder="Search by name brand" />
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Medicine Name</th>
                  <th>Brand Name</th>
                  <th>Withdrawal Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines?.data?.map((medicine, idx) => (
                  <tr key={medicine._id}>
                    <td>{idx + 1}</td>
                    <td className="text-nowrap">{medicine.name}</td>
                    <td className="">{medicine.brandName}</td>
                    <td className="">{medicine.withdrawalPeriod}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/medicine/${medicine._id}`}>
                        <button className="btn btn-info text-white">Edit</button>
                      </Link>
                      <button onClick={() => handleDeleteMedicine(medicine._id)} className="btn btn-danger text-white">
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
              <li class="page-item">
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

export default ViewMedicine;
