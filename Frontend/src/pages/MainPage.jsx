import React, { useState } from "react";
import styles from "./MainPage.module.css";
import { useSpring, animated } from "react-spring";
import Lottie from "lottie-react";
import mancoin from "../components/animation/mancoin.json";
import landmark from "../components/animation/landmark.json";
import reinforce from "../components/animation/reinforce.json";
import arrow from "../components/animation/arrow.json";
import click from "../components/animation/click.json";
import headers from "../components/animation/headers.json";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { BrowserView, MobileView } from "react-device-detect";

import moment from "moment";
import { useCookies } from "react-cookie";
function MainPage() {
  const COOKIE_KEY = "todayOpenMain";
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);

  //천천히 보이기
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: "3000" },
  });
  //아래에서 올라오기
  const styless = useSpring({
    from: { transform: "translateY(100%)" },
    to: [{ transform: "translateY(0%)" }],
    config: { duration: "1500" },
    loop: false,
  });
  //왼쪽에서 날아오기
  const leftslide = useSpring({
    from: { transform: "translateX(-20%)" },
    to: [{ transform: "translateX(0%)" }],
    config: { duration: "1500" },
    loop: false,
  });

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Lottie animationData={headers} className={styles.headers} />
      </div>
      <div className={styles.Main}>
        <div className={styles.first}>
          <BrowserView>
            <animated.div style={leftslide} className={styles.test1Ct}>
              <div className={styles.text1}>당신의 습관,</div>
              <div className={styles.text1}>당신의 건강,</div>
              <div className={styles.text1}>당신의 미래를 위해</div>
            </animated.div>
          </BrowserView>
          <MobileView>
            <animated.div style={leftslide} className={styles.test1Ct2}>
              <div className={styles.text2}>당신의 습관,</div>
              <div className={styles.text2}>당신의 건강,</div>
              <div className={styles.text2}>당신의 미래를 위해</div>
            </animated.div>
          </MobileView>

          <animated.div style={props} className={styles.logoimg}>
            <img alt="detail" src="/logo.png" className={styles.logo} />
            <img alt="detail" src="/title.png" className={styles.title} />
          </animated.div>
        </div>

        <div className={styles.arrowCT}>
          <Lottie animationData={arrow} className={styles.lottie} />
        </div>

        <div className={styles.detailCt1}>
          <div className={styles.text2_1}>01</div>
          <div className={styles.text2_2}>챌린지를 통해 MIRA를 모아보세요</div>
          <Lottie animationData={mancoin} className={styles.lottie1} />
        </div>

        <div className={styles.detailCt2}>
          <div className={styles.text2_1}>02</div>
          <div className={styles.text2_2}>
            MIRA로 랜드마크 NFT를 구매해보세요
          </div>
          <Lottie animationData={landmark} className={styles.lottie1} />
        </div>

        <div className={styles.detailCt2}>
          <div className={styles.text2_1}>03</div>
          <div className={styles.text2_2}>
            NFT 강화를 통해 랭킹을 올려보세요
          </div>
          <Lottie animationData={reinforce} className={styles.lottie1} />
        </div>

        <div className={styles.How}>How to Use 미라클버드</div>
        <MobileView>
          <div className={styles.slideCt}>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/001.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/002.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/003.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/004.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/005.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/006.jpg" className={styles.mainImg} />
              </SwiperSlide>
            </Swiper>
          </div>
        </MobileView>

        <BrowserView>
          <div className={styles.slideCt2}>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/001.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/002.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/003.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/004.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/005.jpg" className={styles.mainImg} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img alt="detail" src="/006.jpg" className={styles.mainImg} />
              </SwiperSlide>
            </Swiper>
          </div>
        </BrowserView>

        <div>
          <button
            className={styles.startBtn}
            onClick={() => {
              const decade = moment();
              decade.add(1, "d");
              setCookies(COOKIE_KEY, "true", {
                path: "/",
                expires: decade.toDate(),
              });
              navigate("/login");
            }}>
            시작하기
          </button>
          <Lottie
            animationData={click}
            onClick={() => {
              const decade = moment();
              decade.add(1, "d");
              setCookies(COOKIE_KEY, "true", {
                path: "/",
                expires: decade.toDate(),
              });
              navigate("/login");
            }}
            className={styles.lottie2}
          />
        </div>
      </div>
      <div>
        <Lottie animationData={headers} className={styles.headers2} />
      </div>
    </>
  );
}

export default MainPage;
