import React from "react";
import styles from "../Search/Search.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewPoliceStationMutation } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { Link } from "react-router-dom";

function AddPoliceStation() {

    const [addPoliceStation, { isLoading, error }] = useAddNewPoliceStationMutation();


    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            PSName: '',
            PSLandlineNumber: '',
            DPOName: '',
            DPOMobileNumber: '',
            DPOLandlineNumber: '',
            DPOReaderName: '',
            ReaderMobileNumber: '',
            CircleOfficerName: '',
            CircleOfficerMobileNumber: '',
            CircleOfficerLandlineNumber: '',
            SHOName: '',
            SHOMobileNumber: '',
            Division: '',
            Circle: '',
            Location: '',
        },
        validationSchema: yup.object().shape({
            PSName: yup.string().required('Police Station is Required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const res = await addPoliceStation(values).unwrap();
            if (res.success) {
                toast.success(res.message);
              }
              else {
                toast.error(res.message || res.data.error);
              }
        }
    })

    if (error) {
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
                                <input type="text" name="PSName" className={styles.formControl} onBlur={handleBlur}
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
                                    placeholder="05xxxxxxxx"
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Name</div>
                            <div>
                                <input type="text" name="DPOName" className={styles.formControl} onBlur={handleBlur}
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
                                    onBlur={handleBlur}
                                    placeholder="03xxxxxxxxx"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Landline Number</div>
                            <div>
                                <input type="number" name="DPOLandlineNumber" className={styles.formControl} onBlur={handleBlur}
                                    placeholder="05xxxxxxxx"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>DPO Reader Name</div>
                            <div>
                                <input type="text" name="DPOReaderName" className={styles.formControl} onBlur={handleBlur}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label} >DPO Reader Mobile Number</div>
                            <div>
                                <input type="number" name="ReaderMobileNumber" className={styles.formControl} onBlur={handleBlur}
                                    placeholder="03xxxxxxxxx"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle Officer Name</div>
                            <div>
                                <input
                                    type="text"
                                    name="CircleOfficerName"
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
                                    placeholder="03xxxxxxxxx"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle Officer Landline Number</div>
                            <div>
                                <input type="number" name="CircleOfficerLandlineNumber" className={styles.formControl} onBlur={handleBlur}
                                    placeholder="05xxxxxxxx"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>SHO Name</div>
                            <div>
                                <input type="text" name="SHOName" className={styles.formControl} onBlur={handleBlur}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>SHO Mobile Number</div>
                            <div>
                                <input type="number" name="SHOMobileNumber" className={styles.formControl} onBlur={handleBlur}
                                    placeholder="03xxxxxxxxx"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Division</div>
                            <div>
                                <select name="Division" className={styles.formControl} onBlur={handleBlur}
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
                            <select name="Circle" className={styles.formControl} onBlur={handleBlur}
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
                                    placeholder="https:/..."
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

export default AddPoliceStation;