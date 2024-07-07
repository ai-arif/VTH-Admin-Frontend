import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTest, fetchTest } from "../../features/test/testSlice";
import Loader from "../UI/Loader";

const ViewTest = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { test, status } = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      dispatch(fetchTest({}));
      dispatch(fetchSingleTest(id));
    }
  }, [dispatch, id]);

  console.log(test);

  //   loader
  if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card text-center shadow-sm">
        <h4 className="page-title text-start py-2">{test?.testName}</h4>
        {test?.tests?.map((test, idx) => (
          <div key={idx} className="table-responsive">
            <h5 className="text-start">{test?.test_subTitle}</h5>
            <table className="table table-hover table-borderless table-striped table-dark">
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
                  <td className="">a</td>
                  <td className="">res</td>
                  <td className="">g/dL</td>
                  <td className="">
                    {test?.reference_titles?.map((title) => (
                      <span>{title}</span>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTest;
