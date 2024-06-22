import { Link, useParams } from "react-router-dom";
import React from "react";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import styles from './PSJudicary.module.css';

function PoliceStationInfo() {

    const { id } = useParams();
    const { data, error } = useGetPoliceStationByIdQuery(id);

    if (error) {
        return (<>
            <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
            <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
            <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className="homelink">Home</Link></h3>
        </>)
    }

    if (!data || !data.PSs) {
        return <div>Loading...</div>;
      }
      
    return (

        <>
            <div className={styles.body}>
                <div ><h1>{data.PSs.PSName}</h1></div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>Division: </h4><p className={styles.text}>{data.PSs.Division}</p></div>
                    <div className={styles.row}><h4>Circle: </h4><p className={styles.text}>{data.PSs.Circle}</p></div>
                </div>
                <div ><h2>Divisional Police Officer of {data.PSs.Division}</h2></div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>DPO Name: </h4><p className={styles.text}>{data.PSs.DPOName}</p></div>
                </div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>DPO Mobile Number: </h4><p className={styles.text}>{data.PSs.DPOMobileNumber !== null ? `0${data.PSs.DPOMobileNumber}` : null}</p></div>
                    <div className={styles.row}><h4>DPO Landline Number: </h4><p className={styles.text}>{data.PSs.DPOLandlineNumber !== null ? `0${data.PSs.DPOLandlineNumber}` : null}</p></div>
                </div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>DPO Reader Name: </h4><p className={styles.text}>{data.PSs.DPOReaderName}</p></div>
                    <div className={styles.row}><h4>Reader Mobile Number: </h4><p className={styles.text}>{data.PSs.ReaderMobileNumber !== null ? `0${data.PSs.ReaderMobileNumber}` : null}</p></div>
                </div>
                <div ><h2>Circle Incharge of {data.PSs.Circle}</h2></div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>Circle Officer Name: </h4><p className={styles.text}>{data.PSs.CircleOfficerName}</p></div>
                </div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>Circle Officer Mobile Number: </h4><p className={styles.text}>{data.PSs.CircleOfficerMobileNumber !== null ? `0${data.PSs.CircleOfficerMobileNumber}` : null}</p></div>
                    <div className={styles.row}><h4>Circle Officer Landline Number: </h4><p className={styles.text}>{data.PSs.CircleOfficerLandlineNumber !== null ? `0${data.PSs.CircleOfficerLandlineNumber}` : null}</p></div>
                </div>
                <div ><h2>SHO of {data.PSs.PSName}</h2></div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>SHO Name: </h4><p className={styles.text}>{data.PSs.SHOName}</p></div>
                </div>
                <div className={styles.mainRow}>
                    <div className={styles.row}><h4>SHO Mobile Number: </h4><p className={styles.text}>{data.PSs.SHOMobileNumber !== null ? `0${data.PSs.SHOMobileNumber}` : null}</p></div>
                    <div className={styles.row}><h4>Police Station Landline Number: </h4><p className={styles.text}>{data.PSs.PSLandlineNumber !== null ? `0${data.PSs.PSLandlineNumber}` : null}</p></div>
                </div>
                <h2>{data.PSs.PSName} Location</h2>
                <div className={styles.responsiveMap}>
                    <iframe src={data.PSs.Location} title="Police Station Location" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </div>
        </>
    );
}
export default PoliceStationInfo;