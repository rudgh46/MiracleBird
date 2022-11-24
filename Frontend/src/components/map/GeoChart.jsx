import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { select, geoPath, geoMercator } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectArea } from "../../store/area";
import { selectLandmark } from "../../store/landmark";
import "./GeoChart.css";
import spot from "./spot.json";
import Modal from "react-bootstrap/Modal";
import styles from "./GeoChart.module.css";
import LineChart from "./LineChart";
import back from "../../assets/icon/GeoChart_Back.png";

import Web3 from "web3";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import COMMON_ABI from "../../common/ABI";
import getAddressFrom from "../../util/AddressExtractor";
import { bounceOutLeft } from "react-animations";
import Loading1 from "../Base/Loading1";

function GeoChart({ data }) {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [show0, setShow0] = useState(false);
  const handleClose0 = () => setShow0(false);
  const handleShow0 = () => setShow0(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = (e) => setShow2(false);
  const buyNFT = (e) => {
    e.preventDefault();
    SendMira();
  };
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

  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const [isListHover, setIsListHover] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const area = useSelector((state) => state.area.value);
  const landmark = useSelector((state) => state.landmark.value);
  const [landmarkData, setLandmarkData] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [landmarkInfoIdx, setLandmarkInfoIdx] = useState(1);
  const [sellingItem, setSellingItem] = useState(0);
  const [sellingToken, setSellingToken] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [sellingStarForce, setSellingStarForce] = useState(0);
  const user = useSelector((state) => state.user.value);
  const [buyerIdx, setBuyerIdx] = useState(1);
  const [buyerAddress, setBuyerAddress] = useState("");
  const [sellerIdx, setSellerIdx] = useState(1);
  const [sellerAddress, setSellerAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [privKey, setPrivKey] = useState("");
  const [priceData, setPriceData] = useState("");

  const web3 = new Web3(
    new Web3.providers.HttpProvider(`https://j7c107.p.ssafy.io/blockchain2/`)
  );

  useEffect(() => {
    if (area.name == "korea" || area.name == null) {
      setSelectedCountry(null);
      setIsListHover(false);
    }
  }, [area]);

  useEffect(() => {
    // console.log(landmarkInfoIdx);
    axios({
      url: API_BASE_URL + "/landmark/landmarkinfoidx/" + landmarkInfoIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        var result = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          if (item.userIdx != 1) {
            result = item;
            break;
          }
        }

        if (item.userIdx == 1) {
          setLandmarkData(res.data[0]);
          // console.log(res.data[0]);
        } else {
          setLandmarkData(result);
          // console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setImgUrl("/src/assets/landmark/" + landmark.index + ".png");
  }, [landmarkInfoIdx]);

  useEffect(() => {
    // console.log(landmarkData);
    setLoading(true);
    setLoading1(true);
    axios(API_BASE_URL + "/price/" + landmarkData.landmarkIdx, {
      method: "GET",
    })
      .then((res) => {
        // console.log(res.data);
        const temp = [];
        for (var i = 0; i < res.data.length; i++) {
          const item = res.data[i];
          // console.log("-------------", item);
          temp.push({
            month: i,
            day: item.sellDate[1] + "-" + item.sellDate[2],
            value: item.sellPrice,
          });
        }
        setPriceData(temp);
      })
      .catch((err) => console.log(err));
  }, [landmarkData]);

  useEffect(() => {
    // console.log(priceData);
    setLoading1(false);
  }, [priceData]);

  useEffect(() => {
    const svg = select(svgRef.current);

    // console.log(imgUrl);
    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);
    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();
    // render each country
    svg
      .selectAll(".city")
      .data(data.features)
      .join("path")
      .on("click", (event, feature) => {
        // console.log(feature.properties.SIG_CD);
        // console.log(wrapperRef);
        dispatch(
          selectArea({
            name: feature.properties.name,
            SIG_CD: feature.properties.SIG_CD,
          })
        );

        if (selectedCountry === feature) {
          setSelectedCountry(null);
          dispatch(selectArea({ name: "korea" }));
        } else {
          setSelectedCountry(feature);
        }

        svg.selectAll("circle").remove();
        svg.selectAll("text").remove();
        // console.log(area);
      })
      .attr("class", "city")
      .transition()
      .attr("d", (feature) => pathGenerator(feature));

    if (area.name != "korea") {
      var mark = spot;
      for (var i = 0; i < spot.length; i++) {
        if (area.name == mark[i].name) {
          // console.log(mark[i].landmark);
          mark = mark[i].landmark;
          svg.selectAll("circle").remove();
          svg.selectAll("text").remove();
          break;
        }
      }
      svg
        .selectAll("circle")
        .data(mark)
        .join("circle")
        .attr("class", "mark")
        .attr("cx", function (d) {
          if (isNaN(projection([d.lon, d.lat])[0])) {
            return 0;
          }
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d) {
          if (isNaN(projection([d.lon, d.lat])[1])) {
            return 0;
          }
          return projection([d.lon, d.lat])[1];
        })
        .on("click", (event, d) => {
          // console.log(d.name);
          setLandmarkInfoIdx(d.index);
          setImgUrl("/src/assets/landmark/" + landmark.index + ".png");
          dispatch(
            selectLandmark({
              index: d.index,
              name: d.name,
              desc: d.desc,
            })
          );
          handleShow();
        })
        .attr("r", "10px")
        .attr("fill", "#1d4999")
        .transition()
        .duration(1000);

      svg
        .selectAll(".landmarkLabel")
        .data(mark)
        .join("text")
        .attr("class", "landmarkLabel")
        .attr("x", function (d) {
          if (isNaN(projection([d.lon, d.lat + 0.007])[0])) {
            return 0;
          }
          return projection([d.lon, d.lat + 0.007])[0];
        })
        .attr("y", function (d) {
          if (isNaN(projection([d.lon, d.lat + 0.007])[1])) {
            return 0;
          }
          return projection([d.lon, d.lat + 0.007])[1];
        })
        .text(function (d) {
          return d.name;
        })
        .on("click", (event, d) => {
          // console.log(d.name);
          setLandmarkInfoIdx(d.index);
          setImgUrl("/src/assets/landmark/" + landmark.index + ".png");
          dispatch(
            selectLandmark({
              index: d.index,
              name: d.name,
              desc: d.desc,
            })
          );
          if (user.information.userIdx == undefined) {
            handleShow7();
          } else {
            handleShow();
          }
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", 15)
        .style("fill", "black")
        .transition();
    } else {
      svg.selectAll("mark").remove();
      svg.selectAll("text").remove();
      mark = null;
    }

    // 지역별 텍스트
    if (area.SIG_CD != null && area.SIG_CD.length == 2) {
      svg.selectAll("circle").remove();
      svg.selectAll("text").remove();
      svg
        .selectAll(".labels")
        .data(data.features)
        .join("text")
        .attr("class", "labels")
        .attr("x", function (d) {
          return pathGenerator.centroid(d)[0];
        })
        .attr("y", function (d) {
          return pathGenerator.centroid(d)[1];
        })
        .text(function (d) {
          return d.properties.name;
        })
        .on("click", (event, feature) => {
          // console.log(feature.properties.SIG_CD);
          // console.log(wrapperRef);
          dispatch(
            selectArea({
              name: feature.properties.name,
              SIG_CD: feature.properties.SIG_CD,
            })
          );

          if (selectedCountry === feature) {
            setSelectedCountry(null);
            dispatch(selectArea({ name: "korea" }));
          } else {
            setSelectedCountry(feature);
          }

          svg.selectAll("circle").remove();
          svg.selectAll("text").remove();
          // console.log(area);
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", 15)
        .style("fill", "#363636");
    }

    svg
      .select("#arrow1")
      .append("polygon")
      .attr("points", "0 0, 0 12, 12 12, 12 0")
      .attr("fill", "black")
      .append("polygon")
      .attr("points", "0 0, 0 6, 6 6, 12 0, 0 0")
      .attr("fill", "blue");
  }, [data, dimensions, selectedCountry]);

  const result = [];
  for (var i = 0; i < spot.length; i++) {
    for (var j = 0; j < spot[i].landmark.length; j++) {
      var tempUrl = spot[i].landmark[j].index;
      var tempUrl1 = "/src/assets/landmark/" + tempUrl + ".png";

      result.push(
        <div key={i}>
          <img src={tempUrl1}></img>
          <br />
          {spot[i].landmark[j].name}
        </div>
      );
    }
  }

  useEffect(() => {
    setBuyerIdx(user.information.userIdx);
  }, []);

  useEffect(() => {
    // console.log(landmarkInfoIdx);
    axios(API_BASE_URL + "/landmark/landmarkinfoidx/" + landmarkInfoIdx, {
      method: "GET",
    })
      .then((result) => {
        // console.log(result.data);
        result.data.map((item) => {
          if (item.selling === true) {
            setSellingItem(item.landmarkIdx);
            setSellingToken(item.tokenId);
            setSellerIdx(item.userIdx);
            setSellingPrice(item.sellPrice);
            setSellingStarForce(item.starForce);
          }
        });
      })
      .catch((err) => console.log(landmarkInfoIdx, "Get error", err));
  }, [landmarkInfoIdx]);

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
  });

  useEffect(() => {
    axios(API_BASE_URL + "/wallet/" + buyerIdx, {
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
          const response = await callMiraToken.methods
            .balanceOf(buyerWalletData.walletAddress)
            .call();
          setTokenBalance(response);
        }

        getTokenBalance();
      })
      .catch((err) => console.log("Get buyer data error", err));
  });

  // const callMiraToken = new web3.eth.Contract(
  //   COMMON_ABI.CONTRACT_ABI.ERC_ABI,
  //   import.meta.env.VITE_APP_ERC20_CA
  // );

  // async function getTokenBalance() {
  //   const response = await callMiraToken.methods.balanceOf(buyerAddress).call();
  //   setTokenBalance(response);
  //   // console.log(response);
  // }

  // useEffect(() => {
  //   getTokenBalance();
  // });

  // send Token
  async function SendMira() {
    const address = getAddressFrom(
      privKey.startsWith("0x") ? privKey : "0x" + privKey
    );
    // console.log("address", address);
    console.log(address, buyerAddress)
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
                  console.log(res);
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
                  console.log(res);
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

  const MiracCheck = () => {
    if (user != null && user.check != "") {
      console.log(tokenBalance);
      if (tokenBalance >= sellingPrice) {
        handleShow2();
      } else {
        handleShow6();
      }
    } else {
      handleShow8();
    }
  };

  // nft purchase
  // const Purchase = () => {
  //   if (tokenBalance >= sellingPrice) {
  //     SendMira();
  //   } else {
  //     handleShow6();
  //   }
  //   setShow2(false);
  //   return <div></div>;
  // };

  return (
    <>
      <div className={styles.upper}>
        {/* {area.name == "korea" ? null : (
          <img
            src="/back.png"
            className={styles.back}
            onMouseOver={() => setIsListHover(true)}
            onMouseOut={() => setIsListHover(false)}
            onClick={() => {
              // console.log(area.SIG_CD);
              if (area.SIG_CD.length == 2) {
                setSelectedCountry(null);
                dispatch(
                  selectArea({
                    name: "korea",
                    SIG_CD: "",
                  })
                );
              } else {
                dispatch(
                  selectArea({
                    name: "korea",
                    SIG_CD: "",
                  })
                );
              }
            }}
          />
        )} */}
        <button
          className={styles.connect}
          onClick={() => {
            if (user.information.userIdx == undefined) {
              // console.log(user);
              handleShow7();
            } else {
              navigate("/landmark");
            }
          }}>
          전체보기
        </button>
      </div>

      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        {selectedCountry !== null ? 
        <div className={styles.areaName}>
          <img src="/arrowhead.png" alt='area' className={styles.areaIcon}/>
          {area.name}
        </div> 
        : <div></div>}
        <svg className={styles.svg} ref={svgRef}></svg>
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.modalcontent}>
            <div className={styles.landmarkTitle}>
              {landmarkData.landmarkTitle}
            </div>
            <img
              src={landmarkData.imagePath}
              alt="mm"
              className={styles.picture}
            />

            <div className={styles.detail}>
              <div className={styles.purchase}>
                {/* {landmark.desc != null ? (
                  <div className={styles.desc}>{landmark.desc}</div>
                ) : (
                  <></>
                )} */}

                {loading1 ? (
                  <Loading1 />
                ) : (
                  <LineChart className={styles.chart} data={priceData} />
                )}

                <div className={styles.reward}>
                  <div className={styles.coinDiv}>
                    <img
                      alt="coin"
                      src="/mira.png"
                      className={styles.coin}></img>
                    <div className={styles.price}>
                      {landmarkData.sellPrice} MIRA
                    </div>
                  </div>

                  {landmarkData.selling ? (
                    <>
                      {landmarkData.userIdx == user.information.userIdx ? (
                        <button className={styles.btnSell}>판매중</button>
                      ) : (
                        <button className={styles.btn} onClick={MiracCheck}>
                          구입
                        </button>
                      )}
                    </>
                  ) : (
                    <button className={styles.btnSell} onClick={() => {}}>
                      구입
                    </button>
                  )}
                </div>
              </div>
            </div>
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
        <Modal.Body className={styles.body}>
          <Loading1 text="거래중입니다." />
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        className={styles.dialog}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.modalcontent}>{result}</div>
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

        <Modal.Body className={styles.modalcontent2}>
          <div className={styles.privKeychange}>개인키 입력</div>
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
                handleClose2();
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
        <Modal.Body className={styles.modalcontent3}>
          구매가 완료되었습니다. 마이페이지를 확인하세요!
        </Modal.Body>
        <button
          className={styles.backbtn}
          onClick={() => {
            handleClose();
            document.location.reload();
          }}>
          확인
        </button>
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

      <Modal
        centered
        show={show6}
        onHide={handleClose6}
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
        show={show7}
        onHide={handleClose7}
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

      <Modal
        centered
        show={show8}
        onHide={handleClose8}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader}></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
          로그인이 필요한 서비스 입니다.
          <div className={styles.btnCt}>
            <button
              className={styles.backbtn}
              onClick={() => {
                handleClose8();
              }}>
              닫기
            </button>
            <button
              className={styles.logoutbtn}
              onClick={() => {
                handleClose8();
                navigate("/login");
              }}>
              로그인하기
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>
    </>
  );
}

export default GeoChart;
