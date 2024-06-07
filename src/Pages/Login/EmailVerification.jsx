import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EmailVerification() {

    const navigate = useNavigate();
    // // eslint-disable-next-line
    // const [UserLogin, { isLoading, error, data }] = useLoginUserMutation();
    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('enter a valid email').required('Email is Required'),

        }),
        onSubmit: async (values) => {
            console.log(values);
            // navigate("/MyApplications")
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
                    <div className={styles.LoginHeader}> Provide Email</div>
                    <Textinput
                        type="email"
                        values={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                    <p className="help-block text-danger">{errors.email && touched.email ? errors.email : null}</p>
                    <span className={styles.createAccount}>Use Mobile Number</span>
                    
                    <button className={styles.loginButton} type="submit" >
                        {/* {isLoading ? "Loading..." : "Submit"} */}Submit</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default EmailVerification;