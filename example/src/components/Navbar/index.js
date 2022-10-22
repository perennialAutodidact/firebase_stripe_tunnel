import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { name: "Products", path: "/" },
  { name: "Checkout", path: "/checkout" },
];

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        {NAV_LINKS.map((navLink) => (
          <li>
            <Link to={navLink.path} className={styles.navLink}>
              {navLink.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
