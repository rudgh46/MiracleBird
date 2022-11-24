import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./HomeWebCarousel.module.css";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

const handleDragStart = (e) => e.preventDefault();

const responsive = {
  0: {
    items: 3,
  },
  512: {
    items: 3,
  },
};

const WebCarousel = () => {
  const [challengeImg, setChallengeImg] = useState([]);
  const [challengeMap, setChallengeMap] = useState([]);
  useEffect(() => {
    axios({
      url: API_BASE_URL + "/verification/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setChallengeImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var temp = [];
    for (var i = 0; i < challengeImg.length; i++) {
      var item = challengeImg[i];
      if (!item.share) continue;
      if ( item.approval === 1) {
        temp.push(
          <img
            src={item.selfie}
            alt="selfie"
            style={{
              width: "100%",
            }}
            onDragStart={handleDragStart}
            role="presentation"></img>
        );
      }
    }
    setChallengeMap(temp);
  }, [challengeImg]);

  return (
    <>
      <div
        className={styles.container}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2%",
          width: "90%",
          margin: "auto",
          marginBottom: "10px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}>
        <AliceCarousel
          mouseTracking
          items={challengeMap}
          autoPlay
          responsive={responsive}
          infinite={3000}
          animationDuration={2000}
          disableButtonsControls
          disableDotsControls
        />
      </div>
    </>
  );
};

export default WebCarousel;
