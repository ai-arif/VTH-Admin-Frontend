import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleIncomingTest } from "../../features/incoming-test/incomingTestSlice";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDate";
import Loader from "../UI/Loader";

const ViewResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { incomingTest, status } = useSelector((state) => state.incomingTest);
  const [activeTab, setActiveTab] = useState(null);
  const [arrIndex, setArrIndex] = useState(0);
  const [testAllResults, setTestAllResults] = useState({});
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabSwitch = async (testId, index) => {
    setActiveTab(testId);
    setArrIndex(index);
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

  useEffect(() => {
    if (incomingTest?.data?._id)
      axiosInstance.get(`/test/test-result/${incomingTest?.data?.appointmentId?._id}`).then((response) => {
        // console.log(response.data?.data?.data);
        let arr = [];
        response.data?.data?.data.map((r) => {
          if (r.status == true) arr.push(r?.testId);
        });
        // setTestAllResults(response.data?.data?.data);
        setResults(arr);

        setTestAllResults(response.data?.data?.data?.find((tr) => tr?.testId === activeTab));
        setIsLoading(false);
      });
  }, [activeTab, incomingTest?.data]);

  if (isLoading) return <Loader />;

  return (
    <div>
      {/* tests tab */}
      <div className="d-flex align-items-center justify-content-center my-3">
        <div className="btn-group flex-wrap" role="group">
          {incomingTest?.data?.tests?.map((test, index) => (
            <button key={test?._id} className={`btn text-white ${activeTab === test?._id ? "btn-primary" : "btn-outline-primary border"}`} onClick={() => handleTabSwitch(test._id, index)}>
              {test?.testName}
            </button>
          ))}
        </div>
      </div>
      {/* owner info & test result table */}
      <div className="app-card px-3 pb-3 shadow-sm">
        <div className="mb-2">
          {/* owner info */}
          <div className="d-flex justify-content-between align-items-center">
            <p>Case No: {incomingTest?.data?.appointmentId?.caseNo}</p>
            <p>
              Status: <span className={`${results?.includes(activeTab) ? "text-success fw-medium" : "text-danger fw-medium"}`}>{results?.includes(activeTab) ? "Added" : "To be add"}</span>
            </p>
            <p>Date: {formatDate(incomingTest?.data?.appointmentId?.date)}</p>
          </div>
          <div>
            <h6 className="text-center w-50 mx-auto text-bg-secondary rounded-1 py-2">Owner Information</h6>
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="mb-1">Owner Name: {incomingTest?.data?.appointmentId?.ownerName}</p>
                <p className="m-0">Phone: {incomingTest?.data?.appointmentId?.phone}</p>
              </div>
              <div className="">
                <p className="mb-1">Upazila: {incomingTest?.data?.appointmentId?.upazila}</p>
                <p className="m-0">Address: {incomingTest?.data?.appointmentId?.address}</p>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        {results?.includes(activeTab) ? (
          <div>
            {incomingTest?.data?.tests?.[arrIndex] && (
              <div key={arrIndex} className="table-responsive text-end">
                {incomingTest?.data?.tests?.[arrIndex]?.tests?.map((test, idx) => (
                  <div key={idx}>
                    <h5 className="text-start py-2">{test?.test_subTitle}</h5>
                    <table className="table table-hover table-striped table-dark">
                      <thead>
                        <tr>
                          <th>{test?.parameter_title}</th>
                          <th>{test?.result_title}</th>
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
                              {typeof testAllResults?.data?.[`${test?.test_subTitle}#${item?.param}`] === "string"
                                ? testAllResults?.data?.[`${test?.test_subTitle}#${item?.param}`]
                                : testAllResults?.data?.[`${test?.test_subTitle}#${(item?.param).split("[")[0]}`]?.[`${(item?.param).split("[")[1].replace("]", "")}`]}
                            </td>
                            {/* <td className="">{testAllResults?.data?.[`${test?.test_subTitle}#${item?.param}`]}</td> */}
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
                  <div className="d-flex gap-2">
                    <h6>Interpretation:</h6>
                    <span>{testAllResults?.data?.["interpretation"]}</span>
                  </div>
                  <div className="pt-2 d-flex gap-2">
                    <h6>Name of laboratory technician:</h6>
                    <span>{testAllResults?.data?.["lab_technician"]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-warning">Result Not Available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResult;
