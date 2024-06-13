import styles from "./OnlineFIR.module.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useAddNewFIRMutation } from '../../Redux/Features/FIR/FIRApi';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


function OnlineFIR() {

  //eslint-disable-next-line
  const [addFIR, { isLoading, error }] = useAddNewFIRMutation();
  const { user } = useSelector(state => state.auth);
  const role = "Admin";


  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);

  const addMoreFile = () => {
    const newId = fileInputs[fileInputs.length - 1].id + 1;
    setFileInputs([...fileInputs, { id: newId }]);
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);


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

  const getCurrentDateTimeLocal = () => {
    const current = new Date();
    return current.toISOString().slice(0, 16);
  };


  function SerialNumberGenerator(name) {
    let initials;

    // Check if the name consists of only one word
    if (name.trim().indexOf(' ') === -1) {
      initials = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      // Extract initials from each word
      initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    }

    // Get current date in YYYYMMDD format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;

    // Generate 6-digit random number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // Concatenate the parts
    const uniqueIdentifier = `${initials}-${formattedDate}-${randomNumber}`;
    // console.log(values.Circle);
    console.log(uniqueIdentifier);
    return uniqueIdentifier;
  }
  // eslint-disable-next-line
  const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      EntryDate: getCurrentDateTimeLocal(),
      SourceOfComplaint: 'Online',
      ComplaintNumber: '',
      District: '',
      Division: '',
      Circle: '',
      PoliceStation: '',
      BeatMoza: '',
      CNIC: user.cnic,
      Name: user.name,
      relation: '',
      GuardianName: '',
      Gender: '',
      ContactNumber: user.phonenumber,
      PermanentAddress: '',
      placeOfOccurance: '',
      IncidentDate: '',
      Category: '',
      Offence: '',
      OffenceSubcategory: '',
      AssignedTo: '',
      OfficerName: '',
      OfficerContact: '',
      IncidentDetails: '',
      FIRRegistered: '',
      FIRNo: '',
      IOName: '',
      file: '',
    },
    validationSchema: yup.object().shape({
      EntryDate: yup.date().required('Required'),
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
      IncidentDate: yup.date().required('Required'),
      FIRRegistered: yup.string().required('Required'),
      Category: yup.string().required('Required'),
      Offence: yup.string().required('Required'),
      IncidentDetails: yup.string().max(2000).required('Required'),
      file: yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      values.ComplaintNumber = SerialNumberGenerator(values.Circle);
      console.log(values);
      const res = await addFIR(values).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
      else {
        toast.error(res.message || res.data.error);
      }

    }
  });

  if (error) {
    return (<>
      <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
      <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
      <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
    </>)
  }


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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.EntryDate && touched.EntryDate ? errors.EntryDate : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                <p>Source of Compliant</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="CompliantNumber" placeholder="Online" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>District</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="District"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="1">Islamabad</option>
                </select>
                <p className="help-block text-danger">{errors.District && touched.District ? errors.District : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Division</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Division"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="3">Industrial Area Zone</option>
                </select>
                <p className="help-block text-danger">{errors.Division && touched.Division ? errors.Division : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Circle</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Circle"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
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
                  <option value="0">Select</option>
                  <option value="1">PS Sabzi Mandi</option>
                  <option value="2">PS Secretariat</option>
                  <option value="3">PS Abpara</option>
                  <option value="4">PS Kohsar</option>
                  <option value="5">PS Bhara Kahu</option>
                  <option value="6">PS Phulgaran</option>
                  <option value="7">PS Bani Gala</option>
                  <option value="8">PS Margalla</option>
                  <option value="9">PS Karachi Company</option>
                  <option value="10">PS Golra</option>
                  <option value="11">PS Tarnol</option>
                  <option value="12">PS Sangjani</option>
                  <option value="13">PS Sumbal</option>
                  <option value="14">PS Shalimar</option>
                  <option value="15">PS Ramna</option>
                  <option value="16">PS I-9 Industrial Area</option>
                  <option value="17">PS Noon</option>
                  <option value="18">PS Shams Colony</option>
                  <option value="19">PS Shehzad Town</option>
                  <option value="20">PS Khanna</option>
                  <option value="21">PS Sihala</option>
                  <option value="22">PS Humak</option>
                  <option value="23">PS Lohi Bher</option>
                  <option value="24">PS Nilore</option>
                  <option value="25">PS Koral</option>
                  <option value="26">PS Kirpa</option>
                  <option value="27">PS Women</option>
                </select>
                <p className="help-block text-danger">{errors.PoliceStation && touched.PoliceStation ? errors.PoliceStation : null}</p>
              </div>
            </div>
            {(user && role === user.role) ? <>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3"><p>Beat/Moza No.</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <select className="form-control" name="BeatMoza"
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0">Select</option>
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
                <input type="text" name="CompliantNumber" placeholder={SerialNumberGenerator(values.Circle)} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="number" name="CNIC" placeholder={user.cnic} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>

            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Name</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" placeholder={user.name} className="form-control" onChange={handleChange}
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
                  <option value="0">Select</option>
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
                  placeholder={user.phonenumber}
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
                  <option value="0">Select</option>
                  <option value="Character Verification">Character Verification</option>
                  <option value="Car Verification">Car Verification</option>
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
                  <option value="0">Select</option>
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
            {(user && role === user.role) ? <>

              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <p>Offence Subcategory</p>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <select className="form-control" name="OffenceSubcategory" onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0">Select</option>
                    <option value="1">Sub Category</option>
                  </select>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Assigned To</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <select className="form-control" name="AssignedTo" onChange={handleChange}
                    onBlur={handleBlur} >
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
                  className={styles.formControl}
                  onChange={handleChange}
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
                  onBlur={handleBlur} />
              </div>
            </div>
            {(user && role === user.role) ? <>

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
export default OnlineFIR;
