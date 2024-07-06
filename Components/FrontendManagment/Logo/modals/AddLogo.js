import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createLogo, fetchLogos } from "../../../../features/logo/logoSlice";

const AddLogo = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("image", data.image[0]);

    try {
      const response = await dispatch(createLogo(formData));
      if (response?.payload?.success) {
        await dispatch(fetchLogos());
        reset();
        toast.success("logo added successfully!");
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add logo! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding logo. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="addLogo" tabIndex="-1" aria-labelledby="addLogoLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="addLogoLabel">
                Add Logo
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <p className="text-center text-warning">Please choose one url or image</p>
              <div className="pb-4">
                <label className="form-label pb-2">Logo Url</label>
                <input type="url" {...register("image")} className="form-control" />
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Upload Image</label>
                <input type="file" {...register("image")} className="form-control" />
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

export default AddLogo;
