import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from "react-redux";
// import { useLoginUserMutation } from "../../Redux/Features/Auth/AuthApi";
// import { setUserInfo } from "../../Redux/Features/Auth/AuthSlice";
// import { useDispatch } from "react-redux";


function ConfirmPassword() {

    // const { user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const Password = "malik123"

    const handleClick = () => {
        if (values.password === Password) {
            navigate("/NewPassword");
        } else {
            toast.error("Wrong Password");
        }
    }

    // const dispatch = useDispatch();
    // // eslint-disable-next-line
    // const [UserLogin, { isLoading, error, data }] = useLoginUserMutation();
    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: yup.object().shape({
            password: yup.string().min(8).max(20).required('Password is Required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            // const user = await UserLogin(values).unwrap();
            // dispatch(setUserInfo(user));
        }
    })


    // if (error) {
    //     return (<>
    //         <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
    //         <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
    //         <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
    //     </>)
    // }

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
                            values={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className={styles.inputPassword}
                        />
                        <span className={styles.eye} onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <p className="help-block text-danger">{errors.password && touched.password ? errors.password : null}</p>
                    <button className={styles.loginButton} type="submit" onClick={handleClick}>
                        {/* {isLoading ? "Loading..." : "Submit"} */}Submit</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default ConfirmPassword;