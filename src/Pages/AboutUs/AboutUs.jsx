import React from "react";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.Container}>
          <section id="introduction">
            <h1>About Us</h1>
            <p className={styles.points}>
              {/* Welcome to our E-FIR System, your online platform for filing First
              Information Reports (FIRs) conveniently and efficiently. */}
              Islamabad Capital Territory Police came into existence on 1st January 1981 through a Presidential Order No. 17 & 18, 1980. ICT Police aims to fulfill need of separate Police organization for the federal capital Islamabad in order to ensure rule of law, protect life and property, and limit civil disorder. Objective of ICT Police organization is preservation of peace and public safety through implementation of local state, Federal laws and by providing support/assistance during emergency or crisis situations.
            </p>
          </section>

          <section id="mission">
            <h2>Establishment:</h2>
            <p className={styles.points}>
              Islamabad Police is regulated by Central Police Office (CPO), which consists of five divisions: Operations, Security , Law & Order, Safe City and Logistic. Total sanctioned strength of ICT Police is 12625. Commander of the ICT Police is termed as Inspector General of Police (IGP), who is a senior bureaucrat of the Police Service of Pakistan (PSP). Divisions of ICT Police are headed by respective Deputy Inspectors General of Police and managed by respective Senior Superintendents of Police, whereas Islamabad Model Traffic Police is headed by Senior Superintendent of Police, and Information Technology Branch is headed by Director-Information Technology. Special Branch is another specialized entity, which is headed by Assistant Inspector General of Police. Safe City is a unique entity, which is headed by Director General and managed by Directors. Territory of Federal Capital Islamabad is covered by 22 Police Stations.
            </p>
          </section>
          <h2>Objective:</h2>
          <p className={styles.points}>
            <ul>
              <li>To provide safe, secure and public friendly environment to the citizens of Islamabad.</li>
              <li>To maintain Law and Order effectively.</li>
              <li>To prevent, detect and investigate crimes</li>
              <li>Efficient and smooth flow of traffic on the pattern of advanced traffic systems of the world.</li>
              <li>Security of President and Prime Minister of Pakistan, heads of the states and foreign dignitaries visiting Islamabad, Foreign Diplomats residing in Islamabad and other vital installations.</li>
              <li>Intelligence gathering to fulfill the objectives / targets of ICT police.</li>
              <li>Encourage public participation in the fight against crime CPLC, public conciliatory committees, and human rights watch group.</li>
              <li> Help the citizens in times of distress through Rescue-15.</li>
            </ul>
          </p>

          <section id="development">
            <h2>Islamabad at Glance</h2>
            <p className={styles.points}>
              Islamabad is the federal capital of Islamic Republic of Pakistan and 10th largest city of the country, having a population of two million people, while Islamabad-Rawalpindi twin cities metropolitan area is the third largest in Pakistan with population exceeding five million.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
