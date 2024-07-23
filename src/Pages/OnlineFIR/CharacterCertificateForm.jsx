import styles from "./OnlineFIR.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useAddNewCertificateMutation } from "../../Redux/Features/Certificates/CertificateAPI";
import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";


function CharacterCertificateForm() {

  const navigate = useNavigate();
  const [addCertificate, { isLoading, error }] = useAddNewCertificateMutation();
  const { data } = useGetAllPoliceStationsQuery();

  const { user } = useSelector(state => state.auth)
  const role = "Admin";
  const Role = "SuperAdmin";

  const [state, setState] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);

  useEffect(() => {
    if (role === user.role || Role === user.role) {
      setState(false);
    }
  }, [Role, role, user.role]);

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
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('default', options).format(current);
  };

  function SerialNumberGenerator(name) {
    let initials;

    if (name.trim().indexOf(' ') === -1) {
      initials = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

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
      DOB: '',
      DOS: '',
      Category: '',
      SubmitByApplicant: '',
      SubmitterName: '',
      RelationWithApplicant: '',
      Reason: '',
      CNICFront: '',
      CNICBack: '',
      PassportInfoPic: '',
      PassportLastPic: '',
      ApplicantPic: '',
      AffidavitPic: '',
      AuthorityLetterPic: '',
      AffidavitPicture: ''
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
      DOB: yup.date().required('Required'),
      DOS: yup.date().required('Required'),
      Category: yup.string().required('Required'),
      Reason: yup.string().max(200).required('Required'),
      CNICFront: yup.string().required('Required'),
      CNICBack: yup.string().required('Required'),
      PassportInfoPic: yup.string().required('Required'),
      PassportLastPic: yup.string().required('Required'),
      ApplicantPic: yup.string().required('Required'),
      AffidavitPicture: yup.string().required('Required'),
      AuthorityLetterPic: yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      values.ApplicationtNumber = SerialNumberGenerator(values.Circle)
      const res = await addCertificate(values).unwrap();
      if (res.success) {
        resetForm();
        setSelectedValue(null);
        setSelectedValue2(null);
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
              <div className="col-lg-3 col-md-12 col-sm-12 "><p>Date of Apply</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12 ">
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                <p>Source of Application</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="SourceofApplication" placeholder="Online" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>District</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="District"
                  onChange={handleChange} value={values.District}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
                <p className="help-block text-danger">{errors.District && touched.District ? errors.District : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Division</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Division"
                  onChange={handleChange} value={values.Division}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="City">City</option>
                  <option value="Saddar">Saddar</option>
                  <option value="Industrial Area">Industrial Area</option>
                  <option value="Rural">Rural</option>
                  <option value="Soan">Soan</option>
                </select>
                <p className="help-block text-danger">{errors.Division && touched.Division ? errors.Division : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Circle</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Circle"
                  onChange={handleChange} value={values.Circle}
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Police Station</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="PoliceStation"
                  onChange={handleChange} value={values.PoliceStation}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  {
                    data && data.map(PS => (
                      <option value={PS._id} key={PS._id}>{PS.PSName}</option>
                    ))}
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
              <div className="col-lg-3 col-md-12 col-sm-12"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="number" value={values.CNIC} name="CNIC" placeholder={user.cnic} className="form-control" onChange={handleChange} disabled={state}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                <p>Passport Number</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
                <div >
                  <input type="text" value={values.PassportNumber} name="PassportNumber" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.PassportNumber && touched.PassportNumber ? errors.PassportNumber : null}</p>
              </div>
            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" value={values.Name} name="Name" placeholder={user.name} className="form-control" onChange={handleChange} disabled={state}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
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
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="GuardianName"
                  className="form-control"
                  value={values.GuardianName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.GuardianName && touched.GuardianName ? errors.GuardianName : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Gender</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Gender" onChange={handleChange}
                  onBlur={handleBlur} value={values.Gender}>
                  <option value="0">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <p className="help-block text-danger">{errors.Gender && touched.Gender ? errors.Gender : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Contact Number</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="number"
                  name="ContactNumber"
                  placeholder={user.phonenumber ? `0${user.phonenumber}` : null}
                  className="form-control"
                  disabled={state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.ContactNumber && touched.ContactNumber ? errors.ContactNumber : null}</p>
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
                  onChange={handleChange}
                  value={values.PermanentAddress}
                  onBlur={handleBlur}
                  className={styles.formControl}
                />
                <p className="help-block text-danger">{errors.PermanentAddress && touched.PermanentAddress ? errors.PermanentAddress : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Date of Stay</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="date" value={values.DOS} name="DOS" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.DOS && touched.DOS ? errors.DOS : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                <p>Date of Birth</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
                <div >
                  <input type="date" value={values.DOB} name="DOB" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.DOB && touched.DOB ? errors.DOB : null}</p>
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
                <select className="form-control" name="Category"
                  onChange={handleChange} value={values.Category}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="Character Certificate">Character Certificate</option>
                  <option value="Police Verification">Police Character Verification</option>
                  <option value="Servent Registration">Servent Registration</option>
                  <option value="Tenant Registration">Tenant Registration</option>
                  <option value="Volunteer Registration">Volunteer Registration</option>
                  <option value="Foreigner Registration">Foreigner Registration</option>
                </select>
                <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 mx-2">
                <p>Submitted by Applicant Himself</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12"><p>If No, Name of Submitter</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="SubmitterName"
                  value={values.SubmitterName}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Relation with Applicant</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="RelationWithApplicant"
                  onChange={handleChange} value={values.RelationWithApplicant}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Wife">Wife</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                </select>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Reason for Apply</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <textarea
                  type="text"
                  rows={3}
                  value={values.Reason}
                  name="Reason"
                  placeholder="Employment In Pakistan"
                  className={styles.formControl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.Reason && touched.Reason ? errors.Reason : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>CNIC Picture (Front Side)</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC Picture (Back Side)</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
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
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Passport Info Picture</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Passport Last Page Pic</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
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
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Applicant Picture</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Affidavit Picture (If other then Islamabad Address)</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
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
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Authority Letter Picture</p><Link to={"https://islamabadpolice.gov.pk/img/authority-letter.pdf"} style={{ textDecoration: 'none' }}>Download Authority Letter Sample</Link></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Affidavit Picture</p><Link to={"https://islamabadpolice.gov.pk/img/Affidavit.pdf"} style={{ textDecoration: 'none' }}>Download Affidavit Sample</Link>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
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
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Operator Name</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input type="text" name="IOName" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
              </div>
            </> : null}
          </div>
        </div>
        <div className={styles.buttonsalignment}>
          <button className={styles.CancelButton} type='reset' onClick={() => navigate(-1)}>
            Cancel
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
