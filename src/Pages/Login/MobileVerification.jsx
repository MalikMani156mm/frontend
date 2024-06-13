import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";


function MobileVerification() {

    const navigate = useNavigate();
    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            phonenumber: '',
        },
        validationSchema: yup.object().shape({
            phonenumber: yup.number().min(1111111111,"Must be atleast 11 digit").max(999999999999,"Invalid Number").required('Mobile Number is Required'),

        }),
        onSubmit: async (values) => {
            console.log(values);
            navigate("/MobileOTP")
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
                    <div className={styles.LoginHeader}> Provide Mobile Number</div>
                    <Textinput
                        type="number"
                        values={values.phonenumber}
                        name="phonenumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                    />
                    <p className="help-block text-danger">{errors.phonenumber && touched.phonenumber ? errors.phonenumber : null}</p>
                    <span className={styles.createAccount}> <Link to="/EmailVerification" style={{ textDecoration: 'none' }}>Use Email</Link></span>
                    
                    <button className={styles.loginButton} type="submit" >
                        {/* {isLoading ? "Loading..." : "Submit"} */}Submit</button>
                </div>
            </form>
        </>
    );

}

export default MobileVerification;