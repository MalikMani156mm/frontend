import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Confirmation.module.css'; 
import { useGetAllPoliceStationsQuery } from '../../Redux/Features/PoliceStationInfo/PoliceStationApi';

const TransferAlert = ({ onConfirm, onCancel , setPoliceStation }) => {

    const { data } = useGetAllPoliceStationsQuery();

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>Transfer to:</p>
                <select className="form-control" name="PoliceStation" onChangeCapture={(e)=>setPoliceStation(e.target.value)}>
                  <option value="0">Select</option>
                  {
                    data && data.map(PS => (
                      <option value={PS._id} key={PS._id}>{PS.PSName}</option>
                    ))}
                </select>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Transfer
                    </button>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') 
    );
};

export default TransferAlert;
