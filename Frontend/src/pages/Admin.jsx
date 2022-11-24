import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import "./Admin.css";
import AdminChallenge from "../components/common/AdminChallenge";
import styles1 from "../components/common/AdminChallenge.module.css";
import Modal from "react-bootstrap/Modal";
import AdminReport from "../components/common/AdminReport";
import LandmarkRegistration from "../components/common/LandmarkRegistration";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import getAddressFrom from "../util/AddressExtractor";
import { useNavigate } from "react-router-dom";
import ABI from "../common/ABI";
import { Loading1 } from "../components/Base/Loading1";
import Web3 from "web3";

function Admin() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(1);
  const [challengeData, setChallengeData] = useState("");
  const [challengeMap, setChallengeMap] = useState("");
  const [reportData, setReportData] = useState("");
  const [reportMap, setReportMap] = useState("");
  const [approval, setApproval] = useState("");
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [verificationIdx, setVerificationIdx] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const [wallet, setWallet] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [privKey, setPrivKey] = useState("");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  async function transferToken() {
    try {
      const sender = web3.eth.accounts.privateKeyToAccount(
        import.meta.env.VITE_APP_ADMIN_PRIVKEY
      );
      web3.eth.accounts.wallet.add(sender);
      console.log("wallet", web3.eth.accounts.wallet);
      web3.eth.defaultAccount = sender.address;
      console.log("defaultAccount ::", web3.eth.defaultAccount);
      console.log("sender", sender);
      const senderAddress = web3.eth.defaultAccount;
      console.log("senderAddress", senderAddress);
      const sendMira = new web3.eth.Contract(
        ABI.CONTRACT_ABI.ERC_ABI,
        import.meta.env.VITE_APP_ERC20_CA
      );

      const response = await sendMira.methods
        .transfer(wallet, 5)
        .send({ from: senderAddress, gas: 3000000 });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("challengeData", challengeData);
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      const item = challengeData[i];
      if (item.approval != 0) continue;
      temp.push(
        <div
          className={styles1.post}
          onClick={() => (
            setImg(item.selfie),
            setNickname(item.name),
            setDate(
              item.regtime[0] +
                "-" +
                item.regtime[1] +
                "-" +
                item.regtime[2] +
                " " +
                item.regtime[3] +
                ":" +
                item.regtime[4] +
                ":" +
                item.regtime[5]
            ),
            setVerificationIdx(item.verificationIdx),
            setCategory(item.challengeIdx),
            setApproval(item.approval),
            setUserIdx(item.userIdx),
            handleShow()
          )}>
          {item.name} |{" "}
          {item.regtime[0] + "-" + item.regtime[1] + "-" + item.regtime[2]} |{" "}
          {item.challengeIdx === 1 ? "미라클모닝" : ""}
          {item.challengeIdx === 2 ? "헬스" : ""}
          {item.challengeIdx === 3 ? "스터디" : ""}
        </div>
      );
    }
    setChallengeMap(temp);
  }, [challengeData]);

  useEffect(() => {
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      const item = challengeData[i];
      temp.push();
    }
  }, [setChallengeMap]);

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/auth/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.information.userIdx != 1) {
        handleShow2();
      } else {
        setLoading(false);
      }
    });

    axios({
      url: API_BASE_URL + "/report/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: API_BASE_URL + "/report/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setReportData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("reportData", reportData);
    var temp = [];
    for (var i = 0; i < reportData.length; i++) {
      const item = reportData[i];
      temp.push(item);
    }
    setReportMap(temp);
  }, [reportData]);

  useEffect(() => {
    if (approval != 0) {
      setApproval(0);
    }
    axios({
      url: API_BASE_URL + "/verification/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [approval]);

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/wallet/" + userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setPrivKey(res.data.walletAddress);
        setWallet(res.data.walletAddress);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userIdx]);

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  return (
    <>
      {loading ? (
        <Loading1 />
      ) : (
        <>
          <div className={styles.btnCt}>
            <button
              className={`challengeBtn ${view === 1 ? "active" : ""}`}
              onClick={() => setView(1)}>
              챌린지
            </button>
            <button
              className={`challengeBtn ${view === 2 ? "active" : ""}`}
              onClick={() => setView(2)}>
              신고
            </button>
            <button
              className={`reportBtn ${view === 3 ? "active" : ""}`}
              onClick={() => setView(3)}>
              민팅
            </button>
          </div>
          <div className={styles.component}>
            {view === 1 && (
              <>
                <div className={styles1.postCt}>{challengeMap}</div>
              </>
            )}
            {view === 2 && <AdminReport reportData={reportMap} />}
            {view === 3 && <LandmarkRegistration />}
          </div>
        </>
      )}
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header
          className={styles1.modalheader}
          closeButton></Modal.Header>
        <Modal.Body className={styles1.modalcontent}>
          <img alt="post" src={img} className={styles1.postImg} />
          <div className={styles1.text}>
            {nickname} {date}
          </div>
          <div className={styles1.btnCt}>
            <button
              className={styles1.accessBtn}
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
                    setApproval(1);
                    transferToken();
                    handleClose();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}>
              승인
            </button>
            <button
              className={styles1.deleteBtn}
              onClick={() => {
                axios({
                  url:
                    API_BASE_URL + "/verification/decline/" + verificationIdx,
                  method: "put",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                })
                  .then((res) => {
                    setApproval(2);
                    handleClose();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}>
              거절
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles1.modalheader}></Modal.Footer>
      </Modal>
      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles1.modalheader}></Modal.Header>
        <Modal.Body className={styles1.modalcontent}>
          잘못된 접근입니다.
          <div className={styles1.btnCt}>
            <button
              className={styles1.accessBtn}
              onClick={() => {
                handleClose2();
                navigate("/");
              }}>
              돌아가기
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Admin;
