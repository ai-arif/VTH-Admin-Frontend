import React from "react";
import { formatDate } from "../../../../../utils/formatDate";

const TestResultClientInfo = ({ ownerInfo }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Test Result</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      CASE NO
                    </label>
                    <input readOnly={true} type="text" className="form-control" value={ownerInfo?.appointmentId?.caseNo} id="phone" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Date:
                    </label>
                    <input type="text" className="form-control" readOnly value={formatDate(ownerInfo?.appointmentId?.date)} placeholder={new Date().toDateString()} id="phone" />
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
                    <input type="text" className="form-control" id="name" readOnly value={ownerInfo?.appointmentId?.ownerName} />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input type="text" className="form-control" id="phone" readOnly value={ownerInfo?.appointmentId?.phone} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      District
                    </label>
                    {/* select drop down for district */}
                    <select readOnly className="form-select" aria-label="Default select example">
                      <option selected>{ownerInfo?.appointmentId?.district}</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Upazila
                    </label>
                    {/* select dropdown for upazila */}
                    <select readOnly className="form-select" aria-label="Default select example">
                      <option selected>{ownerInfo?.appointmentId?.upazila}</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addres">Address</label>
                    <textarea className="form-control" id="addres" rows="3" readOnly value={ownerInfo?.appointmentId?.address}></textarea>
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

export default TestResultClientInfo;
