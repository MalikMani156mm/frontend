import styles from "./OnlineFIR.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetRequestByIdQuery } from "../../Redux/Features/VehicleVerification/VVApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import { Carousel } from "react-bootstrap";
import Stars from "../../Components/Stars/Stars";


function ViewVVForm() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const role = "Admin";
    const Role = "SuperAdmin";
    const { id } = useParams();
    const { data, error, isLoading, refetch } = useGetRequestByIdQuery(id);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 2000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    useEffect(() => {
        if (user.role === "Citizen") {
            if (data && data.VVs && (data.VVs.Status === "verified" || data.VVs.Status === "defected")) {
                setIsApproved(true);
            }
        }
    }, [data, user.role]);

    if (isLoading) {
        return <div><LoadingSpinner /></div>;
    }

    if (!data || !data.VVs) {
        return <div>No data available</div>;
    }

    if (error) {
        return (<>
            <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
            <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
            <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
        </>)
    }

    return (
        <div className={styles.body}>
            <form action="" className={styles.size}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Information of Applicant</b>
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
                                    placeholder={data.VVs.EntryDate}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                                <p>Request Number</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 " >
                                <div >
                                    <input type="number" name="RequestNumber" className="form-control" placeholder={data.VVs.RequestNumber} disabled={true} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12 "><p>Request Deliver to</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="RequestTo" placeholder="15/Car Cell" disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC (without dashes)</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="number" name="CNIC" placeholder={data.VVs.CNIC} disabled className="form-control" />
                            </div>

                        </div>

                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="Name" placeholder={data.VVs.Name} disabled className="form-control" />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                                <p>{data.VVs.relation} of</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="text"
                                    name="GuardianName"
                                    className="form-control"
                                    placeholder={data.VVs.GuardianName} disabled
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Gender</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="Gender" placeholder={data.VVs.Gender} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Contact Number</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="number"
                                    name="ContactNumber"
                                    placeholder={data.VVs.ContactNumber ? `0${data.VVs.ContactNumber}` : null}
                                    disabled
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
                                    placeholder={data.VVs.PermanentAddress} disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Vehicle Owner Information</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>CNIC (without dashes)</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="number" name="OCNIC" className="form-control" placeholder={data.VVs.OCNIC} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC Picture </p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="number" name="OCNIC" className="form-control" placeholder={"Show Below"} disabled />
                            </div>
                        </div>

                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="OName" className="form-control" placeholder={data.VVs.OName} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2">

                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="text"
                                    name="OGuardianName"
                                    className="form-control"
                                    placeholder={data.VVs.OGuardianName} disabled
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Gender</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input className="form-control" name="OGender" placeholder={data.VVs.OGender} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Contact Number</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input
                                    type="number"
                                    name="OContactNumber"
                                    placeholder={data.VVs.OContactNumber} disabled
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
                                    name="OPermanentAddress"
                                    rows={3}
                                    placeholder={data.VVs.OPermanentAddress} disabled
                                    className={styles.formControl}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Vehicle Information</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Registration Number</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="RegistrationNumber" className="form-control" placeholder={data.VVs.RegistrationNumber} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Make</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="Make" className="form-control" placeholder={data.VVs.Make} disabled />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Model</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="Model" className="form-control" placeholder={data.VVs.Model} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Year of Manufacture</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="number" name="YearOfManufacture" className="form-control" placeholder={data.VVs.YearOfManufacture} disabled />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Color</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="Color" className="form-control" placeholder={data.VVs.Color} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Chassis Number</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="ChassisNumber" className="form-control" placeholder={data.VVs.ChassisNumber} disabled />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12 "><p>Engine Number</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="EngineNumber" className="form-control" placeholder={data.VVs.EngineNumber} disabled />
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-112 mx-2">
                                <p>You buy it?</p>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <input type="text" name="BuyIt" className="form-control" placeholder={data.VVs.BuyIt} disabled />
                            </div>
                        </div>

                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-12 col-sm-12"><p>Reason for Verification</p></div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                                <textarea
                                    type="text"
                                    rows={3}
                                    name="Reason"
                                    className={styles.formControl}
                                    placeholder={data.VVs.Reason} disabled
                                />
                            </div>
                        </div>


                        {(user && (role === user.role || Role === user.role)) ? <>
                            <div className={styles.alignment}>
                                <div className="col-lg-3 col-md-12 col-sm-12"><p>Operator Name</p></div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <input type="text" name="IOName" className="form-control" placeholder={data.VVs.IOName} disabled />
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Rating</p></div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <Stars rating={data.VVs.Rating} />
                                </div>
                            </div></> : null}
                        <div className={styles.picContent}>
                            <div className={styles.picture}>
                                <Carousel>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.ApplicantPic}
                                            alt="Applicant"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.CNICFront}
                                            alt="CNIC Front side"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.CNICBack}
                                            alt="CNIC Back side"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.OCNICPic}
                                            alt="Owner CNIC"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.RegistrationBookPic}
                                            alt="Registration Book"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.ChassisNumberPic}
                                            alt=" Chassis Number"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item className={styles.carouselItem}>
                                        <img
                                            className={styles.slide}
                                            src={data && data?.VVs?.EngineNumberPic}
                                            alt="Engine Number"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsalignment}>
                    {isApproved ? null :
                        <button className={styles.SubmitButton} disabled={isApproved} onClick={() => { navigate(`/EditRequest/${data?.VVs?._id}`) }}>
                            Edit
                        </button>
                    }
                    <button type="reset" className={styles.CancelButton} onClick={() => { navigate(-1); }}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ViewVVForm;
