import React from "react";
import styles from "./Loading.module.css";
import spinner from "../../assets/icon/Spinner.gif"
export const Loading = () => {
  return (
    <div className={styles.background}>
      <div className={styles.loadingText}>잠시만 기다려 주세요.</div>
      <img src={spinner} width="20%" />
    </div>
  );
};

export default Loading;
