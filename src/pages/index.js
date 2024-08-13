import React from "react";
import { useSelector } from "react-redux";
import HomeOverview from "../../Components/Home/HomeOverview";

const index = () => {
  const { data } = useSelector((state) => state.loggedInUser);

  return (
    <div>
      {data?.role === "admin" || data?.role === "doctor" ? (
        <HomeOverview />
      ) : (
        <div className="text-center my-5">
          <h1>Dashboard Home</h1>
        </div>
      )}
    </div>
  );
};

export default index;
