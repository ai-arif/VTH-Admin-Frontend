import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchAllTestInfo } from "../../../../features/test/testSlice";
import axiosInstance from "../../../../utils/axiosInstance";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { testAllInfo } = useSelector((state) => state.test);

  const [prescriptions, setPrescriptions] = useState({});
  const [results, setResults] = useState([]);
  const [testAllResults, setTestAllResults] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [refetchPrescription, setRefetchPrescription] = useState(0);

  useEffect(() => {
    if (activeTab) dispatch(fetchAllTestInfo(activeTab));
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (router.query?.id) {
      axios.get(`http://localhost:5000/api/v1/prescription/lab/test/${router.query?.id}`).then((res) => {
        let result = res.data?.data?.data;
        setPrescriptions(result);
        setActiveTab(res.data?.data?.data?.tests?.[0]?._id);
      });
    }
  }, [router?.query?.id, refetchPrescription]);

  useEffect(() => {
    if (prescriptions?._id)
      axios.get(`http://localhost:5000/api/v1/test/test-result/${prescriptions?.appointment?._id}`).then((response) => {
        let arr = [];
        response.data?.data?.data.map((r) => {
          if (r.status == true) arr.push(r?.testId);
        });
        // setTestAllResults(response.data?.data?.data);
        setResults(arr);

        setTestAllResults(response.data?.data?.data?.find((tr) => tr?.testId === testAllInfo?._id));
      });
  }, [activeTab, router?.query?.id, prescriptions, refetch, testAllInfo]);

  const handleDeleteTestResult = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/test/test-result/${testAllResults?._id}`).then((res) => {
          console.log({ res: res.data });
          if (res.data?.success) {
            dispatch(fetchAllTestInfo(activeTab));
            setRefetchPrescription(refetch + 1);
            // setRefetch(refetch + 1)
            toast.success("Deleted successfully");
            reset();
          }
        });
      }
    });
  };

  const {
    handleSubmit: handleUpdate,
    register: register2,
    formState: { errorsUpdate },
  } = useForm({ values: testAllResults?.data });
  const onUpdate = async (updatedData) => {
    try {
      axiosInstance.put(`/test/test-result/${testAllResults?._id}`, updatedData).then((res) => {
        // console.log({ res: res.data })
        if (res.data?.success) {
          setRefetch(refetch + 1);
          toast.success("Test result updated successfully");
          reset();
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
  const onSubmit = async (testData) => {
    try {
      const data = {
        testId: activeTab,
        appointmentId: prescriptions?.appointment?._id,
        phone: prescriptions?.appointment?.phone,
        name: testAllInfo?.testName,
        status: true,
        data: testData,
      };

      axiosInstance.post(`/test/test-result`, data).then((res) => {
        console.log({ res: res.data });
        if (res.data?.success) {
          setRefetch(refetch + 1);
          toast.success("Test result added successfully");
          reset();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-center my-3">
          <div className="btn-group" role="group">
            {prescriptions?.tests?.map((test, index) => (
              <button
                key={test?._id}
                className={`btn text-white ${activeTab === test?._id ? "btn-primary" : "btn-outline-primary border"}`}
                onClick={() => {
                  setActiveTab(test?._id);
                }}
              >
                {test?.testName}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 app-card">
          <div className="m-0">
            {results?.includes(testAllInfo?._id) ? (
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center m-0 border  border-bottom-0 p-1">
                  <h3 className="">Owner: {prescriptions?.appointment?.ownerName}</h3>
                  <div className="d-flex align-items-center gap-2">
                    <p>Case No: {prescriptions?.appointment?.caseNo}</p>
                    <p>|</p>
                    <p>Date: {new Date(prescriptions?.appointment?.createdAt).toDateString()}</p>
                    <p>|</p>
                    <p>Status: {results?.includes(testAllInfo?._id) ? "Added" : "To be add"}</p>
                  </div>
                </div>
                <form onSubmit={handleUpdate(onUpdate)} className="">
                  {testAllInfo?.testParams?.map((param, index) => (
                    <div className={`m-0 row border  ${index !== testAllInfo?.testParams?.length - 1 ? "border-bottom-0" : ""}`}>
                      <div className="col-2 p-2 border-end ">
                        <h6 className="">{param?.name}</h6>
                      </div>
                      <div className="col-10 p-2 d-flex justify-content-start align-items-center flex-wrap">
                        {testAllInfo?.testParams?.[index]?.subTestParams.map((sub, idx) => (
                          <div className="d-flex justify-content-start align-items-center flex-wrap px-2">
                            {/* <h4 className="text-info">{sub?.title}</h4> */}
                            {sub?.isInputField ? (
                              <div className="d-flex justify-content-start align-items-center gap-2 ">
                                <label className="block" for={`sub-text-${idx}`}>
                                  {sub?.title} :
                                </label>
                                <input
                                  {...register2(`${param?.name}#${sub?.title}`)}
                                  // defaultValue={testAllResults?.data?.[`${param?.name}#${sub?.title}`]}
                                  className="form-control w-25"
                                  type="text"
                                  id={`sub-text-${idx}`}
                                />
                              </div>
                            ) : (
                              <div className="form-check d-flex justify-content-start align-items-center gap-2 ">
                                <input
                                  {...register2(`${param?.name}#${sub?.title}`)}
                                  // defaultChecked={testAllResults?.data?.[`${param?.name}#${sub?.title}`]}
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`sub-check-${idx}-${sub?.title}`}
                                />
                                <label className="form-check-label" for={`sub-check-${idx}-${sub?.title}`}>
                                  {sub?.title}
                                </label>
                              </div>
                            )}
                            {testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.length > 0 && (
                              <div className="d-flex justify-content-start align-items-center p-2  rounded flex-wrap ">
                                <p className="mt-3">
                                  ; If <span className="text-lowercase">{sub?.title} ,</span>
                                </p>

                                {testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.map((additional, idx2) => (
                                  <div>
                                    {/* <h4 className="text-warning">{additional?.additionalFieldTitle}</h4> */}
                                    {additional?.isAdditionalFieldInput ? (
                                      <div className="mx-2 d-flex justify-content-start gap-2 align-items-center flex-wrap">
                                        <label className="me-2" for={`additional-text-${idx2}`}>
                                          {additional?.additionalFieldTitle} :
                                        </label>
                                        <input
                                          {...register2(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)}
                                          // defaultValue={testAllResults?.data?.[`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`]}
                                          className="form-control"
                                          type="text"
                                          id={`additional-text-${idx2}`}
                                        />
                                      </div>
                                    ) : (
                                      <div className="form-check d-flex justify-content-start gap-2 align-items-center mx-2 flex-wrap">
                                        <input
                                          {...register2(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)}
                                          // defaultChecked={testAllResults?.data?.[`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`]}
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id={`additional-check-${idx2}`}
                                        />
                                        <label className="form-check-label" for={`additional-check-${idx2}`}>
                                          {additional?.additionalFieldTitle}
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-start justify-content-end">
                    <button type="submit" className="app-btn-primary btn mt-3 ">
                      Update
                    </button>
                  </div>
                </form>
                <button type="button" onClick={handleDeleteTestResult} className="app-btn-primary btn m-0 ">
                  Delete
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                <div className="d-flex justify-content-between align-items-center m-0 border  border-bottom-0 p-1">
                  <h3 className="">Owner: {prescriptions?.appointment?.ownerName}</h3>
                  <div className="d-flex align-items-center gap-2">
                    <p>Case No: {prescriptions?.appointment?.caseNo}</p>
                    <p>|</p>
                    <p>Date: {new Date(prescriptions?.appointment?.createdAt).toDateString()}</p>
                    <p>|</p>
                    <p>Status: {results?.includes(testAllInfo?._id) ? "Added" : "To be add"}</p>
                  </div>
                </div>
                <>
                  {testAllInfo?.testParams?.map((param, index) => (
                    <div className={`m-0 row border  ${index !== testAllInfo?.testParams?.length - 1 ? "border-bottom-0" : ""}`}>
                      <div className="col-2 p-2 border-end ">
                        <h6 className="">{param?.name}</h6>
                      </div>
                      <div className="col-10 p-2 d-flex justify-content-start align-items-center flex-wrap">
                        {testAllInfo?.testParams?.[index]?.subTestParams.map((sub, idx) => (
                          <div className="d-flex justify-content-start align-items-center flex-wrap px-2">
                            {/* <h4 className="text-info">{sub?.title}</h4> */}
                            {sub?.isInputField ? (
                              <div className="d-flex justify-content-start align-items-center gap-2 ">
                                <label className="block" for={`sub-text-${idx}`}>
                                  {sub?.title} :
                                </label>
                                <input {...register(`${param?.name}#${sub?.title}`)} className="form-control w-25" type="text" id={`sub-text-${idx}`} />
                              </div>
                            ) : (
                              <div className="form-check d-flex justify-content-start align-items-center gap-2 ">
                                <input {...register(`${param?.name}#${sub?.title}`)} className="form-check-input" type="checkbox" value="" id={`sub-check-${idx}-${sub?.title}`} />
                                <label className="form-check-label" for={`sub-check-${idx}-${sub?.title}`}>
                                  {sub?.title}
                                </label>
                              </div>
                            )}
                            {testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.length > 0 && (
                              <div className="d-flex justify-content-start align-items-center p-2  rounded flex-wrap ">
                                <p className="mt-3">
                                  ; If <span className="text-lowercase">{sub?.title} ,</span>
                                </p>

                                {testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.map((additional, idx2) => (
                                  <div>
                                    {/* <h4 className="text-warning">{additional?.additionalFieldTitle}</h4> */}
                                    {additional?.isAdditionalFieldInput ? (
                                      <div className="mx-2 d-flex justify-content-start gap-2 align-items-center flex-wrap">
                                        <label className="me-2" for={`additional-text-${idx2}`}>
                                          {additional?.additionalFieldTitle} :
                                        </label>
                                        <input {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)} className="form-control" type="text" id={`additional-text-${idx2}`} />
                                      </div>
                                    ) : (
                                      <div className="form-check d-flex justify-content-start gap-2 align-items-center mx-2 flex-wrap">
                                        <input
                                          {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)}
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id={`additional-check-${idx2}`}
                                        />
                                        <label className="form-check-label" for={`additional-check-${idx2}`}>
                                          {additional?.additionalFieldTitle}
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-start justify-content-end">
                    <button type="submit" className="app-btn-primary btn mt-3 ">
                      Submit
                    </button>
                  </div>
                </>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
