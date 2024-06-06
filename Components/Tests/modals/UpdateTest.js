import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchTest, updateTestData } from "../../../features/test/testSlice";

const UpdateTest = ({ existingTest }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [test, setTest] = useState({ testName: existingTest.testName || "", testDetails: existingTest.testDetails || "" });
  const currentPage = parseInt(router.query.page) || 1;

  useEffect(() => {
    if (existingTest.testName || existingTest.testDetails) {
      setTest({ testName: existingTest.testName, testDetails: existingTest.testDetails });
    }
  }, [existingTest.testName, existingTest.testDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTest((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (test.testName === "") {
      toast.error("Please fill test name field");
      return;
    }

    try {
      await dispatch(updateTestData({ ...test, id: existingTest._id }));
      await dispatch(fetchTest({ page: currentPage }));
      toast.success("Test updated successfully!");
      document.getElementById("closeModal").click();
      setTest({ testName: "", testDetails: "" });
    } catch (error) {
      toast.error("An error occurred while crating test. Please try again later.");
      console.error(error);
    }
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
              <button id="closeModal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleSubmit} id="closeModal" type="submit" className="btn app-btn-primary" data-bs-dismiss="modal">
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
