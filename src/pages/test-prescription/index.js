import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubParameter, fetchAllTestInfo, fetchParameter, fetchSubParameter, fetchTest } from "../../../features/test/testSlice";
import axiosInstance from "../../../utils/axiosInstance";

export default function TestPrescription() {
  const { testAllInfo, tests, status, parameterList, allSubParameterList } = useSelector((state) => state.test);

  // console.log(testAllInfo);

  const [selectedTest, setSelectedTest] = useState({
    testName: "",
    id: "",
  });
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTest({ limit: 3000 }));
  }, [dispatch]);

  // wk
  useEffect(() => {
    if (selectedTest.id) {
      dispatch(fetchAllTestInfo(selectedTest.id));
      dispatch(fetchParameter(selectedTest.id));
    }
  }, [selectedTest]);

  useEffect(() => {
    dispatch(fetchAllSubParameter());
  }, []);

  const fetchSubParameterOfParameter = (id) => {
    return allSubParameterList.data?.filter((subP) => subP.test_parameter === id);
  };

  // Function to handle input value change
  const handleInputChange = (subParamId, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [subParamId]: value,
    }));
  };

  const handleSubmit2 = async () => {
    try {
      const response = await axiosInstance.post("/test/appointment", {
        caseNo: 1001,
        test: {
          testId: selectedTest.id,
          ...inputValues,
        },
      });

      if (response.status === 200) {
        toast.success("Successfully created");
      }
    } catch (error) {
      toast.error(error.message);
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
        testId: selectedTest.id,
        appointmentId: "test15",
        phone: "012345454",
        name: selectedTest?.testName,
        data: testData,
      };
      // console.log({ data });

      axiosInstance.post(`/test/test-result`, data).then((res) => {
        if (res.data?.success) {
          toast.success("Test result added successfully");
          reset();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {selectedTest.testName ? selectedTest.testName : "Select test"}
          </button>
          <ul className="dropdown-menu">
            {tests.data?.map((test, index) => (
              <li key={index} onClick={() => setSelectedTest({ testName: test.testName, id: test._id })}>
                <a className="dropdown-item" href="#">
                  {test.testName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* <button className="btn btn-primary text-white" onClick={handleSubmit}>Confirm</button> */}
      </div>

      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-black p-3 m-1 rounded-1">
        <div className="">
          <h3 className="text-black bg-dark-subtle m-0 border border-black border-bottom-0 p-1 ">{testAllInfo?.testName}</h3>
          {testAllInfo?.testParams?.map((param, index) => (
            <div key={index} className={`m-0 row border border-black ${index !== testAllInfo?.testParams?.length - 1 ? "border-bottom-0" : ""}`}>
              <div className="col-2 p-2 border-end border-black">
                <h6 className="text-black">{param?.name}</h6>
              </div>
              <div className="col-10 p-2 d-flex align-items-center flex-wrap">
                {testAllInfo?.testParams?.[index]?.subTestParams.map((sub, idx) => (
                  <div key={index+idx} className="d-flex align-items-center px-2">
                    {/* <h4 className="text-info">{sub?.title}</h4> */}
                    {sub?.isInputField ? (
                      <div className="d-flex align-items-center gap-2">
                        <label class="block" for={`sub-text-${idx}`}>
                          {sub?.title} :
                        </label>
                        <input
                          {...register(`${param?.name}#${sub?.title}`)}
                          className="block rounded bg-secondary-subtle rounded border-1 border-primary p-1 bg-secondary"
                          type="text"
                          id={`sub-text-${idx}`}
                          placeholder={sub?.title}
                        />
                      </div>
                    ) : (
                      <div class="form-check d-flex align-items-center gap-2">
                        <input {...register(`${param?.name}#${sub?.title}`)} class="form-check-input" type="checkbox" value="" id={`sub-check-${idx}-${sub?.title}`} />
                        <label class="form-check-label" for={`sub-check-${idx}-${sub?.title}`}>
                          {sub?.title}
                        </label>
                      </div>
                    )}
                    {testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.length > 0 && (
                      <div className="d-flex align-items-center p-2  rounded ">
                        <p className="mt-3">
                          ; If <span className="text-lowercase">{sub?.title} ,</span>
                        </p>

                        {testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.map((additional, idx2) => (
                          <div key={idx2}>
                            {/* <h4 className="text-warning">{additional?.additionalFieldTitle}</h4> */}
                            {additional?.isAdditionalFieldInput ? (
                              <div className="mx-2 d-flex gap-2 align-items-center">
                                <label class="me-2" for={`additional-text-${idx2}`}>
                                  {additional?.additionalFieldTitle} :
                                </label>
                                <input
                                  {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)}
                                  className="bg-secondary-subtle rounded border-1 border-primary p-1"
                                  type="text"
                                  id={`additional-text-${idx2}`}
                                  placeholder={additional?.additionalFieldTitle}
                                />
                              </div>
                            ) : (
                              <div class="form-check d-flex gap-2 align-items-center mx-2">
                                <input
                                  {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)}
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`additional-check-${idx2}`}
                                />
                                <label class="form-check-label" for={`additional-check-${idx2}`}>
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
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="app-btn-primary btn mt-3 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
