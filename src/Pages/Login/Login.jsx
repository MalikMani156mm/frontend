import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import loginSchema from "../../Schemas/loginSchema";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useLoginUserMutation } from "../../Redux/Features/Auth/AuthApi";
import { setUserInfo } from "../../Redux/Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [UserLogin, { isLoading, error, data }] = useLoginUserMutation();
    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            console.log(values);
            const user = await UserLogin(values).unwrap();
            dispatch(setUserInfo(user));
            navigate("/MyApplications")
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

                    <Textinput
                        type="email"
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
                            className={styles.inputPassword}
                        />
                        <span className={styles.eye} onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <p className="help-block text-danger">{errors.password && touched.password ? errors.password : null}</p>
                    <span ><Link to="/ForgetPassword" className={styles.createAccount}>Forget Password</Link></span>
                    <button className={styles.loginButton} type="submit" >
                        {isLoading ? "Loading..." : "Log In"}</button>
                    <span>Don't have an account? <Link to="/SignUp" className={styles.createAccount}>Sign Up</Link></span>
                </div>
            </form>
        </>
    );

}

export default Login;