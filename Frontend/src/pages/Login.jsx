import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import kakaoLogo from "../assets/button/kakao_logo.png";
import { KAKAO_AUTH_URL } from "../constants";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>카카오톡으로 로그인</div>
      <BrowserView>
        <div className="App">
          <a href={KAKAO_AUTH_URL}>
            <img src={kakaoLogo} alt="Kakao"></img>
          </a>
        </div>
      </BrowserView>
      <MobileView>
        <div className="App">
          <a href={KAKAO_AUTH_URL}>
            <img src={kakaoLogo} />
          </a>
        </div>
      </MobileView>
    </div>
  );
}

export default Login;
