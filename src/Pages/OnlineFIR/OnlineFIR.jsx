import styles from "./OnlineFIR.module.css";
import { Link } from "react-router-dom";
import React, { useState  } from "react";

function OnlineFIR() {
  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);

  const addMoreFile = () => {
    const newId = fileInputs[fileInputs.length - 1].id + 1;
    setFileInputs([...fileInputs, { id: newId }]);
  };
  
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <b>Basic Information</b>
        </div>
        <form action="" method="post">
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div class="col-lg-3 col-md-3 col-sm-3 ">Entry Date</div>
              <div class="col-lg-3 col-md-3 col-sm-3 ">
                <input
                  type="datetime-local"
                  id="datetime"
                  className="form-control"
                />
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">
                Source of Compliant
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 ">
                <select name="SourceOfComplaint" class="form-control">
                  <option value="16">Online</option>
                  <option value="16">1715</option>
                  <option value="21">1815</option>
                  <option value="1">By Post </option>
                  <option value="14">DPO Office</option>
                  <option value="2">Email </option>
                  <option value="3">In Person </option>
                  <option value="8">In Person (Facilitation Centre)</option>
                  <option value="18">In Person (PKM Global)</option>
                  <option value="4">Others </option>
                  <option value="10">Overseas</option>
                  <option value="9">PM/CM Citizen Portal</option>
                  <option value="17">President Office</option>
                  <option value="20">Public Web</option>
                  <option value="19">Pukar 15</option>
                  <option value="5">Rescue 15 </option>
                  <option value="13">RPO Office</option>
                  <option value="6">SMS </option>
                  <option value="22">Social Media</option>
                  <option value="15">SP Office</option>
                  <option value="12">SSP (Inv) Offices</option>
                  <option value="11">SSP (Ops) Offices</option>
                  <option value="7">Telephone </option>
                </select>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">District</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="District_ID">
                  <option value="1">Islamabad</option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Division</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Division_Id">
                  <option value="3">Industrial Area Zone</option>
                </select>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">Circle</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Circle">
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
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Police Station</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="PoliceStation">
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
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">Beat/Moza No.</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="BeatMoza">
                  <option value="1">Beat/Moza-1</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <b>Complaint Information</b>
        </div>
        <form action="" method="post">
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">CNIC</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input type="number" name="CNIC" className="form-control" />
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 ">
                <button type="button" className={styles.excelButton}>
                  Scan CNIC
                </button>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3" >
                <input type="file" className={`${styles.fileControl} ${styles.gaps}`}/>
                <div className={styles.alter}>
                <input type="file" className="form-control"/>
              </div>
                </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">Name</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="Name" className="form-control" />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mx-2">
                <div className={styles.radio}>
                  <div className="mx-2">
                    <input type="radio" name="Son" />
                    <p>S/O</p>
                  </div>
                  <div className="mx-2">
                    <input type="radio" name="Daughter" />
                    <p>D/O</p>
                  </div>
                  <div className="mx-2">
                    <input type="radio" name="Wife" />
                    <p>W/O</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="text"
                  name="GuardianName"
                  className="form-control"
                />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">Gender</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Gender">
                  <option value="1">Male</option>
                  <option value="1">Female</option>
                  <option value="1">Others</option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Contact Number</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="number"
                  name="ContactNumber"
                  className="form-control"
                />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">
                Permanent Address
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <textarea
                  type="text"
                  name="Officer_Name"
                  rows={3}
                  className={styles.formControl}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <b>Complaint Section</b>
        </div>
        <form action="" method="post">
          <div className={styles.content}>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">
                Place of Occurance
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="text"
                  name="placeOfOccurance"
                  className="form-control"
                />
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Incident Date</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="datetime-local"
                  id="datetime"
                  className="form-control"
                />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3 ">Category</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Category">
                  <option value="0">Select</option>
                  <option value="3">Character Verification</option>
                  <option value="18">Car Verification</option>
                  <option value="8">Child Abuse</option>
                  <option value="2">Complaint against Police</option>
                  <option value="14">Foreigner complaint</option>
                  <option value="9">Gender Abuse</option>
                  <option value="16">Harassment</option>
                  <option value="10">Human Rights</option>
                  <option value="5">Investigation</option>
                  <option value="4">Loss Report</option>
                  <option value="11">Minority Abuse</option>
                  <option value="15">Non registration of FIR</option>
                  <option value="6">Others</option>
                  <option value="13">Overseas Pakistan</option>
                  <option value="1">Reporting of Crime</option>
                  <option value="12">Traffic Complaint</option>
                  <option value="17">
                    Violence Against Transgender Person
                  </option>
                  <option value="7">Violence Against Woman</option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Offence</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Offence">
                  <option value="0">Select</option>
                  <option value="107">295-A PPC</option>
                  <option value="12">382 PPC</option>
                  <option value="106">Access to public place</option>
                  <option value="92">Acid Throwing</option>
                  <option value="35">Anti-Norcotics Act</option>
                  <option value="36">Anti-Terrorism Act</option>
                  <option value="80">Arm License / Slip</option>
                  <option value="37">Arms Ordinance Act</option>
                  <option value="123">Arrest of innocent persons</option>
                  <option value="83">ATM Card</option>
                  <option value="31">Attack on Govt. Servant</option>
                  <option value="34">Attempted Murder</option>
                  <option value="75">BayForm Loss</option>
                  <option value="38">Begging Act </option>
                  <option value="33">Blind Murder</option>
                  <option value="39">Border Crossing Act</option>
                  <option value="109">Breach of trust 406PPC</option>
                  <option value="32">Burglary</option>
                  <option value="30">Canal Cut</option>
                  <option value="111">Cancellation of False FIR</option>
                  <option value="29">Car Snatching</option>
                  <option value="7">Car Theft</option>
                  <option value="77">Character Certificate</option>
                  <option value="58">Cheating</option>
                  <option value="84">Cheque / Cheque Book</option>
                  <option value="55">Cheque Dishonour</option>
                  <option value="130">Child Marriage</option>
                  <option value="135">Child Sexual Abuse</option>
                  <option value="40">Cigarette Act</option>
                  <option value="59">CNIC Loss</option>
                  <option value="101">Commission</option>
                  <option value="96">Complaint against police</option>
                  <option value="41">Copyright Act</option>
                  <option value="97">Corruption</option>
                  <option value="112">Corruption</option>
                  <option value="61">Cyber Crime Act</option>
                  <option value="70">Cycle Theft</option>
                  <option value="6">Dacoity</option>
                  <option value="28">Dacoity/Robbery with Murder</option>
                  <option value="108">Defective Investigation</option>
                  <option value="113">Demand of Illegal Gratification</option>
                  <option value="42">Dengue Act</option>
                  <option value="93">Domestic Violence</option>
                  <option value="134">Dowry Related Violence</option>
                  <option value="60">Driving License</option>
                  <option value="74">Educational Documents Loss</option>
                  <option value="43">Electricity Act</option>
                  <option value="27">Fatal Accident</option>
                  <option value="132">Female Genital Mutilation/Cutting</option>
                  <option value="66">Fight</option>
                  <option value="136">Forced Abortion</option>
                  <option value="131">Forced Marriage</option>
                  <option value="104">
                    Freedom of Assembly &amp; Association
                  </option>
                  <option value="103">Freedom of movement</option>
                  <option value="2">Gambling</option>
                  <option value="5">Gang Rape</option>
                  <option value="4">Habs e Beja</option>
                  <option value="128">Harassment </option>
                  <option value="94">Harassment at workplace</option>
                  <option value="120">High Heandedness</option>
                  <option value="133">Honor Killng</option>
                  <option value="26">Hurt (personal feud)</option>
                  <option value="100">Illegal detention</option>
                  <option value="25">Illegal Extortion</option>
                  <option value="44">Illegal Gas Cylinder Act</option>
                  <option value="24">Illegal Weapon</option>
                  <option value="82">Insurance Claim</option>
                  <option value="126">Intimate Partner Violence</option>
                  <option value="114">Investigation – Delay</option>
                  <option value="115">Investigation – Faulty / Unfair</option>
                  <option value="116">Involvement in Criminal Activity</option>
                  <option value="69">Jewellery Snatching</option>
                  <option value="23">Kidnapping</option>
                  <option value="22">Kidnapping Minors</option>
                  <option value="45">Kite Flying Act</option>
                  <option value="65">Laptop theft</option>
                  <option value="46">Local Government Act</option>
                  <option value="78">Loss of Property Document</option>
                  <option value="79">Loss of Service Card</option>
                  <option value="81">Loss of Utility Meter/ No Plate</option>
                  <option value="63">Lost Bike Registration book</option>
                  <option value="47">Loud Speaker Act</option>
                  <option value="21">M/Cycle Snatching</option>
                  <option value="20">M/Cycle Theft</option>
                  <option value="57">Misappropriation</option>
                  <option value="122">Misbehavior</option>
                  <option value="56">Miscellaneous</option>
                  <option value="121">Misconduct</option>
                  <option value="85">Mobile Phone</option>
                  <option value="67">Mobile Snatching</option>
                  <option value="64">Mobile theft</option>
                  <option value="19">Murder</option>
                  <option value="18">Narcotics</option>
                  <option value="99">Non registration of FIR</option>
                  <option value="3">Non-Fatal Accident</option>
                  <option value="117">Non-Registration of FIR</option>
                  <option value="102">Omission</option>
                  <option value="48">One Wheeling Act</option>
                  <option value="90">Original File (Bike/Car)</option>
                  <option value="110">Other</option>
                  <option value="17">Other Crime</option>
                  <option value="86">Other Document</option>
                  <option value="16">Other Vehicle Snatching</option>
                  <option value="15">Other Vehicle Theft</option>
                  <option value="14">Outraging the Modesty of Women</option>
                  <option value="1">Overspeeding</option>
                  <option value="62">Passport Loss</option>
                  <option value="89">Pay Order</option>
                  <option value="88">Pension Book</option>
                  <option value="13">Police Encounter</option>
                  <option value="49">Police Order Act</option>
                  <option value="50">Price Control Act</option>
                  <option value="105">Property</option>
                  <option value="68">Purse Snatching</option>
                  <option value="51">Railway Act</option>
                  <option value="11">Rape</option>
                  <option value="71">Registration book</option>
                  <option value="10">Robbery</option>
                  <option value="87">Saving Certificate</option>
                  <option value="9">Secretarianism</option>
                  <option value="125">Sexual Assualt</option>
                  <option value="118">Slackness in Duty</option>
                  <option value="124">Snatching</option>
                  <option value="127">Stalking</option>
                  <option value="138">Suicide Attempt</option>
                  <option value="52">Telephone Act</option>
                  <option value="72">Theft</option>
                  <option value="73">Threats</option>
                  <option value="139">Threats Via Call Or SMS</option>
                  <option value="98">Torture</option>
                  <option value="53">Touheen Quran Act</option>
                  <option value="54">Tree Theft Act</option>
                  <option value="8">Tresspassing</option>
                  <option value="95">Unlawful Marriages</option>
                  <option value="129">Un-Natural Offence</option>
                  <option value="119">Use of Torture</option>
                  <option value="76">Vehicle Checking</option>
                  <option value="137">
                    Violence Against Trangender Person{" "}
                  </option>
                </select>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">
                Offence Subcategory
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Offence_Subcategory">
                  <option value="1">Select</option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Assigned To</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <select class="form-control" name="Assigned_To">
                  <option value="3">Beat Committee</option>
                  <option value="2">Police Officer</option>
                </select>
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">Officer Name</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="text"
                  name="Officer_Name"
                  className="form-control"
                />
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">Officer Contact</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input
                  type="number"
                  name="Officer_Contact"
                  className="form-control"
                />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">Incident Details</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <textarea
                  type="text"
                  rows={3}
                  name="Officer_Name"
                  className={styles.formControl}
                />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">
                Is FIR Registered
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <div className={styles.radio}>
                  <div className="mx-2">
                    <input type="radio" name="Yes" />
                    <p>Yes</p>
                  </div>
                  <div>
                    <input type="radio" name="No" />
                    <p>No</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 mx-2">FIR No</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="FIR_No" className="form-control" />
              </div>
            </div>
            <div className={styles.alignment}>
              <div className="col-lg-3 col-md-3 col-sm-3">IO Name</div>
              <div class="col-lg-3 col-md-3 col-sm-3">
                <input type="text" name="IO_Name" className="form-control" />
              </div>
            </div>
            <div className={styles.alignment1}>

              {fileInputs.map((file, index) => (
                <div key={file.id} class={styles.addDiv}>
                  File {index + 1}
                  <input type="file" class= {`${styles.fileControl} ${styles.gap} `}/>
                </div>
              ))}

              <button
                type="button"
                className={styles.addButton}
                onClick={addMoreFile}
              >
                Add More
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.buttonsalignment}>
        <button className={styles.CancelButton} type="reset">
          <Link to="/" className={styles.Links}>
            Cancel
          </Link>
        </button>
        <button className={styles.SubmitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
export default OnlineFIR;
