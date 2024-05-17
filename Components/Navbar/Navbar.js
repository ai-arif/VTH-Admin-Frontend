import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineHome, AiOutlineMedicineBox } from "react-icons/ai";
import { BsBarChartLine, BsFolder } from "react-icons/bs";
import { GrTest } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { SlLayers } from "react-icons/sl";
import { VscOutput } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "./NavItem";
import SubmenuNavItem from "./SubmenuNavItem";
// import {  } from "../../features/staff/staffSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { user } = useSelector((state) => state.user);
  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);
  // const handleLogout = () => {
  //   Cookies.remove("token");
  //   router.push("/auth/login");
  // };
  return (
    <header className="app-header fixed-top">
      <div className="app-header-inner">
        <div className="container-fluid py-2">
          <div className="app-header-content">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <a id="sidepanel-toggler" className="sidepanel-toggler d-inline-block d-xl-none" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img">
                    <title>Menu</title>
                    <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path>
                  </svg>
                </a>
              </div>
              <div className="search-mobile-trigger d-sm-none col">
                <i className="search-mobile-trigger-icon fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="app-search-box col">
                <form className="app-search-form">
                  <input type="text" placeholder="Search..." name="search" className="form-control search-input" />
                  <button type="submit" className="btn search-btn btn-primary" value="Search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>

              <div className="app-utilities col-auto">
                <div className="app-utility-item app-notifications-dropdown dropdown">
                  <a className="dropdown-toggle no-toggle-arrow" id="notifications-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" title="Notifications">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bell icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
                      <path
                        fill-rule="evenodd"
                        d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                      />
                    </svg>
                    <span className="icon-badge">3</span>
                  </a>

                  <div className="dropdown-menu p-0" aria-labelledby="notifications-dropdown-toggle">
                    <div className="dropdown-menu-header p-3">
                      <h5 className="dropdown-menu-title mb-0">Notifications</h5>
                    </div>
                    <div className="dropdown-menu-content">
                      <div className="item p-3">
                        <div className="row gx-2 justify-content-between align-items-center">
                          <div className="col-auto">
                            <img className="profile-image" src="/assets/images/profiles/profile-1.png" alt="" />
                          </div>
                          <div className="col">
                            <div className="info">
                              <div className="desc">Amy shared a file with you. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>
                              <div className="meta"> 2 hrs ago</div>
                            </div>
                          </div>
                        </div>
                        <a className="link-mask" href="notifications.html"></a>
                      </div>
                      <div className="item p-3">
                        <div className="row gx-2 justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="app-icon-holder">
                              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill-rule="evenodd"
                                  d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
                                />
                                <path
                                  fill-rule="evenodd"
                                  d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="col">
                            <div className="info">
                              <div className="desc">You have a new invoice. Proin venenatis interdum est.</div>
                              <div className="meta"> 1 day ago</div>
                            </div>
                          </div>
                        </div>
                        <a className="link-mask" href="notifications.html"></a>
                      </div>
                      <div className="item p-3">
                        <div className="row gx-2 justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="app-icon-holder icon-holder-mono">
                              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bar-chart-line" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill-rule="evenodd"
                                  d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="col">
                            <div className="info">
                              <div className="desc">Your report is ready. Proin venenatis interdum est.</div>
                              <div className="meta"> 3 days ago</div>
                            </div>
                          </div>
                        </div>
                        <a className="link-mask" href="notifications.html"></a>
                      </div>
                      <div className="item p-3">
                        <div className="row gx-2 justify-content-between align-items-center">
                          <div className="col-auto">
                            <img className="profile-image" src="/assets/images/profiles/profile-2.png" alt="" />
                          </div>
                          <div className="col">
                            <div className="info">
                              <div className="desc">James sent you a new message.</div>
                              <div className="meta"> 7 days ago</div>
                            </div>
                          </div>
                        </div>
                        <a className="link-mask" href="notifications.html"></a>
                      </div>
                    </div>

                    <div className="dropdown-menu-footer p-2 text-center">
                      <a href="notifications.html">View all</a>
                    </div>
                  </div>
                </div>
                <div className="app-utility-item">
                  <a href="settings.html" title="Settings">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                      />
                      <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
                    </svg>
                  </a>
                </div>

                <div className="app-utility-item app-user-dropdown dropdown">
                  <a className="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                    <img src="/assets/images/user.png" alt="user profile" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                    <li>
                      <a className="dropdown-item" href="account.html">
                        Account
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="settings.html">
                        Settings
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span className="dropdown-item">Log Out</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="app-sidepanel" className="app-sidepanel">
        <div id="sidepanel-drop" className="sidepanel-drop"></div>
        <div className="sidepanel-inner d-flex flex-column">
          <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none">
            &times;
          </a>
          <div className="app-branding">
            <Link className="app-logo" href="/">
              <img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" />
              <span className="logo-text">VTH Dashboard</span>
            </Link>
          </div>

          <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
            <ul className="app-menu list-unstyled accordion" id="menu-accordion">
              <NavItem href="/">
                <span className="nav-icon">
                  <AiOutlineHome size={22} />
                </span>
                <span className="nav-link-text">Staffs</span>
              </NavItem>

              <NavItem href="/users">
                <span className="nav-icon">
                  <HiOutlineUserGroup size={20} />
                </span>
                <span className="nav-link-text">Users</span>
              </NavItem>

              <SubmenuNavItem hrefParent="/appointment" hrefOne="/appointment/new" hrefTwo="/appointment/view" hrefNameOne="New Appointment" hrefNameTwo="View Appointment" submenuNumber="submenu-1">
                <span className="nav-icon">
                  <BsFolder size={20} />
                </span>
                <span className="nav-link-text">Appointment</span>
              </SubmenuNavItem>

              <SubmenuNavItem
                hrefParent="/patient-registration"
                hrefOne="/patient-registration/add"
                hrefTwo="/patient-registration/view"
                hrefNameOne="Add Registration"
                hrefNameTwo="View Registration"
                submenuNumber="submenu-2"
              >
                <span className="nav-icon pt-2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-columns-gap" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M6 1H1v3h5V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12h-5v3h5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8H1v7h5V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6h-5v7h5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"
                    />
                  </svg>
                </span>
                <span className="nav-link-text">History & Clinical Examination</span>
              </SubmenuNavItem>

              <NavItem href="/tests">
                <span className="nav-icon">
                  <GrTest size={18} />
                </span>
                <span className="nav-link-text">Tests</span>
              </NavItem>

              <NavItem href="/test-parameter">
                <span className="nav-icon">
                  <BsBarChartLine size={18} />
                </span>
                <span className="nav-link-text">Test Parameter</span>
              </NavItem>

              <NavItem href="/departments">
                <span className="nav-icon">
                  <SlLayers size={20} />
                </span>
                <span className="nav-link-text">Departments</span>
              </NavItem>

              <SubmenuNavItem hrefParent="/medicine" hrefOne="/medicine/add" hrefTwo="/medicine/view" hrefNameOne="Add Medicine" hrefNameTwo="View Medicine" submenuNumber="submenu-4">
                <span className="nav-icon">
                  <AiOutlineMedicineBox size={23} />
                </span>
                <span className="nav-link-text">Medicine</span>
              </SubmenuNavItem>

              <NavItem href="/test-result">
                <span className="nav-icon">
                  <VscOutput size={18} />
                </span>
                <span className="nav-link-text">Test Result</span>
              </NavItem>

              <SubmenuNavItem
                hrefParent="/prescription"
                hrefOne="/prescription/add"
                hrefTwo="/prescription/view"
                hrefNameOne="Add Prescription"
                hrefNameTwo="View Prescription"
                submenuNumber="submenu-3"
              >
                <span className="nav-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                    />
                    <circle cx="3.5" cy="5.5" r=".5" />
                    <circle cx="3.5" cy="8" r=".5" />
                    <circle cx="3.5" cy="10.5" r=".5" />
                  </svg>
                </span>
                <span className="nav-link-text">Prescription</span>
              </SubmenuNavItem>
            </ul>
          </nav>
          <div className="app-sidepanel-footer">
            <nav className="app-nav app-nav-footer">
              <ul className="app-menu footer-menu list-unstyled">
                <li className="nav-item">
                  <a className="nav-link" href="settings.html">
                    <span className="nav-icon">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                        />
                        <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
                      </svg>
                    </span>
                    <span className="nav-link-text">Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
