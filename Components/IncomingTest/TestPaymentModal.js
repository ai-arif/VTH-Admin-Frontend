import React from "react";

const TestPaymentModal = ({ handleTestCost, title }) => {
  return (
    <div>
      <div className="modal fade" id="paymentModal" tabIndex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addUserLabel">
                Add {title} fees
              </h1>
              <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleTestCost} className="modal-body">
              <div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label ">
                    <span className="text-capitalize">{title}</span> amount
                  </label>
                  <input placeholder="Enter amount.." name="amount" type="number" required className={`form-control`} />
                </div>

                <div className="d-flex gap-4 justify-content-end">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn app-btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPaymentModal;
