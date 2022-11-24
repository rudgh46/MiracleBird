import React from "react";
import styles from "./MiracleMorning.module.css";
import { useNavigate } from "react-router-dom";

function MiracleMorning() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.backbtn}
          onClick={() => navigate("/challenge")}>
          <img alt="back" src="/back.png" className={styles.backicon} /> Miracle
          Morning
        </button>
        <button
          className={styles.feedbtn}
          onClick={() => navigate("/challenge/morning/feed")}>
          <img alt="back" src="/feed.png" className={styles.backicon} />
        </button>
      </div>
      <div className={styles.mainContainer}>
        <img alt="morning" src="/morning.png" className={styles.morningimg} />
        <div className={styles.subtext2}>04:00 ~ 07:00</div>
        <div className={styles.detailCt}>
          <div className={styles.maintext}>
            <p className={styles.titletext}>미라클 모닝</p>
            <br />
            <p className={styles.subtext}>
              당신의 아침을 책임져줄 미라클 모닝!
            </p>
            <p className={styles.subtext}>
              하루 한 장의 사진으로 당신의 아침을 인증해보세요!
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

export default MiracleMorning;
