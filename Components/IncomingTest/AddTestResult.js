import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleIncomingTest } from "../../features/incoming-test/incomingTestSlice";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../UI/Loader";

const AddTestResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { incomingTest, status } = useSelector((state) => state.incomingTest);
  const [activeTab, setActiveTab] = useState(null);
  const [arrIndex, setArrIndex] = useState(0);

  const handleTabSwitch = async (testId, index) => {
    setActiveTab(testId);
    setArrIndex(index);
  };

  // const {
  //   handleSubmit: handleUpdate,
  //   register: register2,
  //   formState: { errorsUpdate },
  // } = useForm({ values: testAllResults?.data });
  // const onUpdate = async (updatedData) => {
  //   try {
  //     axiosInstance.put(`/test/test-result/${testAllResults?._id}`, updatedData).then((res) => {
  //       // console.log({ res: res.data })
  //       if (res.data?.success) {
  //         setRefetch(refetch + 1);
  //         toast.success("Test result updated successfully");
  //         reset();
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(incomingTest?.data);

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
        appointmentId: incomingTest?.data?.appointmentId?._id,
        phone: incomingTest?.data?.appointmentId?.phone,
        name: incomingTest?.data?.tests?.[arrIndex]?.testName,
        status: true,
        data: testData,
      };

      axiosInstance.post(`/test/test-result`, data).then((res) => {
        console.log({ res: res.data });
        if (res.data?.success) {
          // setRefetch(refetch + 1);
          toast.success("Test result added successfully");
          reset();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Test result failed!");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleIncomingTest(id)).then((data) => {
        const firstTestId = data?.payload?.data?.data?.tests?.[0]?._id;
        if (firstTestId) {
          setActiveTab(firstTestId);
          setArrIndex(0);
        }
      });
    }
  }, [dispatch, id]);

  // console.log(incomingTest?.data?.tests?.[arrIndex]);

  // loader
  if (status === "loading") return <Loader />;

  return (
    <div>
      {/* tests tab */}
      <div className="d-flex align-items-center justify-content-center my-3">
        <div className="btn-group" role="group">
          {incomingTest?.data?.tests?.map((test, index) => (
            <button key={test?._id} className={`btn text-white ${activeTab === test?._id ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => handleTabSwitch(test._id, index)}>
              {test?.testName}
            </button>
          ))}
        </div>
      </div>
      {/* test table */}
      <div>
        <div className="app-card text-end px-2 shadow-sm">
          {incomingTest?.data?.tests?.[arrIndex] && (
            <div key={arrIndex} className="table-responsive">
              <form onSubmit={handleSubmit(onSubmit)}>
                {incomingTest?.data?.tests?.[arrIndex]?.tests?.map((test, idx) => (
                  <div key={idx}>
                    <h5 className="text-start py-2">{test?.test_subTitle}</h5>
                    <table className="table table-hover table-borderless table-striped table-dark">
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
                  <div>
                    <h6 className="pt-2">Name of laboratory technician: </h6>
                    <input type="text" {...register("lab_technician")} className="form-control w-50" />
                  </div>
                </div>
                <div className="d-flex justify-content-start justify-content-end">
                  <button type="submit" className="app-btn-primary btn mt-3 ">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTestResult;
