import React from 'react';
import styles from './CommonTable.module.css'

const CommonTableColumn = ({ children, onClick }) => {
  return (
    <>
      <td className={styles.tablecolumn} onClick={onClick}>
        {
          children
        }
      </td>
    </>
  )
}

export default CommonTableColumn;