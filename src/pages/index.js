import React from "react";
import { useSelector } from "react-redux";
import HomeOverview from "../../Components/Home/HomeOverview";

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token || token === "null" || token === "undefined") {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
};

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
