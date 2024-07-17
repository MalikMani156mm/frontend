import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Confirmation.module.css'; 

const MeetingMessageBox = ({ onConfirm, onCancel , setMessage }) => {


    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>Write here:</p>
                <input type="text" className='form-control' onChange={(e)=>setMessage(e.target.value)}/>
                <div className={styles.buttonContainer}>
                    <button className={styles.backButton} onClick={onCancel}>
                    Cancel
                    </button>
                    <button className={styles.sendButton} onClick={onConfirm}>
                        Send
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') 
    );
};

export default MeetingMessageBox;
