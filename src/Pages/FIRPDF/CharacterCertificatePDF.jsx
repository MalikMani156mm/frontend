import React, { useEffect, useState } from 'react';
import styles from "./FIRPDF.module.css";
import QR from "../../images/QR.jpg"
import Logo from "../../images/Logo.png";
import Sign from "../../images/Sign.jpeg";
import html2canvas from "html2canvas"
import jspdf from "jspdf";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetCertificateByIdQuery } from '../../Redux/Features/Certificates/CertificateAPI';
import LoadingSpinner from '../../Components/Loading/Loading';
import { useGetPoliceStationByIdQuery } from '../../Redux/Features/PoliceStationInfo/PoliceStationApi';
import { useSelector } from 'react-redux';

export const CharacterCertificatePDF = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const [policeStationId, setPoliceStationId] = useState(null);
    const [loader, setLoader] = useState(false);
    const { data, error: Error, isLoading } = useGetCertificateByIdQuery(id);

    const extractNumber = (complaintNumber) => {
        const parts = complaintNumber.split("-");
        return parts[3];
    };

    useEffect(() => {
        if (data && data?.CCs) {
            setPoliceStationId(data?.CCs.PoliceStation);
        }
    }, [data]);
    const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
        skip: !policeStationId,
    });

    useEffect(() => {
        if (user.role === "Citizen") {
            if (data && data.CCs && (data.CCs.Status === "rejected" || data.CCs.Status === "pending")) {
                navigate("/MyApplications");
            }
        }
    }, [data, user.role, navigate]);

    const complaintNumber = data?.CCs?.ApplicationtNumber;
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
        const capture = document.querySelector(`.${styles.document}`)
        setLoader(true);
        setTimeout(() => {
        html2canvas(capture, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('img/jpg');
            const doc = new jspdf('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'JPG', 0, 0, componentWidth, componentHeight)
            setLoader(false);
            doc.save('Certificate.pdf')
        })
    }, 100);
    }

    if (Error || psError) {
        return <Navigate to={'*'} replace={true} />
    }

    if (isLoading || psLoading) {
        return <div><LoadingSpinner /></div>;
    }
    return (
        <>
            <div className={styles.topBarBody}>
                <div className={styles.topBar}>
                    <div className="dropdown">
                        <button className="btn btn-primary" type="button" onClick={DownloadPDF} disabled={loader}>
                            {loader ? "Downloading..." : "Download"}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.Body}>
                <div className={styles.document}>
                    <div className={styles.topDiv}>
                        <div >
                            <img src={Logo} width={100} height={100} alt="QR code not load" />
                        </div>
                        <div className={styles.midHead}>
                            <div className={styles.formGroup}>
                                <div><h4 className={styles.certificateHeading}><b>ISLAMABAD CAPITAL</b></h4></div>
                            </div>
                            <div className={styles.formGroup}>
                                <div><h4 className={styles.certificateHeading} ><b>TERRITORY POLICE</b></h4></div>
                            </div>
                            <div className={styles.formGroup}>
                                <div><h5 className={styles.underLine}>{data?.CCs.Category}</h5></div>
                            </div>
                        </div>
                        <div>
                            <img src={QR} width={100} height={100} alt="QR code not load" />
                        </div>
                    </div>
                    <div className={styles.infoDiv}>
                        <div className={styles.infoData}>
                            <div>
                                <div className={styles.formGroup}>
                                    <div><p>No.</p></div>
                                    <div><p className={styles.underLineText}>ISB-{extractedNumber}</p></div>
                                    <div><p>Dated</p></div>
                                    <div><p className={styles.underLineText}>{date}</p></div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div><p>This is to certify that Mr </p></div>
                                    <div><p className={styles.underLineText}>{data?.CCs.Name}</p></div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div><p>{data?.CCs.relation} of </p></div>
                                    <div><p className={styles.underLineText}>{data?.CCs.GuardianName}</p></div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div><p>CNIC No. </p></div>
                                    <div><p className={styles.underLineText}>{data?.CCs.CNIC}</p></div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div><p>Date Of Birth. </p></div>
                                    <div><p className={styles.underLineText}>{formatDate(data?.CCs.DOB)}</p></div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div><p>having place & Period of stay as follows:- </p></div>
                                </div>
                            </div>
                        </div>
                        <div >
                            <img src={data?.CCs.ApplicantPic} width={120} height={120} alt="QR code not load" crossOrigin="anonymous"/>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div><h5 className={styles.underLine}><b>PLACE & PERIOD OF STAY </b></h5></div>
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.AddressDiv}><p>Address</p></div>
                        <div className={styles.PSDiv}><p>Police Station</p></div>
                        <div className={styles.lastDiv}>
                            <div className={styles.StayDiv}><p>Stay Period</p></div>
                            <div className={styles.dateRow}>
                                <div className={styles.dateDiv}><p>From</p></div>
                                <div className={styles.dateDiv}><p>To</p></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.addressDiv}><p>{data?.CCs.PermanentAddress}</p></div>
                        <div className={styles.pSDiv}><p>PS {psData ? PoliceStation(psData.PSs.PSName) : null}</p></div>
                        <div className={styles.DateDiv}><p className={styles.Datetext}>{formatDate(data?.CCs.DOS)}</p></div>
                        <div className={styles.DateDiv}><p className={styles.Datetext}>To Date</p></div>
                    </div>
                    <div className={styles.instruction}>
                        <div className={styles.formGroup}>
                            <div><p>As per available record of Police Station(s), the  applicant has:
                                <ul>
                                    <li>
                                        <b>No Criminal Record Found till date</b>
                                    </li>
                                </ul>
                            </p></div>
                        </div>
                        <div className={styles.formGroup}>
                            <div><h5><b>Note: </b></h5>
                                <ul>
                                    <li><p>This Certificate may be used for the purpose of:</p>
                                        <ul>
                                            <li><p>{data?.CCs.Reason}</p></li>
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
                    <div className={styles.signDiv}>
                        <div className={styles.sign}>
                            <div >
                                <img src={Sign} width={200} height={100} alt="QR code not load" />
                            </div>
                            <div><p>SSP Operations</p></div>
                            <div><p><b>Islamabad Capital Territory Police</b></p></div>
                        </div>
                    </div>
                    <div className={styles.separator} />
                    <div className={styles.formGroup}>
                        <ul>
                            <li >
                                <p className={styles.text}>Permanent/Temporary Residence address to be based on data enter by Citizen in E-FIR System and cross verified by CNIC images.</p>
                            </li>
                            <li >
                                <p className={styles.text}>For Feedback: PH No. 0519201522</p>
                            </li>
                            <li >
                                <p className={styles.text}>Email:pkm@islamabadpolice.gov.pk</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}
