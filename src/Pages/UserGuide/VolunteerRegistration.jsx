import React, { useState } from "react";

function VolunteerRegistration() {

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
        <h1>Volunteer Registration:</h1>
        <p>
          When registering as a Volunteer, make sure you have the following
          documents handy if you visit the Police Khidmat Markaz located at
          Sector F-6/1, H-11 Police Lines or your nearest police station:
        </p>
        <h3>Required Documents:</h3>
        <ol>
          <li><p> Applicant must be present.</p></li>
          <li><p> Photocopy of CNIC.</p></li>
          <li><p> Original CNIC.</p></li>
          <li><p> Passport size Photograph.</p></li>
          <li><p> Copy of educational documents.</p></li>
        </ol>
      </div>
      </>:<>
      <div className="container">
        <h1>:رضاکار رجسٹریشن</h1>
        <p>
        رضاکار بننے کے لئے، یقینی بنائیں کہ آپ کے پاس پولیس خدمت مرکز سیکٹر ایف-6/1، ایچ-11 پولیس لائنز یا آپ کے قریبی پولیس اسٹیشن جانے کیلئے مندرجہ ذیل دستاویزات ہیں
        </p>
        <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
          <li><p> درخواست دینے والا خود موجود ہونا لازمی ہے۔ *</p></li>
          <li><p> قومی شناختی کارڈ کی فوٹو کاپی۔ *</p></li>
          <li><p> اصل قومی شناختی کارڈ۔ *</p></li>
          <li><p> پاسپورٹ سائز کی تصویر۔ *</p></li>
          <li><p> تعلیمی دستاویزات کی کاپی۔ *</p></li>
        </ol>
      </div>
      </>}
    </>
  );
}

export default VolunteerRegistration;
