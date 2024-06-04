import Link from "next/link";
import { useRouter } from "next/router";

const SubmenuNavItem = ({ hrefParent, hrefOne, hrefTwo, hrefNameOne, hrefNameTwo, children, submenuNumber }) => {
  const router = useRouter();
  const isActiveOne = router.pathname === hrefParent || router.pathname === hrefOne;
  const isActiveTwo = router.pathname === hrefParent || router.pathname === hrefTwo;

  return (
    <li className="nav-item has-submenu">
      <div
        style={{
          cursor: "pointer",
        }}
        className={`nav-link ${isActiveOne || isActiveTwo ? "active" : ""}`}
        data-bs-toggle="collapse"
        data-bs-target={`#${submenuNumber}`}
        aria-expanded="false"
        aria-controls={submenuNumber}
      >
        {children}
        <span className="submenu-arrow">
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
      </div>
      <div id={submenuNumber} className={`collapse submenu ${submenuNumber}`} data-bs-parent="#menu-accordion">
        <ul className="submenu-list list-unstyled">
          <li className="submenu-item">
            <Link className={`submenu-link ${isActiveOne ? "active" : ""}`} href={hrefOne}>
              {hrefNameOne}
            </Link>
          </li>
          <li className="submenu-item">
            <Link className={`submenu-link ${isActiveTwo ? "active" : ""}`} href={hrefTwo}>
              {hrefNameTwo}
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default SubmenuNavItem;
