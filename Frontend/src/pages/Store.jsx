import React, { useState, useEffect } from "react";
// import Video from "./Video";
import GeoChart from "../components/map/GeoChart";
import Korea from "../assets/json/Korea.json";
import Seoul from "../assets/json/Seoul.json";
import Gwangju from "../assets/json/Gwangju.json";
import Gyeongbuk from "../assets/json/Gyeongbuk.json";
import Jeju from "../assets/json/Jeju.json";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectArea } from "../store/area";

function Store() {
  const area = useSelector((state) => state.area.value);
  const dispatch = useDispatch();
  let [alert, alertSet] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      alertSet(true);
      dispatch(selectArea({ name: "korea" }));
    }, 100);
  }, [alert]);

  if (area.SIG_CD != null && area.SIG_CD.substr(0, 2) == "11") {
    return (
      <>
        <GeoChart data={Seoul} />
      </>
    );
  } else if (area.SIG_CD != null && area.SIG_CD.substr(0, 2) == "29") {
    return (
      <>
        <GeoChart data={Gwangju} />
      </>
    );
  } else if (area.SIG_CD != null && area.SIG_CD.substr(0, 2) == "47") {
    return (
      <>
        <GeoChart data={Gyeongbuk} />
      </>
    );
  } else if (area.SIG_CD != null && area.SIG_CD.substr(0, 2) == "50") {
    return (
      <>
        <GeoChart data={Jeju} />
      </>
    );
  } else {
    return (
      <>
        {alert === true ? (
          <>
            <GeoChart data={Korea} />
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Store;
