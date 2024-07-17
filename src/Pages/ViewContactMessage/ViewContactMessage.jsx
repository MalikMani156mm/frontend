import React from 'react';
import styles from "./ViewContactMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactCard } from "@fortawesome/free-solid-svg-icons";
import { useGetAllContactMessageQuery } from '../../Redux/Features/ContactMessage/ContactMessage.Api';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../Components/Loading/Loading';

const ViewContactMessage = () => {

    const { isLoading, data, error } = useGetAllContactMessageQuery();

    if (error) {
        return <Navigate to={'*'} replace={true} />
    }

    if (isLoading) {
        return <div><LoadingSpinner /></div>;
    }

    return (
        <div className={styles.body}>
            <h1 className={styles.header}>Contact Us Messages</h1>
            {
            data && data.map(firs => (
               <div className={styles.internalContainer}>
                <div className={styles.icon}><FontAwesomeIcon icon={faContactCard} /><div className={styles.name}><p>{firs.name}</p></div> </div>
                <div className={styles.email}><p>{firs.email}</p></div>
                <div className={styles.message}><p>{firs.message}</p>
                </div>
            </div>
            ))} 
            
        </div>
    )
}

export default ViewContactMessage