import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import UpdateAdditionalModal1 from "../../../Components/Test-Parameter/Modals/UpdateAdditionalModal1";
import UpdateTestParamsModal from "../../../Components/Test-Parameter/Modals/UpdateTestParamsModal";
import UpdateTestSubParamModal from "../../../Components/Test-Parameter/Modals/UpdateTestSubParamModal";
import UpdateTestSubParamModal2 from "../../../Components/Test-Parameter/UpdateTestSubParamModal2";
import {
  createAdditionalFields,
  createTestParameter,
  fetchAllAdditionalFields,
  fetchParameter,
  fetchSubParameter,
  fetchTest,
  updateAdditionalField,
  updateTestParameterData,
  updateTestSubParameterData,
} from "../../../features/test/testSlice";
import axiosInstance from "../../../utils/axiosInstance";


export default function TestParameter() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const [text2, setText2] = useState("");
  const [check, setCheck] = useState("");
  const [parameters, setParameters] = useState([]);


  // tabs state
  const [activeTab, setActiveTab] = useState("additional1")
  const [activeTabSub, setActiveTabSub] = useState("subParams1")


  // additional field
  const [selectedAdditional, setSelectedAdditional] = useState({
    fieldName: "",
    id: "",
  });
  const [selectedAdditionalOriginalID, setSelectedAdditionalOriginalID] = useState("");

  // console.log(selectedAdditional)

  // const [allAdditionalFields2, setAdditionalFields] = useState([]);
  // useEffect(() => {
  //   if (selectedAdditional.id) {
  //     axiosInstance(`/test/parameter/additional/${selectedAdditional.id}`).then(res => {
  //       setAdditionalFields(res.data?.data?.data)
  //       console.log(res.data?.data?.data)
  //     })
  //   }
  // }, [selectedAdditional.id])



  const [selectedTest, setSelectedTest] = useState({
    testName: "",
    id: "",
  });
  const [selectedParameter, setSelectedParameter] = useState({
    parameterName: "",
    id: "",
  });
  const [selectedSubParameter, setSelectedSubParameter] = useState({
    subParameterName: "",
    id: "",
  });

  const { tests, status, parameterList, subParameterList, allAdditionalFields } = useSelector(
    (state) => state.test
  );

  // console.log(allAdditionalFields)

  console.log(subParameterList)

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchParameter(selectedTest.id));
  }, [selectedTest, inputValue]);

  useEffect(() => {
    dispatch(fetchSubParameter(selectedParameter.id));
  }, [selectedParameter, type, text, check]);

  // additional fields 
  useEffect(() => {
    if (selectedAdditional.id) {
      dispatch(fetchAllAdditionalFields(selectedAdditional.id));
    }
  }, [selectedTest, selectedAdditional.id, activeTab]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // test params 
  const handleAddButtonClick = async () => {
    if (!selectedTest?.testName) {
      toast.error("Select test at first");
      return;
    }
    if (!inputValue) {
      toast.error("Required parameter name");
      return;
    }

    if (parameters.includes(inputValue)) {
      toast.error("Parameter already exists!");
      return;
    }
    // const response = await axiosInstance.post("/test/parameter", {
    //   name: inputValue,
    //   testId: selectedTest.id,
    // });

    try {
      const response = await dispatch(createTestParameter({
        name: inputValue,
        testId: selectedTest.id,
      }))

      if (response.payload.success) {
        toast.success(response.payload.message);
        setInputValue("");
      }
    }
    catch (error) {
      console.log(error)
      toast.error("Unable to create parameter");
    }
  };

  const handleUpdateTestParams = async (name) => {
    const data = { name, id: selectedParameter.id }
    try {
      const response = await dispatch(updateTestParameterData(data));

      if (response.payload?.success) {
        dispatch(fetchParameter(selectedTest.id));
        toast.success("Successfully updated parameter")

      }
    }
    catch (error) {
      console.log(error)
    }
  }


  const handleUpdateTestSubParams = async (name) => {
    const data = { name, id: selectedSubParameter.id }
    try {
      const response = await dispatch(updateTestSubParameterData(data));
      if (response.payload?.success) {
        dispatch(fetchSubParameter(selectedParameter.id));
        toast.success("Successfully updated sub parameter")

      }
    }
    catch (error) {
      console.log(error)
    }
  }


  const handleUpdateTestAdditionalField = async (name) => {
    const data = { name, id: selectedAdditionalOriginalID }

    try {
      const response = await dispatch(updateAdditionalField(data));

      if (response.payload?.success) {
        dispatch(fetchAllAdditionalFields(selectedAdditional.id));
        toast.success("Successfully updated additional field")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // additional field 
  const handleAdditionalParams = async (id) => {
    if (parameters.includes(inputValue)) {
      toast.error("Parameter already exists!");
      return;
    }

    try {

      const data = {
        additionalFieldTitle: text2,
        sub_test_parameter: selectedAdditional.id,
      };

      if (activeTab == "additional1") {
        data.isAdditionalFieldInput = true;
      }
      else {
        data.isAdditionalFieldInput = false;
      }


      const response = await dispatch(createAdditionalFields(data))


      console.log(response)

      if (response.payload.success) {
        dispatch(fetchAllAdditionalFields(selectedAdditional.id));
        toast.success(response.payload.message);
        setInputValue("");
      }
    }
    catch (error) {
      console.log(error)
      toast.error("Unable to create parameter");
    }
  };

  const handleSubParameter = async () => {
    if (type === "text" && !text) {
      toast.error("Required sub test name  at first");
      return;
    }

    if (type === "check" && check.length < 1) {
      toast.error("Required sub test check name");
      return;
    }

    // if (parameters.includes(inputValue)) {
    //   toast.error("Parameter already exists!");
    //   return;
    // }

    // const response = await axiosInstance.post("/test/parameter/sub", {
    //   sub_parameter_type: type,
    //   text,
    //   check,
    //   test_parameter: selectedParameter.id,
    // });

    const newData = {};

    if (type == "text") {
      newData.isInputField = true,
        newData.title = text,
        newData.test_parameter = selectedParameter.id
    }
    else {
      newData.isInputField = false,
        newData.title = check,
        newData.test_parameter = selectedParameter.id
    }

    const response = await axiosInstance.post("/test/parameter/sub", newData);
    console.log(response)

    if (response.status === 200) {
      toast.success(response.data.message);
      setText("");
      setCheck("");
    }
  };

  // delete 
  const handleAdditionalFieldDelete = (id) => {
    Swal.fire({
      title: "Confirm delete ?",
      showCancelButton: true,
      confirmButtonText: "yes",
      cancelButtonText: "no",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosInstance.delete(`/test/parameter/additional/${id}`);
        if (response.status === 200) {
          toast.success("Successfully deleted");
          dispatch(fetchAllAdditionalFields(selectedAdditional.id));
        }
      }
    });
  };

  const handleParameterDelete = (id) => {
    Swal.fire({
      title: "Confirm delete ?",
      showCancelButton: true,
      confirmButtonText: "yes",
      cancelButtonText: "no",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosInstance.delete(`/test/parameter/${id}`);
        if (response.status === 200) {
          toast.success("Successfully deleted");
          dispatch(fetchParameter(selectedTest.id));
        }
      }
    });
  };

  const handleSubParameterDelete = (id) => {
    Swal.fire({
      title: "Confirm delete ?",
      showCancelButton: true,
      confirmButtonText: "yes",
      cancelButtonText: "no",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosInstance.delete(`/test/parameter/sub/${id}`);
        if (response.status === 200) {
          toast.success("Successfully deleted");
          dispatch(fetchSubParameter(selectedParameter.id));
        }
      }
    });
  };


  return (
    <div className="m-4">
      <div className="d-flex gap-3">
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
        <h3 className="text-center">Parameters</h3>
      </div>

      <div className="row">
        {/* test params */}
        <div className="col-4">
          <ul class="list-group">
            {selectedTest.testName &&
              parameterList.data?.map((param, index) => (
                <li class="list-group-item mt-3">
                  <UpdateTestParamsModal existingTestParamsName={param.name} handleSubmit={handleUpdateTestParams} />
                  <span>{param.name}</span>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex align-items-center gap-4">
                      <MdOutlineDeleteForever
                        className=""
                        size={23}
                        color="red"
                        onClick={() => handleParameterDelete(param._id)}
                      />
                      <CiEdit data-bs-toggle="modal" data-bs-target="#updateTestParam" onClick={() => {
                        setSelectedParameter({
                          parameterName: param.name,
                          id: param._id,
                        });

                      }} size={23} color="gray" />
                    </div>
                    <button
                      className="btn border"
                      onClick={() => {
                        setSelectedParameter({
                          parameterName: param.name,
                          id: param._id,
                        });
                        setType("text");
                      }}
                    >
                      <IoMdAddCircleOutline /> sub
                    </button>
                  </div>
                </li>
              ))}
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3">
            <input
              className="form-control"
              placeholder="Enter parameter"
              value={inputValue}
              onChange={handleInputChange}
            />

            <button
              className="btn btn-primary text-white"
              onClick={handleAddButtonClick}
            >
              Add
            </button>
          </div>
        </div>

        {/* sub params  */}
        {selectedParameter.id && <div className="col-4">
          {/* tabs ********************* */}
          <h4 className="text-center">Sub parameters</h4>
          <div className="d-flex justify-content-center my-3">
            <div className="btn-group" role="group">
              <button className={`btn text-white ${activeTabSub === "subParams1" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => {
                setType("text");
                setCheck(""); setActiveTabSub("subParams1")
              }}>
                Text
              </button>
              <button className={`btn text-white ${activeTabSub === "subParams2" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => {
                setType("check");
                setText(""); setActiveTabSub("subParams2")
              }}>
                Check item
              </button>
            </div>
          </div>

          {activeTabSub === "subParams1" && <div
          >
            <ul class="list-group">
              {subParameterList.data?.map((param, index) => {
                if (param.isInputField)
                  return (
                    <li class="w-100 list-group-item mt-3">
                      <UpdateTestSubParamModal existingTestParamsName={param.value} handleSubmit={handleUpdateTestSubParams} />
                      <span>{param.title}</span>
                      <div className="d-flex justify-content-between">
                        <div className="w-100 d-flex gap-3 mt-4">
                          {/* wk  */}
                          <CiEdit
                            data-bs-toggle="modal" data-bs-target="#updateTestSubParam"
                            onClick={() => {
                              setSelectedSubParameter({
                                subParameterName: param.title,
                                id: param._id,
                              });
                            }}
                            size={23} color="gray" />
                          <MdOutlineDeleteForever
                            size={23}
                            color="red"
                            onClick={() => handleSubParameterDelete(param._id)}
                          />
                        </div>
                        <button
                          className="btn border"
                          onClick={() => {
                            setSelectedAdditional({
                              id: param._id,
                              fieldName: ""
                            });
                            // setType("text");
                            console.log('kj', param._id)
                          }}
                        >
                          <IoMdAddCircleOutline /> additional
                        </button>
                      </div>
                    </li>
                  )
              })}
            </ul>

            <div className="d-flex gap-3 mt-3">
              <input
                className="form-control w-75"
                placeholder="Enter sub parameter name"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="btn btn-sm btn-primary text-white"
                onClick={handleSubParameter}
              >
                Add
              </button>
            </div>
          </div>}

          {activeTabSub === "subParams2" && <div
          >
            <ul class="list-group w-100">
              {subParameterList.data?.map((param, index) => {
                if (!param.isInputField)
                  return (
                    <li class="w-100 list-group-item mt-3">
                      <UpdateTestSubParamModal2 existingTestParamsName={param.title} handleSubmit={handleUpdateTestSubParams} />
                      <span>{param.title}</span>
                      <div className="d-flex justify-content-between">
                        <div className="w-100 d-flex gap-3 mt-4">
                          {/* wk  */}
                          <CiEdit
                            data-bs-toggle="modal" data-bs-target="#updateTestSubParam2"
                            onClick={() => {
                              setSelectedSubParameter({
                                subParameterName: param.title,
                                id: param._id,
                              });
                            }}
                            size={23} color="gray" />
                          <MdOutlineDeleteForever
                            size={23}
                            color="red"
                            onClick={() => handleSubParameterDelete(param._id)}
                          />
                        </div>
                        <button
                          className="btn border"
                          onClick={() => {
                            setSelectedAdditional({
                              id: param._id,
                              fieldName: ""
                            });
                            // setType("text");
                            console.log('kj', param._id)
                          }}
                        >
                          <IoMdAddCircleOutline /> additional
                        </button>
                      </div>
                    </li>
                  )
              })}
            </ul>

            <div className="d-flex gap-3 mt-3">
              <input
                className="form-control w-100"
                placeholder="Check item name"
                value={check}
                onChange={(e) => setCheck(e.target.value)}
              />
              <button
                className="btn btn-sm btn-primary text-white"
                onClick={handleSubParameter}
              >
                Add
              </button>
            </div>
          </div>}

        </div>}

        {/* additional fields ******************** */}
        {
          selectedAdditional.id && <div className="col-4">
            {/* tabs ********************* */}
            <h4 className="text-center">Additional fields</h4>
            <div className="d-flex justify-content-center my-3">
              <div className="btn-group" role="group">
                <button className={`btn text-white ${activeTab === "additional1" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => setActiveTab("additional1")}>
                  Text
                </button>
                <button className={`btn text-white ${activeTab === "additional2" ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => setActiveTab("additional2")}>
                  Check item
                </button>
              </div>
            </div>
            {/* tab content 1 */}
            {activeTab === "additional1" && <div>
              <ul class="list-group w-100">
                {allAdditionalFields?.data?.map((param, index) => {
                  if (param.isAdditionalFieldInput == true)
                    return (
                      <><UpdateAdditionalModal1 existingTestParamsName={param.additionalFieldTitle} handleSubmit={handleUpdateTestAdditionalField} />
                        <li class="list-group-item mt-3 d-flex justify-content-between">
                          <span>{param.additionalFieldTitle}</span>
                          <div className="d-flex gap-3 mt-4">
                            <CiEdit data-bs-toggle="modal" data-bs-target="#updateAdditional" onClick={() => {
                              setSelectedAdditionalOriginalID(param._id)

                            }} size={23} color="gray" />
                            <MdOutlineDeleteForever
                              size={23}
                              color="red"
                              onClick={() => handleAdditionalFieldDelete(param._id)}
                            />
                          </div>
                        </li></>
                    )
                })}
              </ul>

              <div className="d-flex gap-3 mt-3">
                <input
                  className="form-control w-100"
                  placeholder="Text value"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary text-white"
                  onClick={(param) => {
                    handleAdditionalParams(param._id)
                  }}
                >
                  Add
                </button>
              </div>
            </div>}
            {/* tab content 2 */}
            {activeTab === "additional2" && <div>
              <ul class="list-group w-100">
                {allAdditionalFields?.data?.map((param, index) => {
                  if (param.isAdditionalFieldInput == false)
                    return (
                      <><UpdateAdditionalModal1 existingTestParamsName={param.additionalFieldTitle} handleSubmit={handleUpdateTestAdditionalField} />
                        <li class="list-group-item mt-3 d-flex justify-content-between">
                          <span>{param.additionalFieldTitle}</span>
                          <div className="d-flex gap-3 mt-4">
                            <CiEdit data-bs-toggle="modal" data-bs-target="#updateAdditional" onClick={() => {
                              setSelectedAdditionalOriginalID(param._id)

                            }} size={23} color="gray" />
                            <MdOutlineDeleteForever
                              size={23}
                              color="red"
                              onClick={() => handleAdditionalFieldDelete(param._id)}
                            />
                          </div>
                        </li></>
                    )
                })}
              </ul>

              <div className="d-flex gap-3 mt-3">
                <input
                  className="form-control w-100"
                  placeholder="Check item name"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary text-white"
                  onClick={(param) => {
                    handleAdditionalParams(param._id)
                  }}
                >
                  Add
                </button>
              </div>
            </div>}
          </div>
        }
      </div>


    </div>
  );
}
