import styles from "../Login/Login.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import {  useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Textinputs from "../../Components/Textinput/Textinputs";
import { useChangeAdminNameMutation } from "../../Redux/Features/Admin/adminApi";
import { setUserInfo } from "../../Redux/Features/Auth/AuthSlice";


function ChangeAdminName() {

    const { user } = useSelector(state => state.auth);
    const id = user._id;
    const [changeName, { isLoading, error }] = useChangeAdminNameMutation();
    const dispatch = useDispatch();



    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            PoliceStation: user.PoliceStation,
            password: user.password,
        },
        validationSchema: yup.object().shape({
            name: yup.string().min(3).max(30).required('Username is Required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const User = await changeName({ id, data: values }).unwrap();
            if (User.success) {
                toast.success(User.message);
                dispatch(setUserInfo(User));
            }
            else {
                toast.error(User.message);
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

    return (
        <>
            <form action='post' name="LoginForm" onSubmit={handleSubmit} >
                <div className={styles.LoginWrapper}>
                    <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100} width={100} /></Link>
                    <br />
                    <div className={styles.LoginHeader}>E-FIR System</div>
                    <div className={styles.LoginHeader}>Change Name Here:</div>
                    <div className={styles.inputContainer}>
                        <Textinputs
                            type='text'
                            values={values.name}
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Enter New Username"
                        />
                    </div>
                    <p className="help-block text-danger">{errors.name && touched.name ? errors.name : null}</p>

                    <button className={styles.loginButton} type="submit" >
                        {isLoading ? "Loading..." : "Submit"} </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default ChangeAdminName;