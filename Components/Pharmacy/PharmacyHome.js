import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePharmacyData, fetchPharmacy, searchPharmacyData } from "../../features/pharmacy/pharmacySlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";

const PharmacyHome = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { pharmacies, status, totalPages } = useSelector((state) => state.pharmacy);
  const currentPage = parseInt(router.query.page) || 1;

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

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchPharmacyData({ search }));
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
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchPharmacy({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name, phone, case no" />
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
                    <td>{(currentPage - 1) * 15 + idx + 1}</td>
                    <td>{pharmacy?.appointment?.caseNo}</td>
                    <td>{pharmacy?.appointment?.ownerName}</td>
                    <td>{pharmacy?.appointment?.phone}</td>
                    <td className={`${pharmacy?.takesMedicinesBefore ? "text-success" : "text-danger"}`}>{`${pharmacy?.takesMedicinesBefore ? "Success" : "Pending"}`}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/pharmacy/${pharmacy._id}`}>
                        <FaPlusSquare type="button" title="medicine" className="edit-icon" />
                      </Link>
                      <RiDeleteBinLine type="button" onClick={() => handleDeletePharmacy(pharmacy._id)} title="delete" className="delete-icon" />
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
  );
};

export default PharmacyHome;
