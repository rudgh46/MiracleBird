import React, { useState, useRef, useEffect } from "react";
import styles from "./MyPage.module.css";
import Modal from "react-bootstrap/Modal";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./Mypage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useNavigate, useLocation } from "react-router-dom";
import MypageFeed from "../components/common/MypageFeed";
import MypageCalendar from "../components/common/MypageCalendar";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../store/user";
import Web3 from "web3";
import { Loading1 } from "../components/Base/Loading1";
import { Loading2 } from "../components/Base/Loading2";

import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import seasonInfo from "./season.json";

import COMMON_ABI from "../common/ABI";
import getAddressFrom from "../util/AddressExtractor";

const BLOCKCHAIN_URL = "http://20.196.209.2:8545";

function MyPage() {
  const [loading1, setLoading1] = useState(true);
  const [updateImg, setUpdateImg] = useState("");
  const location = useLocation();

  const [userData, setUserData] = useState("");
  const [wallet, setWallet] = useState("");
  const [nftData, setNftData] = useState("");
  const [challengeData, setChallengeData] = useState("");
  const [keepDate, setKeepDate] = useState("");

  const [flag, setFlag] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [tempKey, setTempKey] = useState("");
  const keyRef = useRef(null);
  const [nftMap, setNftMap] = useState("");
  const [nftMap2, setNftMap2] = useState("");
  const [season, setSeason] = useState(1);
  const [challengeMap, setChallengeMap] = useState("");

  const [tokenBalance, setTokenBalance] = useState(0);
  const [privKey, setPrivKey] = useState("");

  const [sellTokenId, setSellTokenId] = useState(0);
  const [sellStarForce, setSellStarForce] = useState(0);
  const [sellLandmarkIdx, setSellLandmarkIdx] = useState(0);

  useEffect(() => {
    async function data() {
      await axios({
        url: API_BASE_URL + "/auth/",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          setUserData(res.data.information);
          setSeason(1);
          setLoading1(true);
          axios({
            url: API_BASE_URL + "/wallet/" + res.data.information.userIdx,
            method: "get",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
            .then((res) => {
              setWallet(res.data);

              // SSAFY Network
              const web3 = new Web3(
                new Web3.providers.HttpProvider(
                  `https://j7c107.p.ssafy.io/blockchain2/`
                )
              );

              // call Mira Token
              const callMiraToken = new web3.eth.Contract(
                COMMON_ABI.CONTRACT_ABI.ERC_ABI,
                import.meta.env.VITE_APP_ERC20_CA
              );

              async function getTokenBalance() {
                const response = await callMiraToken.methods
                  .balanceOf(res.data.walletAddress)
                  .call();
                setTokenBalance(response);
              }

              getTokenBalance();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    data();
  }, []);

  useEffect(() => {
    setLoading1(false);
    // console.log(location);
    if (location.state && !location.state.hasWallet) {
      handleShow();
    }
  }, [challengeMap]);

  useEffect(() => {
    setWrite(userData.name);
    if (updateImg.length != 0) {
      const formdata = new FormData();
      var fileName =
        "https://j7c107.p.ssafy.io/images/" + userData.userIdx + "_profileImg";
      if (updateImg[0].type.indexOf("png") == -1) {
        fileName += ".jpg";
      } else {
        fileName += ".png";
      }
      // console.log(fileName);
      formdata.append("uploadFile", updateImg[0], fileName);
      axios({
        url: "https://j7c107.p.ssafy.io/image/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });

      axios({
        url: API_BASE_URL + "/user/" + userData.userIdx,
        method: "put",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        params: {
          image_url: fileName,
        },
      }).then((res) => {
        // console.log(res.data);
      });
    }
  }, [updateImg]);

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/verification/streak/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setKeepDate(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  useEffect(() => {
    // console.log(userData);
    var startdate = seasonInfo[season - 1].startDate + "_00:00:00.000";
    var enddate = seasonInfo[season - 1].endDate + "_23:59:59.000";

    axios({
      url: API_BASE_URL + "/verification/heatmap/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      params: {
        start_date: startdate,
        end_date: enddate,
      },
    })
      .then((res) => {
        var temp = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          if (item.approval == 1) {
            temp.push(item);
          }
        }
        setChallengeData(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData, season]);

  useEffect(() => {
    const tempChallengeMap = {
      values: [],
    };
    var pre = "";
    var count = 1;
    if (challengeData.length != 0) {
      if (1 <= challengeData[0].regtime[2] <= 9) {
        pre =
          challengeData[0].regtime[0] +
          "-" +
          challengeData[0].regtime[1] +
          "-" +
          "0" +
          challengeData[0].regtime[2];
      } else {
        pre =
          challengeData[0].regtime[0] +
          "-" +
          challengeData[0].regtime[1] +
          "-" +
          challengeData[0].regtime[2];
      }
    }

    for (var i = 1; i < challengeData.length; i++) {
      if (1 <= challengeData[0].regtime[2] <= 9) {
        var now =
          challengeData[i].regtime[0] +
          "-" +
          challengeData[i].regtime[1] +
          "-" +
          "0" +
          challengeData[i].regtime[2];
      } else {
        var now =
          challengeData[i].regtime[0] +
          "-" +
          challengeData[i].regtime[1] +
          "-" +
          challengeData[i].regtime[2];
      }

      if (pre == now) {
        count++;
      } else {
        tempChallengeMap.values.push({ date: pre, count: count });
        pre = now;
        count = 1;
      }
    }
    if (challengeData.length != 0) {
      tempChallengeMap.values.push({ date: pre, count: count });
    }
    setChallengeMap(tempChallengeMap);
  }, [challengeData]);

  // my nft
  useEffect(() => {
    axios({
      url: API_BASE_URL + "/landmark/user/" + userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        var result = [];
        if (userData.userIdx == 1) {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            if (item.starForce != 1) continue;
            result.push(item);
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            result.push(item);
          }
        }
        setNftData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData]);

  useEffect(() => {
    var result = [];
    var result2 = [];
    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      result2.push(
        <div className={styles.nftImgContainer}>
          <div className={styles.nftImgContainer1}>
            <img alt="nft1" src={item.imagePath} className={styles.nfturl2} />
            <div className={styles.nftcard}>
              <div className={styles.nftname}>{item.nftname}</div>
              <div className={styles.nftdetail1}>{item.landmarkTitle}</div>
              <div className={styles.miraprice1}>
                <img alt="mira" src="/mira.png" className={styles.miraicon1} />
                <div className={styles.nftprice2}> {item.sellPrice} MIRA</div>
              </div>
              <div className={styles.btnContainer}>
                {item.selling == false ? (
                  <>
                    <button
                      className={styles.btnReinforce4}
                      onClick={() => {
                        navigate("/reinforce");
                      }}>
                      강화
                    </button>
                    <button
                      className={styles.btnSell2}
                      id={item.landmarkIdx}
                      onClick={(e) => handleShow3(e.target.id)}>
                      판매
                    </button>
                  </>
                ) : (
                  <>
                    <button className={styles.btnReinforce3}>강화</button>
                    <button className={styles.btnonsale3}>판매중</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      result.push(
        <SwiperSlide className={styles.nftslide} key={i}>
          <div className={styles.nftImgContainer}>
            <img alt="nft1" src={item.imagePath} className={styles.nfturl} />
          </div>
          <div className={styles.nftcard}>
            <div className={styles.nftname}>{item.nftname}</div>
            <div className={styles.nftdetail}>{item.landmarkTitle}</div>
            <div className={styles.miraprice}>
              <img alt="mira" src="/mira.png" className={styles.miraicon} />
              <div className={styles.nftprice}> {item.sellPrice} MIRA</div>
            </div>
            <div className={styles.btnContainer}>
              {item.selling === false ? (
                <>
                  <button
                    className={styles.btnReinforce}
                    onClick={() => {
                      navigate("/reinforce");
                    }}>
                    강화
                  </button>
                  <button
                    className={styles.btnSell}
                    id={item.landmarkIdx}
                    onClick={(e) => handleShow3(e.target.id)}>
                    판매
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.btnReinforce2}>강화</button>
                  <button className={styles.btnonsale}>판매중</button>
                </>
              )}
            </div>
          </div>
        </SwiperSlide>
      );
    }
    setNftMap(result);
    setNftMap2(result2);
    return () => {};
  }, [nftData]);

  useEffect(() => {
    // var result = [];
    // for (var i = 0; i < nftData.length; i++) {
    //   var item = nftData[i];
    //   result.push(
    //     <>
    //       <div>
    //         <div className={styles.nftImgContainer}>
    //           <img alt="nft1" src={item.imagePath} className={styles.nfturl2} />
    //         </div>
    //         <div className={styles.nftcard2}>{item.landmarkTitle}</div>
    //       </div>
    //     </>
    //   );
    // }
    // setNftMap2(result);
    // return () => {};
  }, [nftData]);

  // SSAFY Network
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  // nft 판매 권한을 관리자에게 넘긴다
  async function ApproveItem() {
    const address = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );

    if (!address) {
      handleShow9();
      return;
    }
    try {
      handleShow0();
      const sender = web3.eth.accounts.privateKeyToAccount(privKey);
      web3.eth.accounts.wallet.add(sender);
      web3.eth.defaultAccount = sender.address;

      const senderAddress = web3.eth.defaultAccount;
      const approveNft = new web3.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.NFT_ABI,
        import.meta.env.VITE_APP_NFT_CA
      );

      // approve할 관리자주소
      const response = await approveNft.methods
        .approve(import.meta.env.VITE_APP_ADMIN_ADDRESS, sellTokenId)
        .send({ from: senderAddress, gas: 3000000 });

      // db에 가격 변경 및 selling 여부 변경
      axios(API_BASE_URL + "/landmark/" + sellLandmarkIdx, {
        method: "PUT",
        params: {
          user_idx: userData.userIdx,
        },
        data: {
          sellPrice: sell,
          selling: 1,
          starForce: sellStarForce,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          handleClose0();
          handleShow7();
        })
        .catch((err) => console.log("Edit Price error", err));
    } catch (err) {
      console.log("ERROR while Approving item", err);
    }
    return <div></div>;
  }

  const [show0, setShow0] = useState(false);
  const handleClose0 = () => setShow0(false);
  const handleShow0 = () => setShow0(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const selling = (e) => {
    ApproveItem();
  };
  const handleShow3 = (idx) => {
    axios(API_BASE_URL + "/landmark/" + idx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setSellLandmarkIdx(idx);
        setSellStarForce(res.data.starForce);
        setSellTokenId(res.data.tokenId);
        setShow3(true);
      })
      .catch((err) => console.log("Get landmark error", err));
  };

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);
  const [show9, setShow9] = useState(false);
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);
  const [show10, setShow10] = useState(false);
  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  const [Image, setImage] = useState("");
  const fileInput = useRef(null);
  let [write, setWrite] = useState("");
  let [sell, setSell] = useState("");
  let [sale, setSale] = useState("");
  let [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  function copyToClip(e) {
    keyRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }
  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(userData.image_url);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {loading1 ? (
        <Loading2 />
      ) : (
        <>
          <div className={styles.btns}>
            {userData.name === "관리자" ? (
              <button
                className={styles.adminpage}
                onClick={() => navigate("/admin")}>
                관리자페이지
              </button>
            ) : (
              ""
            )}
            <button className={styles.logout} onClick={() => handleShow5()}>
              로그아웃
            </button>
            <button className={styles.connect} onClick={() => handleShow()}>
              CONNECT
            </button>
          </div>
          <div className={styles.profile}>
            <div className={styles.profileimg}>
              <img
                src={
                  user.information.imageUrl == "" ||
                  user.information.imageUrl == undefined ||
                  user.information.imageUrl == null
                    ? "src/assets/icon/profile_default.jpg"
                    : user.information.imageUrl
                }
                className={styles.profileupload}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                onChange={(e) => {
                  const file = e.target.files;
                  setUpdateImg(file);
                }}
                name="profile_img"
                ref={fileInput}
              />
              <div className={styles.nicknamebox}>
                <div className={styles.nickname}>{user.information.name}</div>
                <button className={styles.pencilbtn} onClick={handleShow2}>
                  <img
                    src="/pencil.png"
                    alt="pencil"
                    className={styles.pencil}
                  />
                </button>
              </div>
            </div>
            <div className={styles.profiledetail}>
              <div className={styles.detail1}>
                <div className={styles.nftnumber}>{nftData.length}</div>
                <div className={styles.nfttext}>보유 NFT</div>
              </div>
              <div className={styles.detail2}>
                <div className={styles.mira}>{tokenBalance}</div>
                <div className={styles.miratext}>보유 MIRA</div>
              </div>
              <div className={styles.detail3}>
                <div className={styles.rank}>{keepDate}</div>
                <div className={styles.ranktext}>지속일</div>
              </div>
            </div>
          </div>
          <div>
            {/* <MypageCalendar userData={userData} data={challengeMap} /> */}
            <select
              className={styles.selectBox}
              onChange={(e) => setSeason(e.target.value)}>
              {seasonInfo.map((item) => {
                return (
                  <option key={item.season} value={item.season}>
                    시즌 {item.season}
                  </option>
                );
              })}
            </select>

            <div className={styles.heatmapcontainer}>
              <CalendarHeatmap
                startDate={seasonInfo[season - 1].startDate}
                endDate={seasonInfo[season - 1].endDate}
                horizontal={false}
                showMonthLabels={false}
                values={challengeMap.values}
                classForValue={(value) => {
                  if (!value) {
                    return "color-empty";
                  }
                  return `color-scale-${value.count >= 4 ? 4 : value.count}`;
                }}
                tooltipDataAttrs={(value) => {
                  if (!value || !value.date) {
                    return null;
                  }
                  return {
                    "data-tip": `${value.date} 인증 횟수: ${value.count}`,
                  };
                }}
              />
              <ReactTooltip className={styles.tooltip} />
            </div>
          </div>
          <div className={styles.nftContainer}>
            <div className={styles.text1}>보유 NFT</div>
            <div className={styles.nftImg}>
              {nftData.length !== 0 ? (
                <button
                  className={styles.listbtn}
                  onClick={() => handleShow8()}>
                  <img src="/list.png" className={styles.listicon}></img>
                </button>
              ) : (
                <div>
                  <div className={styles.nonenft}>
                    <div className={styles.gostoreText}>
                      NFT를 구매해보세요!
                    </div>
                    <button
                      onClick={() => navigate("/store")}
                      className={styles.gostore}>
                      구매하러가기
                    </button>
                  </div>
                </div>
              )}

              <Swiper
                modules={Navigation}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                className={styles.swiper}>
                {nftMap}
              </Swiper>
            </div>
          </div>

          <div className={styles.challengeCt}>
            <MypageFeed userData={userData} data={challengeMap} />
          </div>
          <div>
            <button className={styles.userDelete} onClick={() => handleShow6()}>
              회원탈퇴
            </button>
          </div>
        </>
      )}

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent} closeButton>
          <img alt="wallet" src="/wallet.png" className={styles.wallet} />
          {(wallet.walletAddress == undefined || wallet.walletAddress == "") &&
          tempKey == "" ? (
            <>
              <div className={styles.buttonCt}>
                <button
                  onClick={() => handleClose()}
                  className={styles.closebtn}>
                  닫기
                </button>
                <button
                  className={styles.walletbtn}
                  onClick={(e) => {
                    e.preventDefault();
                    var web3 = new Web3(BLOCKCHAIN_URL);
                    var privateKey = web3.eth.accounts.create();

                    axios({
                      url: API_BASE_URL + "/wallet",
                      method: "post",
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("accessToken"),
                      },
                      data: {
                        userIdx: userData.userIdx,
                        walletAddress: privateKey.address,
                      },
                    }).then((res) => {
                      setTempKey(privateKey.privateKey);
                    });
                  }}>
                  지갑 생성
                </button>
              </div>
            </>
          ) : (
            <div className={styles.walletAddress}>
              {wallet.walletAddress == undefined ? (
                <div className={styles.walletText}>
                  <strong>경고!</strong>
                  <p className={styles.keyText}>
                    1. 지갑 비밀키를 잃어버리지 마세요! 한 번 잃어버리면 복구 할
                    수 없습니다.
                    <br />
                    2. 공유하지 마세요! 비밀키가 악위적인 사이트에 노출되면
                    당신의 자산이 유실될 수 있습니다.
                    <br />
                    3. 백업을 만들어 두세요! 종이에 적어서 오프라인으로
                    관리하세요.
                  </p>

                  <div className={styles.btnDiv}>
                    <textarea
                      ref={keyRef}
                      value={tempKey}
                      className={styles.textarea}></textarea>
                    {document.queryCommandSupported("copy") && (
                      <button onClick={copyToClip} className={styles.copybtn}>
                        복사
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setTempKey(tempKey);
                        handleClose();
                        document.location.href = "/mypage";
                      }}
                      className={styles.walletCheckbtn}>
                      확인
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.walletAddressText}>지갑 주소</div>
                  <div className={styles.walletText}>
                    {wallet.walletAddress}
                  </div>
                  <button
                    onClick={() => {
                      handleClose();
                      setFlag(true);
                    }}
                    className={styles.walletCheckbtn}>
                    확인
                  </button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent2} closeButton>
          <div className={styles.nicknamechange}>닉네임변경</div>
          <div className={styles.nicknamecontainer}>
            <input
              autoComplete="nickname"
              name="nickname"
              className={styles.nicknameinput}
              placeholder="닉네임"
              value={write}
              onInput={(event) => {
                setWrite(event.target.value);
              }}
            />
            <button
              onClick={() => {
                if (write == "" || write.length > 5 || write.length <= 1) {
                  handleShow10();
                } else {
                  handleClose2;
                  axios({
                    url: API_BASE_URL + "/user/" + userData.userIdx,
                    method: "put",
                    headers: {
                      Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                    },
                    params: {
                      // user_idx: user.information.userIdx,/
                      name: write,
                    },
                  }).then((res) => {});
                  document.location.href = "/mypage";
                }
              }}
              className={styles.nicknamebtn}>
              변경하기
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
        <Modal.Body className={styles.modalcontent3} closeButton>
          <div className={styles.sellprice}>판매가격</div>
          <div className={styles.selltext}>※판매가는 수정할 수 없습니다.</div>
          <div className={styles.pricecontainer}>
            <input
              autoComplete="price"
              name="price"
              className={styles.priceinput}
              placeholder="판매가"
              onInput={(event) => {
                setSell(event.target.value);
              }}
            />
            <input
              autoComplete="privKey"
              name="privKey"
              className={styles.priceinput}
              placeholder="개인키"
              onInput={(event) => {
                setPrivKey(event.target.value);
              }}
            />
            <button
              onClick={(e) => {
                selling(e);
              }}
              className={styles.sellbtn}>
              판매하기
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent4} closeButton>
          <div className={styles.sellprice}>판매가격</div>
          <div className={styles.pricecontainer}>
            <input
              autoComplete="price"
              name="price"
              className={styles.priceinput}
              placeholder={sale}
              onInput={(event) => {
                setSell(event.target.value);
              }}
            />
            <button
              onClick={() => {
                handleClose4(false);
              }}
              className={styles.sellbtn}>
              수정하기
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show5}
        onHide={handleClose5}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent5} closeButton>
          로그아웃하시겠습니까?
          <div className={styles.btnCt}>
            <button className={styles.backbtn} onClick={() => handleClose5()}>
              돌아가기
            </button>
            <button
              className={styles.logoutbtn}
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(login(null));
                removeCookie("refreshToken", { path: "/" });
                handleClose5();
                document.location.href = "/";
              }}>
              로그아웃
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={show6}
        onHide={handleClose6}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent5} closeButton>
          탈퇴 시 사용자의 지갑도 함께 삭제됩니다.
          <br />
          탈퇴하시겠습니까?
          <div className={styles.btnCt}>
            <button className={styles.backbtn} onClick={() => handleClose5()}>
              돌아가기
            </button>
            <button
              className={styles.logoutbtn}
              onClick={() => {
                axios({
                  url: API_BASE_URL + "/wallet/" + wallet.walletIdx,
                  method: "delete",
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("accessToken"),
                  },
                })
                  .then((res) => {
                    setWallet(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                axios({
                  url: API_BASE_URL + "/user/" + userData.userIdx,
                  method: "delete",
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("accessToken"),
                  },
                })
                  .then((res) => {
                    console.log("회원삭제");
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(login(null));
                removeCookie("refreshToken", { path: "/" });
                handleClose6();

                document.location.href = "/";
              }}>
              회원탈퇴
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show7}
        onHide={handleClose7}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent7}>
          판매중으로 변경되었습니다!
          <button
            onClick={() => {
              document.location.href = "/mypage";
            }}
            className={styles.walletCheckbtn}>
            확인
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show0}
        onHide={handleClose0}
        backdrop="static"
        keyboard={false}
        className={styles.dialog0}>
        <Modal.Header
          className={styles.modalheader}
          closeButton={true}></Modal.Header>
        <Modal.Body className={styles.body}>
          <Loading1 text="판매진행중입니다." />
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={show8}
        onHide={handleClose8}
        backdrop="static"
        keyboard={false}
        className={styles.dialog8}>
        <Modal.Header
          className={styles.modalheader}
          closeButton={true}></Modal.Header>
        <Modal.Body className={styles.modalcontent8}>{nftMap2}</Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show9}
        onHide={handleClose9}
        backdrop="static"
        keyboard={false}
        className={styles.dialog0}>
        <Modal.Header
          className={styles.modalheader}
          closeButton={true}></Modal.Header>
        <Modal.Body className={styles.modalcontent4}>
          개인키가 일치하지 않습니다.
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show10}
        onHide={handleClose10}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header
          className={styles.modalheader}
          closeButton={true}></Modal.Header>
        <Modal.Body className={styles.modalcontent2}>
          <div className={styles.nicknamechange}>
            닉네임은 2~5자리 이어야 합니다
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyPage;
