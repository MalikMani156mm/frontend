import styles from "./Signup.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import signupSchema from "../../Schemas/signupSchema";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useRegisterUserMutation } from "../../Redux/Features/Auth/AuthApi";

function Signup() {

    // eslint-disable-next-line
    const [register, {isLoading}] = useRegisterUserMutation();

      // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, handleSubmit, errors , setFieldValue } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phonenumber: '',
            cnic: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: signupSchema,
    onSubmit: async (values) => {
      delete values.confirmpassword;
      console.log(values);
      await register(values);
    }
    });

    

    return (
        <form action='post' name="SignUpForm" onSubmit={handleSubmit} >
            <div className={styles.SignupWrapper}>
                <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100} width={100} /></Link>
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
                    error={errors.name && touched.name ? 1 : undefined}
                    errormessage={errors.name}
                />

                <Textinput
                    type="text"
                    values={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    error={errors.email && touched.email ? 1 : undefined}
                    errormessage={errors.email}
                />

                <Textinput
                    type="number"
                    values={values.phonenumber}
                    name="phonenumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    error={errors.phonenumber && touched.phonenumber ? 1 : undefined}
                    errormessage={errors.phonenumber}
                />

                <Textinput
                    type="number"
                    values={values.cnic}
                    name="cnic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter CNIC (without dashes)"
                    error={errors.cnic && touched.cnic ? 1 : undefined}
                    errormessage={errors.cnic}
                />

                <Textinput
                    type="password"
                    values={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    error={errors.password && touched.password ? 1 : undefined}
                    errormessage={errors.password}
                />

                <Textinput
                    type="password"
                    values={values.confirmpassword}
                    name="confirmpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    error={errors.confirmpassword && touched.confirmpassword ? 1 : undefined}
                    errormessage={errors.confirmpassword}
                />

                <button className={styles.SignupButton } type='submit'>Sign Up</button>
                <span>Already have an account? <Link to="/LogIn" className={styles.login}>Log In</Link></span>
            </div>
        </form>
    );


}

export default Signup;