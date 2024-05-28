import styles from "./MyApplications.module.css";
import React, { useState, useEffect } from "react";
import CustomSelect from "../../Components/MultiSelector/MultiSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {useGetAllFIRsQuery} from "../../Redux/Features/FIR/FIRApi";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MyApplications() {

  // eslint-disable-next-line 
 const {isLoading, data, error} = useGetAllFIRsQuery();

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

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const Category = [
    { value: "all", label: "All Select(17)" },
    { value: "3", label: "Character Verification" },
    { value: "18", label: "Car Verification" },
    { value: "8", label: "Child Abuse" },
    { value: "2", label: "Complaint against Police" },
    { value: "14", label: "Foreigner complaint" },
    { value: "9", label: "Gender Abuse" },
    { value: "16", label: "Harassment" },
    { value: "10", label: "Human Rights" },
    { value: "5", label: "Investigation" },
    { value: "4", label: "Loss Report" },
    { value: "11", label: "Minority Abuse" },
    { value: "15", label: "Non registration of FIR" },
    { value: "6", label: "Others" },
    { value: "13", label: "Overseas Pakistan" },
    { value: "1", label: "Reporting of Crime" },
    { value: "12", label: "Traffic Complaint" },
    { value: "17", label: "Violence Against Transgender Person" },
    { value: "7", label: "Violence Against Woman" },
  ];

  const Offence = [
    { value: "all", label: "All Select(138)" },
    { value: "107", label: "295-A PPC" },
    { value: "12", label: "382 PPC" },
    { value: "106", label: "Access to public place" },
    { value: "92", label: "Acid Throwing" },
    { value: "35", label: "Anti-Norcotics Act" },
    { value: "36", label: "Anti-Terrorism Act" },
    { value: "80", label: "Arm License / Slip" },
    { value: "37", label: "Arms Ordinance Act" },
    { value: "123", label: "Arrest of innocent persons" },
    { value: "83", label: "ATM Card" },
    { value: "31", label: "Attack on Govt. Servant" },
    { value: "34", label: "Attempted Murder" },
    { value: "75", label: "BayForm Loss" },
    { value: "38", label: "Begging Act" },
    { value: "33", label: "Blind Murder" },
    { value: "39", label: "Border Crossing Act" },
    { value: "109", label: "Breach of trust 406PPC" },
    { value: "32", label: "Burglary" },
    { value: "30", label: "Canal Cut" },
    { value: "111", label: "Cancellation of False FIR" },
    { value: "29", label: "Car Snatching" },
    { value: "7", label: "Car Theft" },
    { value: "77", label: "Character Certificate" },
    { value: "58", label: "Cheating" },
    { value: "84", label: "Cheque / Cheque Book" },
    { value: "55", label: "Cheque Dishonour" },
    { value: "130", label: "Child Marriage" },
    { value: "135", label: "Child Sexual Abuse" },
    { value: "40", label: "Cigarette Act" },
    { value: "59", label: "CNIC Loss" },
    { value: "101", label: "Commission" },
    { value: "96", label: "Complaint against police" },
    { value: "41", label: "Copyright Act" },
    { value: "97", label: "Corruption" },
    { value: "112", label: "Corruption" },
    { value: "61", label: "Cyber Crime Act" },
    { value: "70", label: "Cycle Theft" },
    { value: "6", label: "Dacoity" },
    { value: "28", label: "Dacoity/Robbery with Murder" },
    { value: "108", label: "Defective Investigation" },
    { value: "113", label: "Demand of Illegal Gratification" },
    { value: "42", label: "Dengue Act" },
    { value: "93", label: "Domestic Violence" },
    { value: "134", label: "Dowry Related Violence" },
    { value: "60", label: "Driving License" },
    { value: "74", label: "Educational Documents Loss" },
    { value: "43", label: "Electricity Act" },
    { value: "27", label: "Fatal Accident" },
    { value: "132", label: "Female Genital Mutilation/Cutting" },
    { value: "66", label: "Fight" },
    { value: "136", label: "Forced Abortion" },
    { value: "131", label: "Forced Marriage" },
    { value: "104", label: "Freedom of Assembly & Association" },
    { value: "103", label: "Freedom of movement" },
    { value: "2", label: "Gambling" },
    { value: "5", label: "Gang Rape" },
    { value: "4", label: "Habs e Beja" },
    { value: "128", label: "Harassment" },
    { value: "94", label: "Harassment at workplace" },
    { value: "120", label: "High Heandedness" },
    { value: "133", label: "Honor Killng" },
    { value: "26", label: "Hurt (personal feud)" },
    { value: "100", label: "Illegal detention" },
    { value: "25", label: "Illegal Extortion" },
    { value: "44", label: "Illegal Gas Cylinder Act" },
    { value: "24", label: "Illegal Weapon" },
    { value: "82", label: "Insurance Claim" },
    { value: "126", label: "Intimate Partner Violence" },
    { value: "114", label: "Investigation – Delay" },
    { value: "115", label: "Investigation – Faulty / Unfair" },
    { value: "116", label: "Involvement in Criminal Activity" },
    { value: "69", label: "Jewellery Snatching" },
    { value: "23", label: "Kidnapping" },
    { value: "22", label: "Kidnapping Minors" },
    { value: "45", label: "Kite Flying Act" },
    { value: "65", label: "Laptop theft" },
    { value: "46", label: "Local Government Act" },
    { value: "78", label: "Loss of Property Document" },
    { value: "79", label: "Loss of Service Card" },
    { value: "81", label: "Loss of Utility Meter/ No Plate" },
    { value: "63", label: "Lost Bike Registration book" },
    { value: "47", label: "Loud Speaker Act" },
    { value: "21", label: "M/Cycle Snatching" },
    { value: "20", label: "M/Cycle Theft" },
    { value: "57", label: "Misappropriation" },
    { value: "122", label: "Misbehavior" },
    { value: "56", label: "Miscellaneous" },
    { value: "121", label: "Misconduct" },
    { value: "85", label: "Mobile Phone" },
    { value: "67", label: "Mobile Snatching" },
    { value: "64", label: "Mobile theft" },
    { value: "19", label: "Murder" },
    { value: "18", label: "Narcotics" },
    { value: "99", label: "Non registration of FIR" },
    { value: "3", label: "Non-Fatal Accident" },
    { value: "117", label: "Non-Registration of FIR" },
    { value: "102", label: "Omission" },
    { value: "48", label: "One Wheeling Act" },
    { value: "90", label: "Original File (Bike/Car)" },
    { value: "110", label: "Other" },
    { value: "17", label: "Other Crime" },
    { value: "86", label: "Other Document" },
    { value: "16", label: "Other Vehicle Snatching" },
    { value: "15", label: "Other Vehicle Theft" },
    { value: "14", label: "Outraging the Modesty of Women" },
    { value: "1", label: "Overspeeding" },
    { value: "62", label: "Passport Loss" },
    { value: "89", label: "Pay Order" },
    { value: "88", label: "Pension Book" },
    { value: "13", label: "Police Encounter" },
    { value: "49", label: "Police Order Act" },
    { value: "50", label: "Price Control Act" },
    { value: "105", label: "Property" },
    { value: "68", label: "Purse Snatching" },
    { value: "51", label: "Railway Act" },
    { value: "11", label: "Rape" },
    { value: "71", label: "Registration book" },
    { value: "10", label: "Robbery" },
    { value: "87", label: "Saving Certificate" },
    { value: "9", label: "Secretarianism" },
    { value: "125", label: "Sexual Assualt" },
    { value: "118", label: "Slackness in Duty" },
    { value: "124", label: "Snatching" },
    { value: "127", label: "Stalking" },
    { value: "138", label: "Suicide Attempt" },
    { value: "52", label: "Telephone Act" },
    { value: "72", label: "Theft" },
    { value: "73", label: "Threats" },
    { value: "139", label: "Threats Via Call Or SMS" },
    { value: "98", label: "Torture" },
    { value: "53", label: "Touheen Quran Act" },
    { value: "54", label: "Tree Theft Act" },
    { value: "8", label: "Tresspassing" },
    { value: "95", label: "Unlawful Marriages" },
    { value: "129", label: "Un-Natural Offence" },
    { value: "119", label: "Use of Torture" },
    { value: "76", label: "Vehicle Checking" },
    { value: "137", label: "Violence Against Trangender Person" },
  ];

  const Status = [
    { value: "all", label: "All Select(3)" },
    { value: "2", label: "Active" },
    { value: "3", label: "Pending" },
    { value: "4", label: "Completed" },
  ];

  const FIRCheck = [
    { value: "all", label: "All Select(2)" },
    { value: "2", label: "Yes" },
    { value: "3", label: "No" },
  ];

  const SourceOfComplaint = [
    { value: "all", label: "All Select(22)" },
    { value: "16", label: "Online" },
    { value: "16", label: "1715" },
    { value: "21", label: "1815" },
    { value: "1", label: "By Post" },
    { value: "14", label: "DPO Office" },
    { value: "2", label: "Email" },
    { value: "3", label: "In Person" },
    { value: "8", label: "In Person (Facilitation Centre)" },
    { value: "18", label: "In Person (PKM Global)" },
    { value: "4", label: "Others" },
    { value: "10", label: "Overseas" },
    { value: "9", label: "PM/CM Citizen Portal" },
    { value: "17", label: "President Office" },
    { value: "20", label: "Public Web" },
    { value: "19", label: "Pukar 15" },
    { value: "5", label: "Rescue 15" },
    { value: "13", label: "RPO Office" },
    { value: "6", label: "SMS" },
    { value: "22", label: "Social Media" },
    { value: "15", label: "SP Office" },
    { value: "12", label: "SSP (Inv) Offices" },
    { value: "11", label: "SSP (Ops) Offices" },
    { value: "7", label: "Telephone" },
  ];

  const Feedback = [
    { value: "all", label: "All Select(12)" },
    { value: "satisfactory", label: "Satisfactory" },
    { value: "unsatisfactory", label: "Unsatisfactory" },
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
    { value: "average", label: "Average" },
    { value: "outstanding", label: "Outstanding" },
    { value: "needs_improvement", label: "Needs Improvement" },
    { value: "exceptional", label: "Exceptional" },
    { value: "sufficient", label: "Sufficient" },
    { value: "below_average", label: "Below Average" },
  ];

  return (
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
      {/* <div className={styles.container}>
        <div className={styles.header}>
          <b>Search Complaints</b>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Year</div>
            <div>
              <select name="Year" className={styles.formControl}>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
                <option>2013</option>
                <option>2012</option>
                <option>2011</option>
                <option>2010</option>
                <option>2009</option>
                <option>2008</option>
                <option>2007</option>
                <option>2006</option>
                <option>2005</option>
                <option>2004</option>
                <option>2003</option>
                <option>2002</option>
                <option>2001</option>
                <option>2000</option>
                <option>1999</option>
                <option>1998</option>
                <option>1997</option>
                <option>1996</option>
                <option>1995</option>
                <option>1994</option>
                <option>1993</option>
                <option>1992</option>
                <option>1991</option>
                <option>1990</option>
                <option>1989</option>
                <option>1988</option>
                <option>1987</option>
                <option>1986</option>
                <option>1985</option>
                <option>1984</option>
                <option>1983</option>
                <option>1982</option>
                <option>1981</option>
              </select>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Province</div>
            <div>
              <select name="Province" className={styles.formControl}>
                <option value="1">ICT Islamabad</option>
              </select>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>District</div>
            <div>
              <select name="District" className={styles.formControl}>
                <option value="1">Select</option>
                <option value="2">Islamabad</option>
              </select>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Division</div>
            <div>
              <select name="Division" className={styles.formControl}>
                <option value="1">Select</option>
                <option value="2">Zone I</option>
                <option value="3">Zone II</option>
                <option value="4">Zone III</option>
                <option value="5">Zone IV</option>
                <option value="6">Zone V</option>
              </select>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Circle</div>
            <div>
              <select name="Circle" className={styles.formControl}>
                <option value="0">Select</option>
                <option value="1">Sabzi Mandi</option>
                <option value="2">Secretariat</option>
                <option value="3">Abpara</option>
                <option value="4">Kohsar</option>
                <option value="5">Bhara Kahu</option>
                <option value="6">Phulgaran</option>
                <option value="7">Bani Gala</option>
                <option value="8">Margalla</option>
                <option value="9">Karachi Company</option>
                <option value="10">Golra</option>
                <option value="11">Tarnol</option>
                <option value="12">Sangjani</option>
                <option value="13">Sumbal</option>
                <option value="14">Shalimar</option>
                <option value="15">Ramna</option>
                <option value="16">I-9 Industrial Area</option>
                <option value="17">Noon</option>
                <option value="18">Shams Colony</option>
                <option value="19">Shehzad Town</option>
                <option value="20">Khanna</option>
                <option value="21">Sihala</option>
                <option value="22">Humak</option>
                <option value="23">Lohi Bher</option>
                <option value="24">Nilore</option>
                <option value="25">Koral</option>
                <option value="26">Kirpa</option>
                <option value="27">Women</option>
              </select>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Police Station</div>
            <div>
              <select name="Police Station" className={styles.formControl}>
                <option value="0">Select</option>
                <option value="1">PS Sabzi Mandi</option>
                <option value="2">PS Secretariat</option>
                <option value="3">PS Abpara</option>
                <option value="4">PS Kohsar</option>
                <option value="5">PS Bhara Kahu</option>
                <option value="6">PS Phulgaran</option>
                <option value="7">PS Bani Gala</option>
                <option value="8">PS Margalla</option>
                <option value="9">PS Karachi Company</option>
                <option value="10">PS Golra</option>
                <option value="11">PS Tarnol</option>
                <option value="12">PS Sangjani</option>
                <option value="13">PS Sumbal</option>
                <option value="14">PS Shalimar</option>
                <option value="15">PS Ramna</option>
                <option value="16">PS I-9 Industrial Area</option>
                <option value="17">PS Noon</option>
                <option value="18">PS Shams Colony</option>
                <option value="19">PS Shehzad Town</option>
                <option value="20">PS Khanna</option>
                <option value="21">PS Sihala</option>
                <option value="22">PS Humak</option>
                <option value="23">PS Lohi Bher</option>
                <option value="24">PS Nilore</option>
                <option value="25">PS Koral</option>
                <option value="26">PS Kirpa</option>
                <option value="27">PS Women</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.label}>Name</div>
            <div>
              <input type="text" name="Name" className={styles.formControl} />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Father / Guardian Name</div>
            <div>
              <input
                type="text"
                name="GuardianName"
                className={styles.formControl}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>CNIC</div>
            <div>
              <input type="number" name="CNIC" className={styles.formControl} />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Contact Number</div>
            <div>
              <input
                type="number"
                name="ContactNumber"
                className={styles.formControl}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>E-Tag</div>
            <div>
              <input type="number" name="ETag" className={styles.formControl} />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.label}>Status</div>
            <div>
              <select name="Status" className={styles.formControl}>
                <option value="1">Select</option>
                <option value="2">Active</option>
                <option value="3">Pending</option>
                <option value="4">Completed</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.column}>
            <div className={styles.label}>Filed Reason</div>
            <div>
              <select name="FiledReason" className={styles.formControl}>
                <option value="1">Select</option>
              </select>
            </div>
          </div>
          <div className={styles.column1}>
            <div className={styles.label}>Is complaint satisfied</div>
            <div>
              <select name="ICS" className={styles.formControl}>
                <option value="1">Select</option>
              </select>
            </div>
          </div>
          <div className={styles.column2}>
            <button className={styles.SearchButton} type="submit">
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className={styles.container}>
        <div className={styles.header}>
          <b>Filters</b>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>From</div>
          <div className={styles.align2}>
            <input type="date" name="FromDate" className={styles.formControl1} />
          </div>
          <div className={styles.label}>
            <p className={styles.align}>To</p>
          </div>
          <div>
            <input type="date" name="ToDate" className={styles.formControl1} />
          </div>
          <div className={styles.label}>Category & Offence</div>
          <div>
            <CustomSelect
              options={Category}
              selectedOptions={selectedOptions}
              onChange={handleChange}
              placeholderText="All Selected (17)"
              selectWidth={230}
            />
          </div>
          <div>
            <CustomSelect
              options={Offence}
              selectedOptions={selectedOptions}
              onChange={handleChange}
              placeholderText="All Selected (138)"
              selectWidth={230}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Status</div>
          <div className={styles.align5}>
            <CustomSelect
              options={Status}
              selectedOptions={selectedOptions}
              onChange={handleChange}
              placeholderText="All Selected (3)"
              selectWidth={230}
            />
          </div>
          <div className={styles.align4}>
            <div className={styles.label}>Is FIR </div>
            <div className={styles.label}>Register</div>
          </div>
          <div>
            <CustomSelect
              options={FIRCheck}
              selectedOptions={selectedOptions}
              onChange={handleChange}
              placeholderText="All Selected (2)"
              selectWidth={230}
            />
          </div>
          <div>
            <div className={styles.label}>Source of Complaint</div>
          </div>
          <div className={styles.size}>
            <CustomSelect
              options={SourceOfComplaint}
              selectedOptions={selectedOptions}
              onChange={handleChange}
              placeholderText="All Selected (22)"
              selectWidth={490}
            />
          </div>
          <div className={styles.alter}>
            <CustomSelect
              options={SourceOfComplaint}
              selectedOptions={selectedOptions}
              onChange={handleChange}
              placeholderText="All Selected (22)"
              selectWidth={230}
            />
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.boxer}>
            <div className={styles.resp}>
              <div className={styles.label}>Feed-</div>
              <div className={styles.label}>Back</div>
            </div>
            <div className={styles.align1}>
              <CustomSelect
                options={Feedback}
                selectedOptions={selectedOptions}
                onChange={handleChange}
                placeholderText="All Selected (12)"
                selectWidth={230}
              />
            </div>
          </div>
          <button type="button" className={styles.excelButton}>
            Export To Excel
          </button>
        </div>
      </div>
      <div className={styles.container3}>
        <div className={styles.row5}>
          <div className={styles.row5}>
            <div className={styles.label}>Show</div>
            <select name="showEntries" className={styles.formControl2}>
              <option value="1">10</option>
              <option value="1">20</option>
              <option value="1">30</option>
              <option value="1">40</option>
              <option value="1">50</option>
            </select>
            <div className={styles.label}>entries</div>
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
        <div className={styles.row4}>
          <div className={styles.cell1}>SM-12/4/2024-3864</div>
          <div className={styles.cell1}>Sana ullah</div>
          <div className={styles.cell1}>03122345876</div>
          <div className={styles.cell1}>Wajid ASI</div>
          <div className={styles.cell1}>Loss Report</div>
          <div className={styles.cell1}>Other</div>
          <div className={styles.cell1}>04-12-2024 03:45 PM</div>
          <div className={styles.cell1}>41 minute(s)</div>
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
        <div className={styles.row4}>
          <div className={styles.cell}>SM-12/4/2024-3863</div>
          <div className={styles.cell}>Muhammad Asfand</div>
          <div className={styles.cell}>03358723932</div>
          <div className={styles.cell}>Wajid ASI</div>
          <div className={styles.cell}>Loss Report</div>
          <div className={styles.cell}>Other Document</div>
          <div className={styles.cell}>04-12-2024 03:25 PM</div>
          <div className={styles.cell}>43 minute(s)</div>
          <div className={`${styles.cell} ${styles.icon}`}>
            <FontAwesomeIcon icon={faTh} />
            <FontAwesomeIcon icon={faPrint} />
            <FontAwesomeIcon icon={faFlag} />
            <FontAwesomeIcon icon={faFile} />
            <FontAwesomeIcon icon={faHandshake} />
            <FontAwesomeIcon icon={faRightLeft} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className={styles.row4}>
          <div className={styles.cell1}>ICT-12/4/2024-2526</div>
          <div className={styles.cell1}>Hassan Khan</div>
          <div className={styles.cell1}>03326676682</div>
          <div className={styles.cell1}>SHO Sabzi Mandi</div>
          <div className={styles.cell1}>Loss Report</div>
          <div className={styles.cell1}>CNIC Loss</div>
          <div className={styles.cell1}>04-12-2024 02:42 PM</div>
          <div className={styles.cell1}>1 hour(s) 55 minute(s)</div>
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
        <div className={styles.row4}>
          <div className={styles.cell}>ICT-12/4/2024-2528</div>
          <div className={styles.cell}>Bivi Ilyas Shah</div>
          <div className={styles.cell}>03461481947</div>
          <div className={styles.cell}>Afzal HC Moharar</div>
          <div className={styles.cell}>Loss Report</div>
          <div className={styles.cell}>Other Document</div>
          <div className={styles.cell}>04-12-2024 02:24 PM</div>
          <div className={styles.cell}>2 hour(s) 35 minute(s)</div>
          <div className={`${styles.cell} ${styles.icon}`}>
            <FontAwesomeIcon icon={faTh} />
            <FontAwesomeIcon icon={faPrint} />
            <FontAwesomeIcon icon={faFlag} />
            <FontAwesomeIcon icon={faFile} />
            <FontAwesomeIcon icon={faHandshake} />
            <FontAwesomeIcon icon={faRightLeft} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className={styles.row4}>
          <div className={styles.cell1}>SM-12/4/2024-3868</div>
          <div className={styles.cell1}>Haleema Sadia</div>
          <div className={styles.cell1}>03363376661</div>
          <div className={styles.cell1}>SHO Sabzi Mandi</div>
          <div className={styles.cell1}>Loss Report</div>
          <div className={styles.cell1}>CNIC Loss</div>
          <div className={styles.cell1}>04-12-2024 02:14 PM</div>
          <div className={styles.cell1}>2 hour(s) 53 minute(s)</div>
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
        <div className={styles.row4}>
          <div className={styles.cell}>SM-12/4/2024-3863</div>
          <div className={styles.cell}>Muhammad Asfand</div>
          <div className={styles.cell}>03358723932</div>
          <div className={styles.cell}>Wajid ASI</div>
          <div className={styles.cell}>Loss Report</div>
          <div className={styles.cell}>Other Document</div>
          <div className={styles.cell}>04-12-2024 03:25 PM</div>
          <div className={styles.cell}>43 minute(s)</div>
          <div className={`${styles.cell} ${styles.icon}`}>
            <FontAwesomeIcon icon={faTh} />
            <FontAwesomeIcon icon={faPrint} />
            <FontAwesomeIcon icon={faFlag} />
            <FontAwesomeIcon icon={faFile} />
            <FontAwesomeIcon icon={faHandshake} />
            <FontAwesomeIcon icon={faRightLeft} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className={styles.row4}>
          <div className={styles.cell1}>ICT-12/4/2024-2526</div>
          <div className={styles.cell1}>Hassan Khan</div>
          <div className={styles.cell1}>03326676682</div>
          <div className={styles.cell1}>SHO Sabzi Mandi</div>
          <div className={styles.cell1}>Loss Report</div>
          <div className={styles.cell1}>CNIC Loss</div>
          <div className={styles.cell1}>04-12-2024 02:42 PM</div>
          <div className={styles.cell1}>1 hour(s) 55 minute(s)</div>
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
        <div className={styles.row4}>
          <div className={styles.cell}>ICT-12/4/2024-2528</div>
          <div className={styles.cell}>Bivi Ilyas Shah</div>
          <div className={styles.cell}>03461481947</div>
          <div className={styles.cell}>Afzal HC Moharar</div>
          <div className={styles.cell}>Loss Report</div>
          <div className={styles.cell}>Other Document</div>
          <div className={styles.cell}>04-12-2024 02:24 PM</div>
          <div className={styles.cell}>2 hour(s) 35 minute(s)</div>
          <div className={`${styles.cell} ${styles.icon}`}>
            <FontAwesomeIcon icon={faTh} />
            <FontAwesomeIcon icon={faPrint} />
            <FontAwesomeIcon icon={faFlag} />
            <FontAwesomeIcon icon={faFile} />
            <FontAwesomeIcon icon={faHandshake} />
            <FontAwesomeIcon icon={faRightLeft} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className={styles.row4}>
          <div className={styles.cell1}>SM-12/4/2024-3868</div>
          <div className={styles.cell1}>Haleema Sadia</div>
          <div className={styles.cell1}>03363376661</div>
          <div className={styles.cell1}>SHO Sabzi Mandi</div>
          <div className={styles.cell1}>Loss Report</div>
          <div className={styles.cell1}>CNIC Loss</div>
          <div className={styles.cell1}>04-12-2024 02:14 PM</div>
          <div className={styles.cell1}>2 hour(s) 53 minute(s)</div>
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
        <div className={styles.row4}>
          <div className={styles.cell}>SM-12/4/2024-3864</div>
          <div className={styles.cell}>Sana ullah</div>
          <div className={styles.cell}>03122345876</div>
          <div className={styles.cell}>Wajid ASI</div>
          <div className={styles.cell}>Loss Report</div>
          <div className={styles.cell}>Other</div>
          <div className={styles.cell}>04-12-2024 03:45 PM</div>
          <div className={styles.cell}>41 minute(s)</div>
          <div className={`${styles.cell} ${styles.icon}`}>
            <FontAwesomeIcon icon={faTh} />
            <FontAwesomeIcon icon={faPrint} />
            <FontAwesomeIcon icon={faFlag} />
            <FontAwesomeIcon icon={faFile} />
            <FontAwesomeIcon icon={faHandshake} />
            <FontAwesomeIcon icon={faRightLeft} />
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyApplications;
