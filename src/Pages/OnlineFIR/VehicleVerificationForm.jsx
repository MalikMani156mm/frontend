import styles from "./OnlineFIR.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useAddNewRequestMutation } from "../../Redux/Features/VehicleVerification/VVApi";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";


function VehicleVerificationForm() {

  const navigate = useNavigate();
  const [addRequest, { isLoading, error }] = useAddNewRequestMutation();
  const id = "669a6ce77bc3e295a8ebc0db";
  const { data } = useGetPoliceStationByIdQuery(id);
  console.log(data);
  const { user } = useSelector(state => state.auth)
  const role = "Admin";
  const Role = "SuperAdmin";

  const [state, setState] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);

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

  const handleRadioClick3 = (value) => {
    if (selectedValue3 === value) {
      setSelectedValue3(null);

    } else {
      setSelectedValue3(value);
      setFieldValue('Orelation', values.Orelation === value ? '' : value);
    }
  };

  const handleRadioClick2 = (value) => {
    if (selectedValue2 === value) {
      setSelectedValue2(null);

    } else {
      setSelectedValue2(value);
      setFieldValue('BuyIt', values.BuyIt === value ? '' : value);
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

  function SerialNumberGenerator() {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    const uniqueIdentifier = `VV-${formattedDate}-${randomNumber}`;

    return uniqueIdentifier;
  }

  // eslint-disable-next-line
  const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      EntryDate: getCurrentDateTimeLocal(),
      SourceOfRequest: 'Online',
      RequestNumber: '',
      RequestTo: '',
      CNIC: user.cnic,
      email: user.email,
      Name: user.name,
      relation: '',
      GuardianName: '',
      Gender: '',
      ContactNumber: user.phonenumber,
      PermanentAddress: '',
      OCNIC: '',
      OCNICPic: '',
      OName: '',
      Orelation: '',
      OGuardianName: '',
      OGender: '',
      OContactNumber: '',
      OPermanentAddress: '',
      RegistrationNumber: '',
      Make: '',
      Model: '',
      YearOfManufacture: '',
      Color: '',
      EngineNumber: '',
      ChassisNumber: '',
      BuyIt: '',
      Reason: '',
      CNICFront: '',
      CNICBack: '',
      ApplicantPic: '',
      RegistrationBookPic: '',
      ChassisNumberPic: '',
      EngineNumberPic: ''
    },
    validationSchema: yup.object().shape({
      EntryDate: yup.date().required('Date is required').max(new Date(), 'Date must be in the past'),
      RequestTo: yup.string().required('Required'),
      CNIC: yup.number().min(1111111111111, "Must be atleast 13 digit").max(9999999999999, "Invalid CNIC").required('Required'),
      Name: yup.string().min(5).max(30).required('Required'),
      GuardianName: yup.string().min(5).max(30).required('Required'),
      Gender: yup.string().required('Required'),
      ContactNumber: yup.number().min(1111111111, "Must be atleast 11 digit").max(999999999999, "Invalid Number").required('Required'),
      PermanentAddress: yup.string().max(200).required('Required'),
      OCNIC: yup.number().min(1111111111111, "Must be atleast 13 digit").max(9999999999999, "Invalid CNIC").required('Required'),
      OCNICPic: yup.string().required('Required'),
      OName: yup.string().min(5).max(30).required('Required'),
      OGuardianName: yup.string().min(5).max(30).required('Required'),
      OGender: yup.string().required('Required'),
      OContactNumber: yup.number().min(1111111111, "Must be atleast 11 digit").max(999999999999, "Invalid Number").required('Required'),
      OPermanentAddress: yup.string().max(200).required('Required'),
      RegistrationNumber: yup.string().required('Required'),
      Make: yup.string().required('Required'),
      Model: yup.string().required('Required'),
      YearOfManufacture: yup.string().required('Required'),
      Color: yup.string().required('Required'),
      EngineNumber: yup.string().required('Required'),
      ChassisNumber: yup.string().required('Required'),
      Reason: yup.string().max(200).required('Required'),
      CNICFront: yup.string().required('Required'),
      CNICBack: yup.string().required('Required'),
      ApplicantPic: yup.string().required('Required'),
      RegistrationBookPic: yup.string().required('Required'),
      ChassisNumberPic: yup.string().required('Required'),
      EngineNumberPic: yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      values.RequestNumber = SerialNumberGenerator();
      const res = await addRequest(values).unwrap();
      if (res.success) {
        resetForm();
        setSelectedValue(null);
        setSelectedValue2(null);
        setSelectedValue3(null);
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
            <b>Information of Applicant</b>
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
                <p>Request Number</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
                <div >
                  <input type="number" name="RequestNumber" className="form-control" onChange={handleChange} placeholder={"Allocated Automatically"}
                    onBlur={handleBlur} disabled={true} />
                </div>
                <p className="help-block text-danger">{errors.RequestNumber && touched.RequestNumber ? errors.RequestNumber : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12 "><p>Request Deliver to</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="RequestTo" value={values.RequestTo}
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value={data?.PSs?._id}>{data?.PSs?.PSName}</option>
                </select>
                <p className="help-block text-danger">{errors.RequestTo && touched.RequestTo ? errors.RequestTo : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="number" name="CNIC" value={values.CNIC} className="form-control" onChange={handleChange} disabled={state}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>

            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="Name" value={values.Name} placeholder={user.name} className="form-control" onChange={handleChange} disabled={state}
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
                  value={values.GuardianName}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.GuardianName && touched.GuardianName ? errors.GuardianName : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Gender</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Gender" onChange={handleChange} value={values.Gender}
                  onBlur={handleBlur}>
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
                  disabled={state}
                  className="form-control"
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
                  value={values.PermanentAddress}
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
            <b>Vehicle Owner Information</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="number" name="OCNIC" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} value={values.OCNIC} />
                <p className="help-block text-danger">{errors.OCNIC && touched.OCNIC ? errors.OCNIC : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC Picture </p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="file" name="OCNICPic" className="form-control" onChange={(event) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.readyState === 2) {
                      setFieldValue("OCNICPic", reader.result);
                    }
                  }
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.OCNICPic && touched.OCNICPic ? errors.OCNICPic : null}</p>
              </div>
            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="OName" value={values.OName} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.OName && touched.OName ? errors.OName : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2">
                <div className={styles.radio}>
                  <div className="mx-2">
                    <input type="radio" name="Orelation" id="son" value="son"
                      checked={values.Orelation === 'son'}
                      onChange={() => handleRadioClick3('son')} />
                    <p>S/O</p>
                  </div>
                  <div className="mx-2">
                    <input type="radio" name="Orelation" value="daughter"
                      id="daughter"
                      checked={values.Orelation === 'daughter'}
                      onChange={() => handleRadioClick3('daughter')} />
                    <p>D/O</p>
                  </div>
                  <div className="mx-2">
                    <input type="radio" name="Orelation" value="wife"
                      id="wife"
                      checked={values.Orelation === 'wife'}
                      onChange={() => handleRadioClick3('wife')} />
                    <p>W/O</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="OGuardianName"
                  value={values.OGuardianName}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.OGuardianName && touched.OGuardianName ? errors.OGuardianName : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Gender</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="OGender" onChange={handleChange}
                  onBlur={handleBlur} value={values.OGender}>
                  <option value="0">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <p className="help-block text-danger">{errors.OGender && touched.OGender ? errors.OGender : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Contact Number</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="number"
                  name="OContactNumber"
                  value={`0${values.OContactNumber}`}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.OContactNumber && touched.OContactNumber ? errors.OContactNumber : null}</p>
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
                  value={values.OPermanentAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.formControl}
                />
                <p className="help-block text-danger">{errors.OPermanentAddress && touched.OPermanentAddress ? errors.OPermanentAddress : null}</p>
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
                <input type="text" name="RegistrationNumber" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} value={values.RegistrationNumber} />
                <p className="help-block text-danger">{errors.RegistrationNumber && touched.RegistrationNumber ? errors.RegistrationNumber : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Make</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="Make" value={values.Make} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Make && touched.Make ? errors.Make : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Model</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="Model" value={values.Model} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Model && touched.Model ? errors.Model : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Year of Manufacture</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="number" value={values.YearOfManufacture} name="YearOfManufacture" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.YearOfManufacture && touched.YearOfManufacture ? errors.YearOfManufacture : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Color</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="Color" value={values.Color} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Color && touched.Color ? errors.Color : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Chassis Number</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="ChassisNumber" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} value={values.ChassisNumber} />
                <p className="help-block text-danger">{errors.ChassisNumber && touched.ChassisNumber ? errors.ChassisNumber : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12 "><p>Engine Number</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="EngineNumber" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} value={values.EngineNumber} />
                <p className="help-block text-danger">{errors.EngineNumber && touched.EngineNumber ? errors.EngineNumber : null}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 mx-2">
                <p>You buy it?</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className={styles.radio}>
                  <div >
                    <input type="radio" name="BuyIt" id="Yes" value="Yes"
                      checked={values.BuyIt === 'Yes'}
                      onChange={() => handleRadioClick2('Yes')} />
                    <p>Yes</p>
                  </div>
                  <div>
                    <input type="radio" name="BuyIt" id="No" value="No"
                      checked={values.BuyIt === 'No'}
                      onChange={() => handleRadioClick2('No')} />
                    <p>No</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Reason for Verification</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <textarea
                  type="text"
                  rows={3}
                  name="Reason"
                  value={values.Reason}
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Registration Book Picture</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
                <div >
                  <input type="file" name="RegistrationBookPic" className="form-control" onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      if (reader.readyState === 2) {
                        setFieldValue("RegistrationBookPic", reader.result);
                      }
                    }
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                    onBlur={handleBlur} />
                  <p className="help-block text-danger">{errors.RegistrationBookPic && touched.RegistrationBookPic ? errors.RegistrationBookPic : null}</p>
                </div>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Chassis Number Picture</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="file" name="ChassisNumberPic" className="form-control" onChange={(event) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.readyState === 2) {
                      setFieldValue("ChassisNumberPic", reader.result);
                    }
                  }
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.ChassisNumberPic && touched.ChassisNumberPic ? errors.ChassisNumberPic : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Engine Number Picture</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 " >
                <div >
                  <input type="file" name="EngineNumberPic" className="form-control" onChange={(event) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      if (reader.readyState === 2) {
                        setFieldValue("EngineNumberPic", reader.result);
                      }
                    }
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.EngineNumberPic && touched.EngineNumberPic ? errors.EngineNumberPic : null}</p>
              </div>
            </div>

            {(user && (role === user.role || Role === user.role)) ? <>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Operator Name</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input type="text" name="IOName" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
              </div></> : null}

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
export default VehicleVerificationForm;
