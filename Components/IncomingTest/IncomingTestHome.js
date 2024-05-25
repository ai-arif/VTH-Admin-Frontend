import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const IncomingTestHome = () => {

    const [prescriptions, setPrescriptions] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/prescription/lab/test`).then(res => {
            let result = res.data?.data?.data;
            setPrescriptions(result);
            console.log(result);
            // console.log(transformInput(result[0]?.data));
        });
    }, []);

    return (
        <div>
            <div className='mx-5 px-3'>
                <div className="table-responsive">
                    <table className="table table-hover table-borderless table-striped table-dark">
                        <thead>
                            <tr>
                                <th className="text-nowrap">SL.No.</th>
                                <th className="text-nowrap">Case No.</th>
                                <th className="text-nowrap">Owner Name:</th>
                                <th className="text-nowrap">Date:</th>
                                <th className="text-nowrap">Status:</th>
                                <th className="text-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions?.map((sp, index) => (
                                <tr key={sp._id}>
                                    <td>{index + 1}</td>
                                    <td>{sp?.appointment?.caseNo}</td>
                                    <td>{sp?.appointment?.ownerName}</td>
                                    <td className="text-nowrap">{new Date(sp?.appointment?.createdAt).toDateString()}</td>
                                    <td className="text-nowrap">test status..</td>
                                    <td className="d-flex gap-3">
                                        <Link href={`/incomming-test/${sp._id}`}><TiEdit type="button" title="edit" className="edit-icon" /></Link>
                                        <RiDeleteBinLine type="button" onClick={() => { }} title="delete" className="delete-icon" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex  align-items-center gap-2">
                        <span className="text-nowrap">Items per page</span>
                        <select className="form-select">
                            <option value="1">10</option>
                            <option value="2">20</option>
                            <option value="3">50</option>
                            <option value="4">100</option>
                        </select>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Previous
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default IncomingTestHome;