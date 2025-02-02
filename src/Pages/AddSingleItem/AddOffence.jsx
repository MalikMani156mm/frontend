import styles from "../Login/LoginLargeFont.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewOffenceMutation } from "../../Redux/Features/Offence/OffenceApi";
import Textinputs from "../../Components/Textinput/Textinputs";

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
        onSubmit: async (values,{ resetForm }) => {
            console.log(values);
            const res = await addOffence(values).unwrap();
            if (res.success) {
                resetForm();
                toast.success(res.message);
            } else {
                toast.error(res.message );
            }
        }
    })

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
                    <div className={styles.LoginHeader}>Add Offence</div>
                    <Textinputs
                        type="text"
                        name='Offence'
                        value={values.Offence}
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