import styles from "./MyApplications.module.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faPenToSquare, faRightLeft, faHandshake, faFile, faFlag, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useGetAllFIRsQuery } from "../../Redux/Features/FIR/FIRApi";
import { useSelector } from "react-redux";
import Filters from "../../Components/Filters/Filters";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MyApplications() {

  const { user } = useSelector(state => state.auth)
  const role = "Admin";

  // eslint-disable-next-line 
  const { isLoading, data, error } = useGetAllFIRsQuery();
  console.log(data);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const target1 = 150; // Total
  const target2 = 13; // Filed
  const target3 = 36; // Pending
  const target4 = 101; // Completed

  useEffect(() => {
    const animateCount = (currentCount, targetCount, setter) => {
      const increment = targetCount > currentCount ? 1 : -1;
      const speed = 1; // milliseconds

      const timer = setInterval(() => {
        if (currentCount === targetCount) {
          clearInterval(timer);
        } else {
          setter((prevCount) => {
            if (prevCount !== targetCount) {
              return prevCount + increment;
            } else {
              return prevCount;
            }
          });
        }
      }, speed);

      return () => clearInterval(timer);
    };

    animateCount(count1, target1, setCount1);
    animateCount(count2, target2, setCount2);
    animateCount(count3, target3, setCount3);
    animateCount(count4, target4, setCount4);
  }, [count1, count2, count3, count4]);

  return (
    <>
      <div className={styles.infoBody}>
        <div className={styles.Info}>
          <div className={styles.infoRow}>
            {(user && role === user.role) ?
              <div className={styles.avatarPolice}></div>
              : <div className={styles.avatarCitizen}></div>}
            <div className={styles.infoColumn}>
              <div className={styles.name}>Hi,{user.name}</div>
              <div className={styles.email}>{user.email}</div>
              <div className={styles.role}>{user.role}</div>
            </div>
          </div></div>
      </div>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.header}>
            <b>Complaints</b>
          </div>
          <div className={styles.boxesContainer}>
            <div className={styles.box1}>
              <div className={styles.num}>{formatNumberWithCommas(count1)}</div>
              <div className={styles.text}>Total</div>
            </div>
            <div className={styles.box2}>
              <div className={styles.num}>{formatNumberWithCommas(count2)}</div>
              <div className={styles.text}>Filed</div>
            </div>
            <div className={styles.box3}>
              <div className={styles.num}>{formatNumberWithCommas(count3)}</div>
              <div className={styles.text}>Pending</div>
            </div>
            <div className={styles.box4}>
              <div className={styles.num}>{formatNumberWithCommas(count4)}</div>
              <div className={styles.text}>Completed</div>
            </div>
          </div>
        </div>
        {(user && role === user.role) ? <>
          <Filters />
        </> : null}
        <div className={styles.container3}>
          <div className={styles.row5}>
            <div className={styles.row5}>
              {(user && role === user.role) ? <>
                <div className={styles.label}>Show</div>
                <select name="showEntries" className={styles.formControl2}>
                  <option value="1">10</option>
                  <option value="1">20</option>
                  <option value="1">30</option>
                  <option value="1">40</option>
                  <option value="1">50</option>
                </select>
                <div className={styles.label}>entries</div></> : null}
            </div>
            <div className={styles.row3}>
              <div className={styles.label}>Search:</div>
              <input type="text" name="Search" className={styles.formControl3} />
            </div>
          </div>
        </div>
        <div className={styles.container4}>
          <div className={styles.row4}>
            <div className={styles.cell}>Complaint No</div>
            <div className={styles.cell}>Name</div>
            <div className={styles.cell}>Contact Number</div>
            <div className={styles.cell}>Officer Name</div>
            <div className={styles.cell}>Category</div>
            <div className={styles.cell}>Offence</div>
            <div className={styles.cell}>Date</div>
            <div className={styles.cell}>Response Time</div>
            <div className={styles.cell}>Action</div>
          </div>
          {
            data && data.map(firs => (
              <div className={styles.row4}>
                <div className={styles.cell1}>{firs.ComplaintNumber}</div>
                <div className={styles.cell1}>{firs.Name}</div>
                <div className={styles.cell1}>{firs.ContactNumber}</div>
                <div className={styles.cell1}>{firs.CNIC}</div>
                <div className={styles.cell1}>{firs.Category}</div>
                <div className={styles.cell1}>{firs.Offence}</div>
                <div className={styles.cell1}>{firs.EntryDate}</div>
                <div className={styles.cell1}>{firs.Status}</div>
                <div className={`${styles.cell1} ${styles.icon}`}>
                  <FontAwesomeIcon icon={faTh} />
                  <FontAwesomeIcon icon={faPrint} />
                  <FontAwesomeIcon icon={faFlag} />
                  <FontAwesomeIcon icon={faFile} />
                  <FontAwesomeIcon icon={faHandshake} />
                  <FontAwesomeIcon icon={faRightLeft} />
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>
  );
}
export default MyApplications;
