import React from 'react';
import styles from "./SideBar.module.css";
import Conversation from "../../Components/SideBar/Conversation.jsx";


const Conversations = () => {
  return (
    <div className={`py-2 d-flex flex-column ${styles['overflow-auto']}`}>
    {/* <Conversation /> */}
    {/* <Conversation /> */}
    <Conversation />
    <Conversation />
    <Conversation />
    <Conversation />
  </div>
  )
}

export default Conversations