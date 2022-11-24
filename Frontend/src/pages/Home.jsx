import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { BrowserView, MobileView } from "react-device-detect";
import WebCarousel from "../components/carousel/HomeWebCarousel";
import Rank from "../components/common/Rank";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";
import HomeChallenge from "../components/common/HomeChallenge";
import HomeNFT from "../components/common/HomeNFT";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import Loading2 from "../components/Base/Loading2";
import Chart from "react-apexcharts";
import WebCarouselBanner from "../components/carousel/HomeWebCarouselBanner";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
function Home() {
  const COOKIE_KEY = "todayOpenMain";
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);

  const user = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [challengeImg, setChallengeImg] = useState("");
  const [challengeImgMap, setChallengeImgMap] = useState("");

  const [state, setState] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (cookies[COOKIE_KEY] == null) {
      navigate("/main");
    }
    axios({
      url: API_BASE_URL + "/verification/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setChallengeImg(res.data);
        // console.log('img', challengeImg);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      url: API_BASE_URL + "/auth/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        axios({
          url: API_BASE_URL + "/wallet/" + res.data.information.userIdx,
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
          .then((res) => {
            // console.log(res.data);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            handleShow();
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setChallengeImgMap(challengeImgMap);
    setLoading(false);
  }, [challengeImg]);

  return (
    <>
      {loading ? (
        <>
          <Loading2 />
        </>
      ) : (
        <>
          <BrowserView>
            <WebCarouselBanner
              className={styles.carousel}
              challengeMap={challengeImg}
            />
            <div className="App">
              <div className={styles.infoCt}>
                <div className={styles.btnCt}>
                  <button
                    className={`homebtn ${state === 0 ? "homeactive" : ""}`}
                    onClick={() => setState(0)}>
                    챌린지
                  </button>
                  <button
                    className={`homebtn ${state === 1 ? "homeactive" : ""}`}
                    onClick={() => setState(1)}>
                    NFT
                  </button>
                </div>
                <div>{state === 0 ? <HomeChallenge /> : <HomeNFT />}</div>
              </div>
              <Rank />
              <WebCarousel className={styles.carousel} />
              {user != null && user.check != "" ? (
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
              ) : (
                <></>
              )}
            </div>
          </BrowserView>
          <MobileView>
            <WebCarouselBanner
              className={styles.carousel}
              challengeMap={challengeImg}
            />
            <div className="App">
              <div className={styles.infoCt}>
                <div className={styles.btnCt}>
                  <button
                    className={`homebtn ${state === 0 ? "homeactive" : ""}`}
                    onClick={() => setState(0)}>
                    챌린지
                  </button>
                  <button
                    className={`homebtn ${state === 1 ? "homeactive" : ""}`}
                    onClick={() => setState(1)}>
                    NFT
                  </button>
                </div>
                <div className={styles.imgSlice}>
                  {state === 0 ? <HomeChallenge /> : <HomeNFT />}
                </div>
              </div>
              <Rank />
              <WebCarousel
                className={styles.carousel}
                challengeMap={challengeImg}
              />
              {user != null && user.check != "" ? (
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
              ) : (
                <></>
              )}
            </div>
          </MobileView>
        </>
      )}
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          지갑이 없습니다. 지갑을 생성해주세요.
          <div className={styles.btnCt}>
            {/* <button
              className={styles.backbtn}
              onClick={() => {
                handleClose();
                navigate("/");
              }}>
              돌아가기
            </button> */}
            <button
              className={styles.logoutbtn}
              onClick={() => {
                handleClose();
                navigate("/mypage", { state: { hasWallet: false } });
              }}>
              지갑생성
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
