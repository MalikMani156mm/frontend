import styles from "../Signup/Signup.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';


function MobileOTP() {
    const [MobileOTP, setMobileOTP] = useState(new Array(4).fill(""));

    function handleMobileChange(e, index) {
        if (isNaN(e.target.value)) return false;
        const newMobileOTP = [...MobileOTP.map((data, i) => (i === index ? e.target.value : data))];
        setMobileOTP(newMobileOTP);

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            mobileOTP: "",
        },
        validationSchema: yup.object().shape({
            mobileOTP: yup.string().required('Required').length(4, 'OTP must be 4 digits'),
        }),
        onSubmit: async (values) => {
            console.log(values);
        }
    })
    useEffect(() => {
        setFieldValue('mobileOTP', MobileOTP.join(""));
    }, [MobileOTP, setFieldValue]);

    return(
        <>
            <form action='post' name="OTPForm" onSubmit={handleSubmit}>
                <div className={styles.SignupWrapper}>
                    <Link to="/" className={styles.logo} ><img src={logo} alt="Logo unload" height={100} width={100} /></Link>
                    <br />
                    <div className={styles.SignupHeader}>E-FIR System</div>
                    <div className={styles.SignupHeader}>Enter Mobile OTP</div>

                    <div className={styles.otpContainer}>
                        {
                            MobileOTP.map((data, index) => {
                                return <input type="text" value={data} name="mobileOTP"
                                    onBlur={handleBlur}
                                    maxLength={1}
                                    onChange={(e) => handleMobileChange(e, index)}
                                />

                            })
                        }
                    </div>
                    <p className="help-block text-danger">{errors.mobileOTP && touched.mobileOTP ? errors.mobileOTP : null}</p>


                    <button className={styles.SignupButton} type="submit" >
                        Submit</button>
                </div>
            </form>
        </>
    );
}

export default MobileOTP;    