import React from 'react'
import UsersHome from '../../Components/Users/UsersHome'

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
    <div className=''>
      <UsersHome/>
    </div>
  )
}

export default index
