import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createComplaint, fetchComplaint } from "../../../features/complaint/complaintSlice";
import { fetchSpecies } from "../../../features/specie/speciesSlice";

const AddComplaint = () => {
  const dispatch = useDispatch();
  const { species } = useSelector((state) => state.specie);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (complaint) => {
    try {
      const response = await dispatch(createComplaint(complaint));

      if (response?.payload?.success) {
        toast.success("complaint added successfully!");
        dispatch(fetchComplaint());
        reset();
        document.getElementById("closeModal").click();
      } else {
        toast.error("Failed to add complaint! Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while adding complaint. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  return (
    <div>
      <div className="modal fade" id="addComplaint" tabIndex="-1" aria-labelledby="addComplaintLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="addComplaintLabel">
                Add Complaint
              </h2>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="pb-5">
                <label className="form-label pb-2">Species (Animal Type)</label>
                <select type="text" {...register("species", { required: true })} className={`form-select ${errors.species && "border-danger"}`}>
                  <option value="">Select</option>
                  {species?.map((specie) => (
                    <option key={specie._id} value={specie._id}>
                      {specie.name}
                    </option>
                  ))}
                </select>
                {errors.species && <small className="text-danger">Please select species</small>}
              </div>

              <div className="pb-5">
                <label className="form-label pb-2">Complaint</label>
                <textarea {...register("complaint", { required: true })} className={`form-control ${errors.complaint && "border-danger"}`} />
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

export default AddComplaint;
