import React, { useEffect, useState } from "react";
import styles from "./Community.module.css";
import PostMain from "./PostMain";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Loading2 } from "../Base/Loading2";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { useSelector } from "react-redux";

function Community() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [postData, setPostDate] = useState("");
  const [userData, setUserDate] = useState("");
  const [postDataMap, setPostDateMap] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mainApi = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/post", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const result = await response.json();
      setPostDate(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const temp1 = [];
    const temp2 = [];

    for (var i = 0; i < postData.length; i++) {
      var item = postData[i];
      if (item.userRole && item.userRole == "ADMIN") {
        temp1.push(item);
      } else {
        temp2.push(postData[i]);
      }
    }
    for (var i = temp2.length - 1; i >= 0; i--) {
      temp1.push(temp2[i]);
    }

    setPostDateMap(temp1);
  }, [postData]);

  useEffect(() => {
    setLoading(false);
  }, [postDataMap]);

  useEffect(() => {
    mainApi();
  }, []);
  return (
    <>
      {loading ? (
        <Loading2 />
      ) : (
        <div className={styles.con}>
          <div className={styles.communityTitle}>
            <div>
              <img
                src="/src/assets/icon/footer_community.png"
                alt="community"
                className={styles.communityIcon}
              />
            </div>
            커뮤니티
          </div>
          <PostMain postData={postDataMap} className={styles.postMain} />
          <div className={styles.footer_camerabutton}>
            <img
              alt="camera"
              src="/src/assets/icon/create_button.png"
              className={styles.footer_camera}
              onClick={() => {
                if (user != null && user.check != "") {
                  navigate("/community/create");
                } else {
                  handleShow();
                }
              }}
            />
          </div>
        </div>
      )}
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
  );
}

export default Community;
