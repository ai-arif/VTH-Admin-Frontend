import React from "react";
import Select from "react-select";

// Define custom styles
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2d323f",
    borderColor: state.isFocused ? "#15a362" : "white",
    "&:hover": {
      borderColor: state.isFocused ? "#15a362" : "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#fff",
    backgroundColor: state.isSelected ? "#15a362" : "#2d323f",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#15a362",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

// Define tests option
const options = [
  { value: "test one", label: "Test One" },
  { value: "test two", label: "Test two" },
  { value: "test three", label: "Test three" },
];

const PrescriptionHome = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title text-center">Prescription</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Recipient's Phone" aria-label="Recipient's phone" aria-describedby="button-addon2" />
                  <button className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="opacity-75 small">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Select Appointment
                    </label>
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
                      <label htmlFor="email" className="form-label">
                        Medicine
                      </label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Select</option>
                        <option value="1">Napa</option>
                        <option value="2">Alatrol</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Diagnose
                      </label>
                      <input type="text" className="form-control" id="phone" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addres">Advice</label>
                    <textarea className="form-control" id="addres" rows="5"></textarea>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Tests
                      </label>
                      <Select options={options} isMulti name="tests" styles={customStyles} />
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

export default PrescriptionHome;
