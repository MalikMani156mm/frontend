import React, { useState } from 'react';
import styles from "./MessageContainer.module.css";
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useSendMessage from '../../CustomHooks/useSendMessages';

const MessageInput = () => {

  const [message, setMessage] = useState("");
  const [loading, sendMessage] = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className={styles['input-container']}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`form-control text-sm ${styles['input-field']}`}
          placeholder="Send a message"
        />
        <button type="submit" className={styles['input-button']} disabled={loading}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            />
          ) : (<FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '1.5rem' }} />)}

        </button>
      </div>
    </form>
  )
}

export default MessageInput