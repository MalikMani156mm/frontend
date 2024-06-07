import React, { useState } from "react";
import { Link } from "react-router-dom";

function CharacterCertificate() {
  // const isUrdu = true;
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
          <h1>Police Character Certificate:</h1>
          <p>
            Police Character Certificate is required for travelling abroad, jobs
            in different organizations abroad, immigration etc. Previously,
            getting character certificate was a complex and time-taking process
            not just for citizens but for the police too. Police Khidmat Markaz has simplified and
            made it time-efficient.
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
            <li>
              <p>
                Authority Letter (If applicant is in abroad). Authority letter
                with the stamp of relevant Embassy will be accepted, or it should
                be attested by respectable Gazetted person who are known to the
                applicant.
              </p>
              <ul>
                <li><p><Link className="sampleLink" to={"https://islamabadpolice.gov.pk/img/authority-letter.pdf"}>Authority letter Sample:</Link></p></li>
                <li><p>Applicant Photograph.</p></li>
                <li>
                  <p>
                    An Affidavit from the person who has been given an authority
                    by Applicant. The duration of applicant stay should also be
                    mentioned in an Affidavit.
                  </p>
                </li>
                <li><p><Link className="sampleLink" to={"https://islamabadpolice.gov.pk/img/Affidavit.pdf"}> Affidavit Content Sample:</Link> </p></li>
                <li><p> Passport last Exit page Photocopy.</p></li>
                <li>
                  <p>
                    The Application Process can be submitted by any blood relative
                    (brother, father, mother, sister etc.) who has been given an
                    authority by Applicant with the authority letter of the
                    applicant.
                  </p>
                </li>
              </ul>
            </li>
          </ol>
          <h3>Turn Around Time:</h3>
          <p className="leftText">3 working days after application date. </p>
          <p className="Conclusion">Collect Character Certificate after 72 hours.</p>
        </div>
      </> : <>
        <div className="container">
          <h1>:پولیس کریکٹر سرٹیفکیٹ</h1>
          <p>
            بیرون ملک سفر، ملازمت کے لیے پولیس کریکٹر سرٹیفکیٹ ضروری ہے۔
            بیرون ملک مختلف تنظیموں، امیگریشن وغیرہ میں پہلے،
            کریکٹر سرٹیفکیٹ حاصل کرنا ایک پیچیدہ اور وقت لینے والا عمل تھا۔
            نہ صرف شہریوں کے لیے بلکہ پولیس کے لیے بھی۔ پولیس خدمت مرکز نے آسانیاں پیدا کر دیں۔
            اسے وقت کے قابل بنایا۔
          </p>
          <h3 className="urduH3"> :مطلوبہ دستاویزات</h3>
          <ol className="urduOl">
            <li><p>۔ اصلی شناختی کارڈ / فارم ب اور پاسپورٹ</p></li>
            <li>
              <p>۔
                پاسپورٹ کی اصل اور کاپی، شناختی کارڈ/فارم۔ب اور حلف نامہ
                (اگر درخواست دہندہ کا شناختی کارڈ میں اسلام آباد کا پتہ نہیں ہے)۔
              </p>
            </li>
            <li>
              <p>
                ۔ اتھارٹی لیٹر
                (اگر درخواست دہندہ بیرون ملک میں ہے)۔
                متعلقہ سفارت خانے کی مہر کے ساتھ اتھارٹی لیٹر قبول کیا جائے گا، یا اس کی تصدیق درخواست گزار کے جاننے والے معزز گزیٹڈ شخص سے کروائی جائے۔
              </p>
              <ul className="urduOl">
                <li><p><Link className="sampleLink" to={"https://islamabadpolice.gov.pk/img/authority-letter.pdf"}>اتھارٹی لیٹر کا نمونہ۔*</Link></p></li>
                <li><p>درخواست گزار کی تصویر۔*</p></li>
                <li>
                  <p>
                    اس شخص کی طرف سے حلف نامہ جسے درخواست دہندہ کے ذریعہ اختیار دیا گیا ہو۔ حلف نامہ میں درخواست گزار کے قیام کی مدت کا بھی ذکر ہونا چاہیے۔*
                  </p>
                </li>
                <li><p><Link className="sampleLink" to={"https://islamabadpolice.gov.pk/img/authority-letter.pdf"}> :حلف نامہ مواد کا نمونہ *</Link></p></li>
                <li><p> پاسپورٹ کے آخری ایگزٹ پیج کی فوٹو کاپی۔* </p></li>
                <li>
                  <p> درخواست کا عمل کسی بھی خونی رشتہ دار (بھائی، والد، والدہ، بہن وغیرہ) کے ذریعے جمع کرایا جا سکتا ہے جسے درخواست دہندہ نے درخواست دہندہ کے اتھارٹی لیٹر کے ساتھ اختیار دیا ہے۔
                  </p>
                </li>
              </ul>
            </li>
          </ol>
          <h3 className="urduH3"> :ٹرن اراؤنڈ ٹائم </h3>
          <p className="rightText"> درخواست کی تاریخ کے بعد تین کام کے دن۔ </p>
          <p className="Conclusion"> تین دن کے بعد کریکٹر سرٹیفکیٹ حاصل کریں۔ </p>
        </div>
      </>
      }
    </>
  )
}

export default CharacterCertificate;
