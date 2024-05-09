import "./UserGuide.css";
import { Link } from "react-router-dom";

function UserGuide() {
  return (
    <>
      <div className="container1">
        <div className="container">
          <h1>User Manual Guide:</h1>
          <p>
            Sometimes, It may happened in your life that you went to the police
            station and you forgot some important documents at home or you may
            not know that like Citizen Verification Certificate requires two
            copies of Neighbors ID Card at police station for further procesing
            and then you faced trouble there, so to avoid such trouble, read the
            below categories carefully!!!
          </p>
        </div>
        <div className="grid">
          <div className="Button1">
              <Link to="/CharacterCertificate">Character Certificate</Link>
          </div>

          <div className="Button2">
            <Link to="/PoliceVerification">Police Verification</Link>
          </div>

          <div className="Button1">
            <Link to="/LostReport">Lost Report</Link>
          </div>
        </div>

        <div className="grid">
          <div className="Button2">
            <Link to="/TenantRegistration">Tenant Registration</Link>
          </div>

          <div className="Button1">
            <Link to="/ForeignerRegistration">Foreigner Registration</Link>
          </div>

          <div className="Button2">
            <Link to="/VolunteerRegistration">Volunteer Registration</Link>
          </div>
        </div>

        <div className="grid">
          <div className="Button1">
            <Link to="/ServentRegistration">Servent Registration</Link>
          </div>

          <div className="Button2">
            <Link to="/VehicleVerification">Vehicle Verification</Link>
          </div>

          <div className="Button1">
            <Link to="/CopyofFIR">Copy of FIR</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserGuide;
