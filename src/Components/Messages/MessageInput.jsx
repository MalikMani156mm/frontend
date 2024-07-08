import React from 'react';
import styles from "./MessageContainer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
    <div className={styles['input-container']}>
      <input
        type="text"
        row={3}
        className={`form-control text-sm ${styles['input-field']}`}
        placeholder="Send a message"
      />
      <button type="submit" className={styles['input-button']}>
      <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '1.5rem' }}/>
      </button>
    </div>
  </form>
  )
}

export default MessageInput