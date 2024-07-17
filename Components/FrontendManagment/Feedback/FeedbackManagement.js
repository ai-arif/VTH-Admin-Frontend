import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteFeedbackData, fetchFeedback } from "../../../features/feedback/feedbackSlice";
import Loader from "../../UI/Loader";
import Pagination from "../../UI/Pagination";
import ViewFeedbackModal from "./modals/ViewFeedbackModal";

const FeedbackManagement = () => {
  const [existingData, setExistingData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const { feedbacks, status, totalPages } = useSelector((state) => state.feedback);
  const currentPage = parseInt(router.query.page) || 1;

  // handle get single breed for update
  const handleGetFeedback = (feedback) => {
    setExistingData(feedback);
  };

  // handling delete single Feedback
  const handleDeleteFeedback = async (id) => {
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
          const response = await dispatch(deleteFeedbackData(id));

          if (response?.payload?.success) {
            await dispatch(fetchFeedback({ page: currentPage }));

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Feedback has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete Feedback. Please try again later.",
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

  const handlePageChange = async (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchFeedback({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* view feedback modal */}
            <ViewFeedbackModal existingData={existingData} />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">Users Feedback</h3>
              <div className="mb-3">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks?.data?.map((feedback, idx) => (
                        <tr key={feedback._id}>
                          <td>{(currentPage - 1) * 15 + idx + 1}</td>
                          <td>{feedback?.user?.fullName}</td>
                          <td className="text-warning fw-medium">{feedback.rating}</td>
                          <td className={`text-capitalize ${feedback.is_published ? "text-success" : "text-danger"}`}>{feedback.is_published ? "Approved" : "Pending"}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetFeedback(feedback)} data-bs-toggle="modal" data-bs-target="#updateFeedback" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteFeedback(feedback._id)} title="delete" className="delete-icon" />
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

export default FeedbackManagement;
