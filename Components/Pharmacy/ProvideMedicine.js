import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { fetchMedicine } from "../../features/medicine/medicineSlice";
import { fetchSinglePharmacy } from "../../features/pharmacy/pharmacySlice";
import FinalSubmission from "./FinalSubmission";

// Define custom styles
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2d323f",
    borderColor: state.isFocused ? "#15a362" : "white",
    "&:hover": {
      borderColor: state.isFocused ? "#15a362" : "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#fff",
    backgroundColor: state.isSelected ? "#15a362" : "#2d323f",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

const ProvideMedicine = () => {
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { pharmacy, status } = useSelector((state) => state.pharmacy);
  const { medicines } = useSelector((state) => state.medicine);

  const { handleSubmit, register, control, reset } = useForm();
  const onSubmit = async (data) => {
    const medicineData = {
      ...data,
      quantity: parseFloat(data.quantity),
      unitPrice: parseFloat(data.unitPrice),
      medicineName: data?.medicineName?.label,
    };

    setPharmacyMedicines([...pharmacyMedicines, medicineData]);
    reset();
  };

  // all prescription medicines
  const selectedMedicines = pharmacy?.data?.medicines;
  const medicineList = medicines?.data?.filter((medicine) => selectedMedicines?.includes(medicine._id));

  // Calculate total quantity and total price
  const totalQuantity = pharmacyMedicines.reduce((total, medicine) => total + medicine.quantity, 0);
  const totalPrice = pharmacyMedicines.reduce((total, medicine) => total + medicine.quantity * medicine.unitPrice, 0).toFixed(2);

  // Transforming medicines data
  const medicineOptions = medicines?.data?.map((medicine) => ({
    value: medicine._id,
    label: medicine.name,
  }));

  const handleRemoveCartItem = (index) => {
    const restCart = pharmacyMedicines.filter((item, idx) => idx !== index);
    setPharmacyMedicines(restCart);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePharmacy(id));
    }
    dispatch(fetchMedicine());
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pb-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title text-center">Medicines provide by prescription</h4>
            </div>
            <div className="card-body row">
              {/* cart management */}
              <div className="col-md-6">
                <div className="table-responsive">
                  <table style={{ fontSize: "14px" }} className="table table-dark">
                    <thead>
                      <tr>
                        <th className="text-nowrap">Medicine Name</th>
                        <th className="text-nowrap">Quantity</th>
                        <th className="text-nowrap">Unit Price</th>
                        <th className="text-nowrap">Price</th>
                        <th>X</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pharmacyMedicines?.map((medicine, index) => (
                        <tr key={index}>
                          <td className="text-capitalize">{medicine.medicineName}</td>
                          <td>{medicine.quantity}</td>
                          <td>{medicine.unitPrice}</td>
                          <td>{(medicine.quantity * medicine.unitPrice).toFixed(2)}</td>
                          <td style={{ cursor: "pointer" }} onClick={() => handleRemoveCartItem(index)} className="bg-danger text-center">
                            X
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* add to cart & prescription's medicine list */}
              <div className="col-md-6">
                <div
                  style={{
                    height: "150px",
                    overflowY: "auto",
                  }}
                >
                  <h6>Medicine list from prescription</h6>
                  {medicineList?.map((medicine) => (
                    <li key={medicine._id}>{medicine.name}</li>
                  ))}
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label">Medicine</label>
                        <Controller
                          name="medicineName"
                          control={control}
                          defaultValue={[]}
                          render={({ field }) => <CreatableSelect required isClearable options={medicineOptions} {...field} styles={customStyles} />}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Quantity</label>
                      <input type="text" required {...register("quantity")} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Unit Price</label>
                      <input type="text" required {...register("unitPrice")} className="form-control" />
                    </div>
                  </div>
                  <div className="my-3 d-flex justify-content-center">
                    <button type="submit" className="btn app-btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FinalSubmission
          id={id}
          medicineOptions={medicineOptions}
          pharmacyMedicines={pharmacyMedicines}
          setPharmacyMedicines={setPharmacyMedicines}
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
        />
      </div>
    </div>
  );
};

export default ProvideMedicine;
