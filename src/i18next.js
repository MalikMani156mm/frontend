import i18next from 'i18next'
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next} from "react-i18next"

i18next.use(LanguageDetector).use(initReactI18next).init({
    debug:true,
    fallbackLng:"eng",
    resources:{
        eng:{
            translation:{
                title: "Police Character Certificate:",
                description:"Police Character Certificate is required for travelling abroad, jobs in different organizations abroad, immigration etc. Previously, getting character certificate was a complex and time-taking process not just for citizens but for the police too. Police Khidmat Markaz has simplified and made it time-efficient.",
                subHeading:"Required Documents:",
            },  
        },     
        ar:{
        translation:{
            title: "پولیس کریکٹر سرٹیفکیٹ:",
            description:" بیرون ملک سفر، ملازمت کے لیے پولیس کریکٹر سرٹیفکیٹ ضروری ہے۔ بیرون ملک مختلف تنظیموں، امیگریشن وغیرہ میں پہلے،  کریکٹر سرٹیفکیٹ حاصل کرنا ایک پیچیدہ اور وقت لینے والا عمل تھا۔ نہ صرف شہریوں کے لیے بلکہ پولیس کے لیے بھی۔ پولیس خدمت مرکز نے آسانیاں پیدا کر دیں۔ اسے وقت کے قابل بنایا۔ ",
            subHeading:"مطلوبہ دستاویزات:",
            
        }
    }    
    }
})