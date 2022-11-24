import React from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "./HomeNFT.module.css";

function HomeNFT() {
  return (
    <>
      <div className={styles.slidecontainer}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/nft2.jpg" className={styles.mainImg} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/nft3.jpg" className={styles.mainImg} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <img alt="detail" src="/nft4.jpg" className={styles.mainImg} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default HomeNFT;
