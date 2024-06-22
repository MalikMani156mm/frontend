import "./UserGuide.css";
import { useNavigate } from "react-router-dom";

function UserGuide() {

  const navigate = useNavigate();

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

          <button className="Button1" onClick={() => { navigate("/CharacterCertificate") }}>
            Character Certificate
          </button>

          <div className="Button2" onClick={() => { navigate("/PoliceVerification") }}>
            Police Verification
          </div>

          <div className="Button1" onClick={() => { navigate("/LostReport") }}>
            Lost Report
          </div>
        </div>

        <div className="grid">
          <div className="Button2" onClick={() => { navigate("/TenantRegistration") }}>
            Tenant Registration
          </div>

          <div className="Button1" onClick={() => { navigate("/ForeignerRegistration") }}>
            Foreigner Registration
          </div>

          <div className="Button2" onClick={() => { navigate("/VolunteerRegistration") }}>
            Volunteer Registration
          </div>
        </div>

        <div className="grid">
          <div className="Button1" onClick={() => { navigate("/ServentRegistration") }} >
            Servent Registration
          </div>

          <div className="Button2" onClick={() => { navigate("/VehicleVerification") }}>
            Vehicle Verification
          </div>

          <div className="Button1" onClick={() => { navigate("/CopyofFIR") }}>
            Copy of FIR
          </div>
        </div>
      </div>
    </>
  );
}

export default UserGuide;
