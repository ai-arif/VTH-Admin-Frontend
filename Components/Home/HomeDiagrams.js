import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const HomeDiagrams = ({ diagramData }) => {
    const { allAppointments, speciesComplaints, staffs, monthlyOrders, dailyOrders } = diagramData;

    const appointmentData = allAppointments?.map(appointment => {
        return { name: appointment?.department, value: appointment?.count };
    });

    const speciesData = speciesComplaints?.map(species => {
        return { name: species?.species, value: species?.count };
    });

    const staffData = staffs?.map(staff => {
        return { name: staff?.dept, value: staff?.members };
    });

    const COLORS = [
        '#FF8042',
        '#00C49F',
        '#FFBB28',
        '#0088FE',
        "#4CAF50", // Green
        "#2196F3", // Blue
        "#FFEB3B", // Yellow
        "#FF5722", // Orange
        "#9C27B0", // Purple
        "#FF9800", // Amber
        "#009688", // Teal
        "#3F51B5", // Indigo
        "#E91E63", // Pink
        "#CDDC39", // Lime
        "#607D8B", // Blue-grey
        "#795548"  // Brown
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    };

    return (
        <div>
            {/* pie chart */}
            <div className='d-flex align-items-center mb-3'>
                <div className='mb-5'>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={appointmentData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {appointmentData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" />
                    </PieChart>
                    <h6 className='text-center mt-1'>Appointment Overview</h6>
                </div>
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={speciesData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {speciesData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" />
                    </PieChart>
                    <h6 className='text-center mt-1'>Complaints about species</h6>
                </div>
                <div>

                    <PieChart width={400} height={400}>
                        <Pie
                            data={staffData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {staffData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" />
                    </PieChart>
                    <h6 className='text-center mt-1'>Staffs ratio</h6>
                </div>
            </div>

            {/* bar chart  */}
            {/* <div className='mt-5'>
                <div className='mt-5'>
                    <h3 className='text-center'>Daily Order Statistics</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={dailyOrders} margin={{ top: 20, right: 50, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={80} // Adjust height to fit the labels
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total Orders" fill="#8884d8" />
                            <Bar dataKey="Total Sales" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='mt-5'>
                    <h3 className='text-center'>Monthly Order Statistics</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={monthlyOrders} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total Orders" fill="#8884d8" />
                            <Bar dataKey="Total Sales" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div> */}
        </div>
    );
};

export default HomeDiagrams;
