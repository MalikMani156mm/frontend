import React from 'react';
import styles from "./SideBar.module.css";
import Avatar from "../../images/pavatar.png";
import citizenAvatar from "../../images/cavatar.png";
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../Redux/Context/socketContext.jsx';


const Conversation = ({ conversation, lastIndex }) => {

  const {selectedConversation,setSelectedConversation} = useConversation();
  const {onlineUsers} = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;

  const handleClick = () => {
    setSelectedConversation(conversation);
    
  };

  return (
    <>
      <div className={`d-flex gap-2 align-items-center ${styles['hover-bg-sky-500']} rounded p-2 py-1 cursor-pointer ${isSelected ? `${styles['bg-sky-500']}` : ""} `} 
      onClick={handleClick} >
        <div className={`avatar ${isOnline ? styles['avatar-online'] : ''}`}>
          <div className="w-12 rounded-circle">
            {conversation.role === "Citizen" ?
              (<img
                src={citizenAvatar}
                width={50}
                height={50}
                alt="citizen avatar"
                className={styles['rounded-full']}
              />) :
              (<img
                src={Avatar}
                width={50}
                height={50}
                alt="police avatar"
                className={styles['rounded-full']}
              />)
            }
          </div>
        </div>

        <div className="d-flex flex-column flex-fill">
          <div className="d-flex gap-3 justify-content-between">
            <p className="font-weight-bold text-secondary">{conversation.name}</p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className={styles.divider} />}
    </>
  )
}

export default Conversation