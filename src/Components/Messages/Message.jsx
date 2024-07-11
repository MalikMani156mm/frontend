import React from 'react';
import styles from "./MessageContainer.module.css";
import citizenAvatar from "../../images/cavatar.png";
import policeAvatar from "../../images/pavatar.png";
import { useSelector } from 'react-redux';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../Utils/ExtractTime';

const Message = ({ message }) => {
  const { user } = useSelector(state => state.auth);
  const { selectedConversation } = useConversation();
  const forMe = message.senderId === user._id;
  const chatClassName = forMe ? "chat-end" : "chat-start";
  const myPic = (user.role === "Citizen") ? citizenAvatar : policeAvatar;
  const recieverPic = (selectedConversation.role === "Citizen") ? citizenAvatar : policeAvatar;
  const profilePic = forMe ? myPic : recieverPic;
  const chatBgColor = forMe ? "sky-blue" : "dark-blue";
  const formatTime = extractTime(message.createdAt);

  return (
    <div className={`${styles.chat} ${styles[chatClassName]}`}>
      <div className={`${styles['chat-image']} ${styles.avatar}`}>
        <div className={`${styles['w-10']} ${styles['rounded-full']}`}>
          <img alt="Profile" src={profilePic} width={50} height={50} />
        </div>
      </div>
      <div className={`${styles['chat-bubble'] } ${styles[chatBgColor] } ` } >{message?.message}
        <div className={styles['chat-footer']}>{formatTime}</div>
      </div>
    </div>
  )
}

export default Message