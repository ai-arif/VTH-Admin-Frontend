import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserPatient, searchUserPatientAsync } from "../../features/userPatient/userPatientSlice";
import Loader from "../UI/Loader";
import Pagination from "../UI/Pagination";

const UserHome = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { userPatients, status, totalPages } = useSelector((state) => state.userPatient);
  const currentPage = parseInt(router.query.page) || 1;

  const handleSearch = async () => {
    try {
      if (search.trim()) {
        const res = await dispatch(searchUserPatientAsync({ search }));
        if (res?.payload?.data?.users?.length <= 0) {
          toast.error("Data Not Found!");
        }
      } else {
        await dispatch(fetchAllUserPatient({ page: currentPage }));
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

  const handlePageChange = async (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchAllUserPatient({ page: currentPage }));
    }
  }, [router.isReady, dispatch, currentPage]);

  // loader
  // if (status === "loading" && currentPage < 2) return <Loader />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-lg-12 col-xl-12 mx-auto">
            <div className="app-card p-5 text-center shadow-sm">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="input-group w-50">
                  <input onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} type="search" className="form-control" placeholder="Recipient's name or phone" />
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
                      {userPatients?.map((user, idx) => (
                        <tr key={user._id}>
                          <td>{(currentPage - 1) * 15 + idx + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* pagination */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
