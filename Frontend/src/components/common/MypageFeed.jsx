import React, { useState, useEffect } from "react";
import styles from "./MypageFeed.module.css";
import Modal from "react-bootstrap/Modal";
import seasonInfo from "../../pages/season.json";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MypageFeed(props) {
  let [idx, setIdx] = useState(1);
  const [challengeData, setChallengeData] = useState("");
  const [challengeMap, setChallengeMap] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    var startdate = seasonInfo[idx - 1].startDate + "_00:00:00.000";
    var enddate = seasonInfo[idx - 1].endDate + "_23:59:59.000";
    axios({
      url: API_BASE_URL + "/verification/heatmap/" + props.userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
      params: {
        start_date: startdate,
        end_date: enddate,
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idx]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [approveCount, setApproveCount] = useState(0);
  const [refuseCount, setRefuseCount] = useState(0);
  const [waitCount, setWaitCount] = useState(0);

  useEffect(() => {
    var temp = [];
    var approveCount = 0;
    var refuseCount = 0;
    var waitCount = 0;

    for (var i = 0; i < challengeData.length; i++) {
      var item = challengeData[i];
      temp.push(<img src={item.selfie} className={styles.feedImg} key={i} />);
      if (challengeData[i].approval === 0) {
        waitCount += 1;
      } else if (challengeData[i].approval === 1) {
        approveCount += 1;
      } else if (challengeData[i].approval === 2) {
        refuseCount += 1;
      }
    }

    setChallengeMap(temp);
    setApproveCount(approveCount);
    setRefuseCount(refuseCount);
    setWaitCount(waitCount);
  }, [challengeData]);

  return (
    <>
      <select
        className={styles.selectBox}
        onChange={(e) => setIdx(e.target.value)}>
        {seasonInfo.map((item) => {
          return (
            <option key={item.season} value={item.season}>
              시즌 {item.season}
            </option>
          );
        })}
      </select>
      <div className={styles.feeds}>
        <div className={styles.list}>
          {challengeMap.length === 0 ? (
            <div></div>
          ) : (
            <button className={styles.listbtn} onClick={() => handleShow()}>
              <img src="/list.png" className={styles.listicon}></img>
            </button>
          )}
        </div>
        <div className={styles.feedsImg}>
          {challengeMap.length === 0 ? (
            <div className={styles.challengeNow}>
              <div className={styles.gochallengeText}>
                챌린지에 참가해보세요!
              </div>
              <button
                onClick={() => navigate("/camera")}
                className={styles.gochallenge}>
                참가하기
              </button>
            </div>
          ) : (
            challengeMap[0]
          )}
        </div>
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableRight}>승인 완료</th>
                <th className={styles.tableRight}>승인 거절</th>
                <th>승인 대기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.tableRight}>{approveCount}</td>
                <td className={styles.tableRight}>{refuseCount}</td>
                <td>{waitCount}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.modalcontent}>{challengeMap}</div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default MypageFeed;
