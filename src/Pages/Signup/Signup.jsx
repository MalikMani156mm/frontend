import styles from "./Signup.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import signupSchema from "../../Schemas/signupSchema";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useRegisterUserMutation } from "../../Redux/Features/Auth/AuthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Signup() {

    const { user, token } = useSelector(state => state.auth);
    const [currentLocation, setCurrentLocation] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowCPassword = () => {
        setShowCPassword(!showCPassword);
    }


    const [register, { isLoading, error }] = useRegisterUserMutation();

    // eslint-disable-next-line
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phonenumber: '',
            cnic: '',
            password: '',
            confirmpassword: '',
            Location: currentLocation,
        },
        validationSchema: signupSchema,
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

    if (user && token) {
        return <Navigate to={'/MyApplications'} replace={true} />
    }

    return (
        <>
            <form action='post' name="SignUpForm" onSubmit={handleSubmit} >
                <div className={styles.SignupWrapper}>
                    <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={50} width={50} /></Link>
                    {/* <br /> */}
                    <div className={styles.SignupHeader}>E-FIR System</div>
                    {/* <div className={styles.SignupHeader}>Create an Account</div> */}

                    <Textinput
                        type="text"
                        values={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                    <p className="help-block text-danger">{errors.name && touched.name ? errors.name : null}</p>
                    <Textinput
                        type="text"
                        values={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                    <p className="help-block text-danger">{errors.email && touched.email ? errors.email : null}</p>
                    <Textinput
                        type="number"
                        values={values.phonenumber}
                        name="phonenumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                    />
                    <p className="help-block text-danger">{errors.phonenumber && touched.phonenumber ? errors.phonenumber : null}</p>
                    <Textinput
                        type="number"
                        values={values.cnic}
                        name="cnic"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter CNIC (without dashes)"
                    />
                    <p className="help-block text-danger">{errors.cnic && touched.cnic ? errors.cnic : null}</p>
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
                        {isLoading ? "Loading..." : "Sign Up"}</button>
                    <span>Already have an account? <Link to="/LogIn" className={styles.login}>Log In</Link></span>
                </div>
            </form>
            <ToastContainer />
        </>
    );


}

export default Signup;