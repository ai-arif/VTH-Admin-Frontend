import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axiosInstance from "../../../../utils/axiosInstance";
import loginImg from "/public/assets/images/vth-login.png";

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (token && token != "undefined") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/staffs/login", data);
      console.log({ response });
      if (response?.data?.success) {
        Cookies.set("token", response.data?.data?.token);
        reset();
        router.push("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="row g-0 app-auth-wrapper ms-0">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5 ms-0">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <Link className="app-logo" href="/">
                  <img className="logo-icon me-2" src="/assets/images/logo.png" alt="logo" />
                </Link>
              </div>
              <h2 className="auth-heading text-center mb-5">Log in to Portal</h2>
              <div className="auth-form-container text-start">
                <form onSubmit={handleSubmit(onSubmit)} className="auth-form login-form">
                  <div className="phone mb-3">
                    <label className="sr-only text-muted pb-1" htmlFor="signin-phone">
                      Phone
                    </label>
                    <input {...register("phone", { required: true })} type="text" className="form-control signin-phone" placeholder="Phone number" />
                  </div>
                  <div className="password mb-3 position-relative">
                    <label className="sr-only text-muted pb-1" htmlFor="signin-password">
                      Password
                    </label>
                    <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} className="form-control signin-password" placeholder="Password" />
                    <div onClick={handleTogglePassword} type="button" className="position-absolute" id="auth-eye">
                      {showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                    </div>
                  </div>
                  <div className="extra mt-3 row justify-content-between">
                    <div className="col-6">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="RememberPassword" />
                        <label className="form-check-label" htmlFor="RememberPassword">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="forgot-password text-end">
                        <Link href="/auth/forget-password">Forgot password?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button disabled={isSubmitting} type="submit" onClick={handleSubmit} className="btn app-btn-primary w-100 theme-btn mx-auto">
                      {isSubmitting ? "Loading..." : "Log In"}
                    </button>
                  </div>
                </form>
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
          <div className="auth-background-holder"></div>
          <div className="auth-background-mask"></div>
          <div className="auth-background-overlay p-3 p-lg-5">
            <div className="d-flex flex-column align-content-end h-100">
              {/* <div className="h-100"> */}
              <Image className="w-100" src={loginImg} alt="login" />
              {/* </div> */}
              <div className="overlay-content p-3 p-lg-4 rounded">
                <h5 className="mb-3 overlay-title">Veterinary Doctor Login Portal</h5>
                <div>
                  Welcome to the Veterinary Doctor Login Portal. This platform provides access for veterinary doctors to manage their appointments, patients records, and other administrative tasks
                  efficiently.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
