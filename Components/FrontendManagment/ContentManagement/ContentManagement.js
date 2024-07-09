import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoPlay } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteContentData, fetchContents } from "../../../features/content/contentSlice";
import Loader from "../../UI/Loader";
import Pagination from "../../UI/Pagination";
import AddContent from "./modals/AddContent";
import UpdateContent from "./modals/UpdateContent";

const ContentManagement = () => {
  const [existingData, setExistingData] = useState({});
  const dispatch = useDispatch();
  const { contents, status } = useSelector((state) => state.content);

  // handle get single breed for update
  const handleGetContent = (content) => {
    setExistingData(content);
  };

  // handling delete single content
  const handleDeleteContent = async (id) => {
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
          const response = await dispatch(deleteContentData(id));

          if (response?.payload?.success) {
            await dispatch(fetchContents());

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "content has been deleted.",
              showConfirmButton: false,
              timer: 1500,
              color: "#eaeaea",
              background: "#161719",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete content. Please try again later.",
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
    dispatch(fetchContents());
  }, [dispatch]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            {/* add contents modal */}
            <AddContent />
            {/* update contents modal */}
            <UpdateContent existingData={existingData} />
            <div className="app-card p-5 text-center shadow-sm">
              <h3 className="page-title pb-3">All Content (Url / File)</h3>
              <div className="d-flex justify-content-end mb-4">
                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addContent" className="btn gap-2 d-flex align-items-center app-btn-primary">
                    <FaPlus /> Add Content
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
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contents?.map((content, idx) => (
                        <tr key={content._id}>
                          <td>{idx + 1}</td>
                          <td>{content?.image ? <Image className="rounded-2" width={40} height={40} src={content.image} alt="image" /> : <GoPlay size={26} />}</td>
                          <td>{content.title}</td>
                          <td className="text-capitalize">{content.type}</td>
                          <td className={`text-capitalize ${content.enable ? "text-success" : "text-danger"}`}>{content.enable ? "Enable" : "Disable"}</td>
                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <TiEdit type="button" onClick={() => handleGetContent(content)} data-bs-toggle="modal" data-bs-target="#updateContent" title="edit" className="edit-icon" />
                            <RiDeleteBinLine type="button" onClick={() => handleDeleteContent(content._id)} title="delete" className="delete-icon" />
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

export default ContentManagement;
