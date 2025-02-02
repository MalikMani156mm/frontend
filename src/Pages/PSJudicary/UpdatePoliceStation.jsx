import React from "react";
import styles from "../Search/Search.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetPoliceStationByIdQuery, useUpdatePoliceStationMutation } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Loading/Loading";

function UpdatePoliceStation() {

    const { id } = useParams();
    const { data, error: psError, isLoading: psLoading } = useGetPoliceStationByIdQuery(id);

    const [updatePoliceStation, { isLoading, error }] = useUpdatePoliceStationMutation();


    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            PSName: data?.PSs.PSName,
            PSLandlineNumber: data?.PSs.PSLandlineNumber,
            DPOName: data?.PSs.DPOName,
            DPOMobileNumber: data?.PSs.DPOMobileNumber,
            DPOLandlineNumber: data?.PSs.DPOLandlineNumber,
            DPOReaderName: data?.PSs.DPOReaderName,
            ReaderMobileNumber: data?.PSs.ReaderMobileNumber,
            CircleOfficerName: data?.PSs.CircleOfficerName,
            CircleOfficerMobileNumber: data?.PSs.CircleOfficerMobileNumber,
            CircleOfficerLandlineNumber: data?.PSs.CircleOfficerLandlineNumber,
            SHOName: data?.PSs.SHOName,
            SHOMobileNumber: data?.PSs.SHOMobileNumber,
            Division: data?.PSs.Division,
            Circle: data?.PSs.Circle,
            Location: data?.PSs.Location,
        },
        validationSchema: yup.object().shape({
            PSName: yup.string().required('Police Station is Required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const res = await updatePoliceStation({ id, data: values }).unwrap();
            if (res.success) {
                toast.success(res.message);
            }
            else {
                toast.error(res.message || res.data.error);
            }
        }
    })

    if (psLoading) {
        return <LoadingSpinner />
    }

    if (error || psError) {
        return (<>
            <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
            <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
            <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
        </>)
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <b>Add Police Station</b>
                </div>
                <form action='post' name="AddPSForm" onSubmit={handleSubmit} >
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.label} >Police Station Name</div>
                            <div>
                                <input type="text" name="PSName" value={values.PSName} className={styles.formControl} onBlur={handleBlur}
                                    onChange={handleChange} />
                            </div>
                            <p className="help-block text-danger">{errors.PSName && touched.PSName ? errors.PSName : null}</p>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Police Station Landline Number</div>
                            <div>
                                <input
                                    type="number"
                                    name="PSLandlineNumber"
                                    className={styles.formControl}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={`0${values.PSLandlineNumber}`}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Name</div>
                            <div>
                                <input type="text" 
                                name="DPOName" 
                                value={values.DPOName} 
                                className={styles.formControl} 
                                onBlur={handleBlur}
                                onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Mobile Number</div>
                            <div>
                                <input
                                    type="number"
                                    name="DPOMobileNumber"
                                    className={styles.formControl}
                                    value={`0${values.DPOMobileNumber}`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Landline Number</div>
                            <div>
                                <input type="number"
                                    name="DPOLandlineNumber"
                                    className={styles.formControl}
                                    onBlur={handleBlur}
                                    value={`0${values.DPOLandlineNumber}`}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Reader Name</div>
                            <div>
                                <input type="text" name="DPOReaderName" value={values.DPOReaderName} className={styles.formControl} onBlur={handleBlur}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label} >DPO Reader Mobile Number</div>
                            <div>
                                <input type="number" name="ReaderMobileNumber" className={styles.formControl} onBlur={handleBlur}
                                    value={`0${values.ReaderMobileNumber}`}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle Officer Name</div>
                            <div>
                                <input
                                    type="text"
                                    name="CircleOfficerName"
                                    value={values.CircleOfficerName}
                                    className={styles.formControl}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle Officer Mobile Number</div>
                            <div>
                                <input
                                    type="number"
                                    name="CircleOfficerMobileNumber"
                                    className={styles.formControl}
                                    onBlur={handleBlur}
                                    value={`0${values.CircleOfficerMobileNumber}`}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle Officer Landline Number</div>
                            <div>
                                <input type="number" name="CircleOfficerLandlineNumber" className={styles.formControl} onBlur={handleBlur}
                                    value={`0${values.CircleOfficerLandlineNumber}`}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>SHO Name</div>
                            <div>
                                <input type="text" name="SHOName" value={values.SHOName} className={styles.formControl} onBlur={handleBlur}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>SHO Mobile Number</div>
                            <div>
                                <input type="number" name="SHOMobileNumber" className={styles.formControl} onBlur={handleBlur}
                                    value={`0${values.SHOMobileNumber}`}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Division</div>
                            <div>
                                <select name="Division" className={styles.formControl} value={values.Division} onBlur={handleBlur}
                                    onChange={handleChange}>
                                    <option value="0">Select</option>
                                    <option value="City">City</option>
                                    <option value="Saddar">Saddar</option>
                                    <option value="Industrial Area">Industrial Area</option>
                                    <option value="Rural">Rural</option>
                                    <option value="Soan">Soan</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle</div>
                            <div>
                                <select name="Circle" className={styles.formControl} value={values.Circle} onBlur={handleBlur}
                                    onChange={handleChange}>
                                    <option value="0">Select</option>
                                    <option value="Sabzi Mandi">Sabzi Mandi</option>
                                    <option value="Secretariat">Secretariat</option>
                                    <option value="Kohsar">Kohsar</option>
                                    <option value="Bhara Kahu">Bhara Kahu</option>
                                    <option value="Margalla">Margalla</option>
                                    <option value="Tarnol">Tarnol</option>
                                    <option value="Saddar">Saddar</option>
                                    <option value="Shalimar">Shalimar</option>
                                    <option value="Industrial Area">Industrial Area</option>
                                    <option value="Shehzad Town">Shehzad Town</option>
                                    <option value="Sihala">Sihala</option>
                                    <option value="Koral">Koral</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Google Map Location</div>
                            <div>
                                <input type="text" name="Location" className={styles.formControl} onBlur={handleBlur}
                                    value={values.Location}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonDiv}>
                        <button className={styles.SearchButton} type="submit">
                            {isLoading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UpdatePoliceStation;