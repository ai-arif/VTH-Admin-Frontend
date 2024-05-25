import React from 'react';
import IncomingTestHome from '../../../Components/IncomingTest/IncomingTestHome';

const index = () => {
    return (
        <div>
            <h3 className='text-center'>Incoming Test</h3>

            {/* table */}
            <IncomingTestHome />
        </div>
    );
};

export default index;