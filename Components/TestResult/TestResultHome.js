import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTestResult, searchIncomingTestData } from "../../features/incoming-test/incomingTestSlice";
import Pagination from "../UI/Pagination";

const TestResultHome = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { testResults, status, totalPages } = useSelector((state) => state.incomingTest);
  const currentPage = parseInt(router.query.page) || 1;

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchIncomingTestData({ search }));
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

  const handlePageChange = async (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  console.log(testResults?.data);

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchAllTestResult({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);
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
          <h3 className="page-title">All Test Results</h3>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th>SL.No.</th>
                  <th>Case No.</th>
                  <th>Owner Name</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testResults?.data?.map((result, idx) => (
                  <tr key={result?._id}>
                    <td>{(currentPage - 1) * 15 + idx + 1}</td>
                    <td className="text-nowrap">{result?.appointmentId?.caseNo || "25235"}</td>
                    <td className="">{result?.appointmentId?.OwnerName || "Atikur"}</td>
                    <td className="">{result?.appointmentId?.phone || "017262015"}</td>
                    <td className="d-flex gap-3 justify-content-center">
                      <Link href={`/test-result/${result?._id}`} className="pay-btn text-white">
                        <HiOutlineEye size={18} />
                      </Link>
                      {/* <RiDeleteBinLine type="button" onClick={() => handleDeleteTest(result._id)} title="delete" className="delete-icon" /> */}
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

export default TestResultHome;
