import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import QR from "../../images/QR.jpg"
import Logo from "../../images/Logo.png";
import Sign from "../../images/Sign.jpeg";
import styles from '../MyApplications/MyApplications.module.css';
import style from "../FIRPDF/FIRPDF.module.css";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import RatingAlert from "../../Components/CustomAlert/RatingAlert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from "html2canvas"
import jspdf from "jspdf";
import Stars from "../../Components/Stars/Stars";
import { useSelector } from "react-redux";
import { useChangeCertificateRatingMutation, useDeleteCertificateMutation, useGetCertificateByIdQuery } from "../../Redux/Features/Certificates/CertificateAPI";


function CertificateDetails() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
    const [policeStationId, setPoliceStationId] = useState(null);
    const { data: Data, error: Error, isLoading: Loading, refetch } = useGetCertificateByIdQuery(id);
    const isApproved = Data?.CCs?.Status === "approved";
    const isRejected = Data?.CCs?.Status === "rejected";

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 2000);

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
    const [updateRating, { error }] = useChangeCertificateRatingMutation();
    const [loader, setLoader] = useState(false);
    const [dynamic, setDynamic] = useState(false);
    const [deletionError, setDeletionError] = useState(null);
    const [rating, setRating] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        if (Data && Data.CCs && Data.CCs.Status === "approved" && Data.CCs.Rating === 0) {
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

    const extractNumber = (complaintNumber) => {
        const parts = complaintNumber.split("-");
        return parts[3];
    };

    const complaintNumber = Data?.CCs?.ApplicationtNumber;
    const extractedNumber = complaintNumber ? extractNumber(complaintNumber) : null;

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const getCurrentDateLocal = () => {
        const current = new Date();
        const day = String(current.getDate()).padStart(2, '0');
        const month = String(current.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = current.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const date = getCurrentDateLocal();

    const PoliceStation = (psName) => {
        const parts = psName.split(" ");
        return parts.slice(2).join(" ");
    };

    const DownloadPDF = () => {
        const capture = document.querySelector(`.${style.document}`)
        setLoader(true);
        setDynamic(true);
        setTimeout(() => {
            html2canvas(capture, { useCORS: true }).then((canvas) => {
                const imgData = canvas.toDataURL('img/jpeg');
                const doc = new jspdf('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight)
                setLoader(false);
                doc.save('Certificate.pdf')
                setDynamic(false);
            })
        }, 100);
    }

    if (user.role !== "Citizen") {
        return <Navigate to={'/MyApplications'} replace={true} />
    }

    if (Error || deletionError || psError || error) {
        return <Navigate to={'*'} replace={true} />
    }

    if (Loading || (!policeStationId && psLoading)) {
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
                                <button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/ViewCertificate/${Data.CCs._id}`) }}>View Only</button>
                                {(!isApproved) ? null :
                                    <button className="btn btn-primary mx-3 my-2" disabled={!isApproved} onClick={() => { navigate(`/CCPDF/${Data.CCs._id}`) }}>View PDF</button>
                                }
                                {(!isApproved) ? null :
                                    <button className="btn btn-primary mx-3 my-2" disabled={!isApproved|| loader} onClick={DownloadPDF}>Download PDF</button>
                                }
                                {(isApproved || isRejected) ? null :
                                    <button className="btn btn-primary mx-3 my-2" disabled={isRejected || isApproved} onClick={() => { navigate(`/EditCertificate/${Data.CCs._id}`) }}>Edit Certificate</button>
                                }
                                {(isApproved || isRejected) ? null :
                                    <button className="btn btn-primary mx-3 my-2" disabled={isRejected || isApproved} onClick={handleDelete}>Delete Certificate</button>
                                }
                                {(!isApproved) ? null :
                                    <button className="btn btn-primary mx-3 my-2" disabled={!isApproved} onClick={handleRating}>Give Rating</button>
                                }
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
                    <div className={style.topDiv}>
                        <div >
                            <img src={Logo} width={100} height={100} alt="QR code not load" />
                        </div>
                        <div className={style.midHead}>
                            <div className={style.formGroup}>
                                <div><h4 className={style.certificateHeading}><b>ISLAMABAD CAPITAL</b></h4></div>
                            </div>
                            <div className={style.formGroup}>
                                <div><h4 className={style.certificateHeading} ><b>TERRITORY POLICE</b></h4></div>
                            </div>
                            <div className={style.formGroup}>
                                <div><h5 className={style.underLine}>{Data?.CCs.Category}</h5></div>
                            </div>
                        </div>
                        <div>
                            <img src={QR} width={100} height={100} alt="QR code not load" />
                        </div>
                    </div>
                    <div className={style.infoDiv}>
                        <div className={style.infoData}>
                            <div>
                                <div className={style.formGroup}>
                                    <div><p>No.</p></div>
                                    <div><p className={style.underLineText}>ISB-{extractedNumber}</p></div>
                                    <div><p>Dated</p></div>
                                    <div><p className={style.underLineText}>{date}</p></div>
                                </div>
                                <div className={style.formGroup}>
                                    <div><p>This is to certify that Mr </p></div>
                                    <div><p className={style.underLineText}>{Data?.CCs.Name}</p></div>
                                </div>
                                <div className={style.formGroup}>
                                    <div><p>{Data?.CCs.relation} of </p></div>
                                    <div><p className={style.underLineText}>{Data?.CCs.GuardianName}</p></div>
                                </div>
                                <div className={style.formGroup}>
                                    <div><p>CNIC No. </p></div>
                                    <div><p className={style.underLineText}>{Data?.CCs.CNIC}</p></div>
                                </div>
                                <div className={style.formGroup}>
                                    <div><p>Date Of Birth. </p></div>
                                    <div><p className={style.underLineText}>{formatDate(Data?.CCs.DOB)}</p></div>
                                </div>
                                <div className={style.formGroup}>
                                    <div><p>having place & Period of stay as follows:- </p></div>
                                </div>
                            </div>
                        </div>
                        <div >
                            <img src={Data?.CCs.ApplicantPic} width={120} height={120} alt="QR code not load" crossOrigin="anonymous" />
                        </div>
                    </div>
                    <div className={style.formGroup}>
                        <div><h5 className={style.underLine}><b>PLACE & PERIOD OF STAY </b></h5></div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.AddressDiv}><p>Address</p></div>
                        <div className={style.PSDiv}><p>Police Station</p></div>
                        <div className={style.lastDiv}>
                            <div className={style.StayDiv}><p>Stay Period</p></div>
                            <div className={style.dateRow}>
                                <div className={style.dateDiv}><p>From</p></div>
                                <div className={style.dateDiv}><p>To</p></div>
                            </div>
                        </div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.addressDiv}><p>{Data?.CCs.PermanentAddress}</p></div>
                        <div className={style.pSDiv}><p>PS {psData ? PoliceStation(psData.PSs.PSName) : null}</p></div>
                        <div className={style.DateDiv}><p className={style.Datetext}>{formatDate(Data?.CCs.DOS)}</p></div>
                        <div className={style.DateDiv}><p className={style.Datetext}>To Date</p></div>
                    </div>
                    <div className={style.instruction}>
                        <div className={style.formGroup}>
                            <div><p>As per available record of Police Station(s), the  applicant has:
                                <ul>
                                    <li>
                                        <b>No Criminal Record Found till date</b>
                                    </li>
                                </ul>
                            </p></div>
                        </div>
                        <div className={style.formGroup}>
                            <div><h5><b>Note: </b></h5>
                                <ul>
                                    <li><p>This Certificate may be used for the purpose of:</p>
                                        <ul>
                                            <li><p>{Data?.CCs.Reason}</p></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p>This Certificate is valid <b>for 180 days</b> from the date of issuance.</p>
                                    </li>
                                    <li>
                                        <p>This is system generated document and does not require stamp and manual signature.</p>
                                    </li>
                                    <li>
                                        <p>
                                            The authenticity of this document can be verified through QR code.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            This verification is based on the information provided by the applicant.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            This certificate is not valid for security guard job.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={style.signDiv}>
                        <div className={style.sign}>
                            <div >
                                <img src={Sign} width={200} height={100} alt="QR code not load" />
                            </div>
                            <div><p>SSP Operations</p></div>
                            <div><p><b>Islamabad Capital Territory Police</b></p></div>
                        </div>
                    </div>
                    <div className={style.separator} />
                    <div className={style.formGroup}>
                        <ul>
                            <li >
                                <p className={style.text}>Permanent/Temporary Residence address to be based on data enter by Citizen in E-FIR System and cross verified by CNIC images.</p>
                            </li>
                            <li >
                                <p className={style.text}>For Feedback: PH No. 0519201522</p>
                            </li>
                            <li >
                                <p className={style.text}>Email:pkm@islamabadpolice.gov.pk</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
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