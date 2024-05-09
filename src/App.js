import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import styles from "./App.module.css"
import Protected from "./Components/Protected/Protected";
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
function App() {
  const isAuth = true;
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              }
            />

            <Route
              path="/OnlineFIR"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <OnlineFIR />
                  </div>
                </Protected>
              }
            />

            <Route
              path="/MyApplications"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <MyApplications/>
                  </div>
                </Protected>
              }
            />

            <Route
              path="/UserGuide"
              exact
              element={
                <div className={styles.main}>
                  <UserGuide/>
                </div>
              }
            />

            <Route
              path="/PSJudicary"
              exact
              element={
                <div className={styles.main}>
                  <PSJudicary/>
                </div>
              }
            />

            <Route
              path="/LogIn"
              exact
              element={
                <div className={styles.main}>
                  <Login/>
                </div>
              }
            />

            <Route
              path="/SignUp"
              exact
              element={
                <div className={styles.main}>
                  <SignUp/>
                </div>
              }
            />

            <Route
              path="*"
              element={
                <div className={styles.main}>
                  <Error />
                </div>
              }
            />
            <Route
              path="/CharacterCertificate"
              exact
              element={
                <div className={styles.main}>
                  <CharacterCertificate/>
                </div>
              }
            />
            <Route
              path="/PoliceVerification"
              exact
              element={
                <div className={styles.main}>
                  <PoliceVerification/>
                </div>
              }
            />
            <Route
              path="/LostReport"
              exact
              element={
                <div className={styles.main}>
                  <LostReport/>
                </div>
              }
            />
            <Route
              path="/TenantRegistration"
              exact
              element={
                <div className={styles.main}>
                  <TenantRegistration/>
                </div>
              }
            />
            <Route
              path="/ForeignerRegistration"
              exact
              element={
                <div className={styles.main}>
                  <ForeignerRegistration/>
                </div>
              }
            />
            <Route
              path="/VolunteerRegistration"
              exact
              element={
                <div className={styles.main}>
                  <VolunteerRegistration/>
                </div>
              }
            />
            <Route
              path="/ServentRegistration"
              exact
              element={
                <div className={styles.main}>
                  <ServentRegistration/>
                </div>
              }
            />
            <Route
              path="/VehicleVerification"
              exact
              element={
                <div className={styles.main}>
                  <VehicleVerification/>
                </div>
              }
            />
            <Route
              path="/CopyofFIR"
              exact
              element={
                <div className={styles.main}>
                  <CopyofFIR/>
                </div>
              }
            />
            <Route
              path="/AboutUs"
              exact
              element={
                <div className={styles.main}>
                  <AboutUs/>
                </div>
              }
            />
            <Route
              path="/ContactUs"
              exact
              element={
                <div className={styles.main}>
                  <ContactUs/>
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
