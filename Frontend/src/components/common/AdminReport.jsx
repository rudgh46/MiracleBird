import React, { useState, useEffect } from "react";
import styles from "./AdminReport.module.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function AdminReport({ reportData }) {
  const [verificationIdx, setVerificationIdx] = useState("");
  const [reportIdx, setReportIdx] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportDetail, setReportDetail] = useState();
  const [reportSelfie, setReportSelfie] = useState();
  const [reportName, setReportName] = useState();
  const [reportUserIdx, setReportUserIdx] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(verificationIdx);
    axios({
      url: API_BASE_URL + "/verification/" + verificationIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    }).then((res) => {
      console.log(res.data);
      setReportDetail(res.data);
      setReportSelfie(res.data.selfie);
      setReportName(res.data.name);
      setReportUserIdx(res.data.userIdx);
    });
  }, [verificationIdx]);

  useEffect(() => {
    console.log(verificationIdx);
  }, []);

  return (
    <>
      <div className={styles.postCt}>
        {reportData.map((post, index) => {
          return (
            <div
              className={styles.post}
              onClick={() => {
                setReportIdx(post.reportIdx);
                console.log(post.reportIdx);
                setReportContent(post.description);
                setVerificationIdx(post.verificationIdx);
                setReportContent(post.description);
                handleShow();
              }}>
              부정사용자:{post.suspectName} 신고자:{post.reporterName}
            </div>
          );
        })}
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <img alt="post" src={reportSelfie} className={styles.postImg} />
          <div className={styles.text}>
            {reportName} {reportContent}
          </div>
          <div className={styles.btnCt}>
            <button
              className={styles.passBtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/report/" + reportIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                handleClose();
              }}>
              보류
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/verification/" + verificationIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                axios({
                  url: API_BASE_URL + "/report/" + reportIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                handleClose();
              }}>
              삭제
            </button>
            <button
              className={styles.outBtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/verification/" + verificationIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                axios({
                  url: API_BASE_URL + "/report/" + reportIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                axios({
                  url: API_BASE_URL + "/user/blacklist",
                  method: "put",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                  params: {
                    user_idx: reportUserIdx,
                  },
                })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                handleClose();
              }}>
              블랙리스트 등록
            </button>
          </div>
        </Modal.Body>

        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminReport;
