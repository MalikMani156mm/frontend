import React from "react";
import styles from "./AboutUs.module.css";
import MyPic from "../../images/Me.jpeg";
import SirPic from "../../images/Sir.jpeg";

function AboutUs() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.Container}>
          <section id="introduction">
            <h1>About Us</h1>
            <p>
              Welcome to our E-FIR System, your online platform for filing First
              Information Reports (FIRs) conveniently and efficiently.
            </p>
          </section>

          <section id="mission">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide a user-friendly and accessible platform
              for citizens to report incidents and collaborate with law
              enforcement agencies to ensure public safety.
            </p>
          </section>
          <h2>Meet Our Team</h2>
          <div className={styles.Team}>
            <div className={styles.member}>
              <img
                src={MyPic}
                alt="Developer "
                height={300}
                width={300}
              />
              <h2>Malik Abdul Rehman</h2>
              <h4>MERN Stack Developer</h4>
              <p className={styles.Quality}>
                Malik is a Qualified and Professional MERN Stack Developer with
                a lot of expertise in Web Development field.
              </p>
            </div>
            <div className={styles.member}>
              <img
                src={SirPic}
                alt="Superviser "
                height={300}
                width={300}
              />
              <h2>Dr. Qamar Abbas</h2>
              <h4>Project Supervisor</h4>
              <p className={styles.Quality}>
                Dr. Qamar is a Qualified Professor at International Islamic
                University and he have supervised many remarkable projects in
                past.
              </p>
            </div>
          </div>

          <section id="development">
            <h2>Development Process</h2>
            <p>
              Our E-FIR System was developed using cutting-edge technologies
              like React.js, Node.js, Express.js and MONGO DB and involved a
              collaborative effort from our dedicated team of developer and
              Supervisor.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
