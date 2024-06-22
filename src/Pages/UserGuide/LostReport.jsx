import React, { useState } from "react";

function LostReport() {

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
        <h1>Lost Report:</h1>
        <p>
          When filing a report for a lost CNIC, license, or other critical
          belongings, ensure you bring along the following documents in case you
          visit Police Khidmat Markaz located at Sector F-6/1,H-11 Police Lines
          or any nearest Police Station:
        </p>
        <h3>Required Documents:</h3>
          <ol>
            <li>
              <h5>In case of Missing / Loss of CNIC & Islamabad Driving License.
              </h5>
              <ul>
                <li><p> Copy of CNIC & Copy of Driving License.</p></li>
                <li><p> No affidavit is required.</p></li>
              </ul>
            </li>
            <li>
              <h5>In case of Missing / Loss of other items.</h5>
              <ul>
                <li><p>Copy of CNIC.</p></li>
                <li><p> An Affidavit.</p></li>
              </ul>
            </li>
            <li>
              <h5>
                Consult concerned Police Station, in case of Missing / Loss of
                following items.
              </h5>
              <ul>
                <li><p> Property Documents.</p></li>
                <li><p> Arms License.</p></li>
                <li><p> Cheque Book, Bank Pay Order, Saving Certificate, etc.</p></li>
              </ul>
            </li>
            <li>
              <h5> In case of Missing / Loss of Vehicles Documents.</h5>
              <ul>
                <li><p> Copy of CNIC.</p></li>
                <li><p> An affidavit.</p></li>
                <li>
                  <p>
                  Pictures of Engine No and Chassis No on Plain Page and Black &
                  White Or Color Prints Both are Acceptable.</p>
                </li>
                <li>
                  <p>Vehicle will be inspected by Vehicle Verification Officer.</p>
                </li>
              </ul>
            </li>
            <li>
              <h5>Applicant must be present.</h5>
            </li>
          </ol>
      </div>
      </>:<>
      <div className="container">
        <h1>:گمشدہ رپورٹ</h1>
        <p>
        جب آپ قومی شناختی کارڈ، لائسنس یا دیگر اہم اشیاء کے لئے رپورٹ درج کرتے ہیں، تو یقینی بنائیں کہ آپ کے پاس درج ذیل دستاویزات ہیں، اگر آپ سیکٹر ایف-6/1، ایچ-11 پولیس لائنز یا کسی قریبی پولیس اسٹیشن جاتے ہیں
        </p>
        <h3 className="urduH3"> :درکار دستاویزات</h3>
          <ol className="urduOl">
            <li>
              <h5 className="urduH3">
                 : اگر قومی شناختی کارڈ یا اسلام آباد ڈرائیونگ لائسنس گم ہو جائے یا چوری ہو جائے، تو آپ کو درج ذیل دستاویزات لے جانا چاہئے *
              </h5>
              <ul className="urduOl">
                <li><p> قومی شناختی کارڈ کی کاپی اور ڈرائیونگ لائسنس کی کاپی۔ -</p></li>
                <li><p> کوئی افیڈیوٹ درکار نہیں ہے۔ -</p></li>
              </ul>
            </li>
            <li>
              <h5 className="urduH3"> : دوسری اشیاء کی کمی یا گم ہونے کی صورت میں *</h5>
              <ul className="urduOl">
                <li><p> قومی شناختی کارڈ کی کاپی۔ -</p></li>
                <li><p> ایک افیڈیوٹ۔ -</p></li>
              </ul>
            </li>
            <li>
              <h5 className="urduH3"> : اگر مندرجہ ذیل اشیاء گم ہو جائیں یا چوری ہو جائیں، تو متعلقہ پولیس اسٹیشن سے رابطہ کریں *</h5>
              <ul className="urduOl">
                <li><p> جائیداد کے دستاویزات۔ -</p></li>
                <li><p> بندوق کا لائسنس -</p></li>
                <li><p> چیک بک، بینک پے آرڈر، بچت سرٹیفکیٹ وغیرہ۔ -</p></li>
              </ul>
            </li>
            <li>
              <h5 className="urduH3"> : گم ہونے یا کھو جانے کی صورت میں گاڑی کے دستاویزات *</h5>
              <ul className="urduOl">
                <li><p> قومی شناختی کارڈ کی کاپی۔ -</p></li>
                <li><p> ایک افیڈیوٹ۔ -</p></li>
                <li>
                <p> انجن نمبر اور چیسس نمبر کی تصاویر، سادہ صفحے پر اور سیاہ و سفید یا رنگین پرنٹ دونوں قابل قبول ہیں۔ -</p>
                </li>
                <li>
                <p> گاڑی اور دستاویزات کو گاڑی کی تصدیق افسر کی زیر نگرانی میں جائے گا۔ -</p>
                </li>
              </ul>
            </li>
            <li>
              <h5 className="urduH3"> درخواست دینے والا خود موجود ہونا ضروری ہے۔ *</h5>
            </li>
          </ol>
      </div>
      </>}
    </>
  );
}

export default LostReport;
