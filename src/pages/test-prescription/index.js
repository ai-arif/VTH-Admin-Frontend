import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTest,
  fetchParameter,
  fetchSubParameter,
  fetchAllSubParameter,
} from "../../../features/test/testSlice";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";


export default function TestPrescription() {
  const { tests, status, parameterList, allSubParameterList } = useSelector(
    (state) => state.test
  );
  const [selectedTest, setSelectedTest] = useState({
    testName: "",
    id: "",
  });
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchParameter(selectedTest.id));
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

  const handleSubmit = async()=>{
    const response = await axiosInstance.post("/test/appointment", {
        caseNo: 1001,
        test: {...inputValues}
      })

      if(response.status === 200)
        toast.success("Successfully created")
  }



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

        <button className="btn btn-primary text-white" onClick={handleSubmit}>Confirm</button>
      </div>

      <ul class="list-group">
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
      </ul>
    </div>
  );
}
