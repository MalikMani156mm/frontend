import React from 'react';
import styles from "./MessageContainer.module.css";
import Message from "../../Components/Messages/Message.jsx";


const Messages = () => {
  return (
    <div className={`px-4 ${styles['flex-1']} ${styles['overflow-auto']}`}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}

export default Messages