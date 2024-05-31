import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import axiosInstance from "../../utils/axiosInstance";

const IncomingTestHome = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    axiosInstance.get(`/prescription/lab/test`).then((res) => {
      let result = res.data?.data?.data;
      // console.log({ result })
      setPrescriptions(result);
    });
  }, [refetch]);

  const handleStatus = (status, id) => {
    axiosInstance.patch(`/prescription/lab/test/${id}`, { status: status }).then((res) => {
      let result = res.data;
      setRefetch(result);

      if (result.success) {
        toast.success("Status updated successfully!");
      }
    });
  };

  const handleTestCost = (amount = 50, id) => {
    axiosInstance.patch(`/test/test-result/${id}`, { amount }).then((res) => {
      let result = res.data;

      if (result.success) {
        setRefetch(result);
        toast.success("Const updated successfully!");
      }
    });
  };

  return (
    <div className="my-3">
      <div className="mx-5 px-3">
        <h3 className="text-center pb-2">Incoming Test</h3>
        <div className="table-responsive">
          <table className="table table-hover table-borderless table-striped table-dark">
            <thead>
              <tr>
                <th className="text-nowrap">SL.No.</th>
                <th className="text-nowrap">Case No.</th>
                <th className="text-nowrap">Owner Name:</th>
                <th className="text-nowrap">Date:</th>
                <th className="text-nowrap">Test Cost</th>
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
                  <td>{sp?.totalTestCost ? sp?.totalTestCost : <button onClick={() => { handleTestCost(100, sp?._id) }}>Add</button>}</td>

                  <td className="text-nowrap">
                    <select defaultValue={sp?.testStatue} onChange={(e) => handleStatus(e.target.value, sp._id)} className="form-select" aria-label="Default select example">
                      <option value={'success'}>Success</option>
                      <option value={'processing'}>Processing</option>
                      <option value={'pending'}>Pending</option>
                    </select>
                  </td>
                  <td className="d-flex gap-3">
                    <Link href={`/incomming-test/${sp._id}`}>
                      <TiEdit type="button" title="edit" className="edit-icon" />
                    </Link>
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
