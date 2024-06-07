import React, { useEffect } from "react";
import styles from "./LanguageButton.module.css"
import { useTranslation } from "react-i18next";

const Languages=[
    {code:"eng", lang:"English"},
    {code:"ar", lang:"Urdu"}
]


function LanguageButton(){
    const handleLanguage = (lng)=>{
        i18n.changeLanguage(lng);
    }
    const {i18n} = useTranslation();

    useEffect(()=>{
        console.log(i18n.dir());
        document.body.dir= i18n.dir();
    },[i18n,i18n.language])

    return(
        <>
        <div className={styles.container}>
            {Languages.map((lng)=>{
                return(
                    <button className={lng.code === i18n.language ? styles.selected: ""} key={lng.code} onClick={()=>handleLanguage(lng.code)}>
                        {lng.lang}
                    </button>
                )
            })}
        </div>
        </>

    );

}

export default LanguageButton;