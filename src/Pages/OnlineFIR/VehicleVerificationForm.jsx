import styles from "./OnlineFIR.module.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


function VehicleVerificationForm() {

  
  const { user } = useSelector(state => state.auth)
  const role = "Admin";

  

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

  // eslint-disable-next-line
  const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      EntryDate: getCurrentDateTimeLocal(),
      SourceOfComplaint: 'Online',
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
      // District: yup.string().required('Required'),
      // Division: yup.string().required('Required'),
      // Circle: yup.string().required('Required'),
      // PoliceStation: yup.string().required('Required'),
      // BeatMoza: yup.string(),
      // CNIC: yup.number().min(1111111111111,"Must be atleast 13 digit").max(9999999999999,"Invalid CNIC").required('Required'),
      // PassportNumber: yup.number().required('Required'),
      Name: yup.string().min(5).max(30).required('Required'),
      // GuardianName: yup.string().min(5).max(30).required('Required'),
      // Gender: yup.string().required('Required'),
      // ContactNumber: yup.number().min(1111111111,"Must be atleast 11 digit").max(999999999999,"Invalid Number").required('Required'),
      // PermanentAddress: yup.string().max(200).required('Required'),
      // Category: yup.string().required('Required'),
      // Reason: yup.string().max(200).required('Required'),
      CNICFront: yup.string().required('Required'),
      CNICBack: yup.string().required('Required'),
      PassportInfoPic: yup.string().required('Required'),
      PassportLastPic: yup.string().required('Required'),
      ApplicantPic: yup.string().required('Required'),
      AffidavitPicture: yup.string().required('Required'),
      AuthorityLetterPic: yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      //     const res = await addFIR(values).unwrap();
      //     if (res.success) {
      //       toast.success(res.message);
      //     } 
      //     else {
      //       toast.error(res.message || res.data.error);
      //     }

    }
  });

  // if (error) {
  //   return (<>
  //     <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
  //     <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
  //     <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
  //   </>)
  // }

  return (
    <div className={styles.body}>
      <form name="addFIR" method="post" onSubmit={handleSubmit} className={styles.size}>

        <div className={styles.container}>
          <div className={styles.header}>
            <b>Information of Applicant</b>
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
                <p>Request Number</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 " >
                <div >
                  <input type="number" name="RequestNumber" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
                <p className="help-block text-danger">{errors.RequestNumber && touched.RequestNumber ? errors.RequestNumber : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3 "><p>Request Deliver to</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <select className="form-control" name="Division"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="3">15/Car Cell</option>
                </select>
                <p className="help-block text-danger">{errors.Division && touched.Division ? errors.Division : null}</p>
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
            <b>Vehicle Owner Information</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="number" name="CNIC" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>CNIC Picture </p></div>
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
            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Name</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
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
            <b>Vehicle Information</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Registration Number</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Make</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Model</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Year of Manufacture</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Color</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Chassis Number</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Name && touched.Name ? errors.Name : null}</p>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3 "><p>Engine Number</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 mx-2">
                <p>You buy it?</p>
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
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Reason for Verification</p></div>
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
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Registration Book Picture</p>
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
              <div className="col-lg-3 col-md-3 col-sm-3"><p>Chassis Number Picture</p></div>
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
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2"><p>Engine Number Picture</p>
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

            {(user && role === user.role) ? <>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3"><p>IO Name</p></div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="IOName" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
              </div>
            </div></>:null}

          </div>
        </div>
        <div className={styles.buttonsalignment}>
          <button className={styles.CancelButton} type='reset'>
            <Link to="/" className={styles.Links}>
              Cancel
            </Link>
          </button>
          <button className={styles.SubmitButton} type='submit' >
            {/* {isLoading ? "Loading..." : "Submit"} */}Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default VehicleVerificationForm;
