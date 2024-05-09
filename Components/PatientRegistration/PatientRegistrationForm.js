import React from "react";

const PatientRegistrationForm = () => {
  return (
    <div className="container-fluid px-0">
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
                  <span className="small opacity-75">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form id="patient-registration">
                <div className="info-group">
                  <h5 className="text-center pb-2">Owner Information :</h5>
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
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="addres">Address</label>
                      <textarea className="form-control" id="addres"></textarea>
                    </div>
                  </div>
                </div>
                <div className="info-group">
                  <h5 className="text-center pb-2">Patent Information:</h5>
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
                </div>
                <div className="info-group">
                  <h5 className="text-center pb-2">History of Patent:</h5>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="disease_history" className="form-label">
                        Disease History
                      </label>
                      <textarea className="form-control" id="disease_history" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="treatment_history" className="form-label">
                        Treatment History
                      </label>
                      <textarea className="form-control" id="treatment_history" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="management_history" className="form-label">
                        Management History
                      </label>
                      <textarea className="form-control" id="management_history" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="clinical_signs" className="form-label">
                        Clinical Signs
                      </label>
                      <textarea className="form-control" id="clinical_signs" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="rectal" className="form-label">
                        Rectal Palpation/ Necropsy/ X-ray/ Ultrasound
                      </label>
                      <input type="text" className="form-control" id="rectal" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="laboratory" className="form-label">
                        Laboratory Findings
                      </label>
                      <input type="text" className="form-control" id="laboratory" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="diagnosis" className="form-label">
                        Diagnosis (Presumptive/Confirmatory)
                      </label>
                      <input type="text" className="form-control" id="diagnosis" />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="prognosis" className="form-label">
                        Prognosis
                      </label>
                      <input type="text" className="form-control" id="prognosis" />
                    </div>
                  </div>
                </div>
                {/* add a submit button */}
                <div className="d-flex d-flex justify-content-center gap-4 my-3">
                  <button type="reset" className="btn btn-danger text-white">
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary text-white">
                    Submit
                  </button>
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
