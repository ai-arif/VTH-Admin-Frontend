import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserPatient, searchUserPatientAsync, setCurrentPage } from "../../features/userPatient/userPatientSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";

const UserHome = () => {
  const search = useRef("");
  const dispatch = useDispatch();
  const { userPatients, status, currentPage, totalPages } = useSelector((state) => state.userPatient);
  const [searchMode, setSearchMode] = useState(false);

  const handleSearch = async (page = 1) => {
    setSearchMode(true);
    try {
      const searchValue = search.current.value;
      if (searchValue.trim()) {
        const res = await dispatch(searchUserPatientAsync({ search: searchValue, page }));
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

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    if (searchMode) {
      handleSearch(page);
    } else {
      dispatch(fetchAllUserPatient({ page }));
    }
  };

  useEffect(() => {
    dispatch(fetchAllUserPatient({ page: currentPage }));
  }, [dispatch, currentPage]);

  if (status === "loading") return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <div className="app-card p-5 text-center shadow-sm">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="input-group w-50">
                  <input ref={search} onKeyDown={handleKeyPress} type="text" className="form-control" placeholder="Recipient's name or phone" />
                  <button onClick={() => handleSearch(currentPage)} className="btn btn-primary text-white" type="button" id="button-addon2">
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
                      {userPatients?.map((user, idx) => (
                        <tr key={user._id}>
                          <td>{(currentPage - 1) * 10 + idx + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
