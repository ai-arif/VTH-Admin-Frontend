import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteLogoData, fetchLogos } from "../../../features/logo/logoSlice";
import AddLogo from "./modals/AddLogo";

const LogoManagement = () => {
  const dispatch = useDispatch();
  const { logos, status } = useSelector((state) => state.logo);

  // handling delete single Logo
  const handleDeleteLogo = async (id) => {
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
          const response = await dispatch(deleteLogoData(id));

          if (response?.payload?.success) {
            await dispatch(fetchLogos());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Logo has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete Logo. Please try again later.",
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
    dispatch(fetchLogos());
  }, [dispatch]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add logos modal */}
            <AddLogo />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">All Logo (Url / File)</h3>
              <div className="d-flex justify-content-end mb-4">
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addLogo" className="btn gap-2 d-flex align-items-center app-btn-primary">
                    <FaPlus /> Add Logo
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logos?.map((logo, idx) => (
                        <tr key={logo._id}>
                          <td>{idx + 1}</td>
                          <td>
                            <Image className="rounded-2" width={40} height={40} src={logo.image} alt="image" />
                          </td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteLogo(logo._id)} title="delete" className="delete-icon" />
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

export default LogoManagement;
