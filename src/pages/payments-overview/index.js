import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import axiosInstance from "../../../utils/axiosInstance";

const PaymentsOverviewPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleFilter = async () => {
    if (!startDate || !endDate) return;

    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      const response = await axiosInstance.get(`/staffs/total-amount`, {
        params: {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        },
      });

      if (response?.data?.success) {
        setAmount(response.data.data);
        toast.success("Data Founded!");
      } else {
        toast.error("No Data Found!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred!");
    }
  };

  // Calculate the total amount
  const totalAmount = (amount?.totalAppointmentAmount || 0) + (amount?.totalTestResultAmount || 0);

  return (
    <div className="container-fluid">
      <div className="app-card p-5 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <form className="d-flex align-items-center gap-3">
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  isClearable
                  className="form-control"
                  placeholderText="Select a date range"
                />
              </div>
              <button type="button" className="btn btn-primary text-white" onClick={handleFilter} disabled={!startDate || !endDate}>
                Filter Payments
              </button>
            </form>
          </div>
          <h3 className="page-title">Payments Overview</h3>
        </div>
        <div className="mb-4 mt-5">
          <h3 className="text-center">Show Amounts</h3>
          <div className="border mt-4 p-3 rounded">
            <h5>Total Appointment Amount: ৳{amount?.totalAppointmentAmount !== null ? amount?.totalAppointmentAmount : "No data"}</h5>
            <h5 className="py-2">Total Test Result Amount: ৳{amount?.totalTestResultAmount !== null ? amount?.totalTestResultAmount : "No data"}</h5>
            <h5>Total Amount: ৳{totalAmount !== null ? totalAmount : "No data"}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsOverviewPage;
