import React, { useState } from "react";

function ServentRegistration() {

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
          <h1>Servent Registration:</h1>
          <p>
            When registering as a Servent, make sure you have the following
            documents handy if you visit the Police Khidmat Markaz located at
            Sector F-6/1, H-11 Police Lines or your nearest police station:
          </p>
          <h3>Required Documents:</h3>
          <ol>
            <li><p> Original and Copy of Servant’s CNIC.</p></li>
            <li><p> Original and Copy of Owner’s CNIC.</p></li>
            <li><p> Servant and Owner’s Passport size Photograph.</p></li>
            <li><p> Servant and Owner must be present.</p></li>
          </ol>
        </div>
      </> : <>
        <div className="container">
          <h1>: نوکر کا رجسٹریشن</h1>
          <p>
            نوکر کے طور پر رجسٹر ہونے کے لئے، یقینی بنائیں کہ آپ کے پاس پولیس خدمت مرکز سیکٹر ایف-6/1، ایچ-11 پولیس لائنز یا آپ کے قریبی پولیس اسٹیشن جانے کیلئے مندرجہ ذیل دستاویزات ہیں
          </p>
          <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
            <li><p> نوکر کا اصل قومی شناختی کارڈ اور اس کی کاپی۔ *</p></li>
            <li><p>  مالک کا اصل قومی شناختی کارڈ اور اس کی کاپی۔ *</p></li>
            <li><p>  نوکر اور مالک کا پاسپورٹ سائز کا تصویر۔ *</p></li>
            <li><p> نوکر اور مالک دونوں کو موجود ہونا لازمی ہے۔ *</p></li>
          </ol>
        </div>
      </>}

    </>
  );
}

export default ServentRegistration;
