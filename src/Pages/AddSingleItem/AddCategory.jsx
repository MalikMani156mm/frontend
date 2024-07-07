import styles from "../Login/Login.module.css";
import Textinput from "../../Components/Textinput/Textinput"
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewCategoryMutation } from "../../Redux/Features/Category/CategoryApi";
import LoadingSpinner from "../../Components/Loading/Loading";

function AddCategory() {

    // // eslint-disable-next-line
    const [addCategory, { isLoading: cLoading, error: cError }] = useAddNewCategoryMutation();

    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            Category: '',
        },
        validationSchema: yup.object().shape({
            Category: yup.string().required('Category is required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const res = await addCategory(values).unwrap();
            console.log(res);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }

        }
    })

    if (cLoading) {
        return <div><LoadingSpinner/></div>;
    }

    if (cError) {
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
                        name='Category'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Category Name"
                    />
                    <p className="help-block text-danger">{errors.Category && touched.Category ? errors.Category : null}</p>
                    <button className={styles.loginButton} type="submit" >
                        {cLoading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );

}

export default AddCategory;