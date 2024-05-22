import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createSpecies } from "../../../features/specie/speciesSlice";

const AddSpecies = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (species) => {
    try {
      const response = await dispatch(createSpecies(species));
      if (response?.payload?.success) {
        toast.success("species added successfully!");
        reset();
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add species! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding species. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="addSpecies" tabIndex="-1" aria-labelledby="addSpeciesLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="addSpeciesLabel">
                Add Species
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-5">
                <label htmlFor="speciesName" className="form-label pb-2">
                  Species Name
                </label>
                <input type="text" {...register("name", { required: true })} className={`form-control ${errors.name && "border-danger"}`} />
                {errors.name && <small className="text-danger">Please write species</small>}
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

export default AddSpecies;
