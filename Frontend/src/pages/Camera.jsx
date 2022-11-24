import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";
import html2canvas from "html2canvas";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./Camera.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { BrowserView, MobileView } from "react-device-detect";
import { useNavigate } from "react-router-dom";

function Camera() {
  const [them, setThem] = useState(0);
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState(null);
  const [imgurl, setImgUrl] = useState(undefined);
  const [share, setShare] = useState(false);
  const [isFacingMode, setIsFacingMode] = useState(false);
  const [data, setData] = useState({});
  const [fileName, setFileName] = useState("");
  const [time, setTime] = useState("");

  const [todayData, setTodayData] = useState({});
  const [morningCount, setMorningCount] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(false);
  const [studyCount, setStudyCount] = useState(false);
  const navigate = useNavigate();

  const mainApi = async () => {
    axios({
      url: API_BASE_URL + "/auth/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log("mainData", res.data.information);
        setData(res.data.information);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    mainApi();
  }, []);

  useEffect(() => {
    console.log(morningCount);
    console.log(exerciseCount);
    console.log(studyCount);
  }, [morningCount, exerciseCount, studyCount]);

  useEffect(() => {
    console.log(data);
    let today = new Date();
    let todayFormat =
      today.getFullYear() +
      "-" +
      ((today.getMonth() + 1).length == 1
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());

    var startdate = todayFormat + "_00:00:00.000";
    var enddate = todayFormat + "_23:59:59.000";

    axios({
      url: API_BASE_URL + "/verification/heatmap/" + data.userIdx,
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
        for (var i = 0; i < res.data.length; i++) {
          const item = res.data[i];
          if (item.approval == 2) continue;
          if (item.challengeIdx == 1) {
            setMorningCount(true);
          } else if (item.challengeIdx == 2) {
            setExerciseCount(true);
          } else if (item.challengeIdx == 3) {
            setStudyCount(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  const onCheckedElement = (checked) => {
    if (checked) {
      setShare(true);
    } else if (!checked) {
      setShare(false);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  function takepicture() {
    const targetvideo = document.getElementById("screenshot_wrap");
    html2canvas(targetvideo).then((xcanvas) => {
      const canvdata = xcanvas.toDataURL("image/png");
      const decodImg = window.atob(canvdata.split(",")[1]);
      let array = [];
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i));
      }

      const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      const nowTime =
        new Date().getFullYear() +
        ("0" + (new Date().getMonth() + 1)).slice(-2) +
        ("0" + new Date().getDate()).slice(-2) +
        ("0" + new Date().getHours()).slice(-2) +
        ("0" + new Date().getMinutes()).slice(-2) +
        ("0" + new Date().getSeconds()).slice(-2);
      const tempName =
        "img_" + data.userIdx + "_" + them + "_" + nowTime + ".png";
      let formData = new FormData();
      setTime(nowTime);
      setFileName("https://j7c107.p.ssafy.io/images/" + tempName);
      formData.append("uploadFile", file, tempName);
      setImgUrl(formData);
      console.log(formData);

      var photo = document.createElement("img");
      photo.setAttribute("src", canvdata);
      photo.setAttribute("width", 256);
      photo.setAttribute("height", 256);
    });
  }

  useEffect(() => {
    takepicture();
  }, [url]);

  function savepicture() {
    axios({
      url: "https://j7c107.p.ssafy.io/image/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        processData: false,
      },
      data: imgurl,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
    console.log(them, time, fileName, data.userIdx, share);
    var t =
      new Date().getFullYear() +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2) +
      "T" +
      ("0" + new Date().getHours()).slice(-2) +
      ":" +
      ("0" + new Date().getMinutes()).slice(-2) +
      ":" +
      ("0" + new Date().getSeconds()).slice(-2);
    console.log("t", t);
    axios({
      url: API_BASE_URL + "/verification",
      method: "post",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
      data: {
        approval: 0,
        challengeIdx: them,
        selfie: fileName,
        userIdx: data.userIdx,
        share: share ? 1 : 0,
        regtime: t,
      },
    }).then((res) => {
      console.log(res.data);
    });
  }

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <div>
        {url != null ? (
          <div className={styles.headerCt}>
            <img
              className={styles.backIcon}
              src="src/assets/icon/back_icon.png"
              onClick={() => {
                setUrl(null);
                setImgUrl(undefined);
              }}></img>

            <div className={styles.headerText}>카메라</div>
            <img
              className={styles.switchbtn}
              src="src/assets/icon/switchCamera.png"
              onClick={() => {
                setIsFacingMode(!isFacingMode);
              }}></img>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.shotDiv}>
          {url ? (
            <>
              <BrowserView>
                <div id="screenshot_wrap" className={styles.screenshot_wrap2}>
                  <div className={styles.screenshot2}>
                    <img id="screenshot_wrap_img" src={url} alt="Screenshot" />
                  </div>
                  <div className={styles.watermark}>MIRACLE BIRD</div>
                  <div className={styles.timestamp}>
                    <p>
                      {new Date().getFullYear()}-
                      {("0" + (new Date().getMonth() + 1)).slice(-2)}-
                      {("0" + new Date().getDate()).slice(-2) + " "}
                      {("0" + new Date().getHours()).slice(-2)}:
                      {("0" + new Date().getMinutes()).slice(-2)}
                    </p>
                  </div>
                  <div>
                    {them === 1 ? (
                      <div className={styles.themText1}>#미라클 모닝</div>
                    ) : (
                      ""
                    )}
                    {them === 2 ? (
                      <div className={styles.themText2}>#운동</div>
                    ) : (
                      ""
                    )}
                    {them === 3 ? (
                      <div className={styles.themText3}>#스터디</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </BrowserView>
              <MobileView>
                <div id="screenshot_wrap" className={styles.screenshot_wrap}>
                  <div className={styles.screenshot}>
                    <img src={url} alt="Screenshot" />
                  </div>
                  <div className={styles.watermark}>MIRACLE BIRD</div>
                  <div className={styles.timestamp}>
                    <p>
                      {new Date().getFullYear()}-
                      {("0" + (new Date().getMonth() + 1)).slice(-2)}-
                      {("0" + new Date().getDate()).slice(-2) + " "}
                      {("0" + new Date().getHours()).slice(-2)}:
                      {("0" + new Date().getMinutes()).slice(-2)}
                    </p>
                  </div>
                  <div>
                    {them === 1 ? (
                      <div className={styles.themText1}>#미라클 모닝</div>
                    ) : (
                      ""
                    )}
                    {them === 2 ? (
                      <div className={styles.themText2}>#운동</div>
                    ) : (
                      ""
                    )}
                    {them === 3 ? (
                      <div className={styles.themText3}>#스터디</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </MobileView>
            </>
          ) : (
            <>
              <div className={styles.headerCt}>
                <img
                  className={styles.backIcon}
                  src="src/assets/icon/back_icon.png"
                  onClick={() => history.back()}></img>

                <div className={styles.headerText}>카메라</div>
                <img
                  className={styles.switchbtn}
                  src="src/assets/icon/switchCamera.png"
                  onClick={() => {
                    setIsFacingMode(!isFacingMode);
                  }}></img>
              </div>
              <BrowserView>
                <div className={styles.cameraBrowser}>
                  <Webcam
                    audio={false}
                    className={styles.Camera2}
                    screenshotFormat="image/png"
                    ref={webcamRef}
                    videoConstraints={{
                      width: 256,
                      height: 256,
                      facingMode: isFacingMode ? "user" : "environment",
                    }}
                  />
                </div>
              </BrowserView>
              <MobileView>
                <Webcam
                  audio={false}
                  className={styles.Camera}
                  screenshotFormat="image/png"
                  ref={webcamRef}
                  videoConstraints={{
                    width: 256,
                    height: 256,
                    facingMode: isFacingMode ? "user" : "environment",
                  }}
                />
              </MobileView>
              <div className={styles.cateText}>카테고리를 선택해주세요.</div>
              <div className={styles.btnCt}>
                <button
                  className={`mmBtn ${them === 1 ? "active1" : ""}`}
                  onClick={() => setThem(1)}>
                  미라클모닝
                </button>
                <button
                  className={`healthBtn ${them === 2 ? "active2" : ""}`}
                  onClick={() => setThem(2)}>
                  운동
                </button>
                <button
                  className={`studyBtn ${them === 3 ? "active3" : ""}`}
                  onClick={() => setThem(3)}>
                  스터디
                </button>
              </div>
            </>
          )}
        </div>

        <MobileView>
          <div className={styles.camera_footer}>
            {url == null ? (
              <div>
                <img
                  className={styles.shot}
                  src="/camera-lens.png"
                  onClick={() => {
                    if (them === 0) {
                      handleShow();
                    } else {
                      if (them == 1 && morningCount) {
                        handleShow3();
                      } else if (them == 1 && !morningCount) {
                        var temp = new Date();
                        console.log(temp.getHours());
                        if (temp.getHours() < 7 && temp.getHours() >= 4) {
                          capture();
                        } else {
                          handleShow4();
                        }
                      } else if (them == 2 && exerciseCount) {
                        handleShow3();
                      } else if (them == 3 && studyCount) {
                        handleShow3();
                      } else {
                        capture();
                      }
                    }
                    setTimeout(() => takepicture(), 10);
                  }}></img>
              </div>
            ) : (
              <div>
                <div className={styles.share}>
                  공유하시겠습니까?
                  <label className={styles.inputBox}>
                    <input
                      name="chkbox"
                      type="checkbox"
                      className={styles.boxs}
                      onChange={(e) => {
                        onCheckedElement(e.target.checked);
                      }}></input>
                    <div>공유하기</div>
                  </label>
                </div>
                <div>
                  <img
                    className={styles.shot}
                    src="/download.png"
                    onClick={() => {
                      savepicture();
                      handleShow2();
                    }}></img>
                </div>
              </div>
            )}
            <div id="frame" className="frame"></div>
          </div>
        </MobileView>

        <BrowserView>
          <div className={styles.camera_footer2}>
            {url == null ? (
              <div>
                <img
                  className={styles.shot}
                  src="/camera-lens.png"
                  onClick={() => {
                    if (them === 0) {
                      handleShow();
                    } else {
                      if (them == 1 && morningCount) {
                        handleShow3();
                      } else if (them == 1 && !morningCount) {
                        var temp = new Date();
                        console.log(temp.getHours());
                        if (temp.getHours() < 7 && temp.getHours() >= 4) {
                          capture();
                        } else {
                          handleShow4();
                        }
                      } else if (them == 2 && exerciseCount) {
                        handleShow3();
                      } else if (them == 3 && studyCount) {
                        handleShow3();
                      } else {
                        capture();
                      }
                    }
                    setTimeout(() => takepicture(), 10);
                  }}></img>
              </div>
            ) : (
              <div>
                <div className={styles.share}>
                  공유하시겠습니까?
                  <label className={styles.inputBox}>
                    <input
                      name="chkbox"
                      type="checkbox"
                      className={styles.boxs}
                      onChange={(e) => {
                        onCheckedElement(e.target.checked);
                      }}></input>
                    <div>공유하기</div>
                  </label>
                </div>
                <div>
                  <img
                    className={styles.shot}
                    src="/download.png"
                    onClick={() => {
                      savepicture();
                      handleShow2();
                    }}></img>
                </div>
              </div>
            )}
            <div id="frame" className="frame"></div>
          </div>
        </BrowserView>
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          챌린지 카테고리를 선택해주세요!
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
      <Modal
        centered
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          미라클모닝은 04시~07시에만 가능합니다.
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
        <Modal.Body className={styles.modalcontent5} closeButton>
          사진이 추가되었습니다.
          <div className={styles.btnCt}>
            <button
              className={styles.morebtn}
              onClick={() => {
                document.location.href = "/camera";
              }}>
              한장 더
            </button>
            <button className={styles.backbtn} onClick={() => navigate("/")}>
              돌아가기
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          이미 촬영한 카테고리입니다.
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default Camera;
