import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserPatient, searchUserPatientAsync } from "../../features/userPatient/userPatientSlice";
import Loader from "../UI/Loader";

const UserHome = () => {
  const search = useRef("");
  const dispatch = useDispatch();
  const { userPatients, status } = useSelector((state) => state.userPatient);
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async () => {
    try {
      const searchValue = search.current.value;
      if (searchValue.trim()) {
        const res = await dispatch(searchUserPatientAsync(searchValue));
        if (res?.payload?.data?.users?.length <= 0) {
          toast.error("Data Not Found!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    dispatch(fetchAllUserPatient({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const pageArray = [];

    for (let i = 0; i < userPatients?.totalPages; i++) {
      pageArray.push(i + 1);
    }
    setPage(pageArray);
  }, [userPatients?.totalPages]);

  // loader
  // if (status === "loading") return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <div className="app-card p-5 text-center shadow-sm">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="input-group w-50">
                  <input ref={search} onKeyDown={handleKeyPress} type="text" className="form-control" placeholder="Recipient's name or phone" />
                  <button onClick={handleSearch} className="btn btn-primary text-white" type="button" id="button-addon2">
                    Search
                  </button>
                </div>
                <h3 className="page-title">All Users</h3>
              </div>
              <div className="mb-4">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-striped table-dark">
                    <thead>
                      <tr>
                        <th>SL.No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPatients?.users?.map((user, idx) => (
                        <tr key={user._id}>
                          <td>{idx + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* footer part pagination */}
              <div className="d-flex justify-content-end align-items-center">
                {/* pagination  */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <button disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} className="page-link" href="#">
                        Previous
                      </button>
                    </li>
                    {page?.length > 5 ? (
                      <>
                        {page?.slice(0, 2)?.map((p, index) => (
                          <li key={index} className="page-item">
                            <button onClick={() => setCurrentPage(p)} className={`page-link ${currentPage == p ? "bg-primary" : ""}`} href="#">
                              {p}
                            </button>
                          </li>
                        ))}
                        {currentPage == 3 && (
                          <li className="page-item">
                            <button className="page-link bg-primary" href="#">
                              {currentPage}
                            </button>
                          </li>
                        )}
                        <li className="page-item">
                          <button className="page-link" href="#">
                            ...
                          </button>
                        </li>
                        {currentPage > 3 && currentPage < page?.length - 2 && (
                          <>
                            <li className="page-item">
                              <button className="page-link bg-primary" href="#">
                                {currentPage}
                              </button>
                            </li>
                            <li className="page-item">
                              <button className="page-link" href="#">
                                ...
                              </button>
                            </li>
                          </>
                        )}
                        {currentPage == page?.length - 2 && (
                          <li className="page-item">
                            <button className="page-link bg-primary" href="#">
                              {currentPage}
                            </button>
                          </li>
                        )}
                        {page?.slice(page?.length - 2, page?.length)?.map((p, index) => (
                          <li key={index} className="page-item">
                            <button onClick={() => setCurrentPage(p)} className={`page-link ${currentPage == p ? "bg-primary" : ""}`} href="#">
                              {p}
                            </button>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {page?.map((p, index) => (
                          <li key={index} className="page-item">
                            <button onClick={() => setCurrentPage(p + 1)} className={`page-link ${currentPage == p + 1 ? "bg-primary" : ""}`} href="#">
                              {p}
                            </button>
                          </li>
                        ))}
                      </>
                    )}
                    <li className="page-item">
                      <button disabled={currentPage == page?.length} onClick={() => setCurrentPage(currentPage + 1)} className="page-link" href="#">
                        Next
                      </button>
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

export default UserHome;
