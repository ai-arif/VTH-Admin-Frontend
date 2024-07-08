import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTestResult } from "../../features/incoming-test/incomingTestSlice";

const ViewTestResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { incomingTest, status } = useSelector((state) => state.incomingTest);
  console.log(incomingTest);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTestResult(id));
    }
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title text-center">Test Result</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      CASE NO
                    </label>
                    <input readOnly={true} type="text" className="form-control" value={"pxx3233Wr"} id="phone" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Date:
                    </label>
                    <input type="text" className="form-control" placeholder={new Date().toDateString()} id="phone" />
                  </div>
                </div>
                <div className="d-flex justify-content-center my-3 mb-3">
                  <div>
                    <h4>Owner's Information</h4>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Owner Name
                    </label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input type="text" className="form-control" id="phone" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      District
                    </label>
                    {/* select drop down for district */}
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Select</option>
                      <option value="1">Rajshahi</option>
                      <option value="2">Mymensingh</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Upazila
                    </label>
                    {/* select dropdown for upazila */}
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Select</option>
                      <option value="1">Chapainawabganj</option>
                      <option value="2">Sibganj</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addres">Address</label>
                    <textarea className="form-control" id="addres" rows="3"></textarea>
                  </div>
                  <div className="d-flex justify-content-center my-3 mb-3">
                    <div>
                      <h4>Patient's Clinical Information</h4>
                      <hr />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTestResult;
