import React, { useState } from "react";

function VehicleVerification() {

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
        <h1>Vehicle Verification:</h1>
        <p>
          When verifying your vehicle, ensure you have the following documents
          ready if you visit Public Facilitation Center, F-6/1, Islamabad.
        </p>
        <h3>Required Documents:</h3>
        <ol>
          <li><p>Original Registration Book.</p></li>
          <li><p> Applicant’s Original CNIC.</p></li>
          <li><p> Applicant’s CNIC Copy.</p></li>
          <li><p> Copy of Registration Book.</p></li>
          <li>
            <p>
              Pictures of Engine No and Chassis No on Plain Page and Black &
              White Or Color Prints Both are Acceptable.
            </p>
          </li>
          <li>
            <p>
              Vehicle and documents will be inspected by Vehicle Verification
              Officer.
            </p>
          </li>
          <li>
            <p>
              Rs.1000 Fee for Vehicle and RS 500 for bike will be charged.
            </p>
          </li>
          <li>
            <p>Vehicle Verification Officer will stamp and sign the documents.</p>
          </li>
          <li>
            <p>
              At Last The applicant will get a token for final computerized
              report and wait for his turn.
            </p>
          </li>
        </ol>
      </div>
      </>:<>
      <div className="container">
        <h1>:گاڑی کی تصدیق</h1>
        <p>
        گاڑی کی تصدیق کرتے وقت یقینی بنائیں کہ آپ کے پاس مندرجہ ذیل دستاویزات ہیں، اگر آپ اسلام آباد کے عوامی فیسلیٹیشن سینٹر، ایف-6/1 جاتے ہیں
        </p>
        <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
          <li><p> اصل رجسٹریشن بک۔ *</p></li>
          <li><p>  درخواست دینے والے کا اصل قومی شناختی کارڈ۔ *</p></li>
          <li><p>  درخواست دینے والے کا قومی شناختی کارڈ کی کاپی۔ *</p></li>
          <li><p> رجسٹریشن بک کی کاپی۔  *</p></li>
          <li>
            <p> انجن نمبر اور چیسس نمبر کی تصاویر، سادہ صفحے پر اور سیاہ و سفید یا رنگین پرنٹ دونوں قابل قبول ہیں۔ *</p>
          </li>
          <li>
            <p> گاڑی اور دستاویزات کو گاڑی کی تصدیق افسر کی زیر نگرانی میں جائے گا۔ *</p>
          </li>
          <li>
            <p> گاڑی کے لیے 1000 روپے اور بائیک کے لیے 500 روپے کی فیس وصول کی جائے گی۔ *</p>
          </li>
          <li>
            <p> گاڑی کی تصدیق افسر دستاویزات پر مہر لگائے گا اور انہیں سائن کرے گا۔ *</p>
          </li>
          <li>
            <p> آخر میں درخواست دینے والے کو آخری کمپیوٹرائزڈ رپورٹ کے لئے ٹوکن دیا جائے گا اور اپنی باری کا انتظار کرے گا۔ *</p>
          </li>
        </ol>
      </div></>}
    </>
  );
}

export default VehicleVerification;
