import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreed, updateBreedData } from "../../../features/breed/breedSlice";
import { fetchSpecies } from "../../../features/specie/speciesSlice";

const UpdateBreed = ({ existingData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { species } = useSelector((state) => state.specie);
  const currentPage = parseInt(router.query.page) || 1;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: { ...existingData, species: existingData?.species?._id } });

  const onSubmit = async (data) => {
    try {
      data.id = existingData._id;

      const response = await dispatch(updateBreedData(data));

      if (response?.payload?.success) {
        await dispatch(fetchBreed({ page: currentPage }));
        toast.success("Breed updated successfully!");
        document.getElementById("closeUpdateModal").click();
      } else {
        toast.error("Failed to update breed! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while updating breed. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchSpecies({}));
  }, [dispatch]);

  return (
    <div>
      <div className="modal fade" id="updateBreed" tabIndex="-1" aria-labelledby="updateBreedLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="updateBreedLabel">
                Update Species
              </h2>
              <button id="closeUpdateModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-4">
                <label className="form-label pb-2">Species (Animal Type)</label>
                <select type="text" {...register("species", { required: true })} className={`form-select ${errors.species && "border-danger"}`}>
                  {species?.data?.map((specie, idx) => (
                    <option key={idx} value={specie._id}>
                      {specie.name}
                    </option>
                  ))}
                </select>
                {errors.species && <small className="text-danger">Please select species</small>}
              </div>

              <div className="pb-4">
                <label className="form-label pb-2">Breed</label>
                <textarea type="text" {...register("breed", { required: true })} className={`form-control ${errors.breed && "border-danger"}`} />
                {errors.breed && <small className="text-danger">Please write breed</small>}
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

export default UpdateBreed;
