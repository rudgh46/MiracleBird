import React from "react";
import styles from "./CommonTable.module.css";

const CommonTableRow = ({ children }, { onClick }) => {
  return (
    <tr className={styles.tablerow} onClick={onClick}>
      {children}
    </tr>
  );
};

export default CommonTableRow;
