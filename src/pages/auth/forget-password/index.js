import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../../utils/axiosInstance";

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

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/staffs/forget-password", {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setLoading(false);
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong! Try again"
      );
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row g-0 app-auth-wrapper ms-0">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5 ms-0">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <Link className="app-logo" href="/auth/login">
                  <img
                    className="logo-icon me-2"
                    src="/assets/images/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <h2 className="auth-heading text-center mb-5">Forget Password</h2>
              <div className="auth-form-container text-start">
                <form className="auth-form login-form" onSubmit={handleSubmit}>
                  <div className="email mb-3">
                    <label
                      className="sr-only text-muted pb-1"
                      htmlFor="forget-email"
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={handleChange}
                      id="forget-email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required="required"
                    />
                  </div>
                  {/* show Have an account ? Login */}
                  <div className="d-flex justify-content-between mb-3">
                    <Link href="/auth/login">
                      <p className="app-link">Have an account? Login</p>
                    </Link>
                  </div>
                  <div className="text-center">
                    {loading ? (
                      <button
                        type="submit"
                        className="btn app-btn-primary w-100 theme-btn mx-auto"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn app-btn-primary w-100 theme-btn mx-auto"
                      >
                        Submit
                      </button>
                    )}
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
              <img
                width={"100%"}
                src="https://cdn.pixabay.com/photo/2023/12/25/03/01/person-8467959_1280.jpg"
                alt=""
              />
              <div className="overlay-content p-3 p-lg-4 rounded">
                <h5 className="mb-3 overlay-title">
                  Veterinary Doctor Login Portal
                </h5>
                <div>
                  Welcome to the Veterinary Doctor Login Portal. This platform
                  provides access for veterinary doctors to manage their
                  appointments, patients' records, and other administrative
                  tasks efficiently.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
