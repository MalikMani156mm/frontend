import React from 'react';
import SideBar from  "../../Components/SideBar/SideBar.jsx";
import MessageContainer from "../../Components/Messages/MessageContainer.jsx";
import styles from './ChatPage.module.css'

const ChatPage = () => {
  return (
    <div className={`d-flex h-100 rounded overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ${styles['resp']}`}>
      <SideBar/>
      <MessageContainer />
    </div>
  )
}

export default ChatPage;