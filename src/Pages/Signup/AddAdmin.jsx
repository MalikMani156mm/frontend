import styles from "./Signup.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { useRegisterAdminMutation } from "../../Redux/Features/Admin/adminApi";

function AddAdmin() {


    const { data } = useGetAllPoliceStationsQuery();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowCPassword = () => {
        setShowCPassword(!showCPassword);
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
    const errorMessage = 'Use lowercase, uppercase and digits';

    const [register, { isLoading, error }] = useRegisterAdminMutation();

    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            email: '',
            PoliceStation: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().min(3).max(30).required('Name is Required'),
            PoliceStation: yup.string().required('Please Assign Police Station!'),
            email: yup.string().email('Enter a valid email').required('Email is Required'),
            password: yup.string().min(8).max(20).matches(passwordPattern, { message: errorMessage }).required('Password is Required'),
            confirmpassword: yup.string().oneOf([yup.ref('password')], 'passwords must match').required('Confirm Password is Required'),
        }),
        onSubmit: async (values) => {
            delete values.confirmpassword;
            console.log(values);
            const user = await register(values);
            if (user.data.success) {
                toast.success(user.data.message);
            }
            else {
                toast.error(user.data.message);
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
        <>
            <form action='post' name="SignUpForm" onSubmit={handleSubmit} >
                <div className={styles.SignupWrapper}>
                    <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100} width={100} /></Link>
                    <br />
                    <div className={styles.SignupHeader}>E-FIR System</div>
                    <div className={styles.SignupHeader}>Create an Admin</div>

                    <Textinput
                        type="text"
                        values={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                    <p className="help-block text-danger">{errors.name && touched.name ? errors.name : null}</p>

                    <select className={styles.SelectOption} name="PoliceStation"
                        onChange={handleChange}
                        onBlur={handleBlur}>
                        <option value="0">Assign Police Station</option>
                        {
                            data && data.map(PS => (
                                <option value={PS._id} key={PS._id}>{PS.PSName}</option>
                            ))}
                    </select>
                    <p className="help-block text-danger">{errors.PoliceStation && touched.PoliceStation ? errors.PoliceStation : null}</p>

                    <Textinput
                        type="text"
                        values={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                    <p className="help-block text-danger">{errors.email && touched.email ? errors.email : null}</p>
                    <div className={styles.inputContainer}>
                        <Textinput
                            type={showPassword ? 'text' : 'password'}
                            values={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                        <span className={styles.eye} onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <p className="help-block text-danger">{errors.password && touched.password ? errors.password : null}</p>
                    <div className={styles.inputContainer}>
                        <Textinput
                            type={showCPassword ? 'text' : 'password'}
                            values={values.confirmpassword}
                            name="confirmpassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Confirm password"
                        />
                        <span className={styles.eye} onClick={toggleShowCPassword}>
                            <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <p className="help-block text-danger">{errors.confirmpassword && touched.confirmpassword ? errors.confirmpassword : null}</p>
                    <button className={styles.SignupButton} type='submit' disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );


}

export default AddAdmin;