import React from "react";
import { useEffect, useState } from "react";

import styles from "./PostList.module.css";
import { Link, useNavigate } from "react-router-dom";

const PostList = (props) => {
  const [dataList, setDataList] = useState([]);
  const [dataMap, setDataMap] = useState([]);
  var navigate = useNavigate();
  useEffect(() => {
    setDataList(props.postData);
  }, [props.postData]);

  useEffect(() => {
    let result = [];
    for (var i = 0; i < props.postData.length; i++) {
      const item = props.postData[i];
      result.push(
        <tr
          className={styles.tablerow}
          key={item.postIdx}
          onClick={() => {
            navigate("/community/" + item.postIdx);
          }}>
          <td>
            <div className={styles.tableRow}>
              {item.userRole == "ADMIN" ? (
                <div className={styles.title}>
                  <Link
                    to={`/community/${item.postIdx}`}
                    className={styles.titletext2}>
                    [공지사항] {item.title}
                  </Link>
                </div>
              ) : (
                <div
                  className={styles.title}
                  onClick={() => {
                    document.location.href = "/community/" + item.postIdx;
                  }}>
                  <Link
                    to={`/community/${item.postIdx}`}
                    className={styles.titletext}>
                    {item.title}
                  </Link>
                </div>
              )}
              <div className={styles.readCount}>
                <img src="/view.png" alt="view" className={styles.viewicon} />
                <div className={styles.counttext}>{item.hit}</div>
              </div>
            </div>
            <div className={styles.tableRow2}>
              <div className={styles.datename}>
                <div className={styles.createDate}>
                  {item.regtime[0]}-{item.regtime[1]}-{item.regtime[2]}
                </div>
              </div>
              <div className={styles.nickname}>
                {item.image_url == null ? (
                  <img
                    alt="profile"
                    src="src/assets/icon/profile_default.jpg"
                  />
                ) : (
                  <img alt="profile" src={item.image_url} />
                )}

                {item.name}
              </div>
            </div>
          </td>
        </tr>
      );
    }
    setDataMap(result);
  }, [props.postData]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.commontable}>
          <tbody>{dataMap}</tbody>
        </table>
      </div>
    </>
  );
};

export default PostList;
