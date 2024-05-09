 import "./Links.css";
import { Link } from "react-router-dom";
import Twitter from "../../images/Twitter.webp";
import fb from "../../images/fb.png";
import Instagram from "../../images/instagram.webp";
import youtube from "../../images/youtube.jpg";

function Links(){
    return(
        <div>
            <h1>Follow us on:</h1>
            <div className="links">
            <Link to="https://twitter.com/ICT_Police" className="Twitter" ><img src={Twitter} alt="Twitter logo" height={100}width={100}/></Link>
            <Link to="https://www.facebook.com/islamabadpolice" className="Fb" ><img src={fb} alt="Facebook logo" height={100}width={100}/></Link>
            <Link to="https://www.instagram.com/islamabadpolice/" className="Instagram" ><img src={Instagram} alt="Instagram logo" height={100}width={100}/></Link>
            <Link to="https://www.youtube.com/c/IslamabadPolice1" className="Youtube" ><img src={youtube} alt="Youtube logo" height={100}width={120} /></Link>
            </div>
        </div>
    );
}

export default Links;