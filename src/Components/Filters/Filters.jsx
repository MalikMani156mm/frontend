import styles from "../../Pages/MyApplications/MyApplications.module.css";
import React, { useState } from "react";
import CustomSelect from "../../Components/MultiSelector/MultiSelector";

function Filters() {

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
        <div className={styles.container}>
            <div className={styles.header}>
                <b>Filters</b>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <div className={styles.label}>From</div>
                    <div>
                        <input type="date" name="FromDate" className={styles.formControl1} />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>To</div>
                    <div>
                        <input type="date" name="ToDate" className={styles.formControl1} />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>Category</div>
                    <div>
                        <CustomSelect
                            options={Category}
                            selectedOptions={selectedOptions}
                            onChange={handleChange}
                            placeholderText="All Selected (17)"
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>Offence</div>
                    <div>
                        <CustomSelect
                            options={Offence}
                            selectedOptions={selectedOptions}
                            onChange={handleChange}
                            placeholderText="All Selected (138)"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <div className={styles.label}>Status</div>
                    <div >
                        <CustomSelect
                            options={Status}
                            selectedOptions={selectedOptions}
                            onChange={handleChange}
                            placeholderText="All Selected (3)"
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>Is FIR Register</div>
                    <div>
                        <CustomSelect
                            options={FIRCheck}
                            selectedOptions={selectedOptions}
                            onChange={handleChange}
                            placeholderText="All Selected (2)"
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>Source of Complaint</div>

                    <div >
                        <CustomSelect
                            options={SourceOfComplaint}
                            selectedOptions={selectedOptions}
                            onChange={handleChange}
                            placeholderText="All Selected (22)"
                        />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>Feed-Back</div>
                    <CustomSelect
                        options={Feedback}
                        selectedOptions={selectedOptions}
                        onChange={handleChange}
                        placeholderText="All Selected (12)"
                    />
                </div>
            </div>
            <div className={styles.rowButton}>
                <button type="button" className={styles.excelButton}>
                    Export To Excel
                </button>
            </div>
        </div>
    );
}

export default Filters;