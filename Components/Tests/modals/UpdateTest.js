import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTestData } from "../../../features/test/testSlice";

const UpdateTest = ({ existingTest }) => {
  const dispatch = useDispatch();
  const [test, setTest] = useState({ testName: "", testDetails: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setTest((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (test.testName === "") {
      alert("Please fill all fields");
      return;
    }
    await dispatch(updateTestData(test));
    setTest({ testName: "", testDetails: "" });
  };

  return (
    <div>
      <div className="modal fade" id="updateTest" tabIndex="-1" aria-labelledby="updateTestLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateTestLabel">
                Update Test
              </h1>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="testName" className="form-label">
                  Test Name
                </label>
                <input defaultValue={existingTest.testName} onChange={handleChange} name="testName" className="form-control" id="testName" />
              </div>
              <div className="mb-3">
                <label htmlFor="testDetails" className="form-label">
                  Short Description
                </label>
                <input defaultValue={existingTest.testDetails} onChange={handleChange} name="testDetails" className="form-control" id="testDetails" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleSubmit} type="submit" className="btn app-btn-primary">
                Update Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTest;
