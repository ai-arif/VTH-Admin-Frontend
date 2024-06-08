import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaint, updateComplaintData } from "../../../features/complaint/complaintSlice";
import { fetchSpecies } from "../../../features/specie/speciesSlice";

const UpdateComplaint = ({ existingData }) => {
  const dispatch = useDispatch();
  const { species } = useSelector((state) => state.specie);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: { ...existingData, species: existingData?.species?._id } });

  const onSubmit = async (data) => {
    try {
      data.id = existingData._id;

      const response = await dispatch(updateComplaintData(data));

      if (response?.payload?.success) {
        toast.success("Complaint updated successfully!");
        await dispatch(fetchComplaint());
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to update complaint! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while updating complaint. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchSpecies({}));
  }, [dispatch]);

  return (
    <div>
      <div className="modal fade" id="updateComplaint" tabIndex="-1" aria-labelledby="updateComplaintLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="updateComplaintLabel">
                Update Species
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-5">
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

              <div className="pb-5">
                <label className="form-label pb-2">Complaint</label>
                <textarea type="text" {...register("complaint", { required: true })} className={`form-control ${errors.complaint && "border-danger"}`} />
                {errors.complaint && <small className="text-danger">Please write complaint</small>}
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

export default UpdateComplaint;
