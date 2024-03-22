import React from 'react'

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token
  
  if (!token || token === 'null' || token==='undefined') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
  
  return {
    props: { token },
  }
}


const index = () => {
  return (
    <div className=''>
      <h1>OverView</h1>
    </div>
  )
}

export default index
