import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import spot from "../components/map/spot.json";
import styles from "./Landmark.module.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import optionsJSON from "./options.json";
import Modal from "react-bootstrap/Modal";
import { Loading1 } from "../components/Base/Loading1";
import Marquee from "react-fast-marquee";
import Web3 from "web3";
import COMMON_ABI from "../common/ABI";
import getAddressFrom from "../util/AddressExtractor";
import { useNavigate } from "react-router-dom";
// import "./Landmark.css";

function Landmark() {
  const navigate = useNavigate();
  const [si, setSi] = useState("지역");
  const [gu, setGu] = useState("구역");
  const [filter, setFilter] = useState("");

  const [nftMap, setNftMap] = useState("");
  const [nftData, setNftData] = useState("");
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(true);

  const [itemMap, setItemMap] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show0, setShow0] = useState(false);
  const handleClose0 = () => setShow0(false);
  const handleShow0 = () => setShow0(true);

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

  const [landmarkInfoIdx, setLandmarkInfoIdx] = useState(1);
  const [sellingItem, setSellingItem] = useState(0);
  const [sellingToken, setSellingToken] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [sellingStarForce, setSellingStarForce] = useState(0);
  const user = useSelector((state) => state.user.value);
  const [buyerIdx, setBuyerIdx] = useState(0);
  const [buyerAddress, setBuyerAddress] = useState("");
  const [sellerIdx, setSellerIdx] = useState(0);
  const [sellerAddress, setSellerAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [tokenBalance, setTokenBalance] = useState('');
  const [privKey, setPrivKey] = useState("");

  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  const clickNftData = (idx) => {
    // console.log(idx);
    axios(API_BASE_URL + "/landmark/" + idx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setSellingItem(idx);
        setSellingStarForce(res.data.starForce);
        setSellingPrice(res.data.sellPrice);
        setSellerIdx(res.data.userIdx);
        setSellingToken(res.data.tokenId);

        console.log(tokenBalance)
        console.log(res.data.sellPrice)
        if (tokenBalance < res.data.sellPrice) {
          handleShow2()
        } else {
          handleShow()
        }
      })
      .catch((err) => console.log("Get landmark error", err));
  };

  // const callMiraToken = new web3.eth.Contract(
  //   COMMON_ABI.CONTRACT_ABI.ERC_ABI,
  //   import.meta.env.VITE_APP_ERC20_CA
  // );

  // async function getTokenBalance() {
  //   const response = await callMiraToken.methods.balanceOf(buyerAddress).call();
  //   setTokenBalance(response);
  //   console.log(response);
  // }

  // useEffect(() => {
  //   setBuyerIdx(user.information.userIdx);
  //   console.log(user.information.userIdx)
  //   getTokenBalance();
  // });

  useEffect(() => {
    axios(API_BASE_URL + "/wallet/" + user.information.userIdx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        const buyerWalletData = res.data;
        setBuyerAddress(buyerWalletData.walletAddress);

        const callMiraToken = new web3.eth.Contract(
          COMMON_ABI.CONTRACT_ABI.ERC_ABI,
          import.meta.env.VITE_APP_ERC20_CA
        );

        async function getTokenBalance() {
          const response = await callMiraToken.methods.balanceOf(buyerWalletData.walletAddress).call();
          setTokenBalance(response);
          console.log(response);
        }
        getTokenBalance();
        setBuyerIdx(user.information.userIdx);

      })
      .catch((err) => console.log("Get buyer data error", err));
  }, [user]);

  useEffect(() => {
    axios(API_BASE_URL + "/wallet/" + sellerIdx, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        const sellerWalletData = res.data;
        setSellerAddress(sellerWalletData.walletAddress);
      })
      .catch((err) => console.log("Get seller data error", err));
  }, [sellingItem])

  const buyNFT = (e) => {
    e.preventDefault();

    // Purchase();
    // console.log(sellingPrice);
    // console.log(tokenBalance);

    if (tokenBalance >= sellingPrice) {
      SendMira();
    } else {
      handleShow2();
    }
  };

  // send Token
  async function SendMira() {
    const address = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );
    // console.log("address", address);
    if (!address) {
      handleShow3();
      return;
    } else if (address != buyerAddress) {
      handleShow3();
      return;
    }

    
    try {
      handleShow0();
      const buyer = web3.eth.accounts.privateKeyToAccount(privKey);
      web3.eth.accounts.wallet.add(buyer);
      // console.log(web3.eth.accounts.wallet);
      web3.eth.defaultAccount = buyer.address;
      // console.log("defaultAccount_buyer :", web3.eth.defaultAccount);
      // console.log(sellerAddress);

      const senderAddress = web3.eth.defaultAccount;
      const sendMira = new web3.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.ERC_ABI,
        import.meta.env.VITE_APP_ERC20_CA
      );
      const response = await sendMira.methods
        .transfer(sellerAddress, sellingPrice)
        .send({ from: senderAddress, gas: 3000000 });
      // console.log(response);

      if (response.status === true) {
        const sender = web3.eth.accounts.privateKeyToAccount(
          import.meta.env.VITE_APP_ADMIN_PRIVKEY
        );
        web3.eth.accounts.wallet.add(sender);
        // console.log(web3.eth.accounts.wallet);
        web3.eth.defaultAccount = sender.address;
        // console.log("defaultAccount :", web3.eth.defaultAccount);
        const senderAddress = web3.eth.defaultAccount;

        const sendLandmarkNft = new web3.eth.Contract(
          COMMON_ABI.CONTRACT_ABI.NFT_ABI,
          import.meta.env.VITE_APP_NFT_CA
        );

        // console.log("sellerAccount :", sellerAddress);
        // console.log("senderAccount :", senderAddress);
        // console.log("buyerAccount :", buyerAddress);

        const response2 = await sendLandmarkNft.methods
          .safeTransferFrom(sellerAddress, buyerAddress, sellingToken)
          .send({ from: senderAddress, gas: 3000000 });
        // console.log(response2);
        setTransactionHash(response2.transactionHash);

        if (response2.status === true) {
          // put landmark db
          axios(API_BASE_URL + "/landmark/" + sellingItem, {
            method: "PUT",
            params: {
              user_idx: buyerIdx,
            },
            data: {
              sellPrice: sellingPrice,
              selling: 0,
              starForce: sellingStarForce,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
            .then((res) => {
              // console.log(res);
              // put my nft db
              axios(API_BASE_URL + "/mynft/" + sellingItem, {
                method: "PUT",
                params: {
                  user_idx: buyerIdx,
                },
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              })
                .then((res) => {
                  // console.log(res);
                })
                .catch((err) => console.log("My NFT PUT error", err));

              // price update db
              axios(API_BASE_URL + "/price", {
                method: "POST",
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
                data: {
                  gasPrice: "string",
                  hash: transactionHash,
                  landmarkIdx: sellingItem,
                  sellPrice: sellingPrice,
                  userFrom: sellerAddress,
                  userTo: buyerAddress,
                },
              })
                .then((res) => {
                  // console.log(res);
                  setLoading(true);
                  handleClose0();
                  handleShow4();
                })
                .catch((err) => console.log("Update Price error", err));
            })
            .catch((err) => console.log("Purchase error", err));
        } else {
          handleShow5();
        }
      }
    } catch (err) {
      console.log("ERROR while Transaction", err);
    }
    return <div></div>;
  }

  // // nft purchase
  // const Purchase = () => {
  //   console.log(sellingPrice);
  //   console.log(tokenBalance);

  //   if (tokenBalance >= sellingPrice) {
  //     SendMira();
  //   } else {
  //     handleShow2();
  //   }
  //   // setShow2(false);
  //   return <div></div>;
  // };

  useEffect(() => {
    // console.log("nftData", nftData);
    const result = [];
    var useritem = [];
    var adminitem = [];
    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      if (gu == "구역" || item.dongCode == gu) {
        if (item.starForce == 1) {
          useritem = item;
          adminitem = item;
        } else {
          if (item.userIdx != 1) useritem = item;
        }

        if (item.starForce == 7) {
          if (useritem.userIdx == 1) {
            item = adminitem;
          } else {
            item = useritem;
          }

          result.push(
            <div className={styles.flip}>
              <div key={i} className={styles.card}>
                <div className={styles.front}>
                  <img
                    src={item.imagePath}
                    className={styles.landmarkImg}></img>
                  <div className={styles.nftTitle}>
                    {/* <div className={styles.nftTitletext}>{item.title}</div> */}

                    <div className={styles.marquee}>
                      <div>{item.title}</div>
                    </div>

                    {/* <Marquee gradient={false} className={styles.nftTitletext}>{item.title} </Marquee> */}
                    <div className={styles.starforceCt}>
                      <img
                        src="/star.png"
                        alt="star"
                        className={styles.starIcon}
                      />
                      <div>{item.starForce}</div>
                    </div>
                  </div>

                  <div className={styles.nftOwner}>
                    {item.userIdx == 1 ? (
                      <div className={styles.sellnow}>지금 구매하세요!</div>
                    ) : (
                      <div className={styles.textCt}>
                        <div className={styles.text1}>OWNER BY</div>
                        <div className={styles.name}>{item.userName}</div>
                      </div>
                    )}
                  </div>
                  <div className={styles.priceCt}>
                    <img
                      src="/dollar.png"
                      alt="dollar"
                      className={styles.dollarIcon}
                    />{" "}
                    {item.sellPrice}
                  </div>
                </div>
                <div className={styles.back}>
                  <div className={styles.nftArea}>
                    {item.province} {item.landmarkCity}
                  </div>
                  <div className={styles.nftTitle2}>{item.title}</div>
                  <div className={styles.buttonCt}>
                    {item.selling ? (
                      <>
                        {item.userIdx == user.information.userIdx ? (
                          <button className={styles.buyBtn3}>판매중</button>
                        ) : (
                          <button
                            className={styles.buyBtn}
                            id={item.landmarkIdx}
                            onClick={(e) => {
                              clickNftData(e.target.id);
                            }}>
                            구매하기
                          </button>
                        )}
                      </>
                    ) : (
                      <div className={styles.buyBtn2}>구매불가</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    setNftMap(result);
    return () => {
      setLoading(false);
    };
  }, [nftData]);

  useEffect(() => {
    setLoading(true);
    axios({
      url: API_BASE_URL + "/landmark",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        // console.log("mainData", res.data);
        setNftData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    var result = [];

    for (var i = 0; i < nftData.length; i++) {
      var item = nftData[i];
      if (gu == "구역" || item.dongCode == gu) {
        result.push(
          <div key={i}>
            <img src={item.imagePath} className={styles.landmarkImg}></img>
            <br />
            {item.title} (+{item.starForce})
            <br />
            소유자 {item.userName}
            <br />
            {item.province} ({item.landmarkCity})
            <br />
          </div>
        );
      }
    }
    setNftMap(result);
  }, [gu]);

  useEffect(() => {
    // console.log(si);

    var tempOptions = [];
    var json = [];
    if (si == "지역") {
      json = optionsJSON[0];
    } else if (si == "서울특별시") {
      json = optionsJSON[1];
    } else if (si == "광주광역시") {
      json = optionsJSON[2];
    } else if (si == "경상북도") {
      json = optionsJSON[3];
    } else if (si == "제주특별자치도") {
      json = optionsJSON[4];
    }
    for (var i = 0; i < json.gu.length; i++) {
      var item = json.gu[i];
      tempOptions.push(
        <option key={item.SIG_CD} value={item.SIG_CD}>
          {item.name}
        </option>
      );
    }
    if (si == "지역") {
      setGu("구역");
    }
    setOptions(tempOptions);
  }, [si]);

  return (
    <>
      <div className={styles.selectCt}>
      <button
        className={styles.backbtn}
        onClick={() => {
          navigate("/store");
        }}>
        <img alt="back" src="/back.png" className={styles.backicon} />
      </button>
        <select
          className={styles.selectbox1}
          onChange={(e) => {
            setSi(e.target.value);
          }}>
          <option key="0" value="지역">
            지역
          </option>
          <option key="1" value="서울특별시">
            서울특별시
          </option>
          <option key="2" value="광주광역시">
            광주광역시
          </option>
          <option key="3" value="경상북도">
            경상북도
          </option>
          <option key="4" value="제주특별자치도">
            제주특별자치도
          </option>
        </select>
        <select
          className={styles.selectbox2}
          onChange={(e) => {
            setGu(e.target.value);
          }}>
          {options}
        </select>
      </div>
      {loading ? (
        <Loading1 />
      ) : (
        <div className={styles.gridcontainer}>{nftMap}</div>
      )}

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          <div className={styles.privKeychange}>개인키를 입력해주세요</div>
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
                buyNFT(e);
              }}
              className={styles.privKeybtn}>
              구매하기
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show0}
        onHide={handleClose0}
        backdrop="static"
        keyboard={false}
        className={styles.dialog0}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent2}>
          <Loading1 text="거래중입니다." className={styles.modalcontent2} />
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
        <Modal.Body className={styles.modalcontent3}>
          MIRA 토큰이 부족합니다.
          <br />
          챌린지 인증을 통해 MIRA 토큰을 획득해보세요!
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent3}>
          개인키가 일치하지 않습니다.
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

      <Modal
        centered
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
        className={styles.modal2}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent4}>
          구매가 완료되었습니다. 마이페이지를 확인하세요!
          <div className={styles.modalbtn}>
            <button
              onClick={() => document.location.reload()}
              className={styles.closeButton}>
              닫기
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
          NFT가 구매되지 않았습니다. 관리자에게 문의하세요.
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default Landmark;
