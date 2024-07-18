import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../Redux/Features/Auth/AuthSlice";
import Textinputs from "../../Components/Textinput/Textinputs";
import { useResetAdminPasswordMutation } from "../../Redux/Features/Admin/adminApi";

function AdminResetPassword() {

    const { user, token } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('resetToken');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [resetPassword, { isLoading, error }] = useResetAdminPasswordMutation();
    
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
            password: '',
            confirmpassword: ''
        },
        validationSchema: yup.object().shape({
            password: yup.string().min(8).max(20).matches(passwordPattern, { message: errorMessage }).required('Password is Required'),
            confirmpassword: yup.string().oneOf([yup.ref('password')], 'passwords must match').required('Confirm Password is Required'),
        }),
        onSubmit: async (values) => {
            delete values.confirmpassword;
            console.log(values);
            const url = `?resetToken=${resetToken}`
            const resp = await resetPassword({ url, data: values }).unwrap();
            console.log(resp);
            if (resp.success) {
                dispatch(setUserInfo(resp));
                navigate("/MyApplications");
                toast.success(resp.message);
            }
            else {
                toast.error(resp.message);
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
    
    if (user && token) {
        return <Navigate to={'/MyApplications'} replace={true} />
    }
    
    return (
        <>
            <form action='post' name="LoginForm" onSubmit={handleSubmit} >
                <div className={styles.LoginWrapper}>
                    <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100} width={100} /></Link>
                    <br />
                    <div className={styles.LoginHeader}>E-FIR System</div>
                    <div className={styles.LoginHeader}>Change Admin Password</div>
                    <div className={styles.inputContainer}>
                        <Textinputs
                            type={showPassword ? 'text' : 'password'}
                            values={values.password}
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
                        <Textinputs
                            type={showCPassword ? 'text' : 'password'}
                            values={values.confirmpassword}
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
                        {isLoading ? "Loading..." : "Submit"}</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default AdminResetPassword;