import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createContent, fetchContents } from "../../../../features/content/contentSlice";

const AddContent = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("video", data.video);
    formData.append("enable", data.enable);

    try {
      const response = await dispatch(createContent(formData));
      if (response?.payload?.success) {
        await dispatch(fetchContents());
        reset();
        toast.success("Content added successfully!");
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add content! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding content. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="addContent" tabIndex="-1" aria-labelledby="addContentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">Add Content</h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <p className="text-center text-warning">Please choose one image or video</p>
              <div className="pb-4">
                <label htmlFor="title" className="form-label pb-2">
                  Title
                </label>
                <input type="text" {...register("title", { required: true })} className={`form-control ${errors.title && "border-danger"}`} />
                {errors.title && <small className="text-danger">Please write title</small>}
              </div>
              <div className="pb-4">
                <label htmlFor="description" className="form-label pb-2">
                  Description
                </label>
                <textarea type="text" {...register("description", { required: true })} className={`form-control ${errors.description && "border-danger"}`} />
                {errors.description && <small className="text-danger">Please write description</small>}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Upload Image</label>
                <input type="file" {...register("image")} className="form-control" />
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Video Url</label>
                <textarea type="text" {...register("video")} className="form-control" />
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Type</label>
                <select type="text" {...register("type", { required: true })} className={`form-select ${errors.type && "border-danger"}`}>
                  <option value="">Select</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                {errors.type && <small className="text-danger">Please select type</small>}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2 pe-3">Enable</label>
                <input {...register("enable")} defaultChecked className="form-check-input" type="checkbox" />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" id="closeModal" className="btn app-btn-primary">
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

export default AddContent;
