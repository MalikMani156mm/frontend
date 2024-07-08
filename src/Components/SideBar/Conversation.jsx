import React from 'react';
import styles from "./SideBar.module.css";
import Avatar from "../../images/pavatar.png"


const Conversation = () => {
  return (
    <>
      <div className={`d-flex gap-2 align-items-center ${styles['hover-bg-sky-500']} rounded p-2 py-1 cursor-pointer`}>
        <div className={`avatar ${styles['avatar-online']}`}>
          <div className="w-12 rounded-circle">
            <img
              src={Avatar}
              width={50}
              height={50}
              alt="user avatar"
              className={styles['rounded-full']}
            />
          </div>
        </div>

        <div className="d-flex flex-column flex-fill">
          <div className="d-flex gap-3 justify-content-between">
            <p className="font-weight-bold text-secondary">Police Station</p>
          </div>
        </div>
      </div>

      <div className="border-top my-0 py-0 h-1"></div>
    </>
  )
}

export default Conversation