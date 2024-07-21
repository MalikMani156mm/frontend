import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from '../MyApplications/MyApplications.module.css';
import { useChangeFIRRatingMutation, useDeleteFIRMutation, useGetFIRByIdQuery } from "../../Redux/Features/FIR/FIRApi";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import RatingAlert from "../../Components/CustomAlert/RatingAlert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import html2canvas from "html2canvas"
// import jspdf from "jspdf";
// import QR from "../../images/QR.jpg"
import Stars from "../../Components/Stars/Stars";
import { useSelector } from "react-redux";
import { useDeleteCertificateMutation, useGetCertificateByIdQuery } from "../../Redux/Features/Certificates/CertificateAPI";


function CertificateDetails() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
    const [policeStationId, setPoliceStationId] = useState(null);
    const { data: Data, error: Error, isLoading: Loading, refetch } = useGetCertificateByIdQuery(id);
    const isApproved = Data?.CCs?.Status === "approved" ;
    const isRejected = Data?.CCs?.Status === "rejected";

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    useEffect(() => {
        if (Data && Data.CCs) {
            setPoliceStationId(Data?.CCs?.PoliceStation);
        }
    }, [Data]);
    const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
        skip: !policeStationId,
    });
    // eslint-disable-next-line 
    const [deleteCertificate, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteCertificateMutation();
    const [updateRating, { error }] = useChangeFIRRatingMutation();
    //const [loader, setLoader] = useState(false);
    //const [dynamic, setDynamic] = useState(false);
    const [deletionError, setDeletionError] = useState(null);
    const [rating, setRating] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        if (Data && Data.CCs && Data.CCs.Status === "completed" && Data.CCs.Rating === 0) {
            setShowRating(true);
        }
    }, [Data]);

    const handleDelete = async () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCertificate(id).unwrap();
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

    if (Error || deletionError || psError || error ) {
        return <Navigate to={'*'} replace={true} />
    }

    if (Loading || (!policeStationId && psLoading) ) {
        return <div><LoadingSpinner /></div>;
    }

    if (!Data || !Data.CCs) {
        return <div>No data available</div>;
    }

    return (

        <>
            <div className={styles.body}>
                <h1>Certificate Details</h1>
                <div className={styles.container4}>
                    <div className={styles.table}>
                        <div className={`${styles.row4} ${styles.resprow}`}>
                            <div className={styles.cell1}>Application No</div>
                            <div className={styles.cell1}>PS Circle</div>
                            <div className={styles.cell1}>Name</div>
                            <div className={styles.cell1}>Category</div>
                            <div className={styles.cell1}>Date</div>
                            <div className={styles.cell1}>Status</div>
                            <div className={styles.cell1}>Rating</div>
                        </div>

                        <div className={`${styles.row4} ${styles.datarow}`} >
                            <div className={styles.cell1}>{Data.CCs.ApplicationtNumber}</div>
                            <div className={styles.cell1}>{Data.CCs.Circle}</div>
                            <div className={styles.cell1}>{Data.CCs.Name}</div>
                            <div className={styles.cell1}>{Data.CCs.Category}</div>
                            <div className={styles.cell1}>{Data.CCs.EntryDate}</div>
                            <div className={styles.cell1}>{Data.CCs.Status}</div>
                            <div className={styles.cell1}><Stars rating={Data.CCs.Rating} /></div>
                        </div>
                    </div>

                    <h2 className={styles.actionClass}>Actions</h2>
                    <div className={styles.buttonBody}>
                        <div className={styles.row6}>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={isRejected} onClick={() => { navigate(`/ViewCertificate/${Data.CCs._id}`) }}>View Only</button>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isApproved} onClick={() => { navigate(`/FIRPDF/${Data.CCs._id}`) }}>View PDF</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isApproved } >Download PDF</button>
                                <button className="btn btn-primary mx-3 my-2" disabled={isRejected || isApproved} onClick={() => { navigate(`/EditCertificate/${Data.CCs._id}`) }}>Edit FIR</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={isRejected || isApproved} onClick={handleDelete}>Delete FIR</button>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isApproved} onClick={handleRating}>Give Rating</button>
                            </div>
                        </div>
                    </div>
                    <h2 className={styles.actionClass}>Police Station Information</h2>
                    <div className={styles.table}>
                    <div className={`${styles.row4} ${styles.resprow}`}>
                        <div className={styles.cell2}>PoliceStation  SHO Name</div>
                        <div className={styles.cell2}>SHO Mobile Number</div>
                        <div className={styles.cell2}>PoliceStation Name</div>
                        <div className={styles.cell2}>PoliceStation Landline Number</div>
                        <div className={styles.cell2}>Circle  Incharge</div>
                        <div className={styles.cell2}>Circle Incharge Mobile Number</div>
                        <div className={styles.cell2}>Circle Incharge Landline Number</div>

                    </div>
                    <div className={`${styles.row4} ${styles.datarow}`} >
                        <div className={styles.cell2}>{psData ? psData.PSs.SHOName : null}</div>
                        <div className={styles.cell2}>{(psData && psData.PSs.SHOMobileNumber !== null) ? `0${psData.PSs.SHOMobileNumber}` : null}</div>
                        <div className={styles.cell2}>{psData ? psData.PSs.PSName : null}</div>
                        <div className={styles.cell2}>{(psData && psData.PSs.PSLandlineNumber !== null) ? `0${psData.PSs.PSLandlineNumber}` : null}</div>
                        <div className={styles.cell2}>{psData ? psData.PSs.CircleOfficerName : null}</div>
                        <div className={styles.cell2}>{(psData && psData.PSs.CircleOfficerMobileNumber !== null) ? `0${psData.PSs.CircleOfficerMobileNumber}` : null}</div>
                        <div className={styles.cell2}>{(psData && psData.PSs.CircleOfficerLandlineNumber !== null) ? `0${psData.PSs.CircleOfficerLandlineNumber}` : null}</div>
                    </div >
                    </div>
                    <div className={styles.rowButton}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/PSJudicary/${psData && psData.PSs._id}`) }} >More Info</button></div>
                </div>
            </div>
            {showConfirmation && (
                <CustomAlert
                    message="Are you sure you want to delete this Certificate?"
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
export default CertificateDetails;