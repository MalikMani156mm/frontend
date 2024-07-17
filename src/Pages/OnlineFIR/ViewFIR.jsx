import styles from "./OnlineFIR.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetFIRByIdQuery } from "../../Redux/Features/FIR/FIRApi";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";


function ViewFIR() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const role = "Admin";
    const Role = "SuperAdmin";
    const { id } = useParams();
    const { data, error, isLoading } = useGetFIRByIdQuery(id);
    const [policeStationId, setPoliceStationId] = useState(null);
    useEffect(() => {
        if (data && data.FIRs) {
            setPoliceStationId(data.FIRs.PoliceStation);
        }
    }, [data]);
    const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
        skip: !policeStationId,
    });
    if (error || psError) {
        return <Navigate to={'*'} replace={true} />
    }

    if (isLoading || (!policeStationId && psLoading)) {
        return <div><LoadingSpinner/></div>;
    }

    if (!data || !data.FIRs) {
        return <div>No data available</div>;
    }

    if (!data || !data.FIRs) {
        return <div><LoadingSpinner/></div>;
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
            <form name="addFIR" method="post" className={styles.size}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Basic Information</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3 "><p>Entry Date</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3 ">
                                <input
                                    type="text"
                                    id="datetime"
                                    name="EntryDate"
                                    placeholder={data.FIRs.EntryDate}
                                    disabled={true}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                                <p>Source of Compliant</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" name="SourceOfComplaint" placeholder="Online" className="form-control" disabled={true} />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3"><p>District</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" className="form-control" name="District" placeholder={data.FIRs.District}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Division</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" className="form-control" name="Division" placeholder={data.FIRs.Division}
                                    disabled={true} />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3"><p>Circle</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" className="form-control" name="Circle" placeholder={data.FIRs.Circle}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Police Station</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" className="form-control" name="PoliceStation" placeholder={psData ? psData.PSs.PSName : null}
                                    disabled={true} />
                            </div>
                        </div>
                        {(user && (role=== user.role || Role === user.role)) ? <>
                            <div className={styles.alignment}>
                                <div className="col-lg-3 col-md-3 col-sm-3"><p>Beat/Moza No.</p></div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input type="text" className="form-control" name="BeatMoza"
                                        placeholder={data.FIRs.BeatMoza}
                                        disabled={true} />
                                </div>
                            </div></> : null}
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Complaint Information</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3 ">
                                <p>Compliant Number</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" name="CompliantNumber" placeholder={data.FIRs.ComplaintNumber} className="form-control" disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>CNIC (without dashes)</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="number" name="CNIC" className="form-control" placeholder={data.FIRs.CNIC}
                                    disabled={true} />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3"><p>Name</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" name="Name" className="form-control" placeholder={data.FIRs.Name}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                                <p>{data.FIRs.relation} of</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input
                                    type="text"
                                    name="GuardianName"
                                    className="form-control"
                                    placeholder={data.FIRs.GuardianName}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3"><p>Gender</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" className="form-control" name="Gender" placeholder={data.FIRs.Gender}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Contact Number</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input
                                    type="number"
                                    name="ContactNumber"
                                    className="form-control"
                                    placeholder={`0${data.FIRs.ContactNumber}`}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <p>Permanent Address</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <textarea
                                    type="text"
                                    name="PermanentAddress"
                                    rows={3}
                                    placeholder={data.FIRs.PermanentAddress}
                                    disabled={true}
                                    className={styles.formControl}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <b>Complaint Section</b>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <p>Place of Occurance</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input
                                    type="text"
                                    name="placeOfOccurance"
                                    className="form-control"
                                    placeholder={data.FIRs.placeOfOccurance}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Incident Date</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input
                                    type="text"
                                    id="datetime"
                                    name="IncidentDate"
                                    className="form-control"
                                    placeholder={data.FIRs.IncidentDate}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3 "><p>Category</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" className="form-control" name="Category" placeholder={data.FIRs.Category}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Offence</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input className="form-control" name="Offence" placeholder={data.FIRs.Offence}
                                    disabled={true} />
                            </div>
                        </div>
                        {(user && (role=== user.role || Role === user.role)) ? <>

                            <div className={styles.alignment}>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <p>Offence Subcategory</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input type="text" className="form-control" name="OffenceSubcategory" placeholder={data.FIRs.OffenceSubcategory}
                                        disabled={true} />
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Assigned To</p></div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input type="text" className="form-control" name="AssignedTo" placeholder={data.FIRs.AssignedTo}
                                        disabled={true} />
                                </div>
                            </div>
                            <div className={styles.alignment}>
                                <div className="col-lg-3 col-md-3 col-sm-3"><p>Officer Name</p></div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input
                                        type="text"
                                        name="OfficerName"
                                        className="form-control"
                                        placeholder={data.FIRs.OfficerName}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Officer Contact Number</p></div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input
                                        type="number"
                                        name="OfficerContact"
                                        className="form-control"
                                        placeholder={data.FIRs.OfficerContact}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </> : null}
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3"><p>Incident Details</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <textarea
                                    type="text"
                                    rows={3}
                                    name="IncidentDetails"
                                    className={styles.formControl}
                                    placeholder={data.FIRs.IncidentDetails}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alignment}>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <p>Is FIR Registered</p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" name="FIRNo" className="form-control" placeholder={data.FIRs.FIRRegistered}
                                    disabled={true} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>FIR No</p></div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <input type="text" name="FIRNo" className="form-control" placeholder={data.FIRs.FIRNo}
                                    disabled={true} />
                            </div>
                        </div>
                        {(user && (role=== user.role || Role === user.role)) ? <>

                            <div className={styles.alignment}>
                                <div className="col-lg-3 col-md-3 col-sm-3"><p>IO Name</p></div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input type="text" name="IOName" className="form-control" placeholder={data.FIRs.IOName}
                                        disabled={true} />
                                </div>
                            </div>
                        </> : null}

                    </div>
                </div>
                <div className={styles.buttonsalignment}>
                    <button className={styles.SubmitButton} onClick={() => { navigate(`/EditFIR/${data.FIRs._id}`) }}>
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
export default ViewFIR;
