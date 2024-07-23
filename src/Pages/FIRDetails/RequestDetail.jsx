import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from '../MyApplications/MyApplications.module.css';
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import LoadingSpinner from "../../Components/Loading/Loading";
import RatingAlert from "../../Components/CustomAlert/RatingAlert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import html2canvas from "html2canvas"
// import jspdf from "jspdf";
// import QR from "../../images/QR.jpg"
import Stars from "../../Components/Stars/Stars";
import { useSelector } from "react-redux";
import { useChangeRequestRatingMutation, useDeleteRequestMutation, useGetRequestByIdQuery } from "../../Redux/Features/VehicleVerification/VVApi";


function RequestDetail() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
    const { data: Data, error: Error, isLoading: Loading, refetch } = useGetRequestByIdQuery(id);
    const isApproved = Data?.VVs?.Status === "verified";
    const isFiled = Data?.VVs?.Status === "defected";

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    // eslint-disable-next-line 
    const [deleteRequest, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteRequestMutation();
    const [updateRating, { error }] = useChangeRequestRatingMutation();
    //const [loader, setLoader] = useState(false);
    //const [dynamic, setDynamic] = useState(false);
    const [deletionError, setDeletionError] = useState(null);
    const [rating, setRating] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        if (Data && Data.VVs && Data.VVs.Status === "verified" && Data.VVs.Rating === 0) {
            setShowRating(true);
        }
    }, [Data]);

    const handleDelete = async () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRequest(id).unwrap();
            navigate("/MyApplications", { replace: true });
        } catch (err) {
            setDeletionError(err);
        }
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleRating = async () => {
        setShowRating(true);
    };

    const handleConfirmRating = async () => {

        const res = await updateRating({ id, data: { Rating: rating } }).unwrap();
        setShowRating(false);
        if (res.success) {
            toast.success(res.message);
        }
        else {
            toast.error(res.message);
        }
    };

    const handleCancelRating = () => {
        setShowRating(false);
    };

    if (user.role !== "Citizen") {
        return <Navigate to={'/MyApplications'} replace={true} />
    }

    if (Error || deletionError || error) {
        return <Navigate to={'*'} replace={true} />
    }

    if (Loading) {
        return <div><LoadingSpinner /></div>;
    }

    if (!Data || !Data.VVs) {
        return <div>No data available</div>;
    }


    return (

        <>
            <div className={styles.body}>
                <h1>Vehicle Verification Details</h1>
                <div className={styles.container4}>
                    <div className={styles.table}>
                        <div className={`${styles.row4} ${styles.resprow}`}>
                            <div className={styles.cell1}>Request No</div>
                            <div className={styles.cell1}>Request to</div>
                            <div className={styles.cell1}>Registration No</div>
                            <div className={styles.cell1}>Car Maker</div>
                            <div className={styles.cell1}>Date</div>
                            <div className={styles.cell1}>Status</div>
                            <div className={styles.cell1}>Rating</div>
                        </div>

                        <div className={`${styles.row4} ${styles.datarow}`} >
                            <div className={styles.cell1}>{Data.VVs.RequestNumber}</div>
                            <div className={styles.cell1}>15/Car Cell</div>
                            <div className={styles.cell1}>{Data.VVs.RegistrationNumber}</div>
                            <div className={styles.cell1}>{Data.VVs.Make}</div>
                            <div className={styles.cell1}>{Data.VVs.EntryDate}</div>
                            <div className={styles.cell1}>{Data.VVs.Status}</div>
                            <div className={styles.cell1}><Stars rating={Data.VVs.Rating} /></div>
                        </div>
                    </div>

                    <h2 className={styles.actionClass}>Actions</h2>
                    <div className={styles.buttonBody}>
                        <div className={styles.row6}>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2"  onClick={() => { navigate(`/ViewRequest/${Data.VVs._id}`) }}>View Only</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={isFiled || isApproved} onClick={() => { navigate(`/EditRequest/${Data.VVs._id}`) }}>Edit Request</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={isFiled || isApproved} onClick={handleDelete}>Delete Request</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isApproved} onClick={handleRating}>Give Rating</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {showConfirmation && (
                <CustomAlert
                    message="Are you sure you want to delete this Verification Request?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    buttonLabel={"Confirm"}
                />
            )}
            {showRating && (
                <RatingAlert
                    onConfirm={handleConfirmRating}
                    onCancel={handleCancelRating}
                    setRating={setRating}
                />
            )}
            <ToastContainer />
        </>
    );
}
export default RequestDetail;