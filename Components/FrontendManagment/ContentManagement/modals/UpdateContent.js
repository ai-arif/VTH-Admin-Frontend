import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchContents, updateContentData } from "../../../../features/content/contentSlice";
import axiosInstance from "../../../../utils/axiosInstance";

const UpdateContent = ({ existingData }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: existingData });

  const onSubmit = async (data) => {
    try {
      data.id = existingData._id;
      const response = await dispatch(updateContentData(data));
      if (response?.payload?.success) {
        await dispatch(fetchContents());
        toast.success("Content updated successfully!");
        document.getElementById("closeUpdateModal").click();
      } else {
        toast.error("Failed to update content! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while updating content. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="updateContent" tabIndex="-1" aria-labelledby="updateContentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">Edit Content</h2>
              <button id="closeUpdateModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <p className="text-center text-warning">Please choose one image or video</p>
              <div className="pb-4">
                <label className="form-label pb-2">Title</label>
                <input type="text" {...register("title", { required: true })} className={`form-control ${errors.title && "border-danger"}`} />
                {errors.title && <small className="text-danger">Please write title</small>}
              </div>
              <div className="pb-4">
                <label className="form-label pb-2">Description</label>
                <textarea type="text" {...register("description", { required: true })} className={`form-control ${errors.description && "border-danger"}`} />
                {errors.description && <small className="text-danger">Please write description</small>}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Image Url</label>
                <input type="url" {...register("image")} className="form-control" />
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Video Url</label>
                <textarea type="text" {...register("video")} className="form-control" />
              </div>

              {/* <div className="pb-4">
                <label className="form-label pb-2">Type</label>
                <select type="text" {...register("type", { required: true })} className={`form-select ${errors.type && "border-danger"}`}>
                  <option value="">Select</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                {errors.type && <small className="text-danger">Please select species</small>}
              </div> */}

              <div className="pb-4">
                <label htmlFor="logoName" className="form-label pb-2 pe-3">
                  Enable
                </label>
                <input {...register("enable")} className="form-check-input" type="checkbox" />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" id="closeUpdateModal" className="btn app-btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContent;
