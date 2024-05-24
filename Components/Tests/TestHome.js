import React, { useEffect, useRef, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteTestData, fetchTest, searchTestData } from "../../features/test/testSlice";
import AddTest from "./modals/AddTest";

import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Loader from "../UI/Loader";
import UpdateTest from "./modals/UpdateTest";

const TestHome = () => {
  const [existingTest, setExistingTest] = useState({});
  const search = useRef("");
  const dispatch = useDispatch();
  const { tests, status } = useSelector((state) => state.test);

  // handling update single test
  const handleUpdateTest = async (test) => {
    setExistingTest(test);
  };

  // handling delete single test
  const handleDeleteTest = async (id) => {
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
          const response = await dispatch(deleteTestData(id));
          dispatch(fetchTest());

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your test has been deleted.",
            showConfirmButton: false,
            timer: 1500,
            color: "#eaeaea",
            background: "#161719",
          });
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
      const searchValue = search.current.value;
      if (searchValue.trim()) {
        const res = await dispatch(searchTestData(searchValue));
        console.log(res);
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

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add test modal */}
            <AddTest />
            {/* update test modal */}
            <UpdateTest existingTest={existingTest} />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="pb-3">Tests</h3>
              <div className="d-flex justify-content-between mb-4">
                <div className="input-group w-50">
                  <input ref={search} onKeyDown={handleKeyPress} type="text" className="form-control" placeholder="Search by test name" />
                  <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>

                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn app-btn-primary">
                    <FaPlus /> Add Test
                  </button>
                </div>
              </div>
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
                    {tests?.data?.map((test, index) => (
                      <tr key={test._id}>
                        <td>{index + 1}</td>
                        <td className="text-nowrap">{test.testName}</td>
                        <td>{test.testDetails}</td>
                        <td className="d-flex gap-3">
                          <TiEdit type="button" onClick={() => handleUpdateTest(test)} data-bs-toggle="modal" data-bs-target="#updateTest" title="edit" className="edit-icon" />
                          <RiDeleteBinLine type="button" onClick={() => handleDeleteTest(test._id)} title="delete" className="delete-icon" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex  align-items-center gap-2">
                  <span className="text-nowrap">Items per page</span>
                  <select className="form-select">
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
        </div>
      </div>
    </div>
  );
};

export default TestHome;
