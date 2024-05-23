import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubParameter,
  fetchAllTestInfo,
  fetchParameter,
  fetchSubParameter,
  fetchTest,
} from "../../../features/test/testSlice";
import axiosInstance from "../../../utils/axiosInstance";


export default function TestPrescription() {
  const { testAllInfo, tests, status, parameterList, allSubParameterList } = useSelector(
    (state) => state.test
  );

  console.log(testAllInfo)

  const [selectedTest, setSelectedTest] = useState({
    testName: "",
    id: "",
  });
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTest());
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
    return allSubParameterList.data?.filter(
      (subP) => subP.test_parameter === id
    );
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
          ...inputValues
        }
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
        appointmentId: "test10",
        phone: "012345454",
        name: selectedTest?.testName,
        data: testData
      }
      console.log({ data })

      axiosInstance.post(`/test/test-result`, data).then(res => {
        if (res.data?.success) {
          toast.success("Test result added successfully");
          reset();
        }
      })

    }
    catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="m-4">
      <div className="d-flex justify-content-between">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedTest.testName ? selectedTest.testName : "Select test"}
          </button>
          <ul className="dropdown-menu">
            {tests.data?.map((test, index) => (
              <li
                key={index}
                onClick={() =>
                  setSelectedTest({ testName: test.testName, id: test._id })
                }
              >
                <a className="dropdown-item" href="#">
                  {test.testName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* <button className="btn btn-primary text-white" onClick={handleSubmit}>Confirm</button> */}
      </div>

      {/* <ul class="list-group">
        {selectedTest.testName &&
          parameterList.data?.map((param, index) => (
            <li class="list-group-item mt-3" key={index}>
              <span className="fs-3">{param.name}</span>
              {fetchSubParameterOfParameter(param._id)?.map(
                (subParam, subIndex) =>
                  subParam.sub_parameter_type === "text" ? (
                    <div className="" key={subIndex}>
                      <label className="text-secondary">{subParam.text}</label>
                      <input
                        className="form-control w-25 mt-2 mb-3"
                        value={inputValues[subParam.text] || ""}
                        onChange={(e) =>
                          handleInputChange(subParam.text, e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <div className="d-flex gap-2" key={subIndex}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={inputValues[subParam.check] || false}
                        onChange={(e) =>
                          handleInputChange(subParam.check, e.target.checked)
                        }
                      />
                      <label>{subParam.check}</label>
                    </div>
                  )
              )}
            </li>
          ))}
      </ul> */}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-black p-3 m-1 rounded-1">
        <h3 className="text-black">{testAllInfo?.testName}</h3>

        <div className="">
          {
            testAllInfo?.testParams?.map((param, index) => <div className=" row border border-black p-1 bg-primary m-2 rounded">
              <h4 className="text-white">{param?.name}</h4>
              {
                testAllInfo?.testParams?.[index]?.subTestParams.map((sub, idx) => <div className="col-6 border border-black p-1 bg-dark-subtle">
                  {/* <h4 className="text-info">{sub?.title}</h4> */}
                  {
                    sub?.isInputField ? <div className="">
                      <label class="me-2" for={`sub-text-${idx}`}>
                        {sub?.title}
                      </label>
                      <input {...register(`${param?.name}#${sub?.title}`)} className="rounded border-0 p-1" type="text" id={`sub-text-${idx}`} placeholder={sub?.title} />
                    </div>
                      :
                      <div class="form-check">
                        <input {...register(`${param?.name}#${sub?.title}`)} class="form-check-input" type="checkbox" value="" id={`sub-check-${idx}-${sub?.title}`} />
                        <label class="form-check-label" for={`sub-check-${idx}-${sub?.title}`}>
                          {sub?.title}
                        </label>
                      </div>
                  }
                  {
                    testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.length > 0 &&

                    <div className="border p-2 bg-secondary rounded text-white">
                      <p>If <span className="text-lowercase">{sub?.title}</span></p>

                      {
                        testAllInfo?.testParams?.[index]?.subTestParams?.[idx]?.additionalFields?.map((additional, idx2) => <div >
                          {/* <h4 className="text-warning">{additional?.additionalFieldTitle}</h4> */}
                          {
                            additional?.isAdditionalFieldInput ? <div>
                              <label class="me-2" for={`additional-text-${idx2}`}>
                                {additional?.additionalFieldTitle}
                              </label>
                              <input {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)} className="rounded border-0 p-1" type="text" id={`additional-text-${idx2}`} placeholder={additional?.additionalFieldTitle} />
                            </div>
                              :
                              <div class="form-check">
                                <input {...register(`${param?.name}#${sub?.title}&${additional?.additionalFieldTitle}`)} class="form-check-input" type="checkbox" value="" id={`additional-check-${idx2}`} />
                                <label class="form-check-label" for={`additional-check-${idx2}`}>
                                  {additional?.additionalFieldTitle}
                                </label>
                              </div>
                          }
                        </div>)
                      }
                    </div>}
                </div>)
              }
            </div>)
          }
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="app-btn-primary btn mt-3 ">Submit</button>
        </div>
      </form>
    </div>
  );
}
