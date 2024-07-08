import React from 'react';
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const BackButton = () => {
  return (
    <div className={styles['mt-auto']}>
    <FontAwesomeIcon icon={faArrowLeft}
      className={`${styles['w-6']} ${styles['h-6']} ${styles['text-white']} ${styles['cursor-pointer']}`} 
    />
  </div>
  )
}

export default BackButton