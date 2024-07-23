import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../Redux/Features/Auth/AuthApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPasswordConfirmed } from "../../Redux/Features/Auth/AuthSlice";


function NewPassword() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const id = user._id;
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [changePassword, { isLoading, error }] = useChangePasswordMutation();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowCPassword = () => {
        setShowCPassword(!showCPassword);
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
    const errorMessage = 'Use lowercase, uppercase and digits';

    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            cnic: user.cnic,
            password: user.password,
            confirmpassword: ''
        },
        validationSchema: yup.object().shape({
            password: yup.string().min(8).max(20).matches(passwordPattern, { message: errorMessage }).required('Password is Required'),
            confirmpassword: yup.string().oneOf([yup.ref('password')], 'passwords must match').required('Confirm Password is Required'),
        }),
        onSubmit: async (values,{ resetForm }) => {
            delete values.confirmpassword;
            console.log(values);
            const res = await changePassword({ id, data: values }).unwrap();
            if (res.success) {
                resetForm();
                toast.success(res.message);
                dispatch(setPasswordConfirmed(false));
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
        <>
            <form action='post' name="LoginForm" onSubmit={handleSubmit} >
                <div className={styles.LoginWrapper}>
                    <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100} width={100} /></Link>
                    <br />
                    <div className={styles.LoginHeader}>E-FIR System</div>
                    <div className={styles.LoginHeader}>Change Password</div>
                    <div className={styles.inputContainer}>
                        <Textinput
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter New Password"
                            className={styles.inputPassword}
                        />
                        <span className={styles.eye} onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <p className="help-block text-danger">{errors.password && touched.password ? errors.password : null}</p>
                    <div className={styles.inputContainer}>
                        <Textinput
                            type={showCPassword ? 'text' : 'password'}
                            value={values.confirmpassword}
                            name="confirmpassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                        />
                        <span className={styles.eye} onClick={toggleShowCPassword}>
                            <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <p className="help-block text-danger">{errors.confirmpassword && touched.confirmpassword ? errors.confirmpassword : null}</p>
                    <button className={styles.loginButton} type="submit" >
                        {isLoading ? "Loading..." : "Submit"} </button>

                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default NewPassword;