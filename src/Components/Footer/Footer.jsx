import "./Footer.css";
import { Link } from "react-router-dom";
import gp from "../../images/gp.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="OutLinks">
          <h3>POLICE LINKS:</h3>
          <ul><Link to={"https://islamabadtrafficpolice.gov.pk/"}>Islamabad Traffic Police</Link></ul>
          <ul><Link to={"https://www.punjabpolice.gov.pk/"}>Punjab Police</Link></ul>
          <ul><Link to={"https://kppolice.gov.pk/"}>KPK Police</Link></ul>
          <ul><Link to={"https://balochistanpolice.gov.pk/"}>Balochistan Police</Link></ul>
          <ul><Link to={"https://www.sindhpolice.gov.pk/"}>Sindh Police</Link></ul>
          <ul><Link to={"https://www.fia.gov.pk/"}>FIA</Link></ul>
        </div>

        <div className="InLinks">
          <h3>QUICK MENUS:</h3>
          <ul><Link to={"/UserGuide"} >User Manual Guide</Link></ul>
          <ul><Link to={"/PSJudicary"}>Police Staions Judiciary</Link></ul>
          <ul><Link to={"/CharacterCertificateForm"}>Character Certificate</Link></ul>
          <ul><Link to={"/VehicleVerificationForm"}>Vehicle Verification</Link></ul>
          <ul><Link to={"/ContactUs"}>Contact Us</Link></ul>
          <ul><Link to={"/AboutUs"}>About Us</Link></ul>
        </div>

        <div className="Helplines">
          <h3>HELPLINES:</h3>
          <ul>IGP : 1715</ul>
          <ul>Emergency: 15</ul>
          <ul>Fire Brigade: 16</ul>
          <ul>Rescue: 1122</ul>
          <ul>PIMS: 051-9261170</ul>
          <ul>Polyclinic: 051-9214965</ul>
        </div>

        <div className="trademark">
          <h3><Link to="/">ISLAMABAD POLICE</Link></h3>
          <p>
            &copy;2023 All Rights Reserved, ICT Police is a trademark and
            service mark of the City of Islamabad
          </p>
          <Link to="https://play.google.com/store/apps/details?id=pk.pitb.gov.ictp"  ><img src={gp} alt="Google Play" height={100}width={300} /></Link>
        </div>
      </div>
    </>
  );
}
export default Footer;
