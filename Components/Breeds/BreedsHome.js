import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteBreedData, fetchBreed } from "../../features/breed/breedSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import AddBreed from "./modals/AddBreed";
import UpdateBreed from "./modals/UpdateBreed";

const BreedsHome = () => {
  // const [search, setSearch] = useState("");
  const [existingData, setExistingData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const { breeds, status, totalPages } = useSelector((state) => state.breed);
  const currentPage = parseInt(router.query.page) || 1;

  // handle get single breed for update
  const handleGetBreed = (Breeds) => {
    setExistingData(Breeds);
  };

  // handling delete single breed
  const handleDeleteBreed = async (id) => {
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
          const response = await dispatch(deleteBreedData(id));

          if (response?.payload?.success) {
            await dispatch(fetchBreed({ page: currentPage }));

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Breed has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete breed. Please try again later.",
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

  // const handleSearch = async () => {
  //   try {
  //     if (search.trim()) {
  //       const res = await dispatch(searchBreedData({ search }));
  //       if (res?.payload?.data?.data?.length <= 0) {
  //         toast.error("Data Not Found!");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  const handlePageChange = async (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchBreed({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add Breeds modal */}
            <AddBreed />
            {/* update Breeds modal */}
            <UpdateBreed existingData={existingData} />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">All Breed</h3>
              <div className="d-flex justify-content-end mb-4">
                {/* <div className="input-group w-50">
                  <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Search by name" />
                  <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div> */}
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addBreed" className="btn gap-2 d-flex align-items-center app-btn-primary">
                    <FaPlus /> Add Breed
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Species</th>
                        <th>Breed</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breeds?.data?.map((breed, idx) => (
                        <tr key={breed._id}>
                          <td>{(currentPage - 1) * 15 + idx + 1}</td>
                          <td className="text-capitalize">{breed?.species?.name}</td>
                          <td className="text-capitalize">{breed?.breed}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetBreed(breed)} data-bs-toggle="modal" data-bs-target="#updateBreed" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteBreed(breed._id)} title="delete" className="delete-icon" />
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
        </div>
      </div>
    </div>
  );
};

export default BreedsHome;
