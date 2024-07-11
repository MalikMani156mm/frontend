import React, { useEffect } from 'react';
import styles from "./MessageContainer.module.css";
import Messages from "../../Components/Messages/Messages.jsx";
import MessageInput from "../../Components/Messages/MessageInput.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useConversation from '../../zustand/useConversation.js';
import { useSelector } from 'react-redux';


const MessageContainer = () => {

  const {selectedConversation,setSelectedConversation} = useConversation();

  useEffect(()=>{
    setSelectedConversation(null);
  },[setSelectedConversation])

  return (
    <div className={`d-flex flex-column ${styles['md-min-w-450px']}`} >
      {!selectedConversation ? (<NoChatSelected />) : (
        <>
          {/* Header */}
          <div className={`px-4 py-2 ${styles['bg-slate-500']} ${styles['mb-2']}`}>
            <span className={`form-label ${styles['text-gray-900']}`}>To:</span> 
            <span className={`font-weight-bold ${styles['text-gray-900']}`}>{selectedConversation.name}</span>
          </div>

          <Messages className={styles.scrollContainer} />
          <MessageInput />
        </>)}
    </div>
  )
}

const NoChatSelected = () => {

  const { user } = useSelector(state => state.auth);

  return (
    <div className='d-flex align-items-center justify-content-center w-100 h-100'>
      <div className='px-4 text-center fs-lg fs-xl-md text-gray-200 font-weight-semibold d-flex flex-column align-items-center gap-2'>
        <p>Welcome 👋 {user.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '3rem' }} className='fs-3xl fs-6xl-md text-center' />
      </div>
    </div>
  );
};

export default MessageContainer