import React, { useState, useEffect } from "react";
import styles from "./MypageCalendar.module.css";
import seasonInfo from "../../pages/season.json";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import Loading1 from "../Base/Loading1";

function MypageCalendar(props) {
  const [loading, setLoading] = useState(true);
  let [idx, setIdx] = useState(1);
  const [challengeData, setChallengeData] = useState("");
  const [challengeMap, setChallengeMap] = useState([]);

  useEffect(() => {
    var startdate = seasonInfo[idx - 1].startDate + "_00:00:00.000";
    var enddate = seasonInfo[idx - 1].endDate + "_23:59:59.000";
    axios({
      url: API_BASE_URL + "/verification/heatmap/" + props.userData.userIdx,
      method: "GET",
      headers: {
        Authorization: "Bearer " + NOW_ACCESS_TOKEN,
      },
      params: {
        start_date: startdate,
        end_date: enddate,
      },
    })
      .then((res) => {
        setChallengeData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idx]);

  useEffect(() => {
    const tempChallengeMap = [];
    var pre = "";
    var count = 1;
    if (challengeData.length != 0) {
      pre =
        challengeData[0].regtime[0] +
        "-" +
        challengeData[0].regtime[1] +
        "-" +
        challengeData[0].regtime[2];
    }

    for (var i = 1; i < challengeData.length; i++) {
      var now =
        challengeData[i].regtime[0] +
        "-" +
        challengeData[i].regtime[1] +
        "-" +
        challengeData[i].regtime[2];
      if (pre == now) {
        count++;
      } else {
        tempChallengeMap.push({ date: pre, count: count });
        pre = now;
        count = 1;
      }
    }
    if (challengeData.length != 0) {
      tempChallengeMap.push({ date: pre, count: count });
    }
    setChallengeMap(tempChallengeMap);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [challengeMap]);
  return (
    <>
      {loading ? (
        <Loading1 />
      ) : (
        <div>
          <select
            className={styles.selectBox}
            onChange={(e) => setIdx(e.target.value)}>
            {seasonInfo.map((item) => {
              return (
                <option key={item.season} value={item.season}>
                  시즌 {item.season}
                </option>
              );
            })}
          </select>

          <div className={styles.heatmapcontainer}>
            <CalendarHeatmap
              startDate={seasonInfo[idx - 1].startDate}
              endDate={seasonInfo[idx - 1].endDate}
              horizontal={false}
              showMonthLabels={false}
              values={challengeMap}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count >= 4 ? 4 : value.count}`;
              }}
              // tooltipDataAttrs={(value) => {
              //   if (!value || !value.date) {
              //     return null;
              //   }
              //   return {
              //     "data-tip": `${value.date} 인증 횟수: ${value.count}`,
              //   };
              // }}
            />
            {/* <ReactTooltip className={styles.tooltip} /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default MypageCalendar;
