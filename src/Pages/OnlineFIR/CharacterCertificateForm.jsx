import styles from "./OnlineFIR.module.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useAddNewCertificateMutation } from "../../Redux/Features/Certificates/CertificateAPI";


function CharacterCertificateForm() {

  const [addCertificate, { isLoading, error }] = useAddNewCertificateMutation();

  const { user } = useSelector(state => state.auth)
  const role = "Admin";
  const Role = "SuperAdmin";


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
      setFieldValue('SubmitByApplicant', values.SubmitByApplicant === value ? '' : value);
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
    const uniqueIdentifier = `${initials}-CC-${formattedDate}-${randomNumber}`;

    return uniqueIdentifier;
  }

  // eslint-disable-next-line
  const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      EntryDate: getCurrentDateTimeLocal(),
      SourceOfApplication: 'Online',
      ApplicationtNumber: '',
      District: '',
      Division: '',
      Circle: '',
      PoliceStation: '',
      BeatMoza: '',
      CNIC: user.cnic,
      PassportNumber: '',
      Name: user.name,
      relation: '',
      GuardianName: '',
      Gender: '',
      ContactNumber: user.phonenumber,
      PermanentAddress: '',
      Category: '',
      SubmitByApplicant: '',
      SubmitterName: '',
      RelationWithApplicant: '',
      Reason: '',
      // CNICFront: '',
      // CNICBack: '',
      // PassportInfoPic: '',
      // PassportLastPic: '',
      // ApplicantPic: '',
      // AffidavitPic: '',
      // AuthorityLetterPic: '',
      // AffidavitPicture: ''
    },
    validationSchema: yup.object().shape({
      EntryDate: yup.date().required('Required'),
      District: yup.string().required('Required'),
      Division: yup.string().required('Required'),
      Circle: yup.string().required('Required'),
      PoliceStation: yup.string().required('Required'),
      BeatMoza: yup.string(),
      CNIC: yup.number().min(1111111111111, "Must be atleast 13 digit").max(9999999999999, "Invalid CNIC").required('Required'),
      PassportNumber: yup.string().min(9).required('Required'),
      Name: yup.string().min(5).max(30).required('Required'),
      GuardianName: yup.string().min(5).max(30).required('Required'),
      Gender: yup.string().required('Required'),
      ContactNumber: yup.number().min(1111111111, "Must be atleast 11 digit").max(999999999999, "Invalid Number").required('Required'),
      PermanentAddress: yup.string().max(200).required('Required'),
      Category: yup.string().required('Required'),
      Reason: yup.string().max(200).required('Required'),
      // CNICFront: yup.string().required('Required'),
      // CNICBack: yup.string().required('Required'),
      // PassportInfoPic: yup.string().required('Required'),
      // PassportLastPic: yup.string().required('Required'),
      // ApplicantPic: yup.string().required('Required'),
      // AffidavitPicture: yup.string().required('Required'),
      // AuthorityLetterPic: yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      values.ApplicationtNumber = SerialNumberGenerator(values.Circle)
      const res = await addCertificate(values).unwrap();
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
              <div className="col-lg-3 col-md-3 col-sm-3 "><p>Date of Apply</p></div>
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
                <p>Source of Application</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="SourceofApplication" placeholder="Online" className="form-control" onChange={handleChange}
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
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>
            <b>Information of Applicant</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="number" name="CNIC" placeholder={user.cnic} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                <p>Passport Number</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 " >
                <div >
                  <input type="text" name="PassportNumber" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.PassportNumber && touched.PassportNumber ? errors.PassportNumber : null}</p>
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
            <b>Application Section</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3 "><p>Category</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Category"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="3">Character Certificate</option>
                  <option value="18">Police Verification</option>
                  <option value="8">Servent Registration</option>
                  <option value="2">Tenant Registration</option>
                  <option value="14">Volunteer Registration</option>
                  <option value="9">Foreigner Registration</option>
                </select>
                <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 mx-2">
                <p>Submitted by Applicant Himself</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className={styles.radio}>
                  <div >
                    <input type="radio" name="SubmitByApplicant" id="Yes" value="Yes"
                      checked={values.SubmitByApplicant === 'Yes'}
                      onChange={() => handleRadioClick2('Yes')} />
                    <p>Yes</p>
                  </div>
                  <div>
                    <input type="radio" name="SubmitByApplicant" id="No" value="No"
                      checked={values.SubmitByApplicant === 'No'}
                      onChange={() => handleRadioClick2('No')} />
                    <p>No</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>If No, Name of Submitter</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="text"
                  name="SubmitterName"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Relation with Applicant</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="RelationWithApplicant"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="3">Father</option>
                  <option value="18">Mother</option>
                  <option value="8">Brother</option>
                  <option value="2">Sister</option>
                  <option value="14">Wife</option>
                  <option value="9">Son</option>
                  <option value="9">Daughter</option>
                </select>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Reason for Apply</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <textarea
                  type="text"
                  rows={3}
                  name="Reason"
                  className={styles.formControl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.Reason && touched.Reason ? errors.Reason : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>CNIC Picture (Front Side)</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="file" name="CNICFront" className="form-control" onChange={(event) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.readyState === 2) {
                      setFieldValue("CNICFront", reader.result);
                    }
                  }
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNICFront && touched.CNICFront ? errors.CNICFront : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>CNIC Picture (Back Side)</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 " >
                <div >
                  <input type="file" name="CNICBack" className="form-control" onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      if (reader.readyState === 2) {
                        setFieldValue("CNICBack", reader.result);
                      }
                    }
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.CNICBack && touched.CNICBack ? errors.CNICBack : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Passport Info Picture</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="file" name="PassportInfoPic" className="form-control" onChange={(event) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.readyState === 2) {
                      setFieldValue("PassportInfoPic", reader.result);
                    }
                  }
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.PassportInfoPic && touched.PassportInfoPic ? errors.PassportInfoPic : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Passport Last Page Pic</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 " >
                <div >
                  <input type="file" name="PassportLastPic" className="form-control" onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      if (reader.readyState === 2) {
                        setFieldValue("PassportLastPic", reader.result);
                      }
                    }
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.PassportLastPic && touched.PassportLastPic ? errors.PassportLastPic : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Applicant Picture</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="file" name="ApplicantPic" className="form-control" onChange={(event) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.readyState === 2) {
                      setFieldValue("ApplicantPic", reader.result);
                    }
                  }
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.ApplicantPic && touched.ApplicantPic ? errors.ApplicantPic : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Affidavit Picture (If other then Islamabad Address)</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 " >
                <div >
                  <input type="file" name="AffidavitPic" className="form-control" onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      if (reader.readyState === 2) {
                        setFieldValue("AffidavitPic", reader.result);
                      }
                    }
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                    onBlur={handleBlur} />
                </div>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Authority Letter Picture</p><Link to={"https://islamabadpolice.gov.pk/img/authority-letter.pdf"} style={{ textDecoration: 'none' }}>Download Authority Letter Sample</Link></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="file" name="AuthorityLetterPic" className="form-control" onChange={(event) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.readyState === 2) {
                      setFieldValue("AuthorityLetterPic", reader.result);
                    }
                  }
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.AuthorityLetterPic && touched.AuthorityLetterPic ? errors.AuthorityLetterPic : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Affidavit Picture</p><Link to={"https://islamabadpolice.gov.pk/img/Affidavit.pdf"} style={{ textDecoration: 'none' }}>Download Affidavit Sample</Link>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 " >
                <div >
                  <input type="file" name="AffidavitPicture" className="form-control" onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      if (reader.readyState === 2) {
                        setFieldValue("AffidavitPicture", reader.result);
                      }
                    }
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.AffidavitPicture && touched.AffidavitPicture ? errors.AffidavitPicture : null}</p>
              </div>
            </div>
            {(user && (role === user.role || Role === user.role)) ? <>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-3 col-sm-3"><p>Operator Name</p></div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <input type="text" name="IOName" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
              </div>
            </> : null}
          </div>
        </div>
        <div className={styles.buttonsalignment}>
          <button className={styles.CancelButton} type='reset'>
            <Link to="/" className={styles.Links}>
              Cancel
            </Link>
          </button>
          <button className={styles.SubmitButton} type='submit' >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default CharacterCertificateForm;
