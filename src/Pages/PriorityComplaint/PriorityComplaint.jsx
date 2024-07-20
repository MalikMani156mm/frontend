import styles from "../MyApplications/MyApplications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faRightLeft, faHandshake, faPrint, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'react-tooltip';
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeFromCart } from "../../Redux/Slices/CartSlice";
import { updateShowIcon, clearShowIcon } from "./showIconUtil";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";

function PriorityComplaint() {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [offences, setOffences] = useState([]);

    useEffect(() => {
        const fetchCategoriesAndOffences = async () => {
            try {
                const categoriesResponse = await fetch('http://localhost:5000/api/Categories');
                const offencesResponse = await fetch('http://localhost:5000/api/Offences');

                const categoriesData = await categoriesResponse.json();
                const offencesData = await offencesResponse.json();

                setCategories(Array.isArray(categoriesData) ? categoriesData : []);
                setOffences(Array.isArray(offencesData) ? offencesData : []);
            } catch (error) {
                console.error("Failed to fetch categories and offences", error);
            }
        };

        fetchCategoriesAndOffences();
    }, []);

    const getCategoryNameById = (id) => {
        const category = categories.find(cat => cat._id === id);
        return category ? category.Category : '';
    };

    const getOffenceNameById = (id) => {
        const offence = offences.find(off => off._id === id);
        return offence ? offence.Offence : '';
    };

    const handleRemove = (FIRData) => {
        dispatch(removeFromCart(FIRData));
        updateShowIcon(FIRData._id, false);
    }

    const handleClearAll = () => {
        setShowConfirmation(true);
    }


    const handleConfirmClearAll = async () => {
        dispatch(emptyCart());
        clearShowIcon();
        setShowConfirmation(false);
    };

    const handleCancelClearAll = () => {
        setShowConfirmation(false);
    };

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
                <div className={styles.container0}>
                    <div className={`${styles.row4} ${styles.fullrow}`}>
                        <div className={styles.cell}>Complaint No</div>
                        <div className={styles.cell}>Name</div>
                        <div className={styles.cell}>Phone Number</div>
                        <div className={styles.cell}>CNIC</div>
                        <div className={styles.cell}>Category</div>
                        <div className={styles.cell}>Offence</div>
                        <div className={styles.cell}>Date</div>
                        <div className={styles.cell}>Status</div>
                        <div className={styles.cell}>Actions</div>
                    </div>
                    {
                        cart && cart.map(firs => (
                            <div className={styles.table}>
                                <div className={` ${styles.resprow}`}>
                                    <div className={styles.cell}>Complaint No</div>
                                    <div className={styles.cell}>Name</div>
                                    <div className={styles.cell}>Phone Number</div>
                                    <div className={styles.cell}>CNIC</div>
                                    <div className={styles.cell}>Category</div>
                                    <div className={styles.cell}>Offence</div>
                                    <div className={styles.cell}>Date</div>
                                    <div className={styles.cell}>Status</div>
                                    <div className={styles.cell}>Actions</div>
                                </div>
                                <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                                    <div className={styles.cell1}>{firs.ComplaintNumber}</div>
                                    <div className={styles.cell1}>{firs.Name}</div>
                                    <div className={styles.cell1}>{`0${firs.ContactNumber}`}</div>
                                    <div className={styles.cell1}>{firs.CNIC}</div>
                                    <div className={styles.cell1}>{getCategoryNameById(firs.Category)}</div>
                                    <div className={styles.cell1}>{getOffenceNameById(firs.Offence)}</div>
                                    <div className={styles.cell1}>{firs.EntryDate}</div>
                                    <div className={styles.cell1}>{firs.Status}</div>
                                    <div className={`${styles.cell1} ${styles.icon}`}>
                                        <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" onClick={() => { navigate(`/ViewFIR/${firs._id}`) }} />
                                        <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" onClick={() => { navigate(`/DownloadFIRPDF/${firs._id}`) }} />
                                        <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" />
                                        <FontAwesomeIcon icon={faRightLeft} data-tooltip-id="Tooltip" data-tooltip-content="Trasfer" />
                                        <FontAwesomeIcon icon={faRemove} data-tooltip-id="Tooltip" data-tooltip-content="Remove From Priority" onClick={() => handleRemove(firs)} />
                                        <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                                    </div>
                                </div>
                            </div>))
                    }
                </div>
            </div>
            {showConfirmation && (
                <CustomAlert
                    message="Are you sure you want to clear all priority complaints?"
                    onConfirm={handleConfirmClearAll}
                    onCancel={handleCancelClearAll}
                    buttonLabel={"Confirm"}
                />
            )}
        </>

    );

}

export default PriorityComplaint;