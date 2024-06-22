import React, { useState } from "react";
import { Link } from "react-router-dom";

function CharacterCertificate() {

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
                Original and copy of Passport, CNIC/B-Form and Affidavit (if Applicant has no Islamabad address at CNIC).
              </p>
            </li>
            <li>
              <p>
                Authority Letter (If applicant is in abroad). Authority letter with the stamp of relevant Embassy will be accepted, or it should be attested by respectable Gazetted person who are known to the applicant.
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
          <p>پولیس کریکٹر سرٹیفکیٹ بیرون ملک سفر، مختلف تنظیموں میں نوکریوں اور امیگریشن کے لئے درکار ہوتا ہے۔ پہلے، کریکٹر سرٹیفکیٹ حاصل کرنا شہریوں اور پولیس دونوں کے لئے پیچیدہ اور وقت طلب عمل تھا۔ پولیس خدمت مرکز نے اس عمل کو آسان اور وقت کی بچت بنا دیا ہے۔
          </p>
          <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
            <li><p>۔اصل قومی شناختی کارڈ/ب-فارم اور پاسپورٹ۔</p></li>
            <li>
              <p>۔
                اصل اور کاپی پاسپورٹ، قومی شناختی کارڈ/ب-فارم اور حلف نامہ (اگر درخواست گزار کے قومی شناختی کارڈ پر اسلام آباد کا پتہ نہ ہو)۔
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
                <li><p> پاسپورٹ کے آخری اخراج صفحے کی فوٹو کاپی۔* </p></li>
                <li>
                  <p>
                    درخواست کا عمل کسی بھی خونی رشتہ دار (بھائی، والد، والدہ، بہن وغیرہ) کے ذریعے جمع کروایا جا سکتا ہے، جنہیں درخواست گزار کی جانب سے اختیاری خط کے ساتھ اختیار دیا گیا ہو۔
                  </p>
                </li>
              </ul>
            </li>
          </ol>
          <h3 className="urduH3"> :مکمل ہونے کا وقت</h3>
          <p className="rightText"> درخواست کی تاریخ کے بعد 3 کام کے دنوں میں ۔</p>
          <p className="Conclusion"> تین دن کے بعد کریکٹر سرٹیفکیٹ حاصل کریں۔ </p>
        </div>
      </>
      }

    </>
  )
}

export default CharacterCertificate;
