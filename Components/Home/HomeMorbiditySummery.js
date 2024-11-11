import React from 'react';
const HomeMorbiditySummery = ({ data }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div style={{ textAlign: 'center' }}>
                <h5>Total Animals</h5>
                <h6>{data?.totalAnimals}</h6>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h5>Total Sick Animals</h5>
                <h6>{data?.totalSickAnimals}</h6>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h5>Total Dead Animals</h5>
                <h6>{data?.totalDeadAnimals}</h6>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h5>Morbidity (%)</h5>
                <h6>{data?.Morbidity}%</h6>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h5>Fatality (%)</h5>
                <h6>{data?.Fatality}%</h6>
            </div>
        </div>
    );
};

export default HomeMorbiditySummery;