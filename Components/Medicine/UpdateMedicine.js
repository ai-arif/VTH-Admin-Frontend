import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicine, fetchSingleMedicine, updateMedicineData } from "../../features/medicine/medicineSlice";
import Loader from "../UI/Loader";

const UpdateMedicine = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { medicine, status } = useSelector((state) => state.medicine);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: medicine?.data });

  const onSubmit = async (medicineData) => {
    try {
      medicineData.id = id;

      const response = await dispatch(updateMedicineData(medicineData));

      if (response?.payload?.success) {
        await dispatch(fetchMedicine({}));
        router.push("/medicine/view");
        toast.success("Medicine updated successfully!");
      } else {
        toast.error("Failed to update medicine! Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating medicine. Please try again later.");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleMedicine(id));
    }
  }, [dispatch, id]);

  //   loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card pb-4">
            <div className="card-header">
              <h4 className="card-header-title text-center">Edit Medicine</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Medicine Name (Generic Name)</label>
                    <input type="text" {...register("name", { required: true })} className={`form-control ${errors.name && "border-danger"}`} id="name" />
                    {errors.name && <small className="text-danger">Please write Medicine name</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Brand Name</label>
                    <input type="text" {...register("brandName", { required: true })} className={`form-control ${errors.brandName && "border-danger"}`} id="brandName" />
                    {errors.brandName && <small className="text-danger">Please write brand name</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class</label>
                    <input type="text" {...register("class", { required: true })} className={`form-control ${errors.class && "border-danger"}`} id="class" />
                    {errors.class && <small className="text-danger">Please write class</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Composition</label>
                    <input type="text" {...register("composition", { required: true })} className={`form-control ${errors.composition && "border-danger"}`} id="composition" />
                    {errors.composition && <small className="text-danger">Please write composition</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Manufacturer</label>
                    <input type="text" {...register("manufacturer", { required: true })} className={`form-control ${errors.manufacturer && "border-danger"}`} id="manufacturer" />
                    {errors.manufacturer && <small className="text-danger">Please write manufacturer</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Form</label>
                    <input type="text" {...register("form", { required: true })} className={`form-control ${errors.form && "border-danger"}`} id="form" />
                    {errors.form && <small className="text-danger">Please write form</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className={`form-control ${errors.price && "border-danger"}`}
                      id="price"
                    />
                    {errors.price && <small className="text-danger">Please write price</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Unit Price</label>
                    <input type="text" {...register("unitPrice", { required: true, valueAsNumber: true })} className={`form-control ${errors.unitPrice && "border-danger"}`} id="unitPrice" />
                    {errors.unitPrice && <small className="text-danger">Please write unit price</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Quantity</label>
                    <input type="number" {...register("quantity", { required: true, valueAsNumber: true, min: 1 })} className={`form-control ${errors.quantity && "border-danger"}`} id="quantity" />
                    {errors.quantity && <small className="text-danger">Please write quantity</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Dose</label>
                    <input type="text" {...register("dose", { required: true })} className={`form-control ${errors.dose && "border-danger"}`} id="dose" />
                    {errors.dose && <small className="text-danger">Please write dose</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Pack Size</label>
                    <input type="text" {...register("packSize", { required: true })} className={`form-control ${errors.packSize && "border-danger"}`} id="packSize" />
                    {errors.packSize && <small className="text-danger">Please write pack size</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Withdrawal Period <small>(optional)</small>
                    </label>
                    <input type="text" {...register("withdrawalPeriod")} className="form-control" id="withdrawalPeriod" />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Strength</label>
                    <input type="text" {...register("strength", { required: true })} className={`form-control ${errors.strength && "border-danger"}`} id="strength" />
                    {errors.strength && <small className="text-danger">Please write strength</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Route</label>
                    <input type="text" {...register("route", { required: true })} className={`form-control ${errors.route && "border-danger"}`} id="route" />
                    {errors.route && <small className="text-danger">Please write route</small>}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Animal Type <small>(optional)</small>
                    </label>
                    <select {...register("animalType")} className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Poultry">Poultry</option>
                      <option value="Pet Bird">Pet Bird</option>
                      <option value="Cattle">Cattle</option>
                      <option value="Buffalo">Buffalo</option>
                      <option value="Sheep">Sheep</option>
                      <option value="Goats">Goats</option>
                      <option value="Horse">Horse</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Description <small>(optional)</small>
                    </label>
                    <textarea type="text" {...register("description")} className="form-control" id="description" />
                  </div>
                </div>

                <div className="my-3 d-flex justify-content-center">
                  <button type="submit" className="btn app-btn-primary">
                    Update Medicine
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

export default UpdateMedicine;
