import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, fetchBreed } from "../../../features/breed/breedSlice";
import { fetchSpecies } from "../../../features/specie/speciesSlice";
const AddBreed = () => {
  const dispatch = useDispatch();
  const { species } = useSelector((state) => state.specie);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (breed) => {
    try {
      const response = await dispatch(createBreed(breed));

      if (response?.payload?.success) {
        await dispatch(fetchBreed({}));
        reset();
        toast.success("breed added successfully!");
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add breed! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding breed. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchSpecies({}));
  }, [dispatch]);

  return (
    <div>
      <div className="modal fade" id="addBreed" tabIndex="-1" aria-labelledby="addBreedLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="addBreedLabel">
                Add Breed
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-4">
                <label className="form-label pb-2">Species (Animal Type)</label>
                <select type="text" {...register("species", { required: true })} className={`form-select ${errors.species && "border-danger"}`}>
                  <option value="">Select</option>
                  {species?.data?.map((specie) => (
                    <option key={specie._id} value={specie._id}>
                      {specie.name}
                    </option>
                  ))}
                </select>
                {errors.species && <small className="text-danger">Please select species</small>}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Breed</label>
                <textarea {...register("breed", { required: true })} className={`form-control ${errors.breed && "border-danger"}`} />
                {errors.breed && <small className="text-danger">Please write breed</small>}
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

export default AddBreed;
