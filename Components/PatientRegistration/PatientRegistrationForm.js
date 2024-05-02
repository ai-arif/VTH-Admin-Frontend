import React from "react";

const PatientRegistrationForm = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Patient Registration</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Recipient's Phone" aria-label="Recipient's phone" aria-describedby="button-addon2" />
                  <button className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="text-secondary small">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Select Appointment
                    </label>
                    {/* select field */}
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      CASE NO
                    </label>
                    <input readOnly={true} type="text" className="form-control" value={"pxx3233Wr"} id="phone" />
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
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="name" className="form-label">
                        Tag
                      </label>
                      <input type="text" className="form-control" id="tag" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Identification Mark
                      </label>
                      <input type="text" className="form-control" id="phone" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="name" className="form-label">
                        Species
                      </label>
                      <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Breed
                      </label>
                      <input type="text" className="form-control" id="phone" />
                    </div>
                  </div>
                  {/* add a submit button */}
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary text-white">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
