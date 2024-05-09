import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import loginSchema from "../../Schemas/loginSchema";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";

function Login(){

    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues:{
            username: '',
            password: ''
        },
        validationSchema: loginSchema
    })
    return(
        <div className={styles.LoginWrapper}>
            <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100}width={100}/></Link>
            <br />
            <div className={styles.LoginHeader}>E-FIR System</div>
            <Textinput
            type="text"
            values={values.username}
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Username"
            error={errors.username && touched.username ? 1: undefined}
            errormessage={errors.username}
            />
            <Textinput
            type="password"
            values={values.password}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter password"
            error={errors.password && touched.password ? 1: undefined}
            errormessage={errors.password}
            />
            <button className={styles.loginButton} >Log In</button>
            <span>Don't have an account? <Link to="/SignUp" className={styles.createAccount}>Sign Up</Link></span>
        </div>
    );

}

export default Login;