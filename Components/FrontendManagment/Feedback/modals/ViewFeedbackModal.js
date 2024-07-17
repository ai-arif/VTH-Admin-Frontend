import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchFeedback, updateFeedbackData } from "../../../../features/feedback/feedbackSlice";

const ViewFeedbackModal = ({ existingData }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: existingData });

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        id: existingData._id,
        is_published: data.is_published,
      };

      const response = await dispatch(updateFeedbackData(updatedData));
      if (response?.payload?.success) {
        await dispatch(fetchFeedback({}));
        toast.success("Feedback publish successful!");
        document.getElementById("closeUpdateModal").click();
      } else {
        toast.error("Failed to publish feedback! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while publishing feedback. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="updateFeedback" tabIndex="-1" aria-labelledby="updateFeedbackLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">Edit Content</h2>
              <button id="closeUpdateModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-4">
                <label className="form-label pb-2">Feedback</label>
                <textarea readOnly value={existingData?.feedback} type="text" className="form-control" />
              </div>
              <div className="pb-1">
                <p className="">
                  Rating: <span className="text-warning fw-medium">{existingData?.rating}</span>
                </p>
              </div>
              <div className="pb-3">
                <label htmlFor="is_published" className="form-label pb-2 pe-2">
                  Approved
                </label>
                <input {...register("is_published", { required: true })} className={`form-check-input ${errors.is_published && "border-danger"}`} type="checkbox" />
                {errors.is_published && <small className="text-danger ps-3">Please select</small>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" id="closeUpdateModal" className="btn app-btn-primary">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedbackModal;
