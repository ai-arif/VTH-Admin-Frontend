import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Custom Tooltip Renderer with Percentage
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const count = payload[0].value;

        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label"><strong>{label}</strong></p>
                <p className="intro">Total appointments: {count}</p>
                {/* Add more custom information here */}
            </div>
        );
    }

    return null;
};

const Species_Diseases_Chart = ({ data }) => {
    return (
        <div className=''>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        layout="vertical"
                        data={data?.Species?.[0]?.allAppointments}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        barSize={80}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="species" width={200} /> {/* Dynamically adjust Y-axis width */}
                        <Tooltip content={<CustomTooltip />} /> {/* Custom Tooltip with percentage */}
                        <Legend />
                        <Bar
                            dataKey="count"
                            stackId="a"
                            fill="#82ca9d"
                            name="Species wise statistics"
                            isAnimationActive={false}
                        >
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ marginTop: "50px" }}>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        layout="vertical"
                        data={data?.Upazila?.[0]?.allAppointments}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        barSize={80}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="upazila" width={200} /> {/* Dynamically adjust Y-axis width */}
                        <Tooltip content={<CustomTooltip />} /> {/* Custom Tooltip with percentage */}
                        <Legend />
                        <Bar
                            dataKey="count"
                            stackId="a"
                            fill="#82ca9d"
                            name="Upazila wise statistics"
                            isAnimationActive={false}
                        >
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Species_Diseases_Chart;
