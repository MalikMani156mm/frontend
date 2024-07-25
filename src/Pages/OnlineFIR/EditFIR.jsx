import styles from "./OnlineFIR.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useGetFIRByIdQuery, useUpdateFIRMutation } from '../../Redux/Features/FIR/FIRApi';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useGetAllPoliceStationsQuery} from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import { useGetAllCategoriesQuery} from "../../Redux/Features/Category/CategoryApi";
import { useGetAllOffencesQuery } from "../../Redux/Features/Offence/OffenceApi";


function EditFIR() {

  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const role = "Admin";
  const Role = "SuperAdmin";
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);
  const { id } = useParams();
  const [updateFIR, { isLoading, error }] = useUpdateFIRMutation();
  const { data: allPSData } = useGetAllPoliceStationsQuery();
  const { data: Cdata } = useGetAllCategoriesQuery();
  const { data: Odata } = useGetAllOffencesQuery();
  const { data: firData, error: firError, isLoading: firLoading,refetch } = useGetFIRByIdQuery(id);
  const [state, setState] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
        refetch();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
      if (role === user.role || Role === user.role) {
        setState(false);
      }
    }, [Role, role, user.role]);

    useEffect(() => {
    if (user.role === "Citizen") {
        if (firData && firData.FIRs && (firData.FIRs.Status === "completed" || firData.FIRs.Status === "filed" || firData.FIRs.Status === "approved")) {
          navigate("/MyApplications");
        }
    }
}, [firData, user.role,navigate]);
 
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
      EntryDate: firData?.FIRs.EntryDate,
      SourceOfComplaint: 'Online',
      ComplaintNumber: firData?.FIRs.ComplaintNumber,
      District: firData?.FIRs.District,
      Division: firData?.FIRs.Division,
      Circle: firData?.FIRs.Circle,
      PoliceStation: firData?.FIRs.PoliceStation,
      BeatMoza: firData?.FIRs.BeatMoza,
      CNIC: firData?.FIRs.CNIC,
      Name: firData?.FIRs.Name,
      relation: firData?.FIRs.relation,
      GuardianName: firData?.FIRs.GuardianName,
      Gender: firData?.FIRs.Gender,
      ContactNumber: firData?.FIRs.ContactNumber,
      PermanentAddress: firData?.FIRs.PermanentAddress,
      placeOfOccurance: firData?.FIRs.placeOfOccurance,
      IncidentDate: firData?.FIRs.IncidentDate,
      Category: firData?.FIRs.Category,
      Offence: firData?.FIRs.Offence,
      OffenceSubcategory: firData?.FIRs.OffenceSubcategory,
      AssignedTo: firData?.FIRs.AssignedTo,
      OfficerName: firData?.FIRs.OfficerName,
      OfficerContact: firData?.FIRs.OfficerContact,
      IncidentDetails: firData?.FIRs.IncidentDetails,
      FIRRegistered: firData?.FIRs.FIRRegistered,
      FIRNo: firData?.FIRs.FIRNo,
      IOName: firData?.FIRs.IOName,
      Rank:firData?.FIRs.Rank,
      Status:firData?.FIRs.Status,
      file: firData?.FIRs.file,
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

  const handleChangeComplaintNumber = (event) => {
    setFieldValue('ComplaintNumber', event.target.value);
  };

  const handleChangeCNIC = (event) => {
    setFieldValue('CNIC', event.target.value);
  };

  const handleChangeName = (event) => {
    setFieldValue('Name', event.target.value);
  };

  const handleChangePermanentAddress = (event) => {
    setFieldValue('PermanentAddress', event.target.value);
  };

  const handleChangeGuardianName = (event) => {
    setFieldValue('GuardianName', event.target.value);
  };

  const handleChangePlaceOfOccurance = (event) => {
    setFieldValue('placeOfOccurance', event.target.value);
  };

  const handleIncidentDetailsChange = (event) => {
    setFieldValue('IncidentDetails', event.target.value);
  };
  if (error || firError) {
    return <Navigate to={'*'} replace={true} />
  }

  if (firLoading ) {
    return <div><LoadingSpinner /></div>;
  }

  if (!firData || !firData?.FIRs) {
    return <div>No data available</div>;
  }

  if (!firData || !firData?.FIRs) {
    return <div><LoadingSpinner /></div>;
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
                  placeholder={firData?.FIRs.EntryDate}
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
                  onBlur={handleBlur} value={values.District}
                >
                  <option value="0">Select</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
                <p className="help-block text-danger">{errors.District && touched.District ? errors.District : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Division</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Division" value={values.Division}
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0" >Select</option>
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
                  <option value="0" >Select</option>
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
                  onChange={handleChange}value={values.PoliceStation}
                  onBlur={handleBlur}>
                  <option value="0" >Select</option>
                  {
                    allPSData && allPSData.map(PS => (
                      <option value={PS._id} key={PS._id}>{PS.PSName}</option>
                    )
                    )
                  }

                </select>
                <p className="help-block text-danger">{errors.PoliceStation && touched.PoliceStation ? errors.PoliceStation : null}</p>
              </div>
            </div>
            {(user && (role === user.role || Role === user.role)) ? <>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Beat/Moza No.</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <select className="form-control" name="BeatMoza" value={values.BeatMoza}
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    <option value="0" >Select</option>
                    <option value="Beat/Moza-1">Beat/Moza-1</option>
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
              <div className="col-lg-3 col-md-12 col-sm-12 ">
                <p>Compliant Number</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="CompliantNumber"  value={values.ComplaintNumber} className="form-control" onChange={handleChangeComplaintNumber}
                  onBlur={handleBlur} disabled={state} />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>CNIC (without dashes)</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="number" name="CNIC"  className="form-control" onChange={handleChangeCNIC} disabled={state}
                  onBlur={handleBlur} value={values.CNIC} />
                <p className="help-block text-danger">{errors.CNIC && touched.CNIC ? errors.CNIC : null}</p>
              </div>

            </div>

            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-12 col-sm-12"><p>Name</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <input type="text" name="Name"  className="form-control" onChange={handleChangeName} disabled={state}
                  onBlur={handleBlur} value={values.Name} />
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
                  onChange={handleChangeGuardianName}
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
                  <option value="0" >Select</option>
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
                  placeholder={`0${firData?.FIRs.ContactNumber}`}
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
                  onChange={handleChangePermanentAddress}
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
                  value={values.placeOfOccurance}
                  onChange={handleChangePlaceOfOccurance}
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
                  onChange={handleChange} value={values.Category}
                  onBlur={handleBlur}>
                  <option value="0" >Select</option>
                  {
                    Cdata && Cdata.map(C => (
                      <option value={C._id} key={C._id}>{C.Category}</option>
                    ))}
                </select>
                <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Offence</p></div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <select className="form-control" name="Offence" value={values.Offence}
                  onChange={handleChange}
                  onBlur={handleBlur}>
                  <option value="0" >Select</option>
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
                    onBlur={handleBlur} value={values.OffenceSubcategory}>
                    <option value="0" >Select</option>
                    <option value="Sub Category">Sub Category</option>
                  </select>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Assigned To</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <select className="form-control" name="AssignedTo" onChange={handleChange}
                    onBlur={handleBlur} value={values.AssignedTo}>
                    <option value="0">select</option>
                    <option value="Beat Committee">Beat Committee</option>
                    <option value="Police Officer">Police Officer</option>
                  </select>
                </div>
              </div>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Officer Name</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input
                    type="text"
                    name="OfficerName"
                    placeholder={firData?.FIRs.OfficerName}
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
                    placeholder={firData?.FIRs.OfficerContact}
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
                  value={values.IncidentDetails}
                  onChange={handleIncidentDetailsChange}
                  className={styles.formControl}
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
                  placeholder={firData?.FIRs.FIRNo}
                  onBlur={handleBlur} />
              </div>
            </div>
            {(user && (role === user.role || Role === user.role)) ? <>

              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>IO Name</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input type="text" name="IOName" className="form-control" placeholder={firData?.FIRs.IOName} onChange={handleChange}
                    onBlur={handleBlur} />
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 mx-2"><p>Rank</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <input type="text" name="Rank" className="form-control" placeholder={firData?.FIRs.Rank} onChange={handleChange}
                    onBlur={handleBlur} value={values.Rank} />
                </div>
              </div>
              <div className={styles.alignment}>
                <div className="col-lg-3 col-md-12 col-sm-12"><p>Status</p></div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <select name="Status" className="form-control" value={values.Status} onChange={handleChange}
                    onBlur={handleBlur} >
                    <option value="pending">Pending</option>
                    <option value="approved">approved</option>
                    <option value="filed">Filed</option>
                    <option value="completed">Completed</option>
                  </select>
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
          <button className={styles.CancelButton} type='reset' onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className={styles.SubmitButton} type='submit' disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form >
      <ToastContainer />
    </div >
  );
}
export default EditFIR;
