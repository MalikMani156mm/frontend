import Banner from "../../Components/Banner/Banner";
import Links from "../../Components/Links/Links";
import TextSlideshow from "../../Components/SlideShow/SlideShow";
import styles from "./Home.module.css";

function Home() {
  return (
    <div>
      <Banner />
      <TextSlideshow />
      <div className={styles.container} >
        <h1 className={styles.header}>VISION:</h1>
        <p className={styles.text}>
          "Our vision is to digitalize and streamline the incident reporting and case
          management process, fostering efficiency, accuracy, and accessibility in
          law enforcement procedures."
        </p>
      </div>
      <div className={styles.container} >
        <h1 className={styles.heading}>IMPORTANT MESSAGE OF IG ISLAMABAD:</h1>
        <div className={styles.contentAlignment}>
          <div className={styles.igPic}></div>
          <p className={styles.textDrop}>
            "Law and order is a pre requisite for socio economic prosperity and political stability of any country. For better results, Islamabad Police also encourages community oriented policing to reinforce the basic idea that tha fight against crime is a collective effort of both the community and the police. In this regard, we will reach out to you.Looking forward to your support."
            <br />
          <b>Syed Ali Nasir Rizvi</b>
           <br />
          Inspector General of Islamabad Police
          </p>
        </div>
      </div>
      <Links />
    </div>
  );
}
export default Home;
