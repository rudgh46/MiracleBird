import React, { useEffect, useState } from "react";
import styles from "./RankCount.module.css";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";

function RankCount() {
  const [nickname, setNickname] = useState([]);

  const mainApi = async () => {
    try {
      //   console.log("home");
      const response = await fetch(API_BASE_URL + "/verification/ranking/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + NOW_ACCESS_TOKEN,
        },
      });
      const rankingresult = await response.json();
      //   console.log("mainData", rankingresult);
      setNickname(rankingresult);
    } catch (error) {
      window.alert(error);
    }
  };
  useEffect(() => {
    mainApi();
  }, []);

  return (
    <>
      <div className={styles.medalcontainer}>
        <div></div>
        <div className={styles.gold}>
          <img alt="gold" src="./gold.png" />
          <p className={styles.slidetext}>{nickname[0]}</p>
        </div>

        <div></div>
        <div className={styles.silver}>
          <img alt="silver" src="./silver.png" />
          <p className={styles.slidetext}>{nickname[1]}</p>
        </div>
        <div></div>
        <div className={styles.bronze}>
          <img alt="bronze" src="./bronze.png" />
          <p className={styles.slidetext}>{nickname[2]}</p>
        </div>
      </div>
    </>
  );
}

export default RankCount;
