import React from 'react';
import styles from "./MessageContainer.module.css";
import Messages from "../../Components/Messages/Messages.jsx";
import MessageInput from "../../Components/Messages/MessageInput.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const MessageContainer = () => {

  const noChatSelected = false;

  return (
    <div className={`d-flex flex-column ${styles['md-min-w-450px']}`} >
      {noChatSelected ? (<NoChatSelected />) : (
        <>
          {/* Header */}
          <div className={`px-4 py-2 ${styles['bg-slate-500']} ${styles['mb-2']}`}>
            <span className={`form-label ${styles['text-gray-900']}`}>To:</span> <span className={`font-weight-bold ${styles['text-gray-900']}`}>Police Station</span>
          </div>

          <Messages className={styles.scrollContainer} />
          <MessageInput />
        </>)}
    </div>
  )
}

const NoChatSelected = () => {

  return (
    <div className='d-flex align-items-center justify-content-center w-100 h-100'>
      <div className='px-4 text-center fs-lg fs-xl-md text-gray-200 font-weight-semibold d-flex flex-column align-items-center gap-2'>
        <p>Welcome 👋 Malik Mani ❄</p>
        <p>Select a chat to start messaging</p>
        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '3rem' }} className='fs-3xl fs-6xl-md text-center' />
      </div>
    </div>
  );
};

export default MessageContainer