import styles from "../MyApplications/MyApplications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faPenToSquare, faRightLeft, faHandshake, faFile, faPrint, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'react-tooltip';
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeFromCart } from "../../Redux/Slices/CartSlice";
import { updateShowIcon, clearShowIcon } from "./showIconUtil";

function PriorityComplaint() {
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();


    const handleRemove = (FIRData) => {
        dispatch(removeFromCart(FIRData));
        updateShowIcon(FIRData._id, false);
    }

    const handleClearAll = () => {
        dispatch(emptyCart());
        clearShowIcon()
    }

    return (
        <>
            <div className={styles.topBarBody}>
                <div className={styles.topBar}>
                    <div className="dropdown">
                        <button className="btn btn-primary " type="button" onClick={handleClearAll}>
                            Clear All
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div >
                    <h1>Priority Complaints</h1>
                </div>
                <div className={styles.container4}>
                    <div className={styles.row4}>
                        <div className={styles.cell}>Complaint No</div>
                        <div className={styles.cell}>Name</div>
                        <div className={styles.cell}>Contact Number</div>
                        <div className={styles.cell}>CNIC</div>
                        <div className={styles.cell}>Category</div>
                        <div className={styles.cell}>Offence</div>
                        <div className={styles.cell}>Date</div>
                        <div className={styles.cell}>Status</div>
                        <div className={styles.cell}>Actions</div>
                    </div>
                    {
                        cart && cart.map(firs => (
                            <div className={styles.row4} key={firs._id}>
                                <div className={styles.cell1}>{firs.ComplaintNumber}</div>
                                <div className={styles.cell1}>{firs.Name}</div>
                                <div className={styles.cell1}>{firs.ContactNumber}</div>
                                <div className={styles.cell1}>{firs.CNIC}</div>
                                <div className={styles.cell1}>{firs.Category}</div>
                                <div className={styles.cell1}>{firs.Offence}</div>
                                <div className={styles.cell1}>{firs.EntryDate}</div>
                                <div className={styles.cell1}>{firs.Status}</div>
                                <div className={`${styles.cell1} ${styles.icon}`}>
                                    <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" />
                                    <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" />
                                    <FontAwesomeIcon icon={faFile} data-tooltip-id="Tooltip" data-tooltip-content="View File Mode" />
                                    <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" />
                                    <FontAwesomeIcon icon={faRightLeft} data-tooltip-id="Tooltip" data-tooltip-content="Trasfer" />
                                    <FontAwesomeIcon icon={faPenToSquare} data-tooltip-id="Tooltip" data-tooltip-content="Edit" />
                                    <FontAwesomeIcon icon={faRemove} data-tooltip-id="Tooltip" data-tooltip-content="Remove From Priority" onClick={() => handleRemove(firs)} />
                                    <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                                </div>
                            </div>
                        ))
                    }
                </div></div>
        </>

    );

}

export default PriorityComplaint;