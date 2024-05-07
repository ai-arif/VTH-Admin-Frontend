import React from "react";
import { useForm } from "react-hook-form";

const AddMedicine = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (medicine) => {
    console.log(medicine);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Add Medicine</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {/* <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Select Appointment
                    </label>
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                  {/* <div className="mb-3 col-md-6">
                    <label className="form-label">
                      CASE NO
                    </label>
                    <input readOnly={true} type="text" className="form-control" value={"pxx3233Wr"} id="phone" />
                  </div> */}
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Brand Name</label>
                    <input type="text" {...register("brand_name", { required: true })} className={`form-control ${errors.brand_name && "border-danger"}`} id="brand_name" />
                    {errors.brand_name && <small className="text-danger">Please write brand name</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Composition</label>
                    <input type="text" {...register("composition", { required: true })} className={`form-control ${errors.composition && "border-danger"}`} id="composition" />
                    {errors.composition && <small className="text-danger">Please write composition</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class</label>
                    <input type="text" {...register("class", { required: true })} className={`form-control ${errors.class && "border-danger"}`} id="class" />
                    {errors.class && <small className="text-danger">Please write class</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Form</label>
                    <input type="text" {...register("form", { required: true })} className={`form-control ${errors.form && "border-danger"}`} id="form" />
                    {errors.form && <small className="text-danger">Please write form</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Manufacturer</label>
                    <input type="text" {...register("manufacturer", { required: true })} className={`form-control ${errors.manufacturer && "border-danger"}`} id="manufacturer" />
                    {errors.manufacturer && <small className="text-danger">Please write manufacturer</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Unit Price</label>
                    <input type="number" {...register("price", { required: true, min: 1 })} className={`form-control ${errors.price && "border-danger"}`} id="price" />
                    {errors.price && <small className="text-danger">Please write price</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Pack Size</label>
                    <input type="text" {...register("pack_size", { required: true })} className={`form-control ${errors.pack_size && "border-danger"}`} id="pack_size" />
                    {errors.pack_size && <small className="text-danger">Please write pack size</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Withdrawal Period</label>
                    <input type="text" {...register("withdrawal_period", { required: true })} className={`form-control ${errors.withdrawal_period && "border-danger"}`} id="withdrawal_period" />
                    {errors.withdrawal_period && <small className="text-danger">Please write withdrawal period</small>}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Dose</label>
                    <input type="text" {...register("dose", { required: true })} className={`form-control ${errors.dose && "border-danger"}`} id="dose" />
                    {errors.dose && <small className="text-danger">Please write dose</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Route</label>
                    <input type="text" {...register("route", { required: true })} className={`form-control ${errors.route && "border-danger"}`} id="route" />
                    {errors.route && <small className="text-danger">Please write route</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Strength</label>
                    <input type="text" {...register("strength", { required: true })} className={`form-control ${errors.strength && "border-danger"}`} id="strength" />
                    {errors.strength && <small className="text-danger">Please write strength</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Animal Type</label>
                    {/* select field */}
                    <select {...register("animal_type", { required: true })} className={`form-select ${errors.animal_type && "border-danger"}`} aria-label="Default select example">
                      <option selected value="">
                        Select
                      </option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                      <option value="three">Three</option>
                    </select>
                    {errors.animal_type && <small className="text-danger">Please select any animal type</small>}
                  </div>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn app-btn-primary">
                    Add Medicine
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

export default AddMedicine;
