import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const HomeMorbidityDiagram = ({ data }) => {
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        // Format date labels and add total row
        const formatted = data?.map(stat => ({
            ...stat,
            date: stat.date === "Total" ? stat.date : new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }).format(new Date(stat.date))
        }));
        setFormattedData(formatted);
    }, [data]);

    // Custom tooltip content that includes all necessary information
    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const { Morbidity, Fatality, totalAnimals, totalSickAnimals, totalDeadAnimals } = payload[0].payload;
            return (
                <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                    <p><strong>Date:</strong> {label}</p>
                    <p style={{ color: '#8884d8' }}><strong>Morbidity:</strong> {Morbidity}%</p>
                    <p style={{ color: '#FF6347' }}><strong>Fatality:</strong> {Fatality}%</p>
                    <p style={{ color: '#4CAF50' }}><strong>Total Animals:</strong> {totalAnimals}</p>
                    <p style={{ color: '#FF9800' }}><strong>Total Sick Animals:</strong> {totalSickAnimals}</p>
                    <p style={{ color: '#9E9E9E' }}><strong>Total Dead Animals:</strong> {totalDeadAnimals}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorMorbidity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFatality" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6347" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FF6347" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <XAxis
                    dataKey="date"
                    tick={{ angle: -45, textAnchor: 'end' }}  // Rotates the X-axis labels
                    height={80}  // Optional: adjust the height if labels overlap
                />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={customTooltip} />
                <Legend />

                {/* Areas for Morbidity and Fatality */}
                <Area type="monotone" dataKey="Morbidity" stroke="#8884d8" fill="url(#colorMorbidity)" name="Morbidity (%)" />
                <Area type="monotone" dataKey="Fatality" stroke="#FF6347" fill="url(#colorFatality)" name="Fatality (%)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default HomeMorbidityDiagram;
