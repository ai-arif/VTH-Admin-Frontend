import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUserData } from "../../features/loggedInUser/loggedInUserAPI";
import axiosInstance from "../../utils/axiosInstance";
import menuConfig from "../../utils/menuConfig";
import NavItem from "./NavItem";
import SubmenuNavItem from "./SubmenuNavItem";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unseenNotifications, setUnseenNotifications] = useState(0);
  const [reFetch, setRefetch] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.loggedInUser);

  function timeAgo(dateString) {
    const now = new Date();
    const createdDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "week", seconds: 604800 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    for (let unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return `${interval} ${unit.name}${interval !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  const handleSeenNotification = (id) => {
    axiosInstance.patch(`/notification/${id}`).then((res) => {
      const result = res.data.data;
      setRefetch(reFetch + 1);
    });
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.id) {
        axiosInstance.get(`/staffs/${decoded?.id}`).then((res) => {
          dispatch(setLoggedInUserData(res.data?.data));
        });
      } else {
        dispatch(setLoggedInUserData(decoded));
      }
    }
  }, []);

  useEffect(() => {
    if (data?.role) {
      setMenuItems(menuConfig[data.role] || []);
    }
  }, [data]);

  useEffect(() => {
    axiosInstance.get("/notification").then((res) => {
      const result = res.data.data;
      setNotifications(result?.data);
      setUnseenNotifications(result?.count);
    });
  }, [reFetch]);

  const renderNavItem = (item) => {
    if (item.hrefParent) {
      return (
        <SubmenuNavItem
          key={item.hrefParent}
          hrefParent={item.hrefParent}
          hrefOne={item.hrefOne}
          hrefTwo={item.hrefTwo}
          hrefNameOne={item.labelOne}
          hrefNameTwo={item.labelTwo}
          submenuNumber={item.submenuNumber}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-link-text">{item.label}</span>
        </SubmenuNavItem>
      );
    } else {
      return (
        <NavItem key={item.href} href={item.href}>
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-link-text">{item.label}</span>
        </NavItem>
      );
    }
  };

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
              <div className="col">
                <div style={{ color: "#eaeaea", opacity: "0.7" }} className="d-flex flex-column">
                  <span>{data?.fullName}</span>
                  <small>{data?.phone}</small>
                </div>
              </div>

              <div className="col">
                <div style={{ color: "#eaeaea", opacity: "0.7" }}>
                  <h6 className="text-uppercase">{data?.role}</h6>
                </div>
              </div>

              <div className="app-utilities col-auto">
                <div className="app-utility-item app-notifications-dropdown dropdown">
                  <a
                    onClick={() => setRefetch(reFetch + 1)}
                    className="dropdown-toggle no-toggle-arrow"
                    id="notifications-dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                    title="Notifications"
                  >
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bell icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
                      <path
                        fill-rule="evenodd"
                        d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                      />
                    </svg>
                    <span className="icon-badge">{unseenNotifications > 10 ? "10+" : unseenNotifications > 5 ? "5+" : unseenNotifications}</span>
                  </a>

                  <div className="dropdown-menu p-0" aria-labelledby="notifications-dropdown-toggle">
                    <div className="dropdown-menu-header p-3">
                      <h5 className="dropdown-menu-title mb-0">Notifications</h5>
                    </div>
                    {/* notifications showing here */}
                    <div className="dropdown-menu-content">
                      {notifications?.slice(0, 4).map((notification) => (
                        <Link onClick={() => handleSeenNotification(notification?._id)} href={notification?.destinationUrl || "/"} key={notification?._id}>
                          <div className="item p-3 border">
                            <div className="row gx-2 justify-content-between align-items-start">
                              <div className="col-auto">
                                <img className="profile-image" src="/assets/images/info.png" alt="" />
                              </div>
                              <div className="col">
                                <div className="info">
                                  <h6 className="">{notification?.title}</h6>
                                  <div className="desc text-white">{notification?.description}</div>
                                  <div className="meta">
                                    <p className="m-0 text-end">{timeAgo(notification?.createdAt)}</p>
                                    <p className="m-0 text-end">{notification?.isViewed ? "Seen" : "Unseen"}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="dropdown-menu-footer p-2 text-center">
                      <Link href="/notifications">View all</Link>
                    </div>
                  </div>
                </div>
                <div className="app-utility-item">
                  <Link href="/settings" title="Settings">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                      />
                      <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
                    </svg>
                  </Link>
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
              {menuItems?.map(renderNavItem)}
            </ul>
          </nav>
          <div className="app-sidepanel-footer">
            <nav className="app-nav app-nav-footer">
              <ul className="app-menu footer-menu list-unstyled">
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link">
                    <span className="nav-icon">
                      <RiLogoutCircleLine size={16} />
                    </span>
                    <span className="nav-link-text">Log Out</span>
                  </button>
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
