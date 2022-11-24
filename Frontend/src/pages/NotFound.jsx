import React, { useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import Lottie from "lottie-react";
import notFound from "../components/animation/notFound.json";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div className={styles.notFoundPage}>
      <BrowserView>
        <Lottie
          animationData={notFound}
          loop={true}
          className={styles.notFound}
        />
      </BrowserView>
      <MobileView>
        <Lottie
          animationData={notFound}
          loop={true}
          className={styles.notFound}
        />
      </MobileView>
      <button
        className={styles.btn}
        onClick={() => {
          navigate("/");
        }}>
        돌아가기
      </button>
    </div>
  );
}

export default NotFound;
