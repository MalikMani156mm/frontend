import React, { useState } from "react";

function ForeignerRegistration() {

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
          <h1>Foreigner Registration:</h1>
          <p>
            When registering as a Foreigner, make sure you have the following
            documents handy if you visit the Police Khidmat Markaz located at
            Sector F-6/1, H-11 Police Lines or your nearest police station:
          </p>
          <h3>Required Documents:</h3>
          <ol>
            <li><p> Applicant must be present.</p></li>
            <li><p> Applicant’s passport size photograph.</p></li>
            <li><p> Copy of Passport.</p></li>
            <li><p> Copy of Visa.</p></li>
            <li><p> Witness CNIC Copy.</p></li>
            <li><p> Sponsor CNIC Copy.</p></li>
            <li><p> Residential Proof in Islamabad.</p></li>
            <li><p> In case, applicant stays in Hotel and Rest House.</p></li>
            <ul>
              <li>
                <p>
                  Attested staying Certificate from Hotel and Rest House owner /
                  administration.
                </p>
              </li>
            </ul>
            <li>
              <p>
                Indian National shall be registered within 24 hours and get travel
                permit.
              </p>
            </li>
            <li>
              <p>
                For Late Exit Permit or Late Registration, all Foreigners will
                have to contact Ministry of Interior(MOI).
              </p>
            </li>
            <li>
              <p>
                In case, wrong information is submitted, necessary action will be
                taken against the applicant.
              </p>
            </li>
            <li> <p>Rs.200 Fee will be charged.</p></li>
          </ol>
        </div>
      </> : <><div className="container">
        <h1>:خارجی رجسٹریشن</h1>
        <p>
          جب بھی آپ خارجی کے طور پر رجسٹر ہونے جائیں، تو یقینی بنائیں کہ آپ کے پاس مندرجہ ذیل دستاویزات ہیں، اگر آپ پولیس خدمت مرکز سیکٹر ایف-6/1، ایچ-11 پولیس لائنز یا آپ کے قریبی پولیس اسٹیشن جائیں
        </p>
        <h3 className="urduH3">:درکار دستاویزات</h3>
        <ol className="urduOl">
          <li><p> درخواست دینے والا خود موجود ہونا ضروری ہے۔*</p></li>
          <li><p> درخواست دینے والے کا پاسپورٹ سائز کا تصویر۔ *</p></li>
          <li><p> پاسپورٹ کی کاپی۔ *</p></li>
          <li><p> ویزہ کی کاپی۔ *</p></li>
          <li><p> گواہ کی قومی شناختی کارڈ کی کاپی۔ *</p></li>
          <li><p> اسپانسر کی قومی شناختی کارڈ کی کاپی۔ *</p></li>
          <li><p> اسلام آباد میں رہائشی ثبوت۔ *</p></li>
          <li><p> اگر درخواست دہندہ ہوٹل یا ریسٹ ہاؤس میں رہتا ہے۔ *</p></li>
          <ul className="urduOl">
            <li>
              <p> ہوٹل یا ریسٹ ہاؤس کے مالک یا انتظامیہ کی تصدیق شدہ رہائشی سرٹیفکیٹ۔ -</p>
            </li>
          </ul>
          <li>
            <p> بھارتی ریاستی شہری کو 24 گھنٹوں کے اندر رجسٹر کرایا جائے گا اور سفر کے اجازت نامہ حاصل کریں۔ *</p>
          </li>
          <li>
            <p> دیر سے اخراج یا دیر سے رجسٹریشن کے لئے، تمام خارجی شہریوں کو وزارت داخلہ سے رابطہ کرنا ہوگا۔ *</p>
          </li>
          <li>
            <p> اگر غلط معلومات دی جائے، درخواست دینے والے کے خلاف ضروری کارروائی کی جائے گی۔ *</p>
          </li>
          <li> <p> دو سو روپے کی فیس وصول کی جائے گی۔ *</p></li>
        </ol>
      </div></>}
    </>
  );
}

export default ForeignerRegistration;
