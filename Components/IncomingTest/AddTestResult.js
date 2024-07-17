import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdPrint } from "react-icons/md";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDate";
import Loader from "../UI/Loader";
import { handleDownloadTestResult } from "./TestResultPdf";

const AddTestResult = () => {
  const [incomingTest, setIncomingTest] = useState({});
  const [refetch, setRefetch] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/test/single-test/${id}`).then((res) => setIncomingTest(res?.data?.data?.data));
    }
  }, [id, refetch]);

  const {
    handleSubmit: handleUpdate,
    register: register2,
    reset: reset2,
    formState: { errorsUpdate },
  } = useForm({ values: incomingTest?.data });
  const onUpdate = async (data) => {
    try {
      axiosInstance.put(`/test/test-result/${id}`, { data, status: true }).then((res) => {
        if (res.data?.success) {
          setRefetch(refetch + 1);
          toast.success("Test result updated successfully");
          // reset();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      axiosInstance.post(`/test/test-result`, { data, id }).then((res) => {
        if (res.data?.success) {
          setRefetch(refetch + 1);
          // reset();
          toast.success("Test result added successfully");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Test result failed!");
    }
  };

  const handleDeleteTestResult = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15a362",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#eaeaea",
      background: "#161719",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.put(`/test/test-result/${id}`, { data: {}, status: false }).then((res) => {
          if (res.data?.success) {
            setRefetch(refetch + 1);
            reset2();
            reset();
            toast.success("Deleted successfully");
          }
        });
      }
    });
  };

  // if (status === "loading") return <Loader />;

  return (
    <div>
      {/* test name */}
      <h3 className="text-center py-2">{incomingTest?.testId?.testName}</h3>
      {/* owner info & test result table */}
      <div className="app-card px-4 pb-3 shadow-sm">
        <div className="mb-2">
          {/* owner info */}
          <div className="d-flex py-2 justify-content-between align-items-center">
            <p>Case No: {incomingTest?.appointmentId?.caseNo}</p>
            <p>
              Status: <span className={`${incomingTest?.status ? "text-success fw-medium" : "text-danger fw-medium"}`}>{incomingTest?.status ? "Added" : "To be add"}</span>
            </p>
            <p>Date: {formatDate(incomingTest?.appointmentId?.date)}</p>
          </div>
          <div>
            <h6 className="text-center w-50 mx-auto text-bg-secondary rounded-1 py-2">Owner Information</h6>
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="mb-1">Owner Name: {incomingTest?.appointmentId?.ownerName}</p>
                <p className="m-0">Phone: {incomingTest?.appointmentId?.phone}</p>
              </div>
              <div className="">
                <p className="mb-1">Upazila: {incomingTest?.appointmentId?.upazila}</p>
                <p className="m-0">Address: {incomingTest?.appointmentId?.address}</p>
              </div>
            </div>
          </div>
          <div>
            <h6 className="text-center w-50 mx-auto text-bg-secondary rounded-1 py-2">Animal Information</h6>
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="mb-1">Age: {incomingTest?.registrationId?.age}</p>
                <p className="m-0">Body Weight: {incomingTest?.registrationId?.weight}</p>
              </div>
              <div className="">
                <p className="mb-1">Breed: {incomingTest?.appointmentId?.breed?.breed}</p>
                <p className="m-0 text-capitalize">Gender: {incomingTest?.registrationId?.sex}</p>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div className="table-responsive text-end ">
          {incomingTest?.status ? (
            <div>
              <form onSubmit={handleUpdate(onUpdate)}>
                {incomingTest?.testId?.tests?.map((test, idx) => (
                  <div key={idx}>
                    <h5 className="text-start py-2">{test?.test_subTitle}</h5>
                    <table className="table table-hover table-striped table-dark">
                      <thead>
                        <tr>
                          <th>{test?.parameter_title}</th>
                          <th className="text-center">{test?.result_title}</th>
                          <th>{test?.unit_title}</th>
                          <th>{test?.range_title}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            {test?.reference_titles?.map((title, idx) => (
                              <span key={`title-${idx}`} className="px-2">
                                {title}
                              </span>
                            ))}
                          </td>
                        </tr>
                        {test?.params?.map((item, idx) => (
                          <tr key={`param-${idx}`}>
                            <td className="">{item?.param}</td>
                            <td className="">
                              <input type="text" {...register2(`${test?.test_subTitle}#${item?.param}`)} className="form-control" />
                            </td>
                            <td className="">{item?.unit}</td>
                            <td className="">
                              {item?.references?.map((ref, idx) => (
                                <span key={`ref-${idx}`} className="px-2">
                                  {ref}
                                </span>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
                <div className="text-start">
                  <div>
                    <h6>Interpretation:</h6>
                    <input type="text" {...register2("interpretation")} className="form-control w-50" />
                  </div>
                  <div className="pt-2">
                    <h6>Name of laboratory technician: </h6>
                    <input type="text" {...register2("lab_technician")} className="form-control w-50" />
                  </div>
                </div>
                <div className="d-flex justify-content-start justify-content-end">
                  <button type="submit" className="app-btn-primary btn">
                    Update
                  </button>
                </div>
              </form>
              <button type="button" onClick={handleDeleteTestResult} className="btn mt-3 btn-danger text-white">
                Delete
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {incomingTest?.testId?.tests?.map((test, idx) => (
                <div key={idx}>
                  <h5 className="text-start py-2">{test?.test_subTitle}</h5>
                  <table className="table table-hover table-striped table-dark">
                    <thead>
                      <tr>
                        <th>{test?.parameter_title}</th>
                        <th className="text-center">{test?.result_title}</th>
                        <th>{test?.unit_title}</th>
                        <th>{test?.range_title}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          {test?.reference_titles?.map((title, idx) => (
                            <span key={`title-${idx}`} className="px-2">
                              {title}
                            </span>
                          ))}
                        </td>
                      </tr>
                      {test?.params?.map((item, idx) => (
                        <tr key={`param-${idx}`}>
                          <td className="">{item?.param}</td>
                          <td className="">
                            <input type="text" {...register(`${test?.test_subTitle}#${item?.param}`)} className="form-control" />
                          </td>
                          <td className="">{item?.unit}</td>
                          <td className="">
                            {item?.references?.map((ref, idx) => (
                              <span key={`ref-${idx}`} className="px-2">
                                {ref}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <div className="text-start">
                <div>
                  <h6>Interpretation:</h6>
                  <input type="text" {...register("interpretation")} className="form-control w-50" />
                </div>
                <div className="pt-2">
                  <h6>Name of laboratory technician: </h6>
                  <input type="text" {...register("lab_technician")} className="form-control w-50" />
                </div>
              </div>
              <div className="d-flex justify-content-start justify-content-end">
                <button type="submit" className="app-btn-primary btn">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
        <div>
          <button disabled={!incomingTest?.status} onClick={() => handleDownloadTestResult(incomingTest)} className="btn btn-info text-white">
            <MdPrint size={18} /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTestResult;
