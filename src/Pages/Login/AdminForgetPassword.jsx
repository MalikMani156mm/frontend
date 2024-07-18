import styles from "./LoginLargeFont.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, Navigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import Textinputs from "../../Components/Textinput/Textinputs";
import { useForgetPasswordEmailMutation } from "../../Redux/Features/Admin/adminApi";

function AdminForgetPassword() {

    const { user, token } = useSelector(state => state.auth);
    
    const [UserEmail, { isLoading, error }] = useForgetPasswordEmailMutation();
    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object().shape({
            email:yup.string().email('enter a valid email').required('Email is Required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const responce = await UserEmail(values).unwrap();
            console.log(responce);
            if (responce.success) {
                toast.success(responce.message);
            } else {
                toast.error(responce.message);
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
                    <div className={styles.LoginHeader}>Email Verification</div>
                    <Textinputs
                        type="email"
                        values={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                    <p className="help-block text-danger">{errors.email && touched.email ? errors.email : null}</p>
                    <button className={styles.loginButton} type="submit" >
                        {isLoading ? "Loading..." : "Submit"}</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default AdminForgetPassword;