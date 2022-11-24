import React from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "./HomeChallenge.module.css";

function HomeChallenge() {
  return (
    <>
      <div className={styles.slidecontainer}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/main2.jpg" className={styles.mainImg} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/main3.jpg" className={styles.mainImg} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/main4.jpg" className={styles.mainImg} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/main5.jpg" className={styles.mainImg} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/main6.jpg" className={styles.mainImg} />
          </SwiperSlide>
          {/* <SwiperSlide className={styles.slide}>
                    <div className={styles.detailText}>
                        <div className={styles.detail1}>01</div>
                        <br />
                        <div className={styles.detail2}>나에게 필요한 좋은 습관으로 고르세요.</div>
                        <div className={styles.iconCt}>
                            <img alt="detail" src="/sunrise.png" className={styles.detailicon} />
                            <img alt="detail" src="/dumbbell.png" className={styles.detailicon} />
                            <img alt="detail" src="/note.png" className={styles.detailicon} />
                        </div>
                        <div className={styles.detail3}>
                            나에게 필요한 챌린지를 선택하세요.
                            <br />
                            시즌별 짧은 기간으로 부담없이 도전할 수 있어요.
                            <br />
                            계기가 필요하다면 보증금 챌린지를 이용해보세요!
                        </div>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <div className={styles.detailText}>
                        <div className={styles.detail1}>02</div>
                        <br />
                        <div className={styles.detail2}>챌린지로 얻은 MIRA로 NFT를 구매하세요.</div>
                        <div className={styles.iconCt2}>
                            <img alt="detail" src="/dollar.png" className={styles.detailicon} />
                            <img alt="detail" src="/earth.png" className={styles.detailicon} />
                        </div>
                        <div className={styles.detail3}>
                            챌린지가 정상적으로 승인되면 MIRA를 획득할 수 있어요.
                            <br />
                            획득한 MIRA로 NFT를 구매해보세요!
                            <br />
                            
                        </div>
                        
                    </div>
                </SwiperSlide> */}
        </Swiper>
      </div>
    </>
  );
}

export default HomeChallenge;
