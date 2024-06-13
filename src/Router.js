import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import UserGuide from "./Pages/UserGuide/UserGuide";
import PSJudicary from "./Pages/PSJudicary/PSJudicary";
import OnlineFIR from "./Pages/OnlineFIR/OnlineFIR";
import MyApplications from "./Pages/MyApplications/MyApplications";
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import CharacterCertificate from './Pages/UserGuide/CharacterCertificate';
import PoliceVerification from "./Pages/UserGuide/PoliceVerification";
import CopyofFIR from './Pages/UserGuide/CopyofFIR';
import VehicleVerification from "./Pages/UserGuide/VehicleVerification";
import ServentRegistration from './Pages/UserGuide/ServentRegistration';
import VolunteerRegistration from './Pages/UserGuide/VolunteerRegistration';
import LostReport from './Pages/UserGuide/LostReport';
import TenantRegistration from './Pages/UserGuide/TenantRegistration';
import ForeignerRegistration from './Pages/UserGuide/ForeignerRegistration';
import RootLayouts from "./Pages/Layouts/RootLayouts.jsx";
import AuthLayouts from "./Pages/Layouts/AuthLayout.jsx";
import Search from "./Pages/Search/Search.jsx";
import AuthAdminLayouts from "./Pages/Layouts/AuthAdminLayout.jsx";
import ForgetPassword from "./Pages/Login/ForgetPassword.jsx";
import ConfirmPassword from "./Pages/Login/ConfirmPassword.jsx";
import NewPassword from "./Pages/Login/NewPassword.jsx";
import EmailVerification from "./Pages/Login/EmailVerification.jsx";
import OTPVerification from "./Pages/Signup/OTPVerification.jsx";
import EmailOTP from "./Pages/Login/EmailOTP.jsx";
import MobileVerification from "./Pages/Login/MobileVerification.jsx";
import MobileOTP from "./Pages/Login/MobileOTP.jsx";
import CharacterCertificateForm from "./Pages/OnlineFIR/CharacterCertificateForm.jsx";
import VehicleVerificationForm from "./Pages/OnlineFIR/VehicleVerificationForm.jsx";

export const router = createBrowserRouter(


    createRoutesFromElements(
        <Route>
            <Route path="/" element={<div className={styles.layout}><RootLayouts /></div>}>
                <Route path="/" exact element={<div className={styles.main}><Home /></div>} />
                <Route path="/UserGuide" exact element={<div className={styles.main}><UserGuide /></div>} />
                <Route path="/PSJudicary" exact element={<div className={styles.main}><PSJudicary /></div>} />
                <Route path="/CharacterCertificate" exact element={<div className={styles.main}><CharacterCertificate /></div>} />
                <Route path="/PoliceVerification" exact element={<div className={styles.main}><PoliceVerification /></div>} />
                <Route path="/LostReport" exact element={<div className={styles.main}><LostReport /></div>} />
                <Route path="/TenantRegistration" exact element={<div className={styles.main}><TenantRegistration /></div>} />
                <Route path="/ForeignerRegistration" exact element={<div className={styles.main}><ForeignerRegistration /></div>} />
                <Route path="/VolunteerRegistration" exact element={<div className={styles.main}><VolunteerRegistration /></div>} />
                <Route path="/ServentRegistration" exact element={<div className={styles.main}><ServentRegistration /></div>} />
                <Route path="/VehicleVerification" exact element={<div className={styles.main}><VehicleVerification /></div>} />
                <Route path="/CopyofFIR" exact element={<div className={styles.main}><CopyofFIR /></div>} />
                <Route path="/AboutUs" exact element={<div className={styles.main}><AboutUs /></div>} />
                <Route path="/ContactUs" exact element={<div className={styles.main}><ContactUs /></div>} />
                <Route path="*" element={<div className={styles.main}><Error /></div>} />
                <Route path="/" element={<div className={styles.layout}><AuthLayouts /></div>}>
                    <Route path="/OnlineFIR" exact element={<div className={styles.main}><OnlineFIR /></div>} />
                    <Route path="/MyApplications" exact element={<div className={styles.main}><MyApplications /></div>} />
                    <Route path="/CharacterCertificateForm" exact element={<div className={styles.main}><CharacterCertificateForm /></div>} />
                    <Route path="/VehicleVerificationForm" exact element={<div className={styles.main}><VehicleVerificationForm /></div>} />
                    <Route path="/ConfirmPassword" exact element={<div className={styles.main}>< ConfirmPassword /></div>} />
                    <Route path="/NewPassword" exact element={<div className={styles.main}>< NewPassword /></div>} />
                </Route>
                <Route path="/" element={<div className={styles.layout}><AuthAdminLayouts role={'Admin'} /></div>}>
                    <Route path="/Search" exact element={<div className={styles.main}><Search /></div>} />
                </Route>
            </Route>
            <Route path="/LogIn" exact element={<div className={styles.main}><Login /></div>} />
            <Route path="/SignUp" exact element={<div className={styles.main}><SignUp /></div>} />
            <Route path="/OTPVerification" exact element={<div className={styles.main}><OTPVerification /></div>} />
            <Route path="/ForgetPassword" exact element={<div className={styles.main}>< ForgetPassword /></div>} />
            <Route path="/EmailVerification" exact element={<div className={styles.main}>< EmailVerification /></div>} />
            <Route path="/EmailOTP" exact element={<div className={styles.main}>< EmailOTP /></div>} />
            <Route path="/MobileVerification" exact element={<div className={styles.main}>< MobileVerification /></div>} />
            <Route path="/MobileOTP" exact element={<div className={styles.main}>< MobileOTP /></div>} />
            <Route path="/setNewPassword" exact element={<div className={styles.main}>< NewPassword /></div>} />
        </Route>
    )
)