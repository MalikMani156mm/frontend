import Banner from "../../Components/Banner/Banner";
import Links from "../../Components/Links/Links";
import styles from "./Home.module.css";

function Home() {
  return (
    <div>
      <Banner />
      <div className= {styles.container} >
      <h1 className={styles.heading}>VISION:</h1>
      <p className={styles.text}> 
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
