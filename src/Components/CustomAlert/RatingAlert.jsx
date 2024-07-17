import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './RatingAlert.module.css'; 


const RatingAlert = ({ onConfirm, onCancel, setRating }) => {

    const [localRating, setLocalRating] = useState(0);
    const [hover,setHover] = useState(0);
    
    const handleSetRating = (num) => {
        setLocalRating(num);
        setRating(num);
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>Give the ratings on the basis of Officer's Investigation:</p>
                <div>
                    {
                        [1,2,3,4,5].map((num)=>(
                            <button className={styles.starButton} key={num}
                            onClick={() => handleSetRating(num)}
                            onMouseOver={()=>setHover(num)}
                            onMouseLeave={()=>setHover(localRating)}
                            >
                                <span className={`${styles.star} 
                                ${num <= (localRating || hover) ? styles.on : styles.off }`
                            }>
                                    &#9733;
                                </span>
                            </button>
                        ))
                    }
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Submit
                    </button>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // Use a portal to render outside current component hierarchy
    );
};

export default RatingAlert;
