import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import { getCurrentUser } from "../../util/APIUtils";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../store/user";
import { selectArea } from "../../store/area";

function Footer() {
  if (window.location.pathname === "/main") return null;
  const [isListHover1, setIsListHover1] = useState(false);
  const [isListHover2, setIsListHover2] = useState(false);
  const [isListHover3, setIsListHover3] = useState(false);
  const [isListHover4, setIsListHover4] = useState(false);
  const [isListHover5, setIsListHover5] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    loadCurrentlyLoggedInUser();
    // axios({
    //   url: API_BASE_URL + "/auth/",
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + NOW_ACCESS_TOKEN,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data.information);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        dispatch(login(response));
      })
      .catch((error) => {
        if (
          location.pathname != "/" &&
          location.pathname != "/store" &&
          location.pathname != "/Main"
        ) {
          handleShow();
        }
      });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* user != null && user.check != ""*/}
      {user != null && user.check != "" ? (
        <>
          <div className={styles.footer}>
            <div className={styles.footer_navbar}>
              <div className={styles.footer_button}>
                {location.pathname == "/" ? (
                  <img
                    alt="home"
                    src="/src/assets/icon/footer_home_hover.png"
                    className={styles.footer_home}
                    onMouseOver={() => setIsListHover1(true)}
                    onMouseOut={() => setIsListHover1(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "korea",
                          SIG_CD: "",
                        })
                      );
                      navigate("/");
                    }}
                  />
                ) : (
                  <img
                    alt="home"
                    src={
                      isListHover1
                        ? "/src/assets/icon/footer_home_hover.png"
                        : "/src/assets/icon/footer_home.png"
                    }
                    className={styles.footer_home}
                    onMouseOver={() => setIsListHover1(true)}
                    onMouseOut={() => setIsListHover1(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "korea",
                          SIG_CD: "",
                        })
                      );
                      navigate("/");
                    }}
                  />
                )}

                <div className={styles.icontext}>홈</div>
              </div>
              <div className={styles.footer_button}>
                {location.pathname == "/store" ||
                location.pathname == "/landmark" ? (
                  <img
                    alt="store"
                    src="/src/assets/icon/footer_store_hover.png"
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover2(true)}
                    onMouseOut={() => setIsListHover2(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      navigate("/store");
                    }}
                  />
                ) : (
                  <img
                    alt="store"
                    src={
                      isListHover2
                        ? "/src/assets/icon/footer_store_hover.png"
                        : "/src/assets/icon/footer_store.png"
                    }
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover2(true)}
                    onMouseOut={() => setIsListHover2(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      navigate("/store");
                    }}
                  />
                )}

                <div className={styles.icontext}>스토어</div>
              </div>
              <div className={styles.footer_button}>
                {location.pathname == "/community" ? (
                  <img
                    alt="community"
                    src="/src/assets/icon/footer_community_hover.png"
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover3(true)}
                    onMouseOut={() => setIsListHover3(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      navigate("/community");
                      // document.location.href = "/community";
                    }}
                  />
                ) : (
                  <img
                    alt="community"
                    src={
                      isListHover3
                        ? "/src/assets/icon/footer_community_hover.png"
                        : "/src/assets/icon/footer_community.png"
                    }
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover3(true)}
                    onMouseOut={() => setIsListHover3(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      navigate("/community");
                      // document.location.href = "/community";
                    }}
                  />
                )}

                <div className={styles.icontext}>커뮤니티</div>
              </div>

              <div className={styles.footer_button}>
                {location.pathname == "/challenge" ||
                location.pathname == "/challenge/morning" ||
                location.pathname == "/challenge/health" ||
                location.pathname == "/challenge/study" ||
                location.pathname == "/challenge/morning/feed" ||
                location.pathname == "/challenge/health/feed" ||
                location.pathname == "/challenge/study/feed" ? (
                  <img
                    alt="challenge"
                    src="/src/assets/icon/footer_challenge_hover.png"
                    className={styles.footer_challenge}
                    onMouseOver={() => setIsListHover4(true)}
                    onMouseOut={() => setIsListHover4(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      navigate("/challenge");
                    }}
                  />
                ) : (
                  <img
                    alt="challenge"
                    src={
                      isListHover4
                        ? "/src/assets/icon/footer_challenge_hover.png"
                        : "/src/assets/icon/footer_challenge.png"
                    }
                    className={styles.footer_challenge}
                    onMouseOver={() => setIsListHover4(true)}
                    onMouseOut={() => setIsListHover4(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      navigate("/challenge");
                    }}
                  />
                )}

                <div className={styles.icontext}>갤러리</div>
              </div>
              <div className={styles.footer_button}>
                {location.pathname == "/mypage" ? (
                  <img
                    alt="mypage"
                    src="/src/assets/icon/footer_mypage_hover.png"
                    className={styles.footer_mypage}
                    onMouseOver={() => setIsListHover5(true)}
                    onMouseOut={() => setIsListHover5(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      document.location.href = "/mypage";
                    }}
                  />
                ) : (
                  <img
                    alt="mypage"
                    src={
                      isListHover5
                        ? "/src/assets/icon/footer_mypage_hover.png"
                        : "/src/assets/icon/footer_mypage.png"
                    }
                    className={styles.footer_mypage}
                    onMouseOver={() => setIsListHover5(true)}
                    onMouseOut={() => setIsListHover5(false)}
                    onClick={() => {
                      dispatch(
                        selectArea({
                          name: "",
                          SIG_CD: "",
                        })
                      );
                      document.location.href = "/mypage";
                    }}
                  />
                )}

                <div className={styles.icontext}>마이룸</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.footer}>
            <div className={styles.footer_navbar}>
              <div className={styles.footer_button}>
                {location.pathname == "/" ? (
                  <img
                    alt="home"
                    src="/src/assets/icon/footer_home_hover.png"
                    className={styles.footer_home}
                    onMouseOver={() => setIsListHover1(true)}
                    onMouseOut={() => setIsListHover1(false)}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                ) : (
                  <img
                    alt="home"
                    src={
                      isListHover1
                        ? "/src/assets/icon/footer_home_hover.png"
                        : "/src/assets/icon/footer_home.png"
                    }
                    className={styles.footer_home}
                    onMouseOver={() => setIsListHover1(true)}
                    onMouseOut={() => setIsListHover1(false)}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                )}

                <div className={styles.icontext}>홈</div>
              </div>
              <div className={styles.footer_button}>
                {location.pathname == "/store" ||
                location.pathname == "/landmark" ? (
                  <img
                    alt="store"
                    src="/src/assets/icon/footer_store_hover.png"
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover2(true)}
                    onMouseOut={() => setIsListHover2(false)}
                    onClick={() => {
                      navigate("/store");
                    }}
                  />
                ) : (
                  <img
                    alt="store"
                    src={
                      isListHover2
                        ? "/src/assets/icon/footer_store_hover.png"
                        : "/src/assets/icon/footer_store.png"
                    }
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover2(true)}
                    onMouseOut={() => setIsListHover2(false)}
                    onClick={() => {
                      navigate("/store");
                    }}
                  />
                )}

                <div className={styles.icontext}>스토어</div>
              </div>
              <div className={styles.footer_button}>
                {location.pathname == "/community" ? (
                  <img
                    alt="community"
                    src="/src/assets/icon/footer_community_hover.png"
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover3(true)}
                    onMouseOut={() => setIsListHover3(false)}
                    onClick={() => {
                      navigate("/community");
                    }}
                  />
                ) : (
                  <img
                    alt="community"
                    src={
                      isListHover3
                        ? "/src/assets/icon/footer_community_hover.png"
                        : "/src/assets/icon/footer_community.png"
                    }
                    className={styles.footer_store}
                    onMouseOver={() => setIsListHover3(true)}
                    onMouseOut={() => setIsListHover3(false)}
                    onClick={() => {
                      navigate("/community");
                    }}
                  />
                )}

                <div className={styles.icontext}>커뮤니티</div>
              </div>

              <div className={styles.footer_button}>
                <img
                  alt="challenge"
                  src={
                    isListHover4
                      ? "/src/assets/icon/footer_challenge_hover.png"
                      : "/src/assets/icon/footer_challenge.png"
                  }
                  className={styles.footer_challenge}
                  onMouseOver={() => setIsListHover4(true)}
                  onMouseOut={() => setIsListHover4(false)}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <div className={styles.icontext}>갤러리</div>
              </div>
              <div className={styles.footer_button}>
                {location.pathname == "/mypage" ? (
                  <img
                    alt="mypage"
                    src={"/src/assets/icon/footer_mypage_hover.png"}
                    className={styles.footer_mypage}
                    onMouseOver={() => setIsListHover5(true)}
                    onMouseOut={() => setIsListHover5(false)}
                    onClick={() => {
                      handleShow();
                    }}
                  />
                ) : (
                  <img
                    alt="mypage"
                    src={
                      isListHover5
                        ? "/src/assets/icon/footer_mypage_hover.png"
                        : "/src/assets/icon/footer_mypage.png"
                    }
                    className={styles.footer_mypage}
                    onMouseOver={() => setIsListHover5(true)}
                    onMouseOut={() => setIsListHover5(false)}
                    onClick={() => {
                      handleShow();
                    }}
                  />
                )}

                <div className={styles.icontext}>마이룸</div>
              </div>
            </div>
          </div>
          <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header className={styles.modalheader}></Modal.Header>
            <Modal.Body className={styles.modalcontent}>
              로그인이 필요한 서비스 입니다.
              <div className={styles.btnCt}>
                <button
                  className={styles.backbtn}
                  onClick={() => {
                    handleClose();
                    navigate("/");
                  }}>
                  돌아가기
                </button>
                <button
                  className={styles.logoutbtn}
                  onClick={() => {
                    handleClose();
                    navigate("/login");
                  }}>
                  로그인하기
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default Footer;
