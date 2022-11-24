import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import Modal from "react-bootstrap/Modal";
function CreatePost() {
  const [userIdx, setUserIdx] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const mainApi = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/auth/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const result = await response.json();
      setUserIdx(result.information.userIdx);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.backbtn}
          onClick={() => {
            history.back();
          }}>
          <img alt="back" src="/back.png" className={styles.backicon} />
        </button>
      </div>
      <div className={styles.Form}>
        <div className={styles.titleForm}>
          제목
          <input
            className={styles.title}
            type="text"
            placeholder="제목"
            name="title"
            onInput={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.contentForm}>
          내용
          <textarea
            className={styles.textarea}
            placeholder="내용"
            name="content"
            onInput={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.btnForm}>
        <button
          className={styles.submitbtn}
          onClick={() => {
            if (title == "" || title == " ") {
              handleShow();
            } else if (content == "" || content == " ") {
              handleShow2();
            } else {
              axios({
                url: "https://j7c107.p.ssafy.io/api/post",
                method: "POST",
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
                params: {
                  // user_idx: user.information.userIdx,/
                  user_idx: userIdx,
                },
                data: {
                  title: title,
                  content: content,
                },
              }).then((res) => {

              }).catch((error) => {
              });
              document.location.href = "/community";
            }
          }}>
          작성하기
        </button>
      </div>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          제목을 입력해 주세요.
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          내용을 입력해 주세요.
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePost;
