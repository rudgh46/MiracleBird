import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.css";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

function Header() {
  const navigate = useNavigate();
  if (window.location.pathname === '/main') return null;
  return (
    <>
      <BrowserView>
        <div className={styles.header}>
          <div
            onClick={() => {
              navigate("/");
            }}
            className={styles.header_navbar}>
            <img alt="logo" src="/logo.png" className={styles.header_logo} />
            <img alt="title" src="/title.png" className={styles.header_title} />
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className={styles.header}>
          <div
            onClick={() => {
              navigate("/");
            }}
            className={styles.header_navbar}>
            <img
              alt="logo"
              src="/logo.png"
              className={styles.mobile_header_logo}
            />
            <img
              alt="title"
              src="/title.png"
              className={styles.mobile_header_title}
            />
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default Header;
