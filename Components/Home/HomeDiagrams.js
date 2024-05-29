import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const HomeDiagrams = ({ diagramData }) => {
    const { allAppointments, speciesComplaints, staffs } = diagramData;

    const appointmentData = allAppointments?.map(appointment => {
        return { name: appointment?.department, value: appointment?.count };
    });

    const speciesData = speciesComplaints?.map(species => {
        return { name: species?.species, value: species?.count };
    });

    const staffData = staffs?.map(staff => {
        return { name: staff?.dept, value: staff?.members };
    });

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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

    return (
        <div className='d-flex align-items-center mb-3'>
            <div>
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
                    <Legend />
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
                    <Legend />
                </PieChart>
                <h6 className='text-center mt-1'>Complaints species</h6>
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
                    <Legend />
                </PieChart>
                <h6 className='text-center mt-1'>Staffs ratio</h6>
            </div>
        </div>
    );
};

export default HomeDiagrams;
