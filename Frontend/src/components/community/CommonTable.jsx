import React from "react";
import styles from './CommonTable.module.css';

const CommonTable = props => {
    const { headersName, children } = props;
  
    return (
      <table className={styles.commontable}>
        <thead>
          <tr>
            {
              headersName.map((item, index) => {
                return (
                  <td className={styles.header} key={index}>{ item }</td>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            children
          }
        </tbody>
      </table>
    )
  }
  
  export default CommonTable;