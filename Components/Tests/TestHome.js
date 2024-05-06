import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest } from "../../features/test/testSlice";
import AddTest from "./modals/AddTest";

const TestHome = () => {
  const dispatch = useDispatch();
  const { tests, status } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  // useEffect(()=>{
  //   const response = axios.get('http://localhost:8080/api/v1/test')
  //   console.log(response)

  //   //console.log("here showing all tests", tests);
  // },[])

  if (status === "loading") return <h2>Loading..</h2>;

  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          {/* also create Actions tr, with edit and delete */}
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <AddTest />
            <div className="app-card p-5 text-center shadow-sm mt-5">
              <div className="d-flex justify-content-between mb-4">
                {/* <h1 className="page-title mb-4">Test List</h1> */}
                <input type="email" className="form-control w-25" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search by title" />

                <div>
                  <button data-bs-toggle="modal" data-bs-target="#addUser" className="btn app-btn-primary">
                    <FaPlus /> Add Test
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover table-borderless table-striped table-dark">
                  <thead>
                    <tr>
                      <th>SL.No</th>
                      <th>Test Name</th>
                      <th>Short Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests?.data?.map((test, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-nowrap">{test.testName}</td>
                        <td className="w-75">{test.testDetails}</td>
                        <td className="d-flex gap-3">
                          <button className="btn  btn-info text-white">Edit</button>
                          <button className="btn btn-danger text-white">Delete</button>
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
                    <option selected>10</option>
                    <option value="1">20</option>
                    <option value="2">50</option>
                    <option value="3">100</option>
                  </select>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li class="page-item">
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
        </div>
      </div>
    </div>
  );
};

export default TestHome;
