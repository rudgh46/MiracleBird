import React from "react";
import styles from "./Challenge.module.css";
import { useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

function Challenge() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.challengeCt}></div>
        <button
          className={styles.deposit}
          onClick={() => navigate("/challenge/deposit")}>
          <img src="/dollar.png" alt="deposit" className={styles.dollaricon} />
          보증금
        </button>
      </div>
      <div className={styles.containers}>
        <div
          className={styles.miraclemorning}
          onClick={() => navigate("/challenge/morning")}>
          <div className={styles.morningtext}>
            <div className={styles.morningTitle}>
              미라클 모닝{" "}
              <img alt="next" src="/next.png" className={styles.next} />
            </div>
            <div className={styles.morningdetail}>
              미라클 모닝은 오전 4시부터 7시까지만 인증가능합니다.
            </div>
          </div>
          <img
            alt="morning"
            src="/sunrise.png"
            className={styles.morningicon}
          />
        </div>
        <div
          className={styles.health}
          onClick={() => navigate("/challenge/health")}>
          <div className={styles.healthtext}>
            <div className={styles.healthTitle}>
              운동 <img alt="next" src="/next.png" className={styles.next} />
            </div>
            <div className={styles.healthdetail}>
              운동은 하루 한 번 인증가능합니다.
            </div>
          </div>
          <img alt="health" src="/dumbbell.png" className={styles.healthicon} />
        </div>
        <div
          className={styles.study}
          onClick={() => navigate("/challenge/study")}>
          <div className={styles.studytext}>
            <div className={styles.studyTitle}>
              스터디 <img alt="next" src="/next.png" className={styles.next} />
            </div>
            <div className={styles.studydetail}>
              스터디는 하루 한 번 인증가능합니다.
            </div>
          </div>
          <img alt="study" src="/note.png" className={styles.studyicon} />
        </div>
        <BrowserView>
          <div className={styles.footer_camerabutton}>
            <img
              alt="camera"
              src="/src/assets/icon/camera_button.png"
              className={styles.footer_camera}
              onClick={() => {
                navigate("/camera");
              }}
            />
          </div>
        </BrowserView>
      </div>

      <MobileView>
        <div className={styles.footer_camerabutton2}>
          <img
            alt="camera"
            src="/src/assets/icon/camera_button.png"
            className={styles.footer_camera2}
            onClick={() => {
              navigate("/camera");
            }}
          />
        </div>
      </MobileView>
    </>
  );
}

export default Challenge;
