import React from "react";
import { Area, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#4CAF50", "#2196F3", "#FFEB3B", "#FF5722", "#9C27B0", "#FF9800", "#009688", "#3F51B5", "#E91E63", "#CDDC39", "#607D8B", "#795548"];

const HomeNewDiagrams = ({ overview2, start, end }) => {
  const { Species: transformedData, monthlyData } = overview2 || {};
  // Format day-wise data for the chart
  const formattedDayData = transformedData?.map((entry) => ({
    date: entry.date,
    ...entry,
  }));

  const calculateTotal = (data) => {
    return Object.keys(data)
      .filter((key) => key !== "date" && key !== "month")
      .reduce((total, species) => total + data[species], 0);
  };

  // Format monthly data for the chart
  const formattedMonthlyData = monthlyData?.map((item) => ({
    month: item.month,
    ...item,
  }));

  // Function to calculate total appointments for each month
  const calculateTotalMonthly = (data) => {
    return Object.keys(data)
      .filter((key) => key !== "month") // Exclude 'month' key
      .reduce((total, species) => total + data[species], 0);
  };

  return (
    <div className="mb-5 pb-5">
      {/* Day-wise Chart */}
      <div style={{ width: "100%", height: 400 }}>
        {/* <h3 className='text-center mt-4'>Species wise Daily Statistics (Based on appointment)</h3> */}
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={formattedDayData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="#f5f5f5" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} height={90} />
            <YAxis />
            <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;

                const totalAppointments = calculateTotal(payload[0].payload);
                const date = payload[0].payload.date;

                return (
                  <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                    <div>
                      <strong>Date: {date}</strong>
                    </div>
                    <div>
                      <strong>Total Appointments: {totalAppointments}</strong>
                    </div>
                    {payload?.map((entry, index) => (
                      <div key={index} style={{ color: entry.stroke }}>
                        {entry.name}: {entry.value}
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Legend />

            {/* Area Chart for Each Species */}
            {Object?.keys(formattedDayData?.[0] || {})?.map((species, index) => {
              if (species === "date") return null; // Skip the 'date' field

              return (
                <React.Fragment key={species}>
                  <Area type="monotone" dataKey={species} fill={colors[index % colors.length]} stroke={colors[index % colors.length]} fillOpacity={0.3} name={species} />
                </React.Fragment>
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Chart */}
      {/* <div style={{ width: "100%", height: 400 }}>
                <h3 className='text-center mt-5 pt-5'>Species wise Monthly Statistics (Based on appointment)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={formattedMonthlyData}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="#f5f5f5" />
                        <XAxis
                            dataKey="month"
                            angle={-45}
                            textAnchor="end"
                            interval={0}
                            height={100}
                        />
                        <YAxis />
                        <Tooltip
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;

                                const month = payload[0].payload.month;
                                const totalAppointments = calculateTotalMonthly(payload[0].payload);

                                return (
                                    <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                                        <div><strong>Month: {month}</strong></div>
                                        <div><strong>Total Appointments: {totalAppointments}</strong></div>
                                        {payload?.map((entry, index) => (
                                            <div key={index} style={{ color: entry.stroke }}>
                                                {entry.name}: {entry.value}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                        <Legend />

                        {Object?.keys(formattedMonthlyData?.[0] || {})?.map((species, index) => {
                            if (species === "month") return null;

                            return (
                                <React.Fragment key={species}>
                                    <Area
                                        type="monotone"
                                        dataKey={species}
                                        fill={colors[index % colors.length]}
                                        stroke={colors[index % colors.length]}
                                        fillOpacity={0.3}
                                        name={species}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </ComposedChart>
                </ResponsiveContainer>
            </div> */}
    </div>
  );
};

export default HomeNewDiagrams;
