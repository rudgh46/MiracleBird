import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import styles from "./HomeWebCarousel.module.css";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

const handleDragStart = (e) => e.preventDefault();

const responsive = {
  0: {
    items: 1,
  },
  512: {
    items: 1,
  },
};

const WebCarouselBanner = () => {
  const [challengeMap, setChallengeMap] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var temp = [];
    temp.push(
      <img
        src="/src/assets/img/banner1.jpg"
        alt="selfie"
        style={{
          width: "100%",
        }}
        onDragStart={handleDragStart}
        onClick={() => {
          navigate("/community/45");
        }}
        role="presentation"></img>
    );
    temp.push(
      <img
        src="/src/assets/img/banner2.jpg"
        alt="selfie"
        style={{
          width: "100%",
        }}
        onDragStart={handleDragStart}
        onClick={() => {
          navigate("/community/10");
        }}
        role="presentation"></img>
    );
    setChallengeMap(temp);
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1%",
          width: "100%",
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
          infinite={1000}
          animationDuration={8000}
          disableButtonsControls
          disableDotsControls
        />
      </div>
    </>
  );
};

export default WebCarouselBanner;
