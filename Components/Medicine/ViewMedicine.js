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
      <div className="app-card p-5 text-center shadow-sm mt-5">
        <h3 className="page-title mb-4 text-center">All Medicines</h3>
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
      </div>
    </div>
  );
};

export default ViewMedicine;
