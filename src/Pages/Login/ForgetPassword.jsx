import styles from "./Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgetPassword() {

    const CNIC = 3740535267707
    const navigate = useNavigate();
    // // eslint-disable-next-line
    // const [UserLogin, { isLoading, error, data }] = useLoginUserMutation();
    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            cnic: '',
        },
        validationSchema: yup.object().shape({
            // cnic: yup.string().required('required'),
            cnic: yup.number().min(1111111111111, "Must be atleast 13 digit").max(9999999999999, "Invalid CNIC").required('CNIC is Required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            if (values.cnic === CNIC) {
                navigate("/EmailVerification");
            } else {
                toast.error("Wrong CNIC");
            }
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
                    <div className={styles.LoginHeader}>CNIC Verification</div>
                    <Textinput
                        type="number"
                        values={values.cnic}
                        name="cnic"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter CNIC (without dashes)"
                    />
                    <p className="help-block text-danger">{errors.cnic && touched.cnic ? errors.cnic : null}</p>
                    <button className={styles.loginButton} type="submit" >
                        {/* {isLoading ? "Loading..." : "Submit"} */}Submit</button>
                </div>
            </form>
            <ToastContainer/>
        </>
    );

}

export default ForgetPassword;