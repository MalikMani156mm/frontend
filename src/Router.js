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
import MobileOTP from "./Pages/Login/MobileOTP.jsx";
import CharacterCertificateForm from "./Pages/OnlineFIR/CharacterCertificateForm.jsx";
import VehicleVerificationForm from "./Pages/OnlineFIR/VehicleVerificationForm.jsx";
import AddPoliceStation from "./Pages/PSJudicary/AddPoliceStation.jsx";
import PoliceStationInfo from "./Pages/PSJudicary/PoliceStationInfo.jsx";
import PriorityComplaint from "./Pages/PriorityComplaint/PriorityComplaint.jsx";
import FIRDetail from "./Pages/FIRDetails/FIRDetail.jsx";
import ViewFIR from "./Pages/OnlineFIR/ViewFIR.jsx";
import EditFIR from "./Pages/OnlineFIR/EditFIR.jsx";
import FIRPDF from "./Pages/FIRPDF/FIRPDF.jsx";
import DownloadFIRPDF from "./Pages/FIRPDF/DownloadFIRPDF.jsx";
import UpdatePoliceStation from "./Pages/PSJudicary/UpdatePoliceStation.jsx";
import DeletePoliceStation from "./Pages/PSJudicary/DeletePoliceStation.jsx";
import AddAdmin from "./Pages/Signup/AddAdmin.jsx";
import AdminLogin from "./Pages/Login/AdminLogin.jsx";
import AddOffence from "./Pages/AddSingleItem/AddOffence.jsx";
import AddCategory from "./Pages/AddSingleItem/AddCategory.jsx";
import ChangeUsername from "./Pages/ChangeUsername/ChangeUsername.jsx";
import AdminConfirmPassword from "./Pages/Login/AdminConfirmPassword.jsx";
import AdminNewPassword from "./Pages/Login/AdminNewPassword.jsx";
import ChatPage from "./Pages/ChatApp/ChatPage.jsx";
import ResetPassword from "./Pages/Login/ResetPassword.jsx";
import ViewContactMessage from "./Pages/ViewContactMessage/ViewContactMessage.jsx";
import AdminForgetPassword from "./Pages/Login/AdminForgetPassword.jsx";
import AdminResetPassword from "./Pages/Login/AdminResetPassword.jsx";
import ChangeAdminName from "./Pages/ChangeUsername/ChangeAdminName.jsx";
import PrivateRoute from "./Pages/Layouts/PrivateRoute.jsx";
import ViewCCForm from "./Pages/OnlineFIR/ViewCC.jsx";
import ViewVVForm from "./Pages/OnlineFIR/ViewVV.jsx";
import EditCCForm from "./Pages/OnlineFIR/EditCC.jsx";
import EditVVForm from "./Pages/OnlineFIR/EditVV.jsx";
import CertificateDetails from "./Pages/FIRDetails/CertificateDetails.jsx";
import RequestDetail from "./Pages/FIRDetails/RequestDetail.jsx";
import { CharacterCertificatePDF } from "./Pages/FIRPDF/CharacterCertificatePDF.jsx";

