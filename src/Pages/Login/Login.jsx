import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import loginSchema from "../../Schemas/loginSchema";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useLoginUserMutation } from "../../Redux/Features/Auth/AuthApi";
import { setUserInfo } from "../../Redux/Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";

function Login() {

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
    return (
        <form action='post' name="SignUpForm" onSubmit={handleSubmit} >
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
                    error={errors.email && touched.email ? 1 : undefined}
                    errormessage={errors.email}
                />
                <Textinput
                    type="password"
                    // values={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    error={errors.password && touched.password ? 1 : undefined}
                    errormessage={errors.password}
                />
                <span ><Link to="/" className={styles.createAccount}>Forget Password</Link></span>
                <button className={styles.loginButton} type="submit">Log In</button>
                <span>Don't have an account? <Link to="/SignUp" className={styles.createAccount}>Sign Up</Link></span>
            </div>
        </form>
    );

}

export default Login;