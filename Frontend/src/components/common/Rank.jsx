import React, { useState, useEffect } from "react";
import styles from "./Rank.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import RankDay from "./RankDay";
import RankCount from "./RankCount";
import "./Rank.css";
import axios from "axios";
import { API_BASE_URL } from "/src/constants";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Rank() {
  const [rank, setRank] = useState(0);
  const [nftOwner, setNftOwner] = useState("");
  const [nftMap, setNftMap] = useState("");

  useEffect(() => {
    axios(API_BASE_URL + "/verification/ranking/nftowner", {
      method: "GET",
    })
      .then((res) => {
        setNftOwner(res.data);
      })
      .catch((err) => console.log("nftowner", err));
  }, []);

  useEffect(() => {
    var temp = [];
    for (var i = 0; i < nftOwner.length; i++) {
      var item = nftOwner[i];

      temp.push(
        <SwiperSlide className={styles.imgCt} key={i}>
          <img src={item.image} alt="img" className={styles.nftImg}></img>
          <div className={styles.nftText}>OWNER BY {item.name}</div>
        </SwiperSlide>
      );
    }
    setNftMap(temp.slice(0,10));
  }, [nftOwner]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.rankcontainer}>
            <img src='/trophy.png' alt='challenge' className={styles.rankicon}/>
            <div className={styles.ranktext}>챌린지 랭킹</div>
          </div>
        </div>
        <div className={styles.text}>이번 시즌 실시간 챌린지 랭킹</div>
        <div className={styles.slidecontainer}>
          <div className={styles.btnCt}>
            <button
              onClick={() => setRank(0)}
              className={`rankbtn ${rank === 0 ? "rankactive" : ""}`}>
              지속일
            </button>
            <button
              onClick={() => setRank(1)}
              className={`rankbtn ${rank === 1 ? "rankactive" : ""}`}>
              최다인증
            </button>
          </div>
          {rank === 0 ? <RankDay /> : ""}
          {rank === 1 ? <RankCount /> : ""}
        </div>
      </div>
      <div className={styles.content2}>
        <div className={styles.header}>
          <img src='/star.png' alt='landmark' className={styles.rankicon}/>
          <div className={styles.ownertext}>랜드마크 랭킹</div>
        </div>
        <div className={styles.text}>이번 시즌 실시간 NFT 랭킹</div>
        <div className={styles.nftcontainer}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}>
            {nftMap}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Rank;
