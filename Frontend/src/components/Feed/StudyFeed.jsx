import React, { useState, useEffect } from "react";
import styles from "./MiracleFeed.module.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import heartEffect from "../../components/animation/heart.json";
import { useSelector } from "react-redux";

import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";

function StudyFeed() {
  const user = useSelector((state) => state.user.value);

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const [likeCountMap, setLikeCountMap] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState("");
  const [challengeMap, setChallengeMap] = useState("");
  const [cursorIndex, setCursorIndex] = useState("");
  const [cursorMap, setCursorMap] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [content, setContent] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/verification/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var temp = [];
    for (var i = 0; i < challengeData.length; i++) {
      var item = challengeData[i];
      if (item.challengeIdx != 3 || !item.share) continue;
      if (item.approval == 2) continue;
      temp.push(
        <div className={styles.feed} key={item.verificationIdx}>
          <img
            src={item.selfie == "string" ? "/study.jpg" : item.selfie}
            alt="mm"
            id={item.verificationIdx}
            className={styles.picture}
            onClick={(e) => {
              setCursorIndex(e.target.id);
              handleShow();
            }}
          />
        </div>
      );
    }
    setChallengeMap(temp);
  }, [challengeData]);

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/verification/" + cursorIndex,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setCursorMap(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: API_BASE_URL + "/verificationlike/" + cursorIndex,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      params: {
        user_idx: user.information.userIdx,
      },
    })
      .then((res) => {
        setLike(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: API_BASE_URL + "/verificationlike/likes/" + cursorIndex,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setLikeCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cursorIndex]);

  useEffect(() => {
    setLikeCountMap(likeCount);
  }, [likeCount]);

  const heartBtn = () => {
    if (like === false) {
      setLoading(true);
      axios({
        url: API_BASE_URL + "/verificationlike/" + cursorIndex,
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        params: {
          user_idx: user.information.userIdx,
        },
      })
        .then((res) => { })
        .catch((error) => {
          console.log(error);
        });
      setLikeCount(likeCount + 1);
      setLike(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      axios({
        url: API_BASE_URL + "/verificationlike/" + cursorIndex,
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        params: {
          user_idx: user.information.userIdx,
        },
      })
        .then((res) => { })
        .catch((error) => {
          console.log(error);
        });
      setLikeCount(likeCount - 1);
      setLike(false);
    }
  };

  return (
    <>
      <div className={styles.feedHeader}>
        <button
          className={styles.backbtn}
          onClick={() => navigate("/challenge/study")}>
          <img alt="back" src="/back.png" className={styles.backicon} /> Study
        </button>
      </div>
      <div className={styles.feeds}>{challengeMap}</div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          <img
            src={cursorMap.selfie}
            alt="mm"
            className={styles.picture2}
            onDoubleClick={() => heartBtn()}
          />
          {loading ? (
            <div>
              <Lottie
                animationData={heartEffect}
                className={styles.lottie}
                loop={false}
              />
            </div>
          ) : (
            <div></div>
          )}
          <button
            className={styles.reportbtn}
            onClick={() => {
              handleShow2();
            }}>
            <img alt="siren" src="/siren.png" className={styles.sirenicon} />
            신고하기
          </button>
          <div className={styles.detail}>
            <div>{cursorMap.name}</div>
            <div>
              {cursorMap.challengeIdx == 1
                ? "미라클모닝"
                : cursorMap == 2
                  ? "운동"
                  : "스터디"}
            </div>
            <div>
              {cursorMap.regtime && cursorMap.regtime[0]}-
              {cursorMap.regtime && cursorMap.regtime[1]}-
              {cursorMap.regtime && cursorMap.regtime[2]}
            </div>
          </div>
          <div>
            <button className={styles.heartbtn} onClick={() => heartBtn()}>
              {like ? (
                <img
                  alt="heart"
                  src="/heartcolor.png"
                  className={styles.heartIcon}
                />
              ) : (
                <img
                  alt="heart"
                  src="/heart.png"
                  className={styles.heartIcon}
                />
              )}{" "}
              좋아요 +{likeCountMap}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        {flag ? (
          <Modal.Body className={styles.modalcontent3} closeButton>
            <div className={styles.titleForm}>신고가 접수되었습니다.</div>
            <div className={styles.pricecontainer}>
              <button
                onClick={() => {
                  handleClose2(false);
                  setFlag(false);
                }}
                className={styles.submitbtn}>
                확인
              </button>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body className={styles.modalcontent2} closeButton={true}>
            <div className={styles.titleForm}>신고내용</div>
            <div className={styles.pricecontainer}>
              <textarea
                autoComplete="price"
                name="price"
                className={styles.textarea}
                onInput={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  axios({
                    url: API_BASE_URL + "/report",
                    method: "post",
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    },
                    data: {
                      description: content,
                      userIdx: cursorMap.userIdx,
                      verificationIdx: cursorMap.verificationIdx,
                    },
                  })
                    .then((res) => {
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  setFlag(true);
                }}
                className={styles.submitbtn}>
                보내기
              </button>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default StudyFeed;
