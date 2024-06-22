import React, { useState } from "react";

function PoliceVerification() {

  const [isUrdu, setIsUrdu] = useState(true);

  const toggleLanguage = () => {
    setIsUrdu(prevIsUrdu => !prevIsUrdu);
  };

  return (
    <>
      <div className="buttonBody">
        <div className="uiCheck">
          <button className="checkButton" onClick={toggleLanguage}>
            <input type="checkbox" />
            <strong></strong>
            <label></label>
          </button>
        </div>
      </div>
      {isUrdu ? <>
        <div className="container">
          <h1>Police Verification:</h1>
          <p>
            General Police Verification is required for job application in different organizations in Pakistan. This is also valid for servants, maids and other workers verification before hiring them for the job.
          </p>
          <h3>Required Documents:</h3>
          <ol>
            <li><p>Original CNIC/B-Form and Passport.</p></li>
            <li>
              <p>
                Original and copy of Passport, CNIC/B-Form and Affidavit (if
                Applicant has no Islamabad address at CNIC).
              </p>
            </li>
          </ol>
          <h3>Turn Around Time:</h3>
          <p className="leftText">3 working days after application date. </p>
          <p className="Conclusion">
            Collect Police Verification Certificate after 72 hours.
          </p>
        </div>
      </> : <>
        <div className="container">
          <h1>:پولیس کی تصدیق</h1>
          <p>
            مختلف تنظیموں میں نوکری کے لئے عام پولیس کی تصدیق کی ضرورت ہوتی ہے۔ یہ اسی طرح ملازمت کے لئے ملازم، نوکرانیاں اور دیگر کامگاروں کی تصدیق کے لئے بھی درست ہے۔
          </p>
          <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
          <li><p>۔اصل قومی شناختی کارڈ/ب-فارم اور پاسپورٹ۔</p></li>
            <li>
              <p>۔
              اصل اور کاپی پاسپورٹ، قومی شناختی کارڈ/ب-فارم اور حلف نامہ (اگر درخواست گزار کے قومی شناختی کارڈ پر اسلام آباد کا پتہ نہ ہو)۔
              </p>
            </li>
          </ol>
          <h3 className="urduH3"> :مکمل ہونے کا وقت</h3>
          <p className="rightText"> درخواست کی تاریخ کے بعد 3 کام کے دنوں میں ۔</p>
          <p className="Conclusion"> تین دن کے بعد کریکٹر سرٹیفکیٹ حاصل کریں۔ </p>
        </div>
      </>}

    </>
  );
}

export default PoliceVerification;
