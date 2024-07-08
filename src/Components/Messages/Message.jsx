import React from 'react';
import styles from "./MessageContainer.module.css";
import profilePic from "../../images/cavatar.png";

const Message = () => {
  return (
    <div className={`${styles.chat} ${styles['chat-end']}`}>
      <div className={`${styles['chat-image']} ${styles.avatar}`}>
        <div className={`${styles['w-10']} ${styles['rounded-full']}`}>
          <img alt="Profile" src={profilePic} width={50} height={50}/>
        </div>
      </div>
      <div className={styles['chat-bubble']}>Hi, I am Citizen of Pakistan and i am very happy person
        <div className={styles['chat-footer']}>9:31</div></div>
      
    </div>
  )
}

export default Message