import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAppointmentsByPhone } from "../../features/appointment/appointmentSlice";
import { fetchMedicine } from "../../features/medicine/medicineSlice";
import { fetchTest } from "../../features/test/testSlice";

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
  input: (provided) => ({
    ...provided,
    color: "#fff",
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

const PrescriptionHome = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [patentInfo, setPatentInfo] = useState([]);
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.test);
  const { medicines } = useSelector((state) => state.medicine);

  const getPatentByPhone = async () => {
    try {
      if (searchPhone === "") return;

      const res = await dispatch(fetchAppointmentsByPhone(searchPhone));
      const existingPatentData = res?.payload?.data;

      if (existingPatentData.length > 0) {
        toast.success("Patent's Data Found");
        setPatentInfo(existingPatentData);
        console.log(existingPatentData);
        // setValue("ownerName", existingPatentData.ownerName || "");
      } else {
        toast.error("No Data Found!");
      }
    } catch (error) {
      toast.error("No Data Found!");
      console.error(error);
    }
  };

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ values: { ownerName: patentInfo[0]?.ownerName, date: patentInfo[0]?.date } });

  useEffect(() => {
    dispatch(fetchMedicine());
    dispatch(fetchTest());
  }, [dispatch]);

  // Transforming tests and medicines data
  const testOptions = tests?.data?.map((test) => ({
    value: test.testName,
    label: test.testName,
  }));

  const medicineOptions = medicines?.data?.map((medicine) => ({
    value: medicine.name,
    label: medicine.name,
  }));

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
                  <input
                    onChange={(e) => {
                      setSearchPhone(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Patent's Phone"
                    aria-label="Patent's phone"
                    aria-describedby="button-addon2"
                  />
                  <button onClick={getPatentByPhone} className="btn my-2 mx-1 btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                  <span className="small opacity-75 ps-2">(First search appointment using owner's phone)</span>
                </div>
                <div className="col-md-6"></div>
              </div>
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Select Appointment</label>
                    {/* show owner name */}
                    <select className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      {patentInfo?.map((patent) => (
                        <option value={patent.ownerName}>
                          {patent.ownerName} {patent.date}
                        </option>
                      ))}
                    </select>
                    {errors.ownerName && <small className="text-danger">Please write owner name</small>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">CASE NO</label>
                    <input readOnly={true} type="text" className="form-control" value={"pxx3233Wr"} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Owner Name</label>
                    <input {...register("ownerName", { required: true })} type="text" className="form-control" />
                    {/* {errors.ownerName && <small className="text-danger">Please write owner name</small>} */}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District</label>
                    <select className="form-select" aria-label="Default select example">
                      <option value="2">Mymensingh</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Upazila
                    </label>
                    {/* select dropdown for upazila */}
                    <select className="form-select" aria-label="Default select example">
                      <option value="">Select</option>
                      <option value="Mymensingh Sadar">Mymensingh Sadar</option>
                      <option value="Trishal">Trishal</option>
                      <option value="Bhaluka">Bhaluka</option>
                      <option value="Fulbaria">Fulbaria</option>
                      <option value="Muktagacha">Muktagacha</option>
                      <option value="Gafargaon">Gafargaon</option>
                      <option value="Gauripur">Gauripur</option>
                      <option value="Ishwarganj">Ishwarganj</option>
                      <option value="Nandail">Nandail</option>
                      <option value="Tarakanda">Tarakanda</option>
                      <option value="Fulpur">Fulpur</option>
                      <option value="Haluaghat">Haluaghat</option>
                      <option value="Dhubaura">Dhubaura</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Medicine</label>
                    <Select options={medicineOptions} isMulti isSearchable name="medicines" styles={customStyles} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Tests</label>
                    <Select options={testOptions} isMulti isSearchable name="tests" styles={customStyles} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">Diagnose</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Advice</label>
                    <textarea className="form-control" rows="5"></textarea>
                  </div>
                </div>
                <div className="my-3 d-flex justify-content-center gap-4">
                  <button type="reset" className="btn btn-danger text-white">
                    Reset
                  </button>
                  <button type="submit" className="btn app-btn-primary">
                    Submit
                  </button>
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
