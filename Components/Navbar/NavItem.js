import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavItem = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li className="nav-item">
      <Link href={href} className={`nav-link ${isActive ? "active" : ""}`}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
