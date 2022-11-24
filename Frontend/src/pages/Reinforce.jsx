import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import styles from "./Reinforce.module.css";
import Lottie from "lottie-react";
// import lightEffectAniamition from "../components/animation/light-effect.json";
// import shimmerEffect from "../components/animation/shimmer.json"
import shimmerEffect from "../components/animation/shimmer2.json";
import levelUp from "../components/animation/levelup2.json";
import coin from "../components/animation/coin.json";
import arrow from "../components/animation/arrow.json";
import success from "../components/animation/success2.json";
import fail from "../components/animation/fail.json";
import crack from "../components/animation/crack.json";
import fall from "../components/animation/fall.json";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./Reinforce.css";

import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import Web3 from "web3";
import COMMON_ABI from "../common/ABI";
import getAddressFrom from "../util/AddressExtractor";

function Reinforce() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
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
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const [imgIndex, setImgIndex] = useState("");
  const [newImg, setNewImg] = useState("");
  const [nftData, setNftData] = useState("");
  const [userData, setUserData] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [nextTokenId, setNextTokenId] = useState(0);
  const [nowTokenId, setNowTokenId] = useState(0);
  const [nowImg, setNowImg] = useState("");
  const [nextImg, setNextImg] = useState("");
  const [nowLandmarkIdx, setNowLandmarkIdx] = useState(0);
  const [nextLandmarkIdx, setNextLandmarkIdx] = useState(0);

  // const NFT_SELECT =[
  //     {nfturl:'/src/assets/landmark/1_1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftprice:'10', 'onsale':0, level:1, imgindex:1,},
  //     {nfturl:'/src/assets/landmark/15_6.png', nickname:'이싸피', nftname:'롯데타워 1강', nftprice:'12', 'onsale':1, level:6, imgindex:15,},
  //     {nfturl:'/src/assets/landmark/207_3.png', nickname:'김싸피', nftname:'롯데타워 5강', nftprice:'10', 'onsale':0, level:3, imgindex:207,},
  //     {nfturl:'/src/assets/landmark/310_6.png', nickname:'이싸피', nftname:'롯데타워 1강', nftprice:'12', 'onsale':1, level:6, imgindex:310,},
  //     {nfturl:'/src/assets/landmark/22_1.png', nickname:'김싸피', nftname:'롯데타워 5강', nftprice:'10', 'onsale':0, level:1,imgindex:22,},
  //     {nfturl:'/src/assets/landmark/117_2.png', nickname:'이싸피', nftname:'롯데타워 1강', nftprice:'12', 'onsale':1, level:2, imgindex:117,},
  //     {nfturl:'/src/assets/landmark/33_4.png', nickname:'김싸피', nftname:'롯데타워 5강', nftprice:'10', 'onsale':0, level:4, imgindex:33,},
  //     {nfturl:'/src/assets/landmark/214_5.png', nickname:'이싸피', nftname:'롯데타워 1강', nftprice:'12', 'onsale':1, level:5, imgindex:214,},
  // ]

  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  async function getTokenBalance(walletAddress) {
    const callMiraToken = new web3.eth.Contract(
      COMMON_ABI.CONTRACT_ABI.ERC_ABI,
      import.meta.env.VITE_APP_ERC20_CA
    );

    const response = await callMiraToken.methods
      .balanceOf(walletAddress)
      .call();
    setTokenBalance(response);
    console.log(response);
  }

  async function mynft(user) {
    await axios({
      url: API_BASE_URL + "/landmark/user/" + user.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        var result = [];
        if (user.userIdx == 1) {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            if (item.starForce != 1) continue;
            else if (item.selling === true) continue;
            result.push(item);
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            if (item.selling === true) continue;
            else if (item.starForce === 7) continue;
            result.push(item);
          }
        }
        setNftData(result);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios(API_BASE_URL + "/wallet/" + user.userIdx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log(res.data);
        const WalletData = res.data;
        setWalletAddress(WalletData.walletAddress);
        getTokenBalance(WalletData.walletAddress);
      })
      .catch((err) => console.log("Get wallet data error", err));
  }

  useEffect(() => {
    async function data() {
      await axios({
        url: API_BASE_URL + "/auth/",
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      })
        .then((res) => {
          setUserData(res.data.information);
          console.log(res.data);
          mynft(res.data.information);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    data();
  }, [userData.userIdx]);

  //   useEffect(() => {
  //     getTokenBalance();
  //     console.log(tokenBalance)
  //   }, [userData]);

  const cardEl = useRef();
  const onButtonClick = () => {
    if (cardEl.current.style.transform === "") {
      cardEl.current.style.transform = "rotateY(720deg)";
    } else {
      cardEl.current.style.transform = "";
    }
  };

  const upgradePercent = [0, 90, 75, 60, 45, 30, 10];

  const downgradePercent = [0, 0, 15, 40, 65, 80, 95];

  const upgradeBtn = () =>{
    setLoading(true);
    upgradeNFT();
  }

  // upgrade NFT
  async function upgradeNFT() {
    console.log(userData);
    console.log(level);
    const newLevel = level + 1;
    console.log(newLevel);
    const myaddress = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );
    console.log("myaddress", myaddress);
    if (!myaddress) {
      handleShow6();
      return;
    }
    try {
      const me = web3.eth.accounts.privateKeyToAccount(privKey);
      web3.eth.accounts.wallet.add(me);
      console.log(web3.eth.accounts.wallet);
      web3.eth.defaultAccount = me.address;
      console.log("defaultAccount_me :", web3.eth.defaultAccount);

      const senderAddress = web3.eth.defaultAccount;
      const sendMira = new web3.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.ERC_ABI,
        import.meta.env.VITE_APP_ERC20_CA
      );
      // 관리자에게 미라 토큰 전송
      const response = await sendMira.methods
        .transfer(import.meta.env.VITE_APP_ADMIN_ADDRESS, 2)
        .send({ from: senderAddress, gas: 3000000 });
      console.log(response);
      if (response.status === true) {
        let random_num = Math.floor(Math.random() * 101);
        console.log(random_num, upgradePercent[level], downgradePercent[level]);
        
        if (random_num > upgradePercent[level]) {
          setNewImg(nowImg);
          setLoading(false);
          handleShow2();
          return;
        } else {
          setNewImg(nextImg);
          const sendLandmarkNft = new web3.eth.Contract(
            COMMON_ABI.CONTRACT_ABI.NFT_ABI,
            import.meta.env.VITE_APP_NFT_CA
          );
          // 내꺼 관리자에게로 보내기
          const response2 = await sendLandmarkNft.methods
            .safeTransferFrom(
              walletAddress,
              import.meta.env.VITE_APP_ADMIN_ADDRESS,
              nowTokenId
            )
            .send({ from: senderAddress, gas: 3000000 });
          console.log(response2);

          const sender2 = web3.eth.accounts.privateKeyToAccount(
            import.meta.env.VITE_APP_ADMIN_PRIVKEY
          );
          web3.eth.accounts.wallet.add(sender2);
          console.log(web3.eth.accounts.wallet);
          web3.eth.defaultAccount = sender2.address;
          const senderAddress2 = web3.eth.defaultAccount;

          // 관리자꺼 나한테 보내기
          const response3 = await sendLandmarkNft.methods
            .safeTransferFrom(senderAddress2, walletAddress, nextTokenId)
            .send({ from: senderAddress2, gas: 3000000 });
          console.log(response3);

          // 관리자가 가지고 있던 nft 정보를 내걸로 수정
          // 내거를 관리자 정보로 수정
          // 새 nft 내 mynft로
          // 헌 nft 관리자 mynft로
          if (response2.status === true) {
            if (response3.status === true) {
              console.log(newLevel);
              // put landmark db new nft & old nft
              axios(API_BASE_URL + "/landmark/" + nowLandmarkIdx, {
                method: "PUT",
                params: {
                  user_idx: userData.userIdx,
                },
                data: {
                  sellPrice: 0,
                  selling: 0,
                  starForce: newLevel,
                },
                headers: {
                  Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                },
              })
                .then((res) => {
                  console.log(res);
                  // put my new nft db
                  axios(API_BASE_URL + "/mynft/" + nextLandmarkIdx, {
                    method: "PUT",
                    params: {
                      user_idx: userData.userIdx,
                    },
                    headers: {
                      Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                    },
                  });

                  // put my old nft db
                  axios(API_BASE_URL + "/mynft/" + nowLandmarkIdx, {
                    method: "PUT",
                    params: {
                      user_idx: 1,
                    },
                    headers: {
                      Authorization: "Bearer " + NOW_ACCESS_TOKEN,
                    },
                  });
                })
                .catch((err) => console.log("Reinforce error", err));
            }
          }
          setLoading(false);
          handleShow();
        }
      }
    } catch (err) {
      console.log("ERROR while Transaction", err);
    }
    return <div></div>;
  }

  const NextTokenId = (infoIdx, starForce, e) => {
    e.preventDefault();
    axios({
      url: API_BASE_URL + "/landmark/landmarkinfoidx/" + infoIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
    })
      .then((res) => {
        console.log(res.data[starForce]);
        setNextTokenId(res.data[starForce].tokenId);
        setNowImg(res.data[starForce - 1].imagePath);
        setNextImg(res.data[starForce].imagePath);
        setNowLandmarkIdx(res.data[starForce - 1].landmarkIdx);
        setNextLandmarkIdx(res.data[starForce].landmarkIdx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.fullCt}>
        <div className={styles.Header}>
          <button
            className={styles.backbtn}
            onClick={() => {
              navigate("/mypage");
            }}>
            <img alt="back" src="/back.png" className={styles.backicon} />
          </button>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                <div className={styles.tooltiptext}>
                  <img
                    alt="nft"
                    src="/nftenhance.png"
                    className={styles.nfticon}
                  />
                  강화 확률
                </div>
                <div className={styles.tooltiptext}>1강 → 2강: 90%</div>
                <div className={styles.tooltiptext}>2강 → 3강: 75%</div>
                <div className={styles.tooltiptext}>3강 → 4강: 60%</div>
                <div className={styles.tooltiptext}>4강 → 5강: 45%</div>
                <div className={styles.tooltiptext}>5강 → 6강: 30%</div>
                <div className={styles.tooltiptext}>6강 → 7강: 10%</div>
              </Tooltip>
            }>
            <img
              alt="notice"
              src="/attention.png"
              className={styles.noticeicon}
            />
          </OverlayTrigger>
        </div>

        <div className={styles.nftCt}>
          <div className={styles.nftImgCt}>
            {address === "" ? (
              <>
                <img
                  alt="nft"
                  src="/background.png"
                  className={styles.background}
                />
                <div className={styles.nfttext}>강화할 NFT를 선택해주세요!</div>
              </>
            ) : (
              <>
                {loading ? (
                  <div className={styles.effectCt}>
                    <div className={styles.effectText}>강화중입니다.</div>
                    <div className={styles.effectText}>잠시만 기다려주세요</div>
                    <Lottie animationData={coin} className={styles.lottie} />
                  </div>
                ) : (
                  <>
                    <div className={styles.flip}>
                      <div className={styles.shimmer}>
                        <Lottie
                          animationData={shimmerEffect}
                          loop={true}
                          className={styles.shimmereffect}
                        />
                      </div>
                      <div className={styles.card} ref={cardEl}>
                        <img
                          alt="nft1"
                          src={address}
                          className={styles.selectnft}
                        />
                        {/* <img alt="nft2" src="/silverback.png" className={styles.back} /> */}
                      </div>
                    </div>
                  </>
                )}
                <div className={styles.leveltext}>
                  <div className={styles.numbertext}>
                    <div>{level}</div>
                    <div>강</div>
                  </div>
                  <div className={styles.arrowCt}>
                    <Lottie
                      animationData={arrow}
                      loop={true}
                      className={styles.arrows}
                    />
                  </div>

                  <div className={styles.numbertext}>
                    <div>{level + 1}</div>
                    <div>강</div>
                  </div>
                </div>
                <div className={styles.levelbtnct}>
                  <button
                    className={styles.levelbtn}
                    onClick={tokenBalance >= 2 ? handleShow4 : handleShow5 }>
                    강화하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {nftData.length ? (
          <div className={styles.nftsCt}>
            <div className={styles.nftsImgCt}>
                {nftData.map((nft, index) => {
                  return (

                        <img
                          alt="nft1"
                          src={nft.imagePath}
                          className={styles.nfturl}
                          key={index}
                          onClick={(e) => (
                            setAddress(nft.imagePath),
                            setNowTokenId(nft.tokenId),
                            setLevel(nft.starForce),
                            NextTokenId(nft.landmarkInfoIdx, nft.starForce, e)
                          )}
                        />

                  )
                })}
            </div>
          </div>
          )
        :
        <div className={styles.gostoreText}>
          <div className={styles.gostoreText2}>강화할 수 있는 NFT가 없습니다.</div>
          <div className={styles.gostoreText2}>NFT를 구매해보세요!</div>
          <button className={styles.gostoreBtn} onClick={()=>(navigate("/store"))}>구매하러가기</button>
        </div>
        }

      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <div className={styles.successCardCt}>
            <Lottie animationData={success} className={styles.success} />
            <img alt="nft1" src={newImg} className={styles.successCard} />
          </div>
          <div>{level + 1}강 강화에 성공했습니다!</div>
          <button
            className={styles.successBtn}
            onClick={() => {
              handleClose(), handleClose4(), document.location.reload();
            }}>
            확인
          </button>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <div className={styles.failCardCt}>
            <Lottie animationData={fail} loop={true} className={styles.fail} />
            <img alt="nft1" src={newImg} className={styles.failCard} />
          </div>
          <div>
            강화에 실패했습니다. <br></br>현재 상태가 유지됩니다.
          </div>
          <button
            className={styles.successBtn}
            onClick={() => {
              handleClose2(), handleClose4(), navigate("/reinforce");
            }}>
            확인
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <div className={styles.failCardCt}>
            <Lottie animationData={fail} loop={true} className={styles.fail} />
            <img alt="nft1" src={newImg} className={styles.failCard} />
          </div>
          <div>
            강화에 실패했습니다. <br></br> {level - 1}강으로 등급이 하락됩니다.
          </div>
          <button className={styles.successBtn} onClick={handleClose3}>
            확인
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent2}>
          <div className={styles.privKeychange}>
            개인키를 입력해주세요
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <div className={styles.tooltiptext}>
                    강화 1회: 2 MIRA
                  </div>
                </Tooltip>
              }>
              <img
                alt="notice"
                src="/attention.png"
                className={styles.noticeicon2}
              />
            </OverlayTrigger>
          </div>
          <div className={styles.privKeycontainer}>
            <input
              autoComplete="privKey"
              name="privKey"
              className={styles.privKeyinput}
              placeholder="개인키"
              onInput={(event) => {
                setPrivKey(event.target.value);
              }}
            />
            <button
              onClick={(e) => {
                handleClose4(),
                upgradeBtn(e);
                // upgradeNFT(e);
              }}
              className={styles.privKeybtn}>
              강화하기
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show5}
        onHide={handleClose5}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent3}>
          MIRA 토큰이 부족합니다.
          <br />
          챌린지 인증을 통해 MIRA 토큰을 획득해보세요!
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show6}
        onHide={handleClose6}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent3}>
          개인키가 일치하지 않습니다.
          <div className={styles.btnCt}>
            <button onClick={()=>(setLoading(false), handleClose6())} className={styles.closebtn}>닫기</button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default Reinforce;
