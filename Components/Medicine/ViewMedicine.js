import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteMedicineData, fetchMedicine, searchMedicineData } from "../../features/medicine/medicineSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";

const ViewMedicine = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { medicines, status, totalPages } = useSelector((state) => state.medicine);
  const currentPage = parseInt(router.query.page) || 1;

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
            await dispatch(fetchMedicine({ page: currentPage }));

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

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchMedicineData({ search }));
        if (res?.payload?.data?.data?.length <= 0) {
          toast.error("Data Not Found!");
        }
      } else {
        await dispatch(fetchMedicine({ page: currentPage }));
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
      dispatch(fetchMedicine({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Search by medicine name or brand" />
            <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
              Search
            </button>
          </div>
          <h3 className="page-title">All Medicine</h3>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Medicine Name</th>
                  <th>Medicine Class</th>
                  <th>Brand Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines?.data?.map((medicine, idx) => (
                  <tr key={medicine._id}>
                    <td>{(currentPage - 1) * 15 + idx + 1}</td>
                    <td className="text-nowrap">{medicine.name}</td>
                    <td className="">{medicine.class}</td>
                    <td className="">{medicine.brandName}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/medicine/${medicine._id}`}>
                        <TiEdit type="button" title="edit" className="edit-icon" />
                      </Link>
                      <RiDeleteBinLine type="button" onClick={() => handleDeleteMedicine(medicine._id)} title="delete" className="delete-icon" />
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

export default ViewMedicine;
