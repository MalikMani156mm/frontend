import styles from "../Signup/SignupFont.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useSendOTPAgainQuery, useVerifyUserMutation } from "../../Redux/Features/Auth/AuthApi";
import { toast, ToastContainer } from "react-toastify";
import { setUserInfo } from "../../Redux/Features/Auth/AuthSlice";


function MobileOTP() {

    const { user, token } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('resetToken');
    console.log(resetToken);

    const [MobileOTP, setMobileOTP] = useState(new Array(4).fill(""));
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);
    const [url, setUrl] = useState("");

    const [verifyOTP, { isLoading, error }] = useVerifyUserMutation();
    const { isLoading:qLoading, error:qError, data } = useSendOTPAgainQuery(url);
    console.log(data);
    // useSendOTPAgainQuery();

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
            const url = `?resetToken=${resetToken}`
            const resp = await verifyOTP({ url, data: values }).unwrap();
            console.log(resp);
            if (resp.success) {
                dispatch(setUserInfo(resp));
                navigate("/MyApplications");
                toast.success(resp.message);
            }
            else {
                toast.error(resp.message);
            }
        }
    })

    const resendOTP = async()=>{
        setUrl(`?resetToken=${resetToken}`);
        console.log(url);
        setMinutes(1);
        setSeconds(30);
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(seconds > 0){
                setSeconds(seconds - 1);
            }
            if(seconds===0){
                if(minutes===0){
                    clearInterval(interval);
                }else{
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        },1000);
        return()=>{
            clearInterval(interval);
        };
    },[seconds])
    useEffect(() => {
        setFieldValue('mobileOTP', MobileOTP.join(""));
    }, [MobileOTP, setFieldValue]);

    if (error || qError) {
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
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                    <div className={styles.countdown}>
                        <p>
                            Time Remaining :{""}
                            <span style={{ fontWeight: 600 }}>
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                        </p>
                        <button disabled={seconds > 0 || minutes > 0} style={{ color: seconds > 0 || minutes > 0 ? "gray" : "darkblue" }} onClick={resendOTP}>
                        {qLoading ? "Loading..." : "Resend OTP"}
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default MobileOTP;    