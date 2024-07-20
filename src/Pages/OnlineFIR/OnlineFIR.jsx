import styles from "./OnlineFIR.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAddNewFIRMutation } from '../../Redux/Features/FIR/FIRApi';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { useGetAllCategoriesQuery } from "../../Redux/Features/Category/CategoryApi";
import { useGetAllOffencesQuery } from "../../Redux/Features/Offence/OffenceApi";


function OnlineFIR() {

  //eslint-disable-next-line
  const [addFIR, { isLoading, error }] = useAddNewFIRMutation();
  const { data } = useGetAllPoliceStationsQuery();
  const { data: Cdata } = useGetAllCategoriesQuery();
  const { data: Odata } = useGetAllOffencesQuery();
  const { user } = useSelector(state => state.auth);
  const role = "Admin";
  const Role = "SuperAdmin"

  const [state, setState] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);

  const addMoreFile = () => {
    const newId = fileInputs[fileInputs.length - 1].id + 1;
    setFileInputs([...fileInputs, { id: newId }]);
  };

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
      setFieldValue('FIRRegistered', values.FIRRegistered === value ? '' : value);
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
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    
    const uniqueIdentifier = `${initials}-${formattedDate}-${randomNumber}`;

    return uniqueIdentifier;
  }
  // eslint-disable-next-line
  const formik = useFormik({
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
      email: user.email,
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
      Rank:'',
      file: '',
      Location:currentLocation,
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
  const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = formik;
  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
                setFieldValue('Location', { lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}, [setFieldValue]);


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
              <div className="col-lg-3 col-md-12 col-sm-12 "><p>Entry Date</p></div>
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
                <p>Source of Compliant</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="SourceOfComplaint" placeholder="Online" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>District</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="District"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
                <p className="help-block text-danger">{errors.District && touched.District ? errors.District : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Division</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Division"
                  onChange={handleChange}
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Police Station</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="PoliceStation"
                  onChange={handleChange}
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
            {(user && (role === user.role || Role === user.role)) ? <>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Beat/Moza No.</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <select className="form-control" name="BeatMoza"
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0">Select</option>
                    <option value="Beat/Moza-1">Beat/Moza-1</option>
                  </select>
                </div>
              </div></> : null
            }
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>
            <b>Complaint Information</b>
          </div>
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12 ">
                <p>Compliant Number</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="CompliantNumber" placeholder={"This will allocated automatically"} className="form-control" onChange={handleChange}
                  onBlur={handleBlur} disabled={true} />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="number" name="CNIC" placeholder={user.cnic} className="form-control" onChange={handleChange} disabled={state}
                  onBlur={handleBlur} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>
            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="Name" placeholder={user.name} className="form-control" onChange={handleChange}
                  disabled={state} onBlur={handleBlur}  />
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
                  placeholder={user.phonenumber ? `0${user.phonenumber}`: null}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={state}
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
              <div className="col-lg-3 col-md-12 col-sm-12">
                <p>Place of Occurance</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="text"
                  name="placeOfOccurance"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="help-block text-danger">{errors.placeOfOccurance && touched.placeOfOccurance ? errors.placeOfOccurance : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Incident Date</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input
                  type="datetime-local"
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
              <div className="col-lg-3 col-md-12 col-sm-12 "><p>Category</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
              <select className="form-control" name="Category"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  {
                    Cdata && Cdata.map(C => (
                      <option value={C._id} key={C._id}>{C.Category}</option>
                    ))}
                </select>
                <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Offence</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
              <select className="form-control" name="Offence"
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0">Select</option>
                  {
                    Odata && Odata.map(O => (
                      <option value={O._id} key={O._id}>{O.Offence}</option>
                    ))}
                </select>
                <p className="help-block text-danger">{errors.Offence && touched.Offence ? errors.Offence : null}</p>
              </div>
            </div>
            {(user && (role === user.role || Role === user.role)) ? <>

              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>Offence Subcategory</p>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <select className="form-control" name="OffenceSubcategory" onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0">Select</option>
                    <option value="1">Sub Category</option>
                  </select>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Assigned To</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <select className="form-control" name="AssignedTo" onChange={handleChange}
                    onBlur={handleBlur} >
                    <option value="3">Beat Committee</option>
                    <option value="2">Police Officer</option>
                  </select>
                </div>
              </div>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Officer Name</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input
                    type="text"
                    name="OfficerName"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Officer Contact Number</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Incident Details</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12">
                <p>Is FIR Registered</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
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
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>FIR No</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="FIRNo" className="form-control" onChange={handleChange}
                  onBlur={handleBlur} />
              </div>
            </div>
            {(user && (role === user.role || Role === user.role)) ? <>

              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>IO Name</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input type="text" name="IOName" className="form-control" onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Rank</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input type="text" name="Rank" className="form-control" onChange={handleChange}
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
