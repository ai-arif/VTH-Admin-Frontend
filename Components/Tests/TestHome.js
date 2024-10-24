import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineEye } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteTestData, fetchTest, searchTestData } from "../../features/test/testSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import AddTest from "./modals/AddTest";
import UpdateTest from "./modals/UpdateTest";

const TestHome = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  // const [existingTest, setExistingTest] = useState({});
  const dispatch = useDispatch();
  const { tests, status, totalPages } = useSelector((state) => state.test);
  const currentPage = parseInt(router.query.page) || 1;

  // handling update single test
  // const handleUpdateTest = async (test) => {
  //   setExistingTest(test);
  // };

  // handling delete single test
  // const handleDeleteTest = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#15a362",
  //     cancelButtonColor: "#ef4444",
  //     confirmButtonText: "Yes, delete it!",
  //     color: "#eaeaea",
  //     background: "#161719",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await dispatch(deleteTestData(id));

  //         if (response?.payload?.success) {
  //           await dispatch(fetchTest({ page: currentPage }));

  //           Swal.fire({
  //             icon: "success",
  //             title: "Deleted!",
  //             text: "Your test has been deleted.",
  //             showConfirmButton: false,
  //             timer: 1500,
  //             color: "#eaeaea",
  //             background: "#161719",
  //           });
  //         } else {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Error!",
  //             text: "Failed to delete department. Please try again later.",
  //             confirmButtonColor: "#15a362",
  //             color: "#eaeaea",
  //             background: "#161719",
  //           });
  //         }
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Something is wrong",
  //           text: error,
  //           color: "#eaeaea",
  //           background: "#161719",
  //         });
  //       }
  //     }
  //   });
  // };

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchTestData({ search }));
        if (res?.payload?.data?.data?.length <= 0) {
          toast.error("Data Not Found!");
        }
      } else {
        await dispatch(fetchTest({ page: currentPage }));
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
      dispatch(fetchTest({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add test modal */}
            {/* <AddTest /> */}
            {/* update test modal */}
            {/* <UpdateTest existingTest={existingTest} /> */}
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="pb-3">All Tests</h3>
              <div className="d-flex justify-content-between mb-4">
                <div className="input-group w-50">
                  <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Search by test name" />
                  <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>

                {/* <div>
                  <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn app-btn-primary">
                    <FaPlus /> Add Test
                  </button>
                </div> */}
              </div>
              <div className="mb-4">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th className="text-nowrap">SL.No.</th>
                        <th className="text-nowrap">Test Name</th>
                        <th className="text-nowrap">Short Description</th>
                        <th className="text-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests?.data?.map((test, idx) => (
                        <tr key={test._id}>
                          <td>{(currentPage - 1) * 15 + idx + 1}</td>
                          <td className="text-nowrap">{test.testName}</td>
                          <td>{test.testDetails}</td>
                          <td className="">
                            <Link href={`/tests/${test._id}`} className="pay-btn text-white">
                              <HiOutlineEye size={18} />
                            </Link>
                            {/* <TiEdit type="button" onClick={() => handleUpdateTest(test)} data-bs-toggle="modal" data-bs-target="#updateTest" title="edit" className="edit-icon" /> */}
                            {/* <RiDeleteBinLine type="button" onClick={() => handleDeleteTest(test._id)} title="delete" className="delete-icon" /> */}
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

export default TestHome;
