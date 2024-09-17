import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTest } from "../../features/test/testSlice";
import Loader from "../UI/Loader";

const ViewTest = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { test, status } = useSelector((state) => state.test);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTest(id));
    }
  }, [dispatch, id]);

  //   console.log(test);

  //   loader
  // if (status === "loading") return <Loader />;

  return (
    <div className="container-fluid">
      <div className="app-card px-1 text-end shadow-sm">
        <h4 className="page-title text-start py-2">{test?.testName}</h4>
        {test?.tests?.map((test, idx) => (
          <div key={idx} className="table-responsive">
            <h5 className="text-start">{test?.test_subTitle}</h5>
            <table className="table table-striped table-dark">
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
                    <td className=""></td>
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
        <div className="text-start pb-2">
          <h6>Interpretation:</h6>
          <h6 className="pt-2">Name of laboratory technician/Consultant:</h6>
        </div>
      </div>
    </div>
  );
};

export default ViewTest;
