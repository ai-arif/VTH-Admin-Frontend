import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchSpecies, updateSpeciesData } from "../../../features/specie/speciesSlice";

const UpdateSpecies = ({ existingData }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: existingData });

  const onSubmit = async (data) => {
    try {
      data.id = existingData._id;

      const response = await dispatch(updateSpeciesData(data));

      if (response?.payload?.success) {
        toast.success("Species updated successfully!");
        await dispatch(fetchSpecies());
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to update species! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while updating species. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="updateSpecies" tabIndex="-1" aria-labelledby="updateSpeciesLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="updateSpeciesLabel">
                Update Species
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-5">
                <label htmlFor="testName" className="form-label pb-2">
                  Species Name
                </label>
                <input type="text" {...register("name", { required: true })} className={`form-control ${errors.name && "border-danger"}`} />
                {errors.name && <small className="text-danger">Please write species name</small>}
              </div>

              <div className="modal-footer">
                <button id="closeModal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn app-btn-primary">
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

export default UpdateSpecies;
