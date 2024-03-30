import React, { useState } from 'react'
import axiosInstance from '../../../../utils/axiosInstance'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Link from 'next/link'

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.token
    
    if (token && token!='undefined') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    
    return {
      props: {  },
    }
    
  }

const index = () => {
    const [userObj, setUserObj] = useState({ phone: '', password: '' })
    const [loading, setLoading] = useState(false)
    const router=useRouter()
    const handleChange = (e) => {
        setUserObj({ ...userObj, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('/login', userObj)
            if (response.data.success) {
                Cookies.set('token', response.data?.data?.token)
                toast.success(response.data.message)
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="row g-0 app-auth-wrapper">
                <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
                    <div className="d-flex flex-column align-content-end">
                        <div className="app-auth-body mx-auto">
                            <div className="app-auth-branding mb-4"><Link className="app-logo" href="/auth/login"><img className="logo-icon me-2" src="/assets/images/logo.png" alt="logo" /></Link></div>
                            <h2 className="auth-heading text-center mb-5">Log in to Portal</h2>
                            <div className="auth-form-container text-start">
                                <form className="auth-form login-form">
                                    <div className="phone mb-3">
                                        <label className="sr-only" for="signin-phone">Phone</label>
                                        <input value={userObj.phone} onChange={handleChange} id="signin-phone" name="phone" type="phone" className="form-control signin-phone" placeholder="Phone number" required="required" />
                                    </div>
                                    <div className="password mb-3">
                                        <label className="sr-only" for="signin-password">Password</label>
                                        <input value={userObj.password} onChange={handleChange} id="signin-password" name="password" type="password" className="form-control signin-password" placeholder="Password" required="required" />
                                        <div className="extra mt-3 row justify-content-between">
                                            <div className="col-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="RememberPassword" />
                                                    <label className="form-check-label" for="RememberPassword">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="forgot-password text-end">
                                                    <a href="reset-password.html">Forgot password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        {
                                            loading ? 
                                            <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Loading...</button>
                                             : <button onClick={handleSubmit} type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Log In</button>
                                        }
                                    </div>
                                </form>

                                <div className="auth-option text-center pt-5">No Account? Sign up <a className="text-link" href="signup.html" >here</a>.</div>
                            </div>

                        </div>

                        <footer className="app-auth-footer">
                            <div className="container text-center py-3">

                                <small className="copyright">Copyright BAU 2024 </small>

                            </div>
                        </footer>
                    </div>
                </div>
                <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                    <div className="auth-background-holder">
                    </div>
                    <div className="auth-background-mask"></div>
                    <div className="auth-background-overlay p-3 p-lg-5">
                        <div className="d-flex flex-column align-content-end h-100">
                            {/* <div className="h-100"> */}
                                <img width={"100%"} src="https://img.freepik.com/free-vector/cat-owner-visiting-talking-vet-doctors_1262-21219.jpg" alt="" />
                            {/* </div> */}
                            <div className="overlay-content p-3 p-lg-4 rounded">
                                <h5 className="mb-3 overlay-title">Veterinary Doctor Login Portal</h5>
                                <div>Welcome to the Veterinary Doctor Login Portal. This platform provides access for veterinary doctors to manage their appointments, patients' records, and other administrative tasks efficiently. </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default index
