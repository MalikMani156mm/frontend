import React, { useState } from "react";

function TenantRegistration() {

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
          <h1>Tenant Registration:</h1>
          <p>
            When registering as a tenant, make sure you have the following
            documents handy if you visit the Police Khidmat Markaz located at
            Sector F-6/1, H-11 Police Lines or your nearest police station:
          </p>
          <h3>Required Documents:</h3>
          <ol>
            <li><p> Original and Copy of Tenant’s CNIC.</p></li>
            <li><p> Original and Copy of Owner’s CNIC.</p></li>
            <li><p> Passport size Photograph of Owner and Tenant.</p></li>
            <li><p> Copy of Rent Agreement on affidavit.</p></li>
            <li><p> Original Rent Agreement must be shown.</p></li>
            <li><p> Other concerned documents, if required.</p></li>
            <li><p> Tenant must be present.</p></li>
          </ol>
        </div>
      </> : <>
        <div className="container">
          <h1>:کرایہ دار کا رجسٹریشن </h1>
          <p>
            کرایہ دار کے طور پر رجسٹر ہونے کے لئے، یقینی بنائیں کہ آپ کے پاس پولیس خدمت مرکز سیکٹر ایف-6/1، ایچ-11 پولیس لائنز یا آپ کے قریبی پولیس اسٹیشن جانے کیلئے مندرجہ ذیل دستاویزات ہیں
          </p>
          <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
            <li><p>  کرایہ دار کا اصل قومی شناختی کارڈ اور اس کی کاپی۔ *</p></li>
            <li><p>  مالک کا اصل قومی شناختی کارڈ اور اس کی کاپی۔ *</p></li>
            <li><p>  مالک اور کرایہ دار کا پاسپورٹ سائز کا تصویر۔ *</p></li>
            <li><p> افیڈیوٹ پر کرایہ کے معاہدے کی کاپی۔ *</p></li>
            <li><p> اصل کرایہ کے معاہدے کی نمائش لازمی ہے۔ *</p></li>
            <li><p> دیگر متعلقہ دستاویزات، اگر درکار ہوں۔ *</p></li>
            <li><p> کرایہ دار کو موجود ہونا ضروری ہے۔ *</p></li>
          </ol>
        </div>
      </>}
    </>
  );
}

export default TenantRegistration;
