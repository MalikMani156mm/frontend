import React, { useEffect, useState } from "react";
import styles from "./FIRPDF.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useGetFIRByIdQuery } from "../../Redux/Features/FIR/FIRApi";
import QR from "../../images/QR.jpg"
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import { useGetOffenceByIdQuery } from "../../Redux/Features/Offence/OffenceApi";
import { useGetCategoryByIdQuery } from "../../Redux/Features/Category/CategoryApi";



function FIRPDF() {

  const { id } = useParams();
  const [policeStationId, setPoliceStationId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [offenceId, setOffenceId] = useState(null);
  const { data: firData, error: firError, isLoading: firLoading } = useGetFIRByIdQuery(id);
  useEffect(() => {
    if (firData && firData.FIRs) {
      setPoliceStationId(firData.FIRs.PoliceStation);
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
  
  const date= getCurrentDateLocal();
  
  const PoliceStation = (psName) => {
    const parts = psName.split(" ");
    return parts.slice(2).join(" ");
  };
  
  if (firError || psError || cError || oError) {
    return <Navigate to={'*'} replace={true} />
}

if (firLoading || (!policeStationId && psLoading) || (!categoryId && cLoading) || (!offenceId && oLoading)) {
    return <div><LoadingSpinner/></div>;
}
  return (
    <>
      <div className={styles.Body}>
        <div className={styles.document}>
          <div className={styles.topHeader}>
            <div className={styles.formGroup}>
              <div><p>Police Form Number: 5-24(1)</p></div>
            </div>
          </div>
          <div className={styles.Section}>
            <div className={styles.formGroup}>
              <div><p>Serial Number:</p></div>
              <div><p>{extractedNumber}</p></div>
            </div>
            <div className={styles.formGroup}>
              <div>
                <img src={QR} width={50} height={50} alt="QR code not load" />
              </div>
            </div>
          </div>
          <div className={styles.topLine}>
            <div className={styles.formGroup}>
              <div><p>First Information Report refers to cognizable offense reported to the police under section 154 of the Code of Criminal Procedure</p> </div>
            </div>
          </div>
          <div className={styles.Section}>
            <div className={styles.formGroup}>
              <div><p>FIR Number:</p></div>
              <div><p>{firData?.FIRs?.FIRNo}</p></div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formGroup}>
              </div>
              <div><p>Police Station:</p></div>
              <div><p>{psData ? PoliceStation(psData.PSs.PSName) : null}</p></div>
            </div>
            <div className={styles.formGroup}>
              <div><p>District:</p></div>
              <div><p>{firData?.FIRs?.District}</p></div>
            </div>
          </div>
          <div className={styles.Section}>
            <div className={styles.formGroup}>
              <div><p>E-Tag Number:</p></div>
              <div><p>{firData?.FIRs?.ComplaintNumber}</p></div>
            </div>
            <div className={styles.formGroup}>
              <div><p>Incident Date and Time:</p></div>
              <div><p>{firData?.FIRs?.IncidentDate}</p></div>
            </div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.serialNumber1}><p>1</p></div>
            <div className={styles.rowLabel1}><p>Entry Date and Time</p></div>
            <div className={styles.rowData2}><p>{firData?.FIRs?.EntryDate}</p></div>
            <div className={styles.serialNumber1}><p>6</p></div>
            <div className={styles.rowLabel1}><p>Source of Complaint</p></div>
            <div className={styles.rowData1}><p>{firData?.FIRs?.SourceOfComplaint}</p></div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.serialNumber}><p>2</p></div>
            <div className={styles.rowLabel}><p>Name and Details of Victim</p></div>
            <div className={styles.rowData}><p>{firData?.FIRs?.Name} {firData?.FIRs?.relation} of {firData?.FIRs?.GuardianName} Address: {firData?.FIRs?.PermanentAddress} <br />CNIC: {firData?.FIRs?.CNIC} Contact Number: {firData?.FIRs?.ContactNumber !== null ? `0${firData?.FIRs?.ContactNumber}` : null}</p></div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.serialNumber}><p>3</p></div>
            <div className={styles.rowLabel}><p>Offence and Category</p></div>
            <div className={styles.rowData}><p>{cData ? cData.category.Category : null} of {oData ? oData.offence.Offence : null}</p></div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.serialNumber}><p>4</p></div>
            <div className={styles.rowLabel}><p>Place of Incident</p></div>
            <div className={styles.rowData}><p>{firData?.FIRs?.placeOfOccurance}</p> </div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.serialNumber}><p>5</p></div>
            <div className={styles.rowLabel}><p>Is any delay in responce</p></div>
            <div className={styles.rowData}><p>Spontaneous responce</p></div>
          </div>
          <div className={styles.Section}>
            <div className={styles.formGroup}>
              <div><p>Officer Name:</p></div>
              <div><p>{firData?.FIRs?.OfficerName}</p></div>
            </div>
            <div className={styles.formGroup}>
              <div><p>Rank:</p></div>
              <div><p>{firData?.FIRs?.Rank}</p></div>
            </div>
            <div className={styles.formGroup}>
              <div><p>Officer Number:</p></div>
              <div><p>{firData?.FIRs?.OfficerContact !== null ? `0${firData?.FIRs?.OfficerContact}` : null}</p></div>
            </div>
          </div>
          <div className={styles.topHeader}>
            <div className={styles.formGroup}>
              <div><p>(Initial informations should be written here)</p> </div>
            </div>
          </div>
          <div className={styles.details}>
            <div><p> Most respectfully requested to SHO of {psData ? psData.PSs.PSName : null} that I am {firData?.FIRs?.Name} {firData?.FIRs?.relation} of {firData?.FIRs?.GuardianName} lives in {firData?.FIRs?.PermanentAddress}. I requested that {firData?.FIRs?.IncidentDetails}
</p></div>
          </div>
          <div className={styles.topHeader}>
            <div className={styles.formGroup}>
              <div><p>{firData?.FIRs?.Rank} {firData?.FIRs?.OfficerName}</p></div>
            </div>
          </div>
          <div className={styles.topHeader}>
            <div className={styles.formGroup}>
              <div><p>{date}</p></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FIRPDF;
