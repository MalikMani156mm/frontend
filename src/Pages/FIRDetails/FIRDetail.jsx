import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from '../MyApplications/MyApplications.module.css';
import { useDeleteFIRMutation, useGetFIRByIdQuery } from "../../Redux/Features/FIR/FIRApi";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../Components/Loading/Loading";



function FIRDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [policeStationId, setPoliceStationId] = useState(null);
    const { data: firData, error: firError, isLoading: firLoading , refetch} = useGetFIRByIdQuery(id);
    console.log(firData);
    useEffect(() => {
        refetch();
    }, [refetch]);
    useEffect(() => {
        if (firData && firData.FIRs) {
            setPoliceStationId(firData.FIRs.PoliceStation);
        }
    }, [firData]);
    const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
        skip: !policeStationId,
    });;
    // eslint-disable-next-line 
    const [deleteFIR, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteFIRMutation();
    const [deletionError, setDeletionError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = async () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteFIR(id).unwrap();
            navigate("/MyApplications").replace(true);
        } catch (err) {
            setDeletionError(err);
        }
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    if (firError || deletionError || psError) {
        return <Navigate to={'*'} replace={true} />
    }

    if (firLoading || (!policeStationId && psLoading)) {
        return <div><LoadingSpinner/></div>;
    }

    if (!firData || !firData.FIRs) {
        return <div>No data available</div>;
    }

    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }

    return (

        <>
            <div className={styles.body}>
                <h1>FIR Details</h1>
                <div className={styles.container4}>
                    <div className={styles.row4}>
                        <div className={styles.cell1}>Complaint No</div>
                        <div className={styles.cell1}>PS Circle</div>
                        <div className={styles.cell1}>Category</div>
                        <div className={styles.cell1}>Offence</div>
                        <div className={styles.cell1}>Date</div>
                        <div className={styles.cell1}>Status</div>
                        <div className={styles.cell1}>Rating</div>
                    </div>

                    <div className={styles.row4} >
                        <div className={styles.cell1}>{firData.FIRs.ComplaintNumber}</div>
                        <div className={styles.cell1}>{firData.FIRs.Circle}</div>
                        <div className={styles.cell1}>{firData.FIRs.Category}</div>
                        <div className={styles.cell1}>{firData.FIRs.Offence}</div>
                        <div className={styles.cell1}>{firData.FIRs.EntryDate}</div>
                        <div className={styles.cell1}>{firData.FIRs.Status}</div>
                        <div className={styles.cell1}>{stars}</div>
                    </div>

                    <h2 className={styles.actionClass}>Actions</h2>
                    <div className={styles.buttonBody}>
                        <div className={styles.row6}>
                            <button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/ViewFIR/${firData.FIRs._id}`) }}>View Only</button>
                            <button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRPDF/${firData.FIRs._id}`) }}>View PDF</button>
                            <button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/DownloadFIRPDF/${firData.FIRs._id}`) }}>Download PDF</button>
                            <button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/EditFIR/${firData.FIRs._id}`) }}>Edit FIR</button>
                            <button className="btn btn-danger mx-3 my-2" onClick={handleDelete}>Delete FIR</button>
                        </div>
                    </div>
                    <h2 className={styles.actionClass}>Police Station Information</h2>
                    <div className={styles.row4}>
                        <div className={styles.cell1}>PoliceStation <br /> SHO Name</div>
                        <div className={styles.cell1}>SHO <br />Mobile Number</div>
                        <div className={styles.cell1}>PoliceStation <br />Name</div>
                        <div className={styles.cell1}>PoliceStation Landline Number</div>
                        <div className={styles.cell1}>Circle <br /> Incharge</div>
                        <div className={styles.cell1}>Circle Incharge Mobile Number</div>
                        <div className={styles.cell1}>Circle Incharge Landline Number</div>

                    </div>
                    <div className={styles.row4} >
                        <div className={styles.cell1}>{psData ? psData.PSs.SHOName : null}</div>
                        <div className={styles.cell1}>{(psData && psData.PSs.SHOMobileNumber !== null) ? `0${psData.PSs.SHOMobileNumber}` : null}</div>
                        <div className={styles.cell1}>{psData ? psData.PSs.PSName : null}</div>
                        <div className={styles.cell1}>{(psData && psData.PSs.PSLandlineNumber !== null) ? `0${psData.PSs.PSLandlineNumber}` : null}</div>
                        <div className={styles.cell1}>{psData ? psData.PSs.CircleOfficerName : null}</div>
                        <div className={styles.cell1}>{(psData && psData.PSs.CircleOfficerMobileNumber !== null) ? `0${psData.PSs.CircleOfficerMobileNumber}` : null}</div>
                        <div className={styles.cell1}>{(psData && psData.PSs.CircleOfficerLandlineNumber !== null) ? `0${psData.PSs.CircleOfficerLandlineNumber}` : null}</div>

                    </div >
                        <div className={styles.rowButton}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/PSJudicary/${psData && psData.PSs._id}`) }} >More Info</button></div>
                </div>
            </div>
            {showConfirmation && (
                <CustomAlert
                    message="Are you sure you want to delete this FIR?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    buttonLabel={"Confirm"}
                />
            )}
        </>
    );
}
export default FIRDetail;