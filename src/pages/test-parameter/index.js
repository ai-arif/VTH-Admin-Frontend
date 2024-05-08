import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest } from "../../../features/test/testSlice";
import axiosInstance from "../../../utils/axiosInstance";

export default function TestParameter() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [parameters, setParameters] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState("");
  const [selectedTest, setSelectedTest] = useState({
    testName: "",
    id: "",
  });

  const { tests, status } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = async () => {
    if (parameters.includes(inputValue)) {
      alert("Parameter already exists!");
      return;
    }
    const response = await axiosInstance.post("/test/parameter", {
        name: inputValue,
        testId: selectedTest.id
    });
    console.log(response)

    setInputValue("");
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
          {selectedTest.testName?selectedTest.testName:'Select test'}
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
            {parameters.map((param, index) => (
              <li class="list-group-item mt-3 d-flex justify-content-between">
                <span>{param}</span>{" "}
                <button
                  className="btn btn-sm btn-primary text-white"
                  onClick={() => setSelectedParameter(param)}
                >
                  +
                </button>
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
          {selectedParameter && (
            <div>
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
                  >
                    Check Item
                  </button>
                </div>
              </nav>
              <div class="tab-content mt-4" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                  tabindex="0"
                >
                  <div className="d-flex gap-3">
                    <input
                      className="form-control w-75"
                      placeholder="Enter sub parater name"
                    />
                    <button className="btn btn-sm btn-primary text-white">
                      Add
                    </button>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabindex="0"
                >
                  <div className="d-flex gap-3">
                    <input
                      className="form-control w-50"
                      placeholder="Check item name"
                    />
                    <button className="btn btn-sm btn-primary text-white">
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
