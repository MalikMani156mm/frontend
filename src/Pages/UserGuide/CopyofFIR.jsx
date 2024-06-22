import React, { useState } from "react";

function CopyofFIR() {

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
          <h1>Copy of FIR:</h1>
          <p>
            Citizens can get the copy of an FIR from Police Khidmat Markaz located
            at Sector F-6/1, H-11 Police Lines or your nearest police station by
            providing some basic information:
          </p>
          <h3>Required Documents:</h3>
          <ol>
            <li><p> Original and two copies of applicant’s CNIC.</p></li>
            <li><p> Reason for getting copy of FIR.</p></li>
            <li><p> FIR Number and Police Station.</p></li>
            <li><p> Copy of relevant documents.</p></li>
          </ol>
          <h3>Processing Fee:</h3>
          <p className="leftText">Free!!!</p>
          <h3>Turn Around Time:</h3>
          <p className="leftText">Around 5 to 10 minutes, on spot registration.</p>
        </div>
      </> : <>
        <div className="container">
          <h1>ایف آئی آر کی کاپی۔</h1>
          <p>
          شہری ایف آئی آر کی کاپی حاصل کر سکتے ہیں پولیس خدمت مرکز سیکٹر ایف-6/1، ایچ-11 پولیس لائنز یا آپ کے قریبی پولیس اسٹیشن سے، کچھ بنیادی معلومات فراہم کرنے کے بعد:۔
          </p>
          <h3 className="urduH3">:درکار دستاویزات</h3>
          <ol className="urduOl">
            <li><p> درخواست دہندہ کے اصل قومی شناختی کارڈ اور دو کاپیاں۔ *</p></li>
            <li><p> ایف آئی آر کی کاپی حاصل کرنے کا وجہ۔ *</p></li>
            <li><p> ایف آئی آر نمبر اور پولیس اسٹیشن۔ *</p></li>
            <li><p> متعلقہ دستاویزات کی کاپی۔ *</p></li>
          </ol>
          <h3 className="urduH3">: فیس</h3>
          <p className="rightText">!!!بلا معاوضہ</p>
          <h3 className="urduH3">:مکمل ہونے کا وقت</h3>
          <p className="rightText"> .فوری رجسٹریشن کے ساتھ عمل 5 سے 10 منٹ لیتا ہے</p>
        </div></>}
    </>
  );
}

export default CopyofFIR;
