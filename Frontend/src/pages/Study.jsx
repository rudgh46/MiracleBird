import React from "react";
import styles from "./Study.module.css";
import { useNavigate } from "react-router-dom";

function Study() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.backbtn}
          onClick={() => navigate("/challenge")}>
          <img alt="back" src="/back.png" className={styles.backicon} /> Study
        </button>
        <button
          className={styles.feedbtn}
          onClick={() => navigate("/challenge/study/feed")}>
          <img alt="back" src="/feed.png" className={styles.backicon} />
        </button>
      </div>
      <div className={styles.mainContainer}>
        <img alt="morning" src="/studying.png" className={styles.morningimg} />
        <div className={styles.detailCt}>
          <div className={styles.maintext}>
            <p className={styles.titletext}>스터디</p>
            <br />
            <p className={styles.subtext}>당신의 미래를 책임져줄 공부!</p>
            <p className={styles.subtext}>
              하루 한 장의 사진으로 당신의 공부를 인증해보세요!
            </p>
            <br />
            <div className={styles.reward}>
              <div>Reward:</div>
              <img alt="coin" src="/coin.png" className={styles.coin}></img>
              <div>3 MIRA</div>
            </div>
          </div>
        </div>
        <br />
        {/* <p className={styles.subtext2}>
          ※ 자세한 내용은 커뮤니티의 공지사항을 참고해주세요!
        </p> */}
        <br />
      </div>
    </>
  );
}

export default Study;
