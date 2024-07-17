import React, { useState, useEffect } from 'react';
import styles from './TextSlideshow.module.css';

const texts = [
    "Welcome to E-FIR system 👋",
    "We are serving the community in every aspect.",
    '<a href="/LogIn">Log into</a> your account!',
    'If you don`t have any account please <a href="/SignUp"> Sign up</a> now!',
    'Goto <a href="/OnlineFIR">Online FIR</a> and Report the Incidents',
    'Goto <a href="/OnlineFIR">My Applications</a> and check status of your FIRs',
    'Goto <a href="/UserGuide">User Manual Guide</a> and Resolve Your Queries',
    "Want to find Information about your Police Station?",
    'Goto <a href="/PSJudicary">Police Station</a> Judiciary now!'
];

const TextSlideshow = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
        const interval = setInterval(() => {
            setActive(false);
            setTimeout(() => {
                setCurrentTextIndex((prevIndex) =>
                    prevIndex === texts.length - 1 ? 0 : prevIndex + 1
                );
                setActive(true);
            }, 100); 
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.slideshowContainer}>
            <div className={`${styles.slideText} ${active ? styles.active : ''}`}
                dangerouslySetInnerHTML={{ __html: texts[currentTextIndex] }}>
            </div>
        </div>
    );
};

export default TextSlideshow;
