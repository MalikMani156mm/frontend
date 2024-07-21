import React from 'react';
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const BackButton = () => {

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles['mt-auto']}>
      <FontAwesomeIcon icon={faArrowLeft}
        className={`${styles['w-6']} ${styles['h-6']} ${styles['text-white']} ${styles['cursor-pointer']}`}
        onClick={handleBackClick}
      />
    </div>
  )
}

export default BackButton