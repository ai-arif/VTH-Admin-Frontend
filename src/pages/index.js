import React from "react";
import HomeOverview from "../../Components/Home/HomeOverview";

// export const getServerSideProps = async (context) => {
//   const token = context.req.cookies.token

//   if (!token || token === 'null' || token==='undefined') {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: { token },
//   }
// }

const index = () => {
  return (
    <div>
      <HomeOverview />
    </div>
  );
};

export default index;
