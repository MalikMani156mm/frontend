import React from 'react';
import Conversations from "../../Components/SideBar/Conversations.jsx";
import BackButton from "../../Components/SideBar/BackButton.jsx";
import styles from "./SideBar.module.css";


const SideBar = () => {
  return (
    <div className={`border-end border-secondary p-3 d-flex flex-column ${styles['md-max-h-450px']}`}>
      <Conversations />
      <BackButton />
    </div>
  )
}

export default SideBar