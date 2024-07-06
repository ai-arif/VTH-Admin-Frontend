import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteMedicineParamsData, fetchMedicineParams } from "../../features/medicineParam/MedicineParamsSlice";
import Loader from "../UI/Loader";
import AddParams from "./modals/AddParams";
import UpdateParams from "./modals/UpdateParams";

const ParamsHome = () => {
  const [existingData, setExistingData] = useState({});
  const dispatch = useDispatch();
  const { medicineParams, status } = useSelector((state) => state.medicineParam);

  // handle get single param for update
  const handleGetParams = (param) => {
    setExistingData(param);
  };

  // handling delete single param
  const handleDeleteParams = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15a362",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      color: "#eaeaea",
      background: "#161719",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dispatch(deleteMedicineParamsData(id));

          if (response?.payload?.success) {
            await dispatch(fetchMedicineParams());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Params has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete params. Please try again later.",
              confirmButtonColor: "#15a362",
              color: "#eaeaea",
              background: "#161719",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Something is wrong",
            text: error,
            color: "#eaeaea",
            background: "#161719",
          });
        }
      }
    });
  };

  useEffect(() => {
    dispatch(fetchMedicineParams());
  }, [dispatch]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add params modal */}
            <AddParams />
            {/* update params modal */}
            <UpdateParams existingData={existingData} />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">All Params</h3>
              <div className="d-flex justify-content-end mb-4">
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addParams" className="btn gap-2 d-flex align-items-center app-btn-primary">
                    <FaPlus /> Add Params
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="pb-1">First Params</h5>
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Params Category</th>
                        <th>params Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicineParams?.first?.map((param, idx) => (
                        <tr key={param.id}>
                          <td>{idx + 1}</td>
                          <td className="text-capitalize">First Params</td>
                          <td className="text-capitalize">{param?.param_name}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetParams(param)} data-bs-toggle="modal" data-bs-target="#updateParams" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteParams(param.id)} title="delete" className="delete-icon" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="pb-1">Second Params</h5>
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Params Category</th>
                        <th>params Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicineParams?.second?.map((param, idx) => (
                        <tr key={param.id}>
                          <td>{idx + 1}</td>
                          <td className="text-capitalize">Second Params</td>
                          <td className="text-capitalize">{param?.param_name}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetParams(param)} data-bs-toggle="modal" data-bs-target="#updateParams" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteParams(param.id)} title="delete" className="delete-icon" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="pb-1">Third Params</h5>
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Params Category</th>
                        <th>params Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicineParams?.third?.map((param, idx) => (
                        <tr key={param.id}>
                          <td>{idx + 1}</td>
                          <td className="text-capitalize">Third Params</td>
                          <td className="text-capitalize">{param?.param_name}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetParams(param)} data-bs-toggle="modal" data-bs-target="#updateParams" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteParams(param.id)} title="delete" className="delete-icon" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParamsHome;
