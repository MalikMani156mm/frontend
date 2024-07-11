import React from 'react';
import styles from "./MessageContainer.module.css";

const MessageSkeleton = () => {
  return (
    <>
      <div className='d-flex gap-3 align-items-center'>
        <div className={`${styles.skeleton} rounded-circle`} style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }}></div>
        <div className='d-flex flex-column gap-1'>
          <div className={`${styles.skeleton}`} style={{ height: '1rem', width: '10rem' }}></div>
          <div className={`${styles.skeleton}`} style={{ height: '1rem', width: '10rem' }}></div>
        </div>
      </div>
      <div className='d-flex gap-3 align-items-center justify-content-end'>
        <div className='d-flex flex-column gap-1'>
          <div className={`${styles.skeleton}`} style={{ height: '1rem', width: '10rem' }}></div>
        </div>
        <div className={`${styles.skeleton} rounded-circle`} style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }}></div>
      </div>
    </>
  );
};

export default MessageSkeleton;
