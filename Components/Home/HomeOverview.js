import React, { useEffect, useState } from "react";
import { BsCardChecklist, BsShop } from "react-icons/bs";
import { FaFilePrescription } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { GiCow, GiMedicines } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { ImLab } from "react-icons/im";
import { MdOutlineDateRange, MdOutlineSick } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiFileList3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import HomeDiagrams from "./HomeDiagrams";

const HomeOverview = () => {
  const { data } = useSelector((state) => state.loggedInUser);

  const [allData, setAllData] = useState({});
  const [days, setDays] = useState(1);

  useEffect(() => {
    axiosInstance.get(`/overview?daysBefore=${days}`).then((res) => {
      setAllData(res.data?.data);
    });
  }, [days]);

  const {
    totalRoles,
    staffs,
    totalStuffs,
    users,
    departments,
    clinicalTests,
    species,
    speciesComplaints,
    totalComplaints,
    medicines,
    allAppointments,
    totalAppointment,
    prescriptions,
    pharmacyOrders,
    testResults,
    totalPatientRegister,
    monthlyOrders,
    dailyOrders,
  } = allData;

  // console.log({ allData })

  return (
    <div className="p-3">
      {/* heading content  */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="mb-3">
          <h6>Welcome {data?.fullName || "back"}</h6>
          <p>Have a nice day at great work</p>
        </div>
        <div style={{ width: "fit-content" }}>
          <p>
            Showing data of last {days == 365 && "1 year"}
            {days == 180 && "6 months"}
            {days == 30 && "1 month"}
            {days == 15 && "15 days"}
            {days == 7 && "7 days"}
            {days == 1 && "24 hours"}
          </p>
          <div style={{ width: "fit-content" }} className="d-flex gap-2 align-items-center">
            <label style={{ width: "fit-content", whiteSpace: "nowrap" }}>Filter overviews</label>
            {/* select drop down for district */}
            <select defaultValue={days} onChange={(e) => setDays(e.target.value)} className="form-select" aria-label="Default select example">
              <option value="1">1 days</option>
              <option value="7">7 days</option>
              <option value="15">15 days</option>
              <option value="30">1 month</option>
              <option value="180">6 month</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>
      </div>

      {/* main contents  */}
      <div className="container">
        <div className="row gap-3 my-3">
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <MdOutlineDateRange className="display-2" />
            <div className="">
              <h1 className="m-0">{totalAppointment}</h1>
              <p>Appointments</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <FaFilePrescription className="display-2" />
            <div className="">
              <h1 className="m-0">{prescriptions}</h1>
              <p>Prescriptions</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <BsShop className="display-2" />
            <div className="">
              <h1 className="m-0">{pharmacyOrders}</h1>
              <p>Pharmacy orders</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <BsCardChecklist className="display-2" />
            <div className="">
              <h1 className="m-0">{testResults}</h1>
              <p>Lab test (result)</p>
            </div>
          </div>
        </div>

        <div className="row gap-3 my-3">
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <MdOutlineSick className="display-2" />
            <div className="">
              <h1 className="m-0">{totalPatientRegister}</h1>
              <p>Registered patients</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <GiMedicines className="display-2" />
            <div className="">
              <h1 className="m-0">{medicines}</h1>
              <p>Available Medicines</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <ImLab className="display-2" />
            <div className="">
              <h1 className="m-0">{clinicalTests}</h1>
              <p>Available tests</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <GiCow className="display-2" />
            <div className="">
              <h1 className="m-0">{species}</h1>
              <p>Serving species</p>
            </div>
          </div>
        </div>

        <div className="row gap-3 my-3">
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <GrUserWorker className="display-2" />
            <div className="">
              <h1 className="m-0">{totalStuffs}</h1>
              <p>Total stuffs (+ admin)</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <PiUsersThreeFill className="display-2" />
            <div className="">
              <h1 className="m-0">{users}</h1>
              <p>Users</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <FcDepartment className="display-2" />
            <div className="">
              <h1 className="m-0">{departments}</h1>
              <p>Departments</p>
            </div>
          </div>
          <div className="col bg-primary text-white rounded p-2 d-flex justify-content-start gap-2 align-items-center">
            <RiFileList3Line className="display-2" />
            <div className="">
              <h1 className="m-0">{totalComplaints}</h1>
              <p>Total Complaints</p>
            </div>
          </div>
        </div>
      </div>

      {/* diagram */}
      <HomeDiagrams diagramData={{ allAppointments, speciesComplaints, staffs, monthlyOrders, dailyOrders }} />
    </div>
  );
};

export default HomeOverview;
