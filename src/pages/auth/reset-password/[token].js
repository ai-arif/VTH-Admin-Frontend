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

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = router.query; // Get the token from the URL

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === "") return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/staffs/reset-password`, {
        resetToken: token,
        newPassword,
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
              <h2 className="auth-heading text-center mb-5">Reset Password</h2>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form reset-password-form"
                  onSubmit={handleSubmit}
                >
                  <div className="new-password mb-3">
                    <label
                      className="sr-only text-muted pb-1"
                      htmlFor="reset-password"
                    >
                      New Password
                    </label>
                    <input
                      value={newPassword}
                      onChange={handleChange}
                      id="reset-password"
                      name="newPassword"
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      required="required"
                    />
                  </div>
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
                alt="login"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
