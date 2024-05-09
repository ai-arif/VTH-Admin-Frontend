import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTest,
  fetchParameter,
  fetchSubParameter,
} from "../../../features/test/testSlice";
import axiosInstance from "../../../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";

export default function TestParameter() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [check, setCheck] = useState("");
  const [parameters, setParameters] = useState([]);

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
    const response = await axiosInstance.post("/test/parameter/sub", {
      sub_parameter_type: type,
      text,
      check,
      test_parameter: selectedParameter.id,
    });

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
        <div className="col-6">
          <ul class="list-group">
            {selectedTest.testName &&
              parameterList.data.length > 0 &&
              parameterList.data?.map((param, index) => (
                <li class="list-group-item mt-3">
                  <span>{param.name}</span>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex align-items-center gap-4">
                      <MdOutlineDeleteForever
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
        <div className="col-6">
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
                      if (param.sub_parameter_type === "text")
                        return (
                          <li class="list-group-item mt-3 d-flex justify-content-between">
                            <span>{param.text}</span>
                            <div className="d-flex gap-3 mt-4">
                              <CiEdit size={23} color="gray" />
                              <MdOutlineDeleteForever
                                size={23}
                                color="red"
                                onClick={() => handleSubParameterDelete(param._id)}
                              />
                            </div>
                          </li>
                        );
                    })}
                  </ul>

                  <div className="d-flex gap-3 mt-3">
                    <input
                      className="form-control w-75"
                      placeholder="Enter sub parater name"
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
                      if (param.sub_parameter_type === "check")
                        return (
                          <li class="list-group-item mt-3 d-flex justify-content-between">
                            <span>{param.check}</span>
                            <div className="d-flex gap-3 mt-4">
                              <CiEdit size={23} color="gray" />
                              <MdOutlineDeleteForever
                                size={23}
                                color="red"
                                onClick={() => handleSubParameterDelete(param._id)}
                              />
                            </div>
                          </li>
                        );
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
      </div>
    </div>
  );
}
