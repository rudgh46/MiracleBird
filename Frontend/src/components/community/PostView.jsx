import React, { useEffect, useState } from "react";
import { getPostByNo } from "./PostData";
import styles from "./PostView.module.css";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { useNavigate } from "react-router-dom";
import profile_default from "../../assets/icon/profile_default.jpg";

const PostView = () => {
  const [userIdx, setUserIdx] = useState("");
  const [data, setData] = useState({});
  const [commentData, setCommentData] = useState("");
  const [commentDataMap, setCommentDataMap] = useState("");
  const [curComment, setCurComment] = useState("");
  const [content, setContent] = useState("");

  const [commentContent, setCommentContent] = useState("");
  const [reflesh, setReflesh] = useState(false);

  const { postIdx } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    mainApi();
  }, []);

  useEffect(() => {
    if (reflesh) {
      setReflesh(false);
    }
    axios({
      url: API_BASE_URL + "/comment/" + postIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reflesh]);

  useEffect(() => {
    var temp = [];
    for (var i = 0; i < commentData.length; i++) {
      var item = commentData[i];
      const commentIdx = item.commentIdx;
      temp.push(
        <div className={styles.comment} key={item.commentIdx}>
          <div className={styles.postInfoName}>
            {item.image_url == null ? (
              <img
                alt="profile"
                src={profile_default}
                className={styles.commentImg}
              />
            ) : (
              <img
                alt="profile"
                src={item.image_url}
                className={styles.commentImg}
              />
            )}
            {item.name}
          </div>
          <div className={styles.commentWriter}></div>
          <div className={styles.commentContent}>{item.content}</div>
          <div className={styles.commentFooter}>
            <span className={styles.commentTime}>
              {item.regtime[0] +
                "-" +
                item.regtime[1] +
                "-" +
                item.regtime[2] +
                " " +
                item.regtime[3] +
                ":" +
                item.regtime[4]}
            </span>
            {userIdx == item.userIdx ? (
              <button
                className={styles.deletebtn}
                onClick={() => {
                  setCurComment(commentIdx);
                  handleShow2();
                }}>
                삭제
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
    setCommentDataMap(temp);
  }, [commentData]);
  const mainApi = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/post/" + postIdx, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      });
      const result = await response.json();
      var temp = [];
      var result2 = result.content.split("\n");
      for (var i = 0; i < result2.length; i++) {
        var item = result2[i];

        temp.push(
          <span key={i}>
            {item}
            <br />
          </span>
        );
      }
      setContent(temp);
      setData(result);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(API_BASE_URL + "/auth/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      });
      const result = await response.json();
      setUserIdx(result.information.userIdx);
    } catch (error) {
      console.log(error);
    }
    axios({
      url: API_BASE_URL + "/comment/" + postIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <div className={styles.postContainer}>
      <button
        className={styles.backbtn}
        onClick={() => {
          navigate("/community");
        }}>
        <img alt="back" src="/back.png" className={styles.backicon} />
      </button>
      <div className={styles.post_view_wrapper}>
        {data ? (
          <>
            <div className={styles.postTitle}>{data.title}</div>
            <div className={styles.postInfo}>
              <div className={styles.postInfoDate}>
                {data.createDate} 조회수 {data.hit}
              </div>
              <div className={styles.postInfoSub}>
                <div className={styles.postInfoName}>
                  {data.image_url == null ? (
                    <img
                      alt="profile"
                      src={profile_default}
                      className={styles.profileImg}
                    />
                  ) : (
                    <img
                      alt="profile"
                      src={data.image_url}
                      className={styles.profileImg}
                    />
                  )}
                  {data.name}
                </div>
                {data.userIdx == userIdx ? (
                  <div>
                    <Link
                      to={`/community/update/${data.postIdx}`}
                      className={styles.titletext}>
                      <button className={styles.updatebtn}>수정</button>
                    </Link>
                    <button
                      className={styles.deletebtn}
                      onClick={() => handleShow()}>
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.postContent}>
              <div>{content}</div>
            </div>
            <div className={styles.postComment}>
              <div>
                <img
                  src="/chat.png"
                  alt="comment"
                  className={styles.commenticon}
                />
                댓글
              </div>
              <div>
                <input
                  className={styles.title}
                  type="text"
                  placeholder=""
                  name="title"
                  value={commentContent}
                  onInput={(e) => {
                    setCommentContent(e.target.value);
                  }}
                />
                <button
                  className={styles.writebtn}
                  onClick={() => {
                    if (commentContent == "" || commentContent == " ") {
                      handleShow3();
                    } else {
                      axios({
                        url: API_BASE_URL + "/comment",
                        method: "post",
                        headers: {
                          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                        },
                        params: {
                          post_idx: postIdx,
                        },
                        data: {
                          content: commentContent,
                        },
                      })
                        .then((res) => {
                          setTimeout(() => {
                            console.log("posting")
                          }, 1000);
                          setCommentContent("");
                          setReflesh(true);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  }}>
                  작성
                </button>
              </div>
              {commentDataMap}
            </div>
          </>
        ) : (
          "해당 게시글을 찾을 수 없습니다."
        )}
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          삭제하시겠습니까?
          <div className={styles.btnCt}>
            <button
              className={styles.deletebackbtn}
              onClick={() => handleClose()}>
              돌아가기
            </button>
            <button
              className={styles.deletedeletebtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/post/" + data.postIdx,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                  params: {
                    // user_idx: user.information.userIdx,/
                    user_idx: userIdx,
                  },
                }).then((res) => {
                  // console.log(res.data);
                  navigate("/community");
                });
              }}>
              삭제하기
            </button>
          </div>
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
          댓글을 삭제하시겠습니까?
          <div className={styles.btnCt}>
            <button
              className={styles.deletebackbtn}
              onClick={() => handleClose2()}>
              돌아가기
            </button>
            <button
              className={styles.deletedeletebtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/comment/" + curComment,
                  method: "delete",
                  headers: {
                    Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                  },
                }).then((res) => {
                  // console.log(res.data);
                  handleClose2();
                  setReflesh(true);
                });
              }}>
              삭제하기
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
        <Modal.Body className={styles.modalcontent} closeButton>
          댓글에 내용을 입력해 주세요.
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostView;
