import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const AppointmentHome = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [oldPatent, setOldPatent] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const getUserByPhone = async () => {
    try {
      if (searchPhone === "") return;

      const res = await axiosInstance.get(`/admin/user/${searchPhone}`);
      const existingPatentData = res?.data?.data;
      if (existingPatentData) {
        setOldPatent(true);
        setValue("ownerName", existingPatentData.fullName || "");
        setValue("phone", existingPatentData.phone || "");
        setValue("address", existingPatentData.address || "");
        setValue("upazila", existingPatentData.upazila || "");
      }
    } catch (error) {
      toast.error("No Data Found!");
      reset();
      setOldPatent(false);
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card pb-4">
            <div className="card-header">
              <h4 className="card-header-title text-center">Add Appointment</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    onChange={(e) => {
                      setSearchPhone(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Recipient's Phone"
                    aria-label="Recipient's phone"
                    aria-describedby="button-addon2"
                  />
                  <button onClick={getUserByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="small opacity-75 ps-2">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Select Appointment</label>
                    <select {...register("appointment", { required: true })} className={`form-select ${errors.appointment && "border-danger"}`} aria-label="Default select example">
                      <option value="">Select</option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                      <option value="three">Three</option>
                    </select>
                    {errors.appointment && <small className="text-danger">Please select appointment</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Number of Animal</label>
                    <input type="number" {...register("animalNumber", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.animalNumber && "border-danger"}`} />
                    {errors.animalNumber && <small className="text-danger">Please write number of animal</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input type="text" {...register("ownerName", { required: true })} className={`form-control ${errors.ownerName && "border-danger"}`} />
                    {errors.ownerName && <small className="text-danger">Please write owner name</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" {...register("phone", { required: true })} className={`form-control ${errors.phone && "border-danger"}`} />
                    {errors.phone && <small className="text-danger">Please write phone number</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District</label>
                    {/* select drop down for district */}
                    <select {...register("district", { required: true })} className={`form-select ${errors.district && "border-danger"}`} aria-label="Default select example">
                      <option defaultValue>Mymensingh</option>
                    </select>
                    {errors.district && <small className="text-danger">Please select district</small>}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Upazila</label>
                    {/* select dropdown for upazila */}
                    <select {...register("upazila", { required: true })} className={`form-select ${errors.upazila && "border-danger"}`} aria-label="Default select example">
                      <option value="">Select</option>
                      <option value="Mymensingh Sadar">Mymensingh Sadar</option>
                      <option value="Trishal">Trishal</option>
                      <option value="Bhaluka">Bhaluka</option>
                      <option value="Fulbaria">Fulbaria</option>
                      <option value="Muktagacha">Muktagacha</option>
                      <option value="Gafargaon">Gafargaon</option>
                      <option value="Gauripur">Gauripur</option>
                      <option value="Ishwarganj">Ishwarganj</option>
                      <option value="Nandail">Nandail</option>
                      <option value="Tarakanda">Tarakanda</option>
                      <option value="Fulpur">Fulpur</option>
                      <option value="Haluaghat">Haluaghat</option>
                      <option value="Dhubaura">Dhubaura</option>
                    </select>
                    {errors.upazila && <small className="text-danger">Please select any upazilla</small>}
                  </div>
                  <div className="mb-3">
                    <label>Address</label>
                    <textarea type="text" {...register("address", { required: true })} className={`form-control ${errors.address && "border-danger"}`}></textarea>
                    {errors.address && <small className="text-danger">Please write address</small>}
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Status</label>
                      <select {...register("status", { required: true })} className={`form-select ${errors.status && "border-danger"}`} aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                      {errors.status && <small className="text-danger">Please select any status</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Department</label>
                      <select {...register("department", { required: true })} className={`form-select ${errors.department && "border-danger"}`} aria-label="Default select example">
                        <option value="">Select</option>
                        <option value="1">Depart one</option>
                        <option value="2">Depart Two</option>
                      </select>
                      {errors.department && <small className="text-danger">Please select any department</small>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Registration Type</label>
                      <select {...register("registrationType", { required: true })} className={`form-select ${errors.registrationType && "border-danger"}`} aria-label="Default select example">
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                      </select>
                      {errors.registrationType && <small className="text-danger">Please select any registration type</small>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Patent Type</label>
                      <select {...register("patientType", { required: true })} className={`form-select ${errors.patientType && "border-danger"}`} aria-label="Default select example">
                        {oldPatent ? (
                          <>
                            <option value="Old">Old</option> <option value="New">New</option>
                          </>
                        ) : (
                          <>
                            <option value="New">New</option> <option value="Old">Old</option>
                          </>
                        )}
                      </select>
                      {errors.registrationType && <small className="text-danger">Please select any registration type</small>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Date & Time</label>
                      <input type="datetime-local" {...register("date", { required: true })} className={`form-control ${errors.date && "border-danger"}`} />
                      {errors.date && <small className="text-danger">Please select date & time</small>}
                    </div>
                  </div>
                </div>
                <div className="my-4 d-flex justify-content-center gap-4">
                  <button type="reset" className="btn btn-danger text-white">
                    Reset
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
    </div>
  );
};

export default AppointmentHome;
