import styles from "./OnlineFIR.module.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useGetFIRByIdQuery, useUpdateFIRMutation } from '../../Redux/Features/FIR/FIRApi';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useGetAllPoliceStationsQuery, useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";


function EditFIR() {

  const { user } = useSelector(state => state.auth);
  const role = "Admin";
  const Role = "SuperAdmin";
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [policeStationId, setPoliceStationId] = useState(null);
  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);
  const { id } = useParams();
  const [updateFIR, { isLoading, error }] = useUpdateFIRMutation();
  const { data: allPSData } = useGetAllPoliceStationsQuery();
  const { data: firData, error: firError, isLoading: firLoading } = useGetFIRByIdQuery(id);
  
  useEffect(() => {
    if (firData && firData.FIRs) {
      setPoliceStationId(firData.FIRs.PoliceStation);
    }
  }, [firData]);

  const { data: psData, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(policeStationId, {
    skip: !policeStationId,
  });

  if (firError || psError || error) {
    return <Navigate to={'*'} replace={true} />
  }

  if (firLoading || (!policeStationId && psLoading)) {
    return <div><LoadingSpinner/></div>;
  }

  if (!firData || !firData.FIRs) {
    return <div>No data available</div>;
  }

  if (!firData || !firData.FIRs) {
    return <div><LoadingSpinner/></div>;
  }


  const addMoreFile = () => {
    const newId = fileInputs[fileInputs.length - 1].id + 1;
    setFileInputs([...fileInputs, { id: newId }]);
  };



  const handleRadioClick = (value) => {
    if (selectedValue === value) {
      setSelectedValue(null);

    } else {
      setSelectedValue(value);
      setFieldValue('relation', values.relation === value ? '' : value);
    }
  };

  const handleRadioClick2 = (value) => {
    if (selectedValue2 === value) {
      setSelectedValue2(null);

    } else {
      setSelectedValue2(value);
      setFieldValue('FIRRegistered', values.FIRRegistered === value ? '' : value);
    }
  };


  
  // eslint-disable-next-line
  const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      EntryDate: firData.FIRs.EntryDate,
      SourceOfComplaint: 'Online',
      ComplaintNumber: firData.FIRs.ComplaintNumber,
      District: firData.FIRs.District,
      Division: firData.FIRs.Division,
      Circle: firData.FIRs.Circle,
      PoliceStation: firData.FIRs.PoliceStation,
      BeatMoza: firData.FIRs.BeatMoza,
      CNIC: firData.FIRs.CNIC,
      Name: firData.FIRs.Name,
      relation: firData.FIRs.relation,
      GuardianName: firData.FIRs.GuardianName,
      Gender: firData.FIRs.Gender,
      ContactNumber: firData.FIRs.ContactNumber,
      PermanentAddress: firData.FIRs.PermanentAddress,
      placeOfOccurance: firData.FIRs.placeOfOccurance,
      IncidentDate: firData.FIRs.IncidentDate,
      Category: firData.FIRs.Category,
      Offence: firData.FIRs.Offence,
      OffenceSubcategory: firData.FIRs.OffenceSubcategory,
      AssignedTo: firData.FIRs.AssignedTo,
      OfficerName: firData.FIRs.OfficerName,
      OfficerContact: firData.FIRs.OfficerContact,
      IncidentDetails: firData.FIRs.IncidentDetails,
      FIRRegistered: firData.FIRs.FIRRegistered,
      FIRNo: firData.FIRs.FIRNo,
      IOName: firData.FIRs.IOName,
      file: firData.FIRs.file,
    },
    validationSchema: yup.object().shape({
      EntryDate: yup.date().required('Date is required').max(new Date(), 'Date must be in the past'),
      District: yup.string().required('Required'),
      Division: yup.string().required('Required'),
      Circle: yup.string().required('Required'),
      PoliceStation: yup.string().required('Required'),
      CNIC: yup.number().min(1111111111111, "Must be atleast 13 digit").max(9999999999999, "Invalid CNIC").required('Required'),
      Name: yup.string().min(5).max(30).required('Required'),
      relation: yup.string().required('Required'),
      GuardianName: yup.string().min(5).max(30).required('Required'),
      Gender: yup.string().required('Required'),
      ContactNumber: yup.number().min(1111111111, "Must be atleast 11 digit").max(999999999999, "Invalid Number").required('Required'),
      PermanentAddress: yup.string().max(300).required('Required'),
      placeOfOccurance: yup.string().required('Required'),
      IncidentDate: yup.date().required('Date is required').max(new Date(), 'Date must be in the past'),
      FIRRegistered: yup.string().required('Required'),
      Category: yup.string().required('Required'),
      Offence: yup.string().required('Required'),
      IncidentDetails: yup.string().max(2000).required('Required'),
      // file: yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const res = await updateFIR({ id, data: values }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
      else {
        toast.error(res.message || res.data.error);
      }

    }
  });

  const handleIncidentDetailsChange = (event) => {
    setFieldValue('IncidentDetails', event.target.value);
};

  return (
    <div className={styles.body}>
      <form name="addFIR" method="post" onSubmit={handleSubmit} className={styles.size}>
        <div className={styles.container}>
          <div className={styles.header}>
            <b>Basic Information</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3 "><p>Entry Date</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <input
                  type="datetime-local"
                  id="datetime"
                  name="EntryDate"
                  className="form-control"
                  placeholder={firData.FIRs.EntryDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.EntryDate && touched.EntryDate ? errors.EntryDate : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                <p>Source of Compliant</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="SourceOfComplaint" placeholder="Online" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>District</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="District"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="0" disabled selected>{firData.FIRs.District}</option>
                </select>
                <p className="help-block text-danger">{errors.District && touched.District ? errors.District : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Division</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Division"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0"disabled selected>{firData.FIRs.Division}</option>
                  <option value="City">City</option>
                  <option value="Saddar">Saddar</option>
                  <option value="Industrial Area">Industrial Area</option>
                  <option value="Rural">Rural</option>
                  <option value="Soan">Soan</option>                </select>
                <p className="help-block text-danger">{errors.Division && touched.Division ? errors.Division : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Circle</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Circle"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0"disabled selected>{firData.FIRs.Circle}</option>
                  <option value="Sabzi Mandi">Sabzi Mandi</option>
                  <option value="Secretariat">Secretariat</option>
                  <option value="Abpara">Abpara</option>
                  <option value="Kohsar">Kohsar</option>
                  <option value="Bhara Kahu">Bhara Kahu</option>
                  <option value="Phulgaran">Phulgaran</option>
                  <option value="Bani Gala">Bani Gala</option>
                  <option value="Margalla">Margalla</option>
                  <option value="Karachi Company">Karachi Company</option>
                  <option value="Golra">Golra</option>
                  <option value="Tarnol">Tarnol</option>
                  <option value="Sangjani">Sangjani</option>
                  <option value="Sumbal">Sumbal</option>
                  <option value="Shalimar">Shalimar</option>
                  <option value="Ramna">Ramna</option>
                  <option value="I-9 Industrial Area">I-9 Industrial Area</option>
                  <option value="Noon">Noon</option>
                  <option value="Shams Colony">Shams Colony</option>
                  <option value="Shehzad Town">Shehzad Town</option>
                  <option value="Khanna">Khanna</option>
                  <option value="Sihala">Sihala</option>
                  <option value="Humak">Humak</option>
                  <option value="Lohi Bher">Lohi Bher</option>
                  <option value="Nilore">Nilore</option>
                  <option value="Koral">Koral</option>
                  <option value="Kirpa">Kirpa</option>
                  <option value="Women">Women</option>

                </select>
                <p className="help-block text-danger">{errors.Circle && touched.Circle ? errors.Circle : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Police Station</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="PoliceStation"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0"disabled selected>{psData && psData.PSs.PSName}</option>
                  {
                    allPSData && allPSData.map(PS => (
                      <option value={PS._id} key={PS._id}>{PS.PSName}</option>
                    ))}

                </select>
                <p className="help-block text-danger">{errors.PoliceStation && touched.PoliceStation ? errors.PoliceStation : null}</p>
              </div>
            </div>
            {(user && (role=== user.role || Role === user.role)) ? <>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3"><p>Beat/Moza No.</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <select className="form-control" name="BeatMoza"
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0"disabled selected>{firData.FIRs.BeatMoza}</option>
                    <option value="1">Beat/Moza-1</option>
                  </select>
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
                <input type="text" name="CompliantNumber" placeholder={firData.FIRs.ComplaintNumber} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="number" name="CNIC" placeholder={firData.FIRs.CNIC} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>

            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Name</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" placeholder={firData.FIRs.Name} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                <div className={styles.radio}>
                  <div className="mx-2">
                    <input type="radio" name="relation" id="son" value="son"
                      checked={values.relation === 'son'}
                      onChange={() => handleRadioClick('son')} />
                    <p>S/O</p>
                  </div>
                  <div className="mx-2">
                    <input type="radio" name="relation" value="daughter"
                      id="daughter"
                      checked={values.relation === 'daughter'}
                      onChange={() => handleRadioClick('daughter')} />
                    <p>D/O</p>
                  </div>
                  <div className="mx-2">
                    <input type="radio" name="relation" value="wife"
                      id="wife"
                      checked={values.relation === 'wife'}
                      onChange={() => handleRadioClick('wife')} />
                    <p>W/O</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="text"
                  name="GuardianName"
                  className="form-control"
                  placeholder={firData.FIRs.GuardianName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.GuardianName && touched.GuardianName ? errors.GuardianName : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Gender</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Gender" onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0"disabled selected>{firData.FIRs.Gender}</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
                <p className="help-block text-danger">{errors.Gender && touched.Gender ? errors.Gender : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Contact Number</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="number"
                  name="ContactNumber"
                  placeholder={`0${firData.FIRs.ContactNumber}`}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.ContactNumber && touched.ContactNumber ? errors.ContactNumber : null}</p>
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
                  placeholder={firData.FIRs.PermanentAddress}
                  rows={3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.formControl}
                />
                <p className="help-block text-danger">{errors.PermanentAddress && touched.PermanentAddress ? errors.PermanentAddress : null}</p>
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
                  placeholder={firData.FIRs.placeOfOccurance}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.placeOfOccurance && touched.placeOfOccurance ? errors.placeOfOccurance : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Incident Date</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="date"
                  id="datetime"
                  name="IncidentDate"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.IncidentDate && touched.IncidentDate ? errors.IncidentDate : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3 "><p>Category</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Category"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0"disabled selected>{firData.FIRs.Category}</option>
                  <option value="Child Abuse">Child Abuse</option>
                  <option value="Complaint against Police">Complaint against Police</option>
                  <option value="Foreigner complaint">Foreigner complaint</option>
                  <option value="Gender Abuse">Gender Abuse</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Human Rights">Human Rights</option>
                  <option value="Investigation">Investigation</option>
                  <option value="Loss Report">Loss Report</option>
                  <option value="Minority Abuse">Minority Abuse</option>
                  <option value="Non registration of FIR">Non registration of FIR</option>
                  <option value="Others">Others</option>
                  <option value="Overseas Pakistan">Overseas Pakistan</option>
                  <option value="Reporting of Crime">Reporting of Crime</option>
                  <option value="Traffic Complaint">Traffic Complaint</option>
                  <option value="Violence Against Transgender Person">Violence Against Transgender Person</option>
                  <option value="Violence Against Woman">Violence Against Woman</option>
                </select>
                <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Offence</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Offence"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0"disabled selected>{firData.FIRs.Offence}</option>
                  <option value="295-A PPC">295-A PPC</option>
                  <option value="382 PPC">382 PPC</option>
                  <option value="Access to public place">Access to public place</option>
                  <option value="Acid Throwing">Acid Throwing</option>
                  <option value="Anti-Norcotics Act">Anti-Norcotics Act</option>
                  <option value="Anti-Terrorism Act">Anti-Terrorism Act</option>
                  <option value="Arm License / Slip">Arm License / Slip</option>
                  <option value="Arms Ordinance Act">Arms Ordinance Act</option>
                  <option value="Arrest of innocent persons">Arrest of innocent persons</option>
                  <option value="ATM Card">ATM Card</option>
                  <option value="Attack on Govt. Servant">Attack on Govt. Servant</option>
                  <option value="Attempted Murder">Attempted Murder</option>
                  <option value="BayForm Loss">BayForm Loss</option>
                  <option value="Begging Act">Begging Act</option>
                  <option value="Blind Murder">Blind Murder</option>
                  <option value="Border Crossing Act">Border Crossing Act</option>
                  <option value="Breach of trust 406PPC">Breach of trust 406PPC</option>
                  <option value="Burglary">Burglary</option>
                  <option value="Canal Cut">Canal Cut</option>
                  <option value="Cancellation of False FIR">Cancellation of False FIR</option>
                  <option value="Car Snatching">Car Snatching</option>
                  <option value="Car Theft">Car Theft</option>
                  <option value="Character Certificate">Character Certificate</option>
                  <option value="Cheating">Cheating</option>
                  <option value="Cheque / Cheque Book">Cheque / Cheque Book</option>
                  <option value="Cheque Dishonour">Cheque Dishonour</option>
                  <option value="Child Marriage">Child Marriage</option>
                  <option value="Child Sexual Abuse">Child Sexual Abuse</option>
                  <option value="Cigarette Act">Cigarette Act</option>
                  <option value="CNIC Loss">CNIC Loss</option>
                  <option value="Commission">Commission</option>
                  <option value="Complaint against police">Complaint against police</option>
                  <option value="Copyright Act">Copyright Act</option>
                  <option value="Corruption">Corruption</option>
                  <option value="Cyber Crime Act">Cyber Crime Act</option>
                  <option value="Cycle Theft">Cycle Theft</option>
                  <option value="Dacoity">Dacoity</option>
                  <option value="Dacoity/Robbery with Murder">Dacoity/Robbery with Murder</option>
                  <option value="Defective Investigation">Defective Investigation</option>
                  <option value="Demand of Illegal Gratification">Demand of Illegal Gratification</option>
                  <option value="Dengue Act">Dengue Act</option>
                  <option value="Domestic Violence">Domestic Violence</option>
                  <option value="Dowry Related Violence">Dowry Related Violence</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Educational Documents Loss">Educational Documents Loss</option>
                  <option value="Electricity Act">Electricity Act</option>
                  <option value="Fatal Accident">Fatal Accident</option>
                  <option value="Female Genital Mutilation/Cutting">Female Genital Mutilation/Cutting</option>
                  <option value="Fight">Fight</option>
                  <option value="Forced Abortion">Forced Abortion</option>
                  <option value="Forced Marriage">Forced Marriage</option>
                  <option value="Freedom of Assembly & Association">Freedom of Assembly & Association</option>
                  <option value="Freedom of movement">Freedom of movement</option>
                  <option value="Gambling">Gambling</option>
                  <option value="Gang Rape">Gang Rape</option>
                  <option value="Habs e Beja">Habs e Beja</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Harassment at workplace">Harassment at workplace</option>
                  <option value="High Heandedness">High Heandedness</option>
                  <option value="Honor Killng">Honor Killng</option>
                  <option value="Hurt (personal feud)">Hurt (personal feud)</option>
                  <option value="Illegal detention">Illegal detention</option>
                  <option value="Illegal Extortion">Illegal Extortion</option>
                  <option value="Illegal Gas Cylinder Act">Illegal Gas Cylinder Act</option>
                  <option value="Illegal Weapon">Illegal Weapon</option>
                  <option value="Insurance Claim">Insurance Claim</option>
                  <option value="Intimate Partner Violence">Intimate Partner Violence</option>
                  <option value="Investigation – Delay">Investigation – Delay</option>
                  <option value="Investigation – Faulty / Unfair">Investigation – Faulty / Unfair</option>
                  <option value="Involvement in Criminal Activity">Involvement in Criminal Activity</option>
                  <option value="Jewellery Snatching">Jewellery Snatching</option>
                  <option value="Kidnapping">Kidnapping</option>
                  <option value="Kidnapping Minors">Kidnapping Minors</option>
                  <option value="Kite Flying Act">Kite Flying Act</option>
                  <option value="Laptop theft">Laptop theft</option>
                  <option value="Local Government Act">Local Government Act</option>
                  <option value="Loss of Property Document">Loss of Property Document</option>
                  <option value="Loss of Service Card">Loss of Service Card</option>
                  <option value="Loss of Utility Meter/ No Plate">Loss of Utility Meter/ No Plate</option>
                  <option value="Lost Bike Registration book">Lost Bike Registration book</option>
                  <option value="Loud Speaker Act">Loud Speaker Act</option>
                  <option value="M/Cycle Snatching">M/Cycle Snatching</option>
                  <option value="M/Cycle Theft">M/Cycle Theft</option>
                  <option value="Misappropriation">Misappropriation</option>
                  <option value="Misbehavior">Misbehavior</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                  <option value="Misconduct">Misconduct</option>
                  <option value="Mobile Phone">Mobile Phone</option>
                  <option value="Mobile Snatching">Mobile Snatching</option>
                  <option value="Mobile theft">Mobile theft</option>
                  <option value="Murder">Murder</option>
                  <option value="Narcotics">Narcotics</option>
                  <option value="Non registration of FIR">Non registration of FIR</option>
                  <option value="Non-Fatal Accident">Non-Fatal Accident</option>
                  <option value="Non-Registration of FIR">Non-Registration of FIR</option>
                  <option value="Omission">Omission</option>
                  <option value="One Wheeling Act">One Wheeling Act</option>
                  <option value="Original File (Bike/Car)">Original File (Bike/Car)</option>
                  <option value="Other">Other</option>
                  <option value="Other Crime">Other Crime</option>
                  <option value="Other Document">Other Document</option>
                  <option value="Other Vehicle Snatching">Other Vehicle Snatching</option>
                  <option value="Other Vehicle Theft">Other Vehicle Theft</option>
                  <option value="Outraging the Modesty of Women">Outraging the Modesty of Women</option>
                  <option value="Overspeeding">Overspeeding</option>
                  <option value="Passport Loss">Passport Loss</option>
                  <option value="Pay Order">Pay Order</option>
                  <option value="Pension Book">Pension Book</option>
                  <option value="Police Encounter">Police Encounter</option>
                  <option value="Police Order Act">Police Order Act</option>
                  <option value="Price Control Act">Price Control Act</option>
                  <option value="Property">Property</option>
                  <option value="Purse Snatching">Purse Snatching</option>
                  <option value="Railway Act">Railway Act</option>
                  <option value="Rape">Rape</option>
                  <option value="Registration book">Registration book</option>
                  <option value="Robbery">Robbery</option>
                  <option value="Saving Certificate">Saving Certificate</option>
                  <option value="Secretarianism">Secretarianism</option>
                  <option value="Sexual Assualt">Sexual Assualt</option>
                  <option value="Slackness in Duty">Slackness in Duty</option>
                  <option value="Snatching">Snatching</option>
                  <option value="Stalking">Stalking</option>
                  <option value="Suicide Attempt">Suicide Attempt</option>
                  <option value="Telephone Act">Telephone Act</option>
                  <option value="Theft">Theft</option>
                  <option value="Threats">Threats</option>
                  <option value="Threats Via Call Or SMS">Threats Via Call Or SMS</option>
                  <option value="Torture">Torture</option>
                  <option value="Touheen Quran Act">Touheen Quran Act</option>
                  <option value="Tree Theft Act">Tree Theft Act</option>
                  <option value="Tresspassing">Tresspassing</option>
                  <option value="Unlawful Marriages">Unlawful Marriages</option>
                  <option value="Un-Natural Offence">Un-Natural Offence</option>
                  <option value="Use of Torture">Use of Torture</option>
                  <option value="Vehicle Checking">Vehicle Checking</option>
                  <option value="Violence Against Trangender Person">Violence Against Trangender Person</option>
                </select>
                <p className="help-block text-danger">{errors.Offence && touched.Offence ? errors.Offence : null}</p>
              </div>
            </div>
            {(user && (role=== user.role || Role === user.role)) ? <>

              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <p>Offence Subcategory</p>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <select className="form-control" name="OffenceSubcategory" onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0"disabled selected>{firData.FIRs.OffenceSubcategory}</option>
                    <option value="1">Sub Category</option>
                  </select>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Assigned To</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <select className="form-control" name="AssignedTo" onChange={handleChange}
                    onBlur={handleBlur} >
                    <option value="0"disabled selected>{firData.FIRs.AssignedTo}</option>
                    <option value="3">Beat Committee</option>
                    <option value="2">Police Officer</option>
                  </select>
                </div>
              </div>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3"><p>Officer Name</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <input
                    type="text"
                    name="OfficerName"
                    placeholder={firData.FIRs.OfficerName}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Officer Contact Number</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <input
                    type="number"
                    name="OfficerContact"
                    placeholder={firData.FIRs.OfficerContact}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  placeholder={firData.FIRs.IncidentDetails}
                  value={values.IncidentDetails} 
                  onChange={handleIncidentDetailsChange}
                  className={styles.formControl}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.IncidentDetails && touched.IncidentDetails ? errors.IncidentDetails : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <p>Is FIR Registered</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className={styles.radio}>
                  <div className="mx-2">
                    <input type="radio" name="FIRRegistered" id="Yes" value="Yes"
                      checked={values.FIRRegistered === 'Yes'}
                      onChange={() => handleRadioClick2('Yes')} />
                    <p>Yes</p>
                  </div>
                  <div>
                    <input type="radio" name="FIRRegistered" id="No" value="No"
                      checked={values.FIRRegistered === 'No'}
                      onChange={() => handleRadioClick2('No')} />
                    <p>No</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>FIR No</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="FIRNo" className="form-control" onChange={handleChange}
                    placeholder={firData.FIRs.FIRNo}
                    onBlur={handleBlur} />
              </div>
            </div>
            {(user && (role=== user.role || Role === user.role)) ? <>

              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3"><p>IO Name</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <input type="text" name="IOName" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
              </div>
            </> : null}
            <div className={styles.alignment1}>
              {fileInputs.map((file, index) => (
                <div key={file.id} className={styles.addDiv} >
                  File {index + 1}
                  <input type="file" className={`${styles.fileControl} ${styles.gap}`} name="file"
                    onChange={(event) => {
                      let reader = new FileReader();
                      reader.onloadend = () => {
                        if (reader.readyState === 2) {
                          setFieldValue("file", reader.result);
                        }
                      }
                      reader.readAsDataURL(event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur} />
                  <p className="help-block text-danger">{errors.file && touched.file ? errors.file : null}</p>
                </div>
              ))}
              <button
                type="button"
                className={styles.addButton}
                onClick={addMoreFile}>
                Add More
              </button>
            </div>
          </div>
        </div>
        <div className={styles.buttonsalignment}>
          <button className={styles.CancelButton} type='reset'>
            <Link to="/" className={styles.Links}>
              Cancel
            </Link>
          </button>
          <button className={styles.SubmitButton} type='submit' disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default EditFIR;