export const router = createBrowserRouter(


    createRoutesFromElements(
        <Route>
            <Route path="/" element={<div className={styles.layout}><RootLayouts /></div>}>
                <Route path="/" exact element={<div className={styles.main}><Home /></div>} />
                <Route path="/UserGuide" exact element={<div className={styles.main}><UserGuide /></div>} />
                <Route path="/PSJudicary" exact element={<div className={styles.main}><PSJudicary /></div>} />
                <Route path="/PSJudicary/:id" exact element={<div className={styles.main}><PoliceStationInfo /></div>} />
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
                    <Route path="/ChatPage" exact element={<div className={styles.main}><ChatPage /></div>} />
                    <Route path="/OnlineFIR" exact element={<div className={styles.main}><OnlineFIR /></div>} />
                    <Route path="/DownloadFIRPDF/:id" element={<div className={styles.main}><DownloadFIRPDF /></div>} />
                    <Route path="/FIRPDF/:id" exact element={<div className={styles.main}><FIRPDF /></div>} />
                    <Route path="/CCPDF/:id" exact element={<div className={styles.main}><CharacterCertificatePDF /></div>} />
                    <Route path="/ViewFIR/:id" exact element={<div className={styles.main}><ViewFIR /></div>} />
                    <Route path="/ViewCertificate/:id" exact element={<div className={styles.main}><ViewCCForm /></div>} />
                    <Route path="/ViewRequest/:id" exact element={<div className={styles.main}><ViewVVForm /></div>} />
                    <Route path="/EditFIR/:id" exact element={<div className={styles.main}><EditFIR /></div>} />
                    <Route path="/EditCertificate/:id" exact element={<div className={styles.main}><EditCCForm /></div>} />
                    <Route path="/EditRequest/:id" exact element={<div className={styles.main}><EditVVForm/></div>} />
                    <Route path="/FIRDetail/:id" exact element={<div className={styles.main}><FIRDetail /></div>} />
                    <Route path="/CertificateDetail/:id" exact element={<div className={styles.main}><CertificateDetails /></div>} />
                    <Route path="/RequestDetail/:id" exact element={<div className={styles.main}><RequestDetail /></div>} />
                    <Route path="/MyApplications" exact element={<div className={styles.main}><MyApplications /></div>} />
                    <Route path="/CharacterCertificateForm" exact element={<div className={styles.main}><CharacterCertificateForm /></div>} />
                    <Route path="/VehicleVerificationForm" exact element={<div className={styles.main}><VehicleVerificationForm /></div>} />
                    <Route path="/ConfirmPassword" exact element={<div className={styles.main}>< ConfirmPassword /></div>} />
                    <Route path="/NewPassword" exact element={<div className={styles.main}><PrivateRoute><NewPassword /></PrivateRoute> </div>} />
                    <Route path="/ChangeUsername" exact element={<div className={styles.main}>< ChangeUsername /></div>} />
                </Route>
                <Route path="/" element={<div className={styles.layout}><AuthAdminLayouts role={'Admin'} /></div>}>
                    <Route path="/Search" exact element={<div className={styles.main}><Search /></div>} />
                    <Route path="/PriorityComplaint" exact element={<div className={styles.main}><PriorityComplaint /></div>} />
                    <Route path="/UpdatePoliceStation/:id" exact element={<div className={styles.main}><UpdatePoliceStation /></div>} />
                    <Route path="/AddOffence" exact element={<div className={styles.main}><AddOffence /></div>} />
                    <Route path="/AddCategory" exact element={<div className={styles.main}><AddCategory /></div>} />
                    <Route path="/adminConfirmPassword" exact element={<div className={styles.main}>< AdminConfirmPassword /></div>} />
                    <Route path="/adminNewPassword" exact element={<div className={styles.main}><PrivateRoute>< AdminNewPassword /></PrivateRoute></div>} />
                    <Route path="/adminNewName" exact element={<div className={styles.main}>< ChangeAdminName /></div>} />
                </Route>
                <Route path="/" element={<div className={styles.layout}><AuthAdminLayouts role={'SuperAdmin'} /></div>}>
                    <Route path="/AddPoliceStation" exact element={<div className={styles.main}><AddPoliceStation /></div>} />
                    <Route path="/DeletePoliceStation" exact element={<div className={styles.main}><DeletePoliceStation /></div>} />
                    <Route path="/AddAdmin" exact element={<div className={styles.main}><AddAdmin /></div>} />
                    <Route path="/ViewMessages" exact element={<div className={styles.main}><ViewContactMessage /></div>} />
                    <Route path="/admin/AddOffence" exact element={<div className={styles.main}><AddOffence /></div>} />
                    <Route path="/admin/AddCategory" exact element={<div className={styles.main}><AddCategory /></div>} />
                    <Route path="/admin/Search" exact element={<div className={styles.main}><Search /></div>} />
                    <Route path="/admin/PriorityComplaint" exact element={<div className={styles.main}><PriorityComplaint /></div>} />
                    <Route path="/admin/ConfirmPassword" exact element={<div className={styles.main}>< AdminConfirmPassword /></div>} />
                    <Route path="/admin/NewPassword" exact element={<div className={styles.main}><PrivateRoute>< AdminNewPassword /></PrivateRoute></div>} />
                    <Route path="/IGNewName" exact element={<div className={styles.main}>< ChangeAdminName /></div>} />
                </Route>
            </Route>
            <Route path="/LogIn" exact element={<div className={styles.main}><Login /></div>} />
            <Route path="/AdminLogIn" exact element={<div className={styles.main}><AdminLogin /></div>} />
            <Route path="/SignUp" exact element={<div className={styles.main}><SignUp /></div>} />
            <Route path="/ForgetPassword" exact element={<div className={styles.main}>< ForgetPassword /></div>} />
            <Route path="/AdminForgetPassword" exact element={<div className={styles.main}>< AdminForgetPassword /></div>} />
            <Route path="/MobileOTP" exact element={<div className={styles.main}>< MobileOTP /></div>} />
            <Route path="/setNewPassword" exact element={<div className={styles.main}>< ResetPassword /></div>} />
            <Route path="/setAdminNewPassword" exact element={<div className={styles.main}>< AdminResetPassword /></div>} />
        </Route>
    )
)