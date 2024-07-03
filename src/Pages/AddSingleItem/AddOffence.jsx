import styles from "../Login/Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewOffenceMutation } from "../../Redux/Features/Offence/OffenceApi";

function AddOffence() {

    // // eslint-disable-next-line
    const [addOffence, { isLoading: oLoading, error: oError }] = useAddNewOffenceMutation();

    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            Offence: '',
        },
        validationSchema: yup.object().shape({
            Offence: yup.string().required('Offence is required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const res = await addOffence(values).unwrap();
            console.log(res);

            if (res.success === true) {
                toast.success(res.message);
            } else {
                toast.error(res.message || res.data.error);
            }

        }
    })

    if (oLoading) {
        return <div>Loading...</div>;
    }

    if (oError) {
        return (<>
            <h1 style={{ textAlign: 'center' }}>{"Something Wrong Happened"}</h1>
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
                        type="text"
                        name='Offence'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Offence Name"
                    />
                    <p className="help-block text-danger">{errors.Offence && touched.Offence ? errors.Offence : null}</p>
                    <button className={styles.loginButton} type="submit" >
                        {oLoading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default AddOffence;