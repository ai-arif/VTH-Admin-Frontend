import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteIncomingTestData, fetchAllIncomingTest, searchIncomingTestData } from "../../features/incoming-test/incomingTestSlice";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";
import TestPaymentModal from "./TestPaymentModal";

const IncomingTestHome = () => {
  const [search, setSearch] = useState("");
  const [refetch, setRefetch] = useState(0);
  const [testId, setTestId] = useState("");
  const [amount, setAmount] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { incomingTests, status, totalPages } = useSelector((state) => state.incomingTest);
  const currentPage = parseInt(router.query.page) || 1;

  const handleStatus = (status, id) => {
    axiosInstance.patch(`/test/status/${id}`, { status: status }).then((res) => {
      let result = res.data;
      setRefetch(result);

      if (result.success) {
        toast.success("Status updated successfully!");
      }
    });
  };

  const handleTestCost = (amount) => {
    if (!testId || !amount) {
      return toast.error("Amount is required!");
    }

    // console.log({ amount, testId })
    axiosInstance.patch(`/test/test-result/${testId}`, { amount: parseFloat(amount)?.toFixed(2) }).then((res) => {
      let result = res.data;
      // console.log({ result })

      if (result.success) {
        setAmount(null);
        setRefetch(result);
        toast.success("Payment and status updated successfully!");
      }
    });
  };

  // handling delete single incoming test
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
          const response = await dispatch(deleteIncomingTestData(id));

          if (response?.payload?.success) {
            await dispatch(fetchAllIncomingTest({ page: currentPage }));

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Incoming Test has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete test. Please try again later.",
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

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchAllIncomingTest({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card p-5 text-center shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="input-group w-50">
            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name or phone" />
            <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
              Search
            </button>
          </div>
          <h3 className="page-title">Incoming Test</h3>
        </div>
        <div className="mb-4">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-striped table-dark">
              <thead>
                <tr>
                  <th className="text-nowrap">SL.No.</th>
                  <th className="text-nowrap">Case No.</th>
                  <th className="text-nowrap">Owner Name</th>
                  <th className="text-nowrap">Date</th>
                  <th className="text-nowrap">Test Cost</th>
                  <th className="text-nowrap">Status:</th>
                  <th className="text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomingTests?.data?.map((sp, idx) => (
                  <tr key={sp._id}>
                    <td>{(currentPage - 1) * 15 + idx + 1}</td>
                    <td>{sp?.appointmentId?.caseNo}</td>
                    <td>{sp?.appointmentId?.ownerName}</td>
                    <td className="text-nowrap">{new Date(sp?.appointmentId?.createdAt).toDateString()}</td>
                    {/* payment */}
                    <td className="text-center">
                      {sp?.totalTestCost ? (
                        sp?.totalTestCost
                      ) : (
                        <button
                          className="pay-btn"
                          onClick={() => {
                            setTestId(sp?._id);
                          }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#paymentModal"
                        >
                          Pay
                        </button>
                      )}
                    </td>

                    <td className="text-nowrap">
                      <select defaultValue={sp?.testStatus} onChange={(e) => handleStatus(e.target.value, sp._id)} className="form-select" aria-label="Default select example">
                        <option value={"success"}>Success</option>
                        <option value={"processing"}>Processing</option>
                        <option value={"pending"}>Pending</option>
                      </select>
                    </td>
                    <td className="d-flex gap-3">
                      <Link href={`/incomming-test/${sp._id}`}>
                        <TiEdit type="button" title="edit" className="edit-icon" />
                      </Link>
                      <RiDeleteBinLine onClick={() => handleDeletePrescription(sp._id)} type="button" title="delete" className="delete-icon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* payment modal */}
        <TestPaymentModal handleTestCost={handleTestCost} setAmount={setAmount} amount={amount} title={"tests"} />
        {/* pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default IncomingTestHome;
