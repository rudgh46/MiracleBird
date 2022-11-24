import React from "react";
import styles from "./Loading2.module.css";
import spinner from "../../assets/icon/Spinner.gif";
import Lottie from "lottie-react";
import heartloading from "../animation/heartloading.json";
export const Loading2 = ({ text }) => {
  return (
    <div className={styles.background}>
      <Lottie
        animationData={heartloading}
        loop={true}
        className={styles.heart}
      />
      <div className={styles.loadingText}>{text}</div>
    </div>
  );
};

export default Loading2;
