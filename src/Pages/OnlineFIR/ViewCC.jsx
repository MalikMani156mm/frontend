import styles from "./OnlineFIR.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCertificateByIdQuery } from "../../Redux/Features/Certificates/CertificateAPI";
import LoadingSpinner from "../../Components/Loading/Loading";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { Carousel } from "react-bootstrap";
import Stars from "../../Components/Stars/Stars";


function ViewCCForm() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const role = "Admin";
    const Role = "SuperAdmin";
    const { id } = useParams();
    const { data, error, isLoading ,refetch} = useGetCertificateByIdQuery(id);
    const [isApproved, setIsApproved] = useState(false);
    const [policeStationId, setPoliceStationId] = useState(null);
    useEffect(() => {
        if (data && data.CCs) {
            setPoliceStationId(data.CCs.PoliceStation);
        }
    }, [data]);

    const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
        skip: !policeStationId,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 2000);
    
        return () => clearInterval(intervalId);
      }, [refetch]);

    useEffect(() => {
        if (user.role === "Citizen") {
            if (data && data.CCs && (data.CCs.Status === "rejected" || data.CCs.Status === "approved")) {
                setIsApproved(true);
            }
        }
    }, [data, user.role]);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    
    if (error || psError) {
        return <Navigate to={'*'} replace={true} />
    }

    if (isLoading || (!policeStationId && psLoading)) {
        return <div><LoadingSpinner /></div>;
    }

    if (!data || !data.CCs) {
        return <div>No data available</div>;
    }


    return (
        <div className={styles.body}>
            <form name="addFIR" method="post" className={styles.size}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Basic Information</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12 "><p>Date of Apply</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12 ">
                                <input
                                    type="text"
                                    id="datetime"
                                    name="EntryDate"
                                    className="form-control"
                                    placeholder={data.CCs.EntryDate}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                                <p>Source of Application</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="SourceofApplication" placeholder="Online" className="form-control" disabled={true} />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>District</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="District" placeholder={data.CCs.District}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Division</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="Division" placeholder={data.CCs.Division}
                                    disabled={true} />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Circle</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="Circle" placeholder={data.CCs.Circle}
                                    disabled={true} />

                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Police Station</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="PoliceStation" placeholder={psData ? psData.PSs.PSName : null}
                                    disabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Information of Applicant</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>CNIC (without dashes)</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="number" name="CNIC" placeholder={data.CCs.CNIC}
                                    disabled={true} className="form-control" />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                                <p>Passport Number</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 " >
                                <div >
                                    <input type="text" name="PassportNumber" className="form-control" placeholder={data.CCs.PassportNumber}
                                        disabled={true} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="Name" placeholder={data.CCs.Name}
                                    disabled={true} className="form-control" />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                                <p>{data.CCs.relation} of</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="text"
                                    name="GuardianName"
                                    className="form-control"
                                    placeholder={data.CCs.GuardianName}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Gender</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="Gender" placeholder={data.CCs.Gender}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Contact Number</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="number"
                                    name="ContactNumber"
                                    placeholder={data.CCs.ContactNumber ? `0${data.CCs.ContactNumber}` : null}
                                    disabled={true}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <p>Permanent Address</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <textarea
                                    type="text"
                                    name="PermanentAddress"
                                    rows={3}
                                    className={styles.formControl}
                                    placeholder={data.CCs.PermanentAddress}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Date of Stay</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" placeholder={formatDate(data.CCs.DOS)} name="DOS" className="form-control" disabled={true}  />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                <p>Date of Birth</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
                <div >
                  <input type="text" placeholder={formatDate(data.CCs.DOB)} name="DOB" className="form-control" disabled={true}  />
                </div>
              </div>
            </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Application Section</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12 "><p>Category</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="Category" placeholder={data.CCs.Category}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                                <p>Submitted by Applicant Himself</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="SubmitByApplicant" placeholder={data.CCs.SubmitByApplicant}
                                    disabled={true} />
                            </div>

                        </div>

                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>If No, Name of Submitter</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="text"
                                    name="SubmitterName"
                                    className="form-control"
                                    placeholder={data.CCs.SubmitterName}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Relation with Applicant</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="RelationWithApplicant" placeholder={data.CCs.RelationWithApplicant}
                                    disabled={true} />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Reason for Apply</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <textarea
                                    type="text"
                                    rows={3}
                                    name="Reason"
                                    className={styles.formControl}
                                    placeholder={data.CCs.Reason}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        {(user && (role === user.role || Role === user.role)) ? <>
                            <div className={styles.alignment}>
                                <div className="col-lg-3 col-md-12 col-sm-12"><p>Operator Name</p></div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <input type="text" name="IOName" className="form-control" placeholder={data.CCs.IOName}
                                        disabled={true} />
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Rating</p></div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <Stars rating={data.CCs.Rating}/>
                                </div>
                            </div>
                        </> : null}
                        <div className={styles.picContent}>
                            <div className={styles.picture}>
                                <Carousel>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.ApplicantPic}
                                            alt="Applicant"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.CNICFront}
                                            alt="CNIC Front side"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.CNICBack}
                                            alt="CNIC Back side"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.AffidavitPicture}
                                            alt="Affidavit"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.PassportInfoPic}
                                            alt="Passport Information"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.PassportLastPic}
                                            alt=" Passport Last Page"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.AffidavitPic}
                                            alt="Affidavit2"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.CCs?.AuthorityLetterPic}
                                            alt="Authority Letter "
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsalignment}>
                    <button className={styles.SubmitButton} disabled={isApproved} onClick={() => { navigate(`/EditCertificate/${data?.CCs?._id}`) }}>
                        Edit
                    </button>
                    <button type="reset" className={styles.CancelButton} onClick={() => { navigate(-1); }}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ViewCCForm;
