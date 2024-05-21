import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchParameter,
  fetchSubParameter,
  fetchTest,
} from "../../../features/test/testSlice";
import axiosInstance from "../../../utils/axiosInstance";


export default function TestParameter() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [type2, setType2] = useState("");
  const [text2, setText2] = useState("");
  const [check, setCheck] = useState("");
  const [parameters, setParameters] = useState([]);

  console.log({ type, type2, text, text2 })

  // additional field
  const [selectedAdditional, setSelectedAdditional] = useState({
    fieldName: "",
    id: "",
  });

  // console.log(selectedAdditional)

  const [allAdditionalFields, setAdditionalFields] = useState([]);
  useEffect(() => {
    if (selectedAdditional.id) {
      axiosInstance('/test/parameter/all/additional').then(res => {
        setAdditionalFields(res.data?.data?.data)
        // console.log(res.data?.data?.data)
      })
    }
  }, [selectedAdditional.id, type2])


  const [selectedTest, setSelectedTest] = useState({
    testName: "",
    id: "",
  });
  const [selectedParameter, setSelectedParameter] = useState({
    parameterName: "",
    id: "",
  });

  const { tests, status, parameterList, subParameterList } = useSelector(
    (state) => state.test
  );

  // console.log(subParameterList)

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchParameter(selectedTest.id));
  }, [selectedTest, inputValue]);

  useEffect(() => {
    dispatch(fetchSubParameter(selectedParameter.id));
  }, [selectedParameter, type, text, check]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = async () => {
    if (!selectedTest.testName) {
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
    const response = await axiosInstance.post("/test/parameter", {
      name: inputValue,
      testId: selectedTest.id,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      setInputValue("");
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
        newData.value = text,
        newData.test_parameter = selectedParameter.id
    }
    else {
      newData.isInputField = false,
        newData.value = check,
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


  const handleAdditionalParams = (id) => {
    console.log(id)
  }




  return (
    <div className="m-4">
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

      <div className="row">
        <div className="col-4">
          <ul class="list-group">
            {selectedTest.testName &&
              parameterList.data?.map((param, index) => (
                <li class="list-group-item mt-3">
                  <span>{param.name}</span>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex align-items-center gap-4">
                      <MdOutlineDeleteForever
                        className=""
                        size={23}
                        color="red"
                        onClick={() => handleParameterDelete(param._id)}
                      />
                      <CiEdit size={23} color="gray" />
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
        <div className="col-4">
          {selectedParameter.parameterName && (
            <div>
              {/* tab */}
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                    onClick={() => {
                      setType("text");
                      setCheck("");
                    }}
                  >
                    Text
                  </button>
                  <button
                    class="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    onClick={() => {
                      setType("check");
                      setText("");
                    }}
                  >
                    Check Item
                  </button>
                </div>
              </nav>
              <div class="tab-content mt-4" id="nav-tabContent">
                {/* text part */}
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                  tabindex="0"
                >
                  <ul class="list-group w-50">
                    {subParameterList.data?.map((param, index) => {
                      if (param.isInputField)
                        return (
                          <li class="list-group-item mt-3 d-flex justify-content-between">
                            <span>{param.value}</span>
                            <div className="d-flex gap-3 mt-4">
                              <CiEdit size={23} color="gray" />
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
                </div>

                {/* check part */}

                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabindex="0"
                >
                  <ul class="list-group w-50">
                    {subParameterList.data?.map((param, index) => {
                      if (!param.isInputField)
                        return (
                          <li class="list-group-item mt-3 d-flex justify-content-between">
                            <span>{param.value}</span>
                            <div className="d-flex gap-3 mt-4">
                              <CiEdit size={23} color="gray" />
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
                          </li>
                        )
                    })}
                  </ul>

                  <div className="d-flex gap-3 mt-3">
                    <input
                      className="form-control w-50"
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
                </div>
              </div>
            </div>
          )}
        </div>

        {/* additional fields ******************** */}
        <div className="col-4">
          {selectedAdditional.id && (
            <div>
              {/* tab */}
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                    onClick={() => {
                      setType2("text");
                    }}
                  >
                    Text
                  </button>
                  <button
                    class="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    onClick={() => {
                      setType2("check");
                    }}
                  >
                    Check Item
                  </button>
                </div>
              </nav>
              <div class="tab-content mt-4" id="nav-tabContent">
                {/* text part */}
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                  tabindex="0"
                >
                  <ul class="list-group w-50">
                    {allAdditionalFields?.map((param, index) => {
                      if (param.isAdditionalFieldInput == true)
                        return (
                          <li class="list-group-item mt-3 d-flex justify-content-between">
                            <p>{param.isAdditionalFieldInput}</p>
                            <span>{param.additionalFieldTitle}</span>
                            <div className="d-flex gap-3 mt-4">
                              <CiEdit size={23} color="gray" />
                              <MdOutlineDeleteForever
                                size={23}
                                color="red"
                              // onClick={() => handleSubParameterDelete(param._id)}
                              />
                            </div>
                          </li>
                        )
                    })}
                  </ul>

                  <div className="d-flex gap-3 mt-3">
                    <input
                      className="form-control w-75"
                      placeholder="Additional parameter"
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-primary text-white"
                      // onClick={handleSubParameter}
                      onClick={(param) => {
                        console.log("kk")
                        handleAdditionalParams(param._id)
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* check part */}

                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabindex="0"
                >
                  <ul class="list-group w-50">
                    {allAdditionalFields?.map((param, index) => {
                      if (param.isAdditionalFieldInput == false)
                        return (
                          <li class="list-group-item mt-3 d-flex justify-content-between">
                            <span>{param.additionalFieldTitle}</span>
                            <div className="d-flex gap-3 mt-4">
                              <CiEdit size={23} color="gray" />
                              <MdOutlineDeleteForever
                                size={23}
                                color="red"
                              // onClick={() => handleSubParameterDelete(param._id)}
                              />
                            </div>

                          </li>
                        )
                    })}
                  </ul>

                  <div className="d-flex gap-3 mt-3">
                    <input
                      className="form-control w-50"
                      placeholder="Check item name"
                      value={check}
                      onChange={(e) => setCheck(e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-primary text-white"
                      // onClick={handleSubParameter}
                      onClick={(param) => {
                        console.log("kk")
                        handleAdditionalParams(param._id)
                      }}
                    >
                      Add fgdf
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
