import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from '../MyApplications/MyApplications.module.css';
import style from "../FIRPDF/FIRPDF.module.css"
import { useChangeFIRRatingMutation, useDeleteFIRMutation, useGetFIRByIdQuery } from "../../Redux/Features/FIR/FIRApi";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import RatingAlert from "../../Components/CustomAlert/RatingAlert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from "html2canvas"
import jspdf from "jspdf";
import QR from "../../images/QR.jpg"
import Stars from "../../Components/Stars/Stars";
import { useSelector } from "react-redux";
import { useGetCategoryByIdQuery } from "../../Redux/Features/Category/CategoryApi";
import { useGetOffenceByIdQuery } from "../../Redux/Features/Offence/OffenceApi";


function FIRDetail() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
    const [policeStationId, setPoliceStationId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [offenceId, setOffenceId] = useState(null);
    const { data: firData, error: firError, isLoading: firLoading, refetch } = useGetFIRByIdQuery(id);
    const isApproved = firData?.FIRs?.Status === "approved" || firData?.FIRs?.Status === "completed";
    const isCompleted = firData?.FIRs?.Status === "completed";
    const isFiled = firData?.FIRs?.Status === "filed";

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    useEffect(() => {
        if (firData && firData.FIRs) {
            setPoliceStationId(firData?.FIRs?.PoliceStation);
            setCategoryId(firData?.FIRs?.Category);
            setOffenceId(firData?.FIRs?.Offence);
        }
    }, [firData]);
    const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
        skip: !policeStationId,
    });
    const { data: cData, error: cError, isLoading: cLoading } = useGetCategoryByIdQuery(categoryId, {
        skip: !categoryId,
    });
    const { data: oData, error: oError, isLoading: oLoading } = useGetOffenceByIdQuery(offenceId, {
        skip: !offenceId,
    });
    // eslint-disable-next-line 
    const [deleteFIR, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteFIRMutation();
    const [updateRating, { error }] = useChangeFIRRatingMutation();
    const [loader, setLoader] = useState(false);
    const [dynamic, setDynamic] = useState(false);
    const [deletionError, setDeletionError] = useState(null);
    const [rating, setRating] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        if (firData && firData.FIRs && firData.FIRs.Status === "completed" && firData.FIRs.Rating === 0) {
            setShowRating(true);
        }
    }, [firData]);

    const handleDelete = async () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteFIR(id).unwrap();
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

    if (firError || deletionError || psError || error || cError || oError) {
        return <Navigate to={'*'} replace={true} />
    }

    if (firLoading || (!policeStationId && psLoading) || (!categoryId && cLoading) || (!offenceId && oLoading)) {
        return <div><LoadingSpinner /></div>;
    }

    if (!firData || !firData.FIRs) {
        return <div>No data available</div>;
    }


    const DownloadPDF = () => {
        const capture = document.querySelector(`.${style.document}`)
        setLoader(true);
        setDynamic(true);
        setTimeout(() => {
            html2canvas(capture).then((canvas) => {
                const imgData = canvas.toDataURL('img/jpeg');
                const doc = new jspdf('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight)
                setLoader(false);
                doc.save('EFIR.pdf')
                setDynamic(false);
            })
        }, 100);
    }

    const extractNumber = (complaintNumber) => {
        const parts = complaintNumber.split("-");
        return parts[2];
    };

    const complaintNumber = firData?.FIRs?.ComplaintNumber;
    const extractedNumber = complaintNumber ? extractNumber(complaintNumber) : null;
    const getCurrentDateLocal = () => {
        const current = new Date();
        const day = String(current.getDate()).padStart(2, '0');
        const month = String(current.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = current.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const date = getCurrentDateLocal();

    return (

        <>
            <div className={styles.body}>
                <h1>FIR Details</h1>
                <div className={styles.container4}>
                    <div className={styles.table}>
                        <div className={`${styles.row4} ${styles.resprow}`}>
                            <div className={styles.cell1}>Complaint No</div>
                            <div className={styles.cell1}>PS Circle</div>
                            <div className={styles.cell1}>Category</div>
                            <div className={styles.cell1}>Offence</div>
                            <div className={styles.cell1}>Date</div>
                            <div className={styles.cell1}>Status</div>
                            <div className={styles.cell1}>Rating</div>
                        </div>

                        <div className={`${styles.row4} ${styles.datarow}`} >
                            <div className={styles.cell1}>{firData.FIRs.ComplaintNumber}</div>
                            <div className={styles.cell1}>{firData.FIRs.Circle}</div>
                            <div className={styles.cell1}>{cData ? cData.category.Category : null}</div>
                            <div className={styles.cell1}>{oData ? oData.offence.Offence : null}</div>
                            <div className={styles.cell1}>{firData.FIRs.EntryDate}</div>
                            <div className={styles.cell1}>{firData.FIRs.Status}</div>
                            <div className={styles.cell1}><Stars rating={firData.FIRs.Rating} /></div>
                        </div>
                    </div>

                    <h2 className={styles.actionClass}>Actions</h2>
                    <div className={styles.buttonBody}>
                        <div className={styles.row6}>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={isFiled} onClick={() => { navigate(`/ViewFIR/${firData.FIRs._id}`) }}>View Only</button>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isApproved} onClick={() => { navigate(`/FIRPDF/${firData.FIRs._id}`) }}>View PDF</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isApproved || loader} onClick={DownloadPDF}>Download PDF</button>
                                <button className="btn btn-primary mx-3 my-2" disabled={isFiled || isApproved} onClick={() => { navigate(`/EditFIR/${firData.FIRs._id}`) }}>Edit FIR</button>
                            </div>
                            <div className={styles.row7}>
                                <button className="btn btn-primary mx-3 my-2" disabled={isFiled || isApproved} onClick={handleDelete}>Delete FIR</button>
                                <button className="btn btn-primary mx-3 my-2" disabled={!isCompleted} onClick={handleRating}>Give Rating</button>
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
            <div className={dynamic ? styles['body-show'] : styles['body-hidden']}>
                <div className={style.document}>
                    <div className={style.topHeader}>
                        <div className={style.formGroup}>
                            <div><p>Police Form Number: 5-24(1)</p></div>
                        </div>
                    </div>
                    <div className={style.Section}>
                        <div className={style.formGroup}>
                            <div><p>Serial Number:</p></div>
                            <div><p>{extractedNumber}</p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div>
                                <img src={QR} width={50} height={50} alt="QR code not load" />
                            </div>
                        </div>
                    </div>
                    <div className={style.topLine}>
                        <div className={style.formGroup}>
                            <div><p>First Information Report refers to cognizable offense reported to the police under section 154 of the Code of Criminal Procedure</p> </div>
                        </div>
                    </div>
                    <div className={style.Section}>
                        <div className={style.formGroup}>
                            <div><p>FIR Number:</p></div>
                            <div><p>{firData?.FIRs?.FIRNo}</p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div className={style.formGroup}>
                            </div>
                            <div><p>Police Station:</p></div>
                            <div><p>{psData ? psData.PSs.PSName : null}</p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div><p>District:</p></div>
                            <div><p>{firData?.FIRs?.District}</p></div>
                        </div>
                    </div>
                    <div className={style.Section}>
                        <div className={style.formGroup}>
                            <div><p>E-Tag Number:</p></div>
                            <div><p>{firData?.FIRs?.ComplaintNumber}</p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div><p>Incident Date and Time:</p></div>
                            <div><p>{firData?.FIRs?.IncidentDate}</p></div>
                        </div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.serialNumber1}><p>1</p></div>
                        <div className={style.rowLabel1}><p>Entry Date and Time</p></div>
                        <div className={style.rowData2}><p>{firData?.FIRs?.EntryDate}</p></div>
                        <div className={style.serialNumber1}><p>6</p></div>
                        <div className={style.rowLabel1}><p>Source of Complaint</p></div>
                        <div className={style.rowData1}><p>{firData?.FIRs?.SourceOfComplaint}</p></div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.serialNumber}><p>2</p></div>
                        <div className={style.rowLabel}><p>Name and Details of Victim</p></div>
                        <div className={style.rowData}><p>{firData?.FIRs?.Name} {firData?.FIRs?.relation} of {firData?.FIRs?.GuardianName} Address: {firData?.FIRs?.PermanentAddress} <br />CNIC: {firData?.FIRs?.CNIC} Contact Number: {firData?.FIRs?.ContactNumber !== null ? `0${firData?.FIRs?.ContactNumber}` : null}</p></div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.serialNumber}><p>3</p></div>
                        <div className={style.rowLabel}><p>Offence and Category</p></div>
                        <div className={style.rowData}><p>{cData ? cData.category.Category : null} of {oData ? oData.offence.Offence : null}</p></div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.serialNumber}><p>4</p></div>
                        <div className={style.rowLabel}><p>Place of Incident</p></div>
                        <div className={style.rowData}><p>{firData?.FIRs?.placeOfOccurance}</p> </div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.serialNumber}><p>5</p></div>
                        <div className={style.rowLabel}><p>Is any delay in responce</p></div>
                        <div className={style.rowData}><p>Spontaneous responce</p></div>
                    </div>
                    <div className={style.Section}>
                        <div className={style.formGroup}>
                            <div><p>Officer Name:</p></div>
                            <div><p>{firData?.FIRs?.OfficerName}</p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div><p>Rank:</p></div>
                            <div><p>{firData?.FIRs?.Rank}</p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div><p>Officer Number:</p></div>
                            <div><p>{firData?.FIRs?.OfficerContact !== null ? `0${firData?.FIRs?.OfficerContact}` : null}</p></div>
                        </div>
                    </div>
                    <div className={style.topHeader}>
                        <div className={style.formGroup}>
                            <div><p>(Initial informations should be written here)</p> </div>
                        </div>
                    </div>
                    <div className={style.details}>
                        <div><p> Most respectfully requested to SHO of {psData ? psData.PSs.PSName : null} that I am {firData?.FIRs?.Name} {firData?.FIRs?.relation} of {firData?.FIRs?.GuardianName} lives in {firData?.FIRs?.PermanentAddress}. I requested that {firData?.FIRs?.IncidentDetails}
                        </p></div>
                    </div>
                    <div className={style.topHeader}>
                        <div className={style.formGroup}>
                            <div><p>{firData?.FIRs?.Rank} {firData?.FIRs?.OfficerName}</p></div>
                        </div>
                    </div>
                    <div className={style.topHeader}>
                        <div className={style.formGroup}>
                            <div><p>{date}</p></div>
                        </div>
                    </div>
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
export default FIRDetail;