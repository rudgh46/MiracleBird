import React, { useState, useEffect } from "react";
import styles from "./AdminChallenge.module.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function AdminChallenge(props) {
  const [challengeData, setChallengeData] = useState(props.challengeMap);
  const [challengeMap, setChallengeMap] = useState();
  useEffect(() => {
    console.log(challengeData);
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      const item = challengeData[i];
      temp.push(
        <div
          className={styles.post}
          onClick={() => (
            setImg(item.selfie),
            setNickname(item.name),
            setDate(item.regtime),
            setVerificationIdx(item.verificationIdx),
            setCategory(item.challengeIdx),
            handleShow()
          )}>
          {item.name} | {item.regtime} |{" "}
          {item.challengeIdx === 1 ? "미라클모닝" : ""}
          {item.challengeIdx === 2 ? "헬스" : ""}
          {item.challengeIdx === 3 ? "스터디" : ""}
        </div>
      );
    }
    console.log(temp);
    setChallengeMap(temp);
  }, [challengeData]);

  useEffect(() => {
    console.log(challengeData);
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      const item = challengeData[i];
      temp.push(
        <div
          className={styles.post}
          onClick={() => (
            setImg(item.selfie),
            setNickname(item.name),
            setDate(item.regtime),
            setVerificationIdx(item.verificationIdx),
            setCategory(item.challengeIdx),
            handleShow()
          )}>
          {item.name} | {item.regtime} |{" "}
          {item.challengeIdx === 1 ? "미라클모닝" : ""}
          {item.challengeIdx === 2 ? "헬스" : ""}
          {item.challengeIdx === 3 ? "스터디" : ""}
        </div>
      );
    }
    console.log(temp);
    setChallengeMap(temp);
  }, []);

  const [img, setImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [show, setShow] = useState(false);
  const [verificationIdx, setVerificationIdx] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={styles.postCt}>{challengeMap}</div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <img alt="post" src={img} className={styles.postImg} />
          <div className={styles.text}>
            {nickname} {date}
          </div>
          <div className={styles.btnCt}>
            <button
              className={styles.accessBtn}
              onClick={() => {
                axios({
                  url:
                    API_BASE_URL + "/verification/approve/" + verificationIdx,
                  method: "put",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    document.location.href = "/admin";
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}>
              승인
            </button>
            <button className={styles.deleteBtn}>거절</button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminChallenge;
