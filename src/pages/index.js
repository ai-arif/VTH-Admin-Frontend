import React from "react";
import StaffsHome from "../../Components/Staffs/StaffsHome";

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
      <StaffsHome />
    </div>
  );
};

export default index;
