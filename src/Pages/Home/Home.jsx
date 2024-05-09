import Banner from "../../Components/Banner/Banner";
import Links from "../../Components/Links/Links";
import "./Home.css";

function Home() {
  return (
    <div>
      <Banner />
      <div className="container">
      <h1>VISION:</h1>
      <p>
        "Our vision is to digitalize and streamline the incident reporting and case
        management process, fostering efficiency, accuracy, and accessibility in
        law enforcement procedures."
      </p>
      </div>
      <Links />
    </div>
  );
}
export default Home;
