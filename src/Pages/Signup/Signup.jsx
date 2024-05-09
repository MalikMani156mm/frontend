import styles from "./Signup.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import signupSchema from "../../Schemas/signupSchema";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";

function Signup(){
    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues:{
            name: '',
            username: '',
            email: '',
            phonenumber: '',
            cnic: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: signupSchema
    });
    return(
        <div className={styles.SignupWrapper}>
            <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100}width={100}/></Link>
            <br />
            <div className={styles.SignupHeader}>E-FIR System</div>
            <div className={styles.SignupHeader}>Create an Account</div>
            <Textinput
            type="text"
            values={values.name}
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Name"
            error={errors.name && touched.name ? 1: undefined}
            errormessage={errors.name}
            />

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
            type="text"
            values={values.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Email"
            error={errors.email && touched.email ? 1: undefined}
            errormessage={errors.email}
            />
            
            <Textinput
            type="text"
            values={values.phonenumber}
            name="phonenumber"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            error={errors.phonenumber && touched.phonenumber ? 1: undefined}
            errormessage={errors.phonenumber}
            />
            
            <Textinput
            type="text"
            values={values.cnic}
            name="cnic"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter CNIC"
            error={errors.cnic && touched.cnic ? 1: undefined}
            errormessage={errors.cnic}
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
            
            <Textinput
            type="password"
            values={values.confirmpassword}
            name="confirmpassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmpassword && touched.confirmpassword ? 1: undefined}
            errormessage={errors.confirmpassword}
            />

            <button className={styles.SignupButton} >Sign Up</button>
            <span>Already have an account? <Link to="/LogIn" className={styles.login}>Log In</Link></span>
        </div>
    );
        
    
}

export default Signup;