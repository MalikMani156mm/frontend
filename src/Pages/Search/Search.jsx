import React from "react";
import styles from "./Search.module.css"

function Search() {


    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <b>Search Complaints</b>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Year</div>
                        <div>
                            <select name="Year" className={styles.formControl}>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                                <option>2009</option>
                                <option>2008</option>
                                <option>2007</option>
                                <option>2006</option>
                                <option>2005</option>
                                <option>2004</option>
                                <option>2003</option>
                                <option>2002</option>
                                <option>2001</option>
                                <option>2000</option>
                                <option>1999</option>
                                <option>1998</option>
                                <option>1997</option>
                                <option>1996</option>
                                <option>1995</option>
                                <option>1994</option>
                                <option>1993</option>
                                <option>1992</option>
                                <option>1991</option>
                                <option>1990</option>
                                <option>1989</option>
                                <option>1988</option>
                                <option>1987</option>
                                <option>1986</option>
                                <option>1985</option>
                                <option>1984</option>
                                <option>1983</option>
                                <option>1982</option>
                                <option>1981</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Province</div>
                        <div>
                            <select name="Province" className={styles.formControl}>
                                <option value="1">ICT Islamabad</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>District</div>
                        <div>
                            <select name="District" className={styles.formControl}>
                                <option value="1">Select</option>
                                <option value="2">Islamabad</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Division</div>
                        <div>
                            <select name="Division" className={styles.formControl}>
                                <option value="0">Select</option>
                                <option value="1">City</option>
                                <option value="1">Saddar</option>
                                <option value="1">Industrial Area</option>
                                <option value="1">Rural</option>
                                <option value="1">Soan</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Circle</div>
                        <div>
                            <select name="Circle" className={styles.formControl}>
                                <option value="0">Select</option>
                                <option value="1">Sabzi Mandi</option>
                                <option value="2">Secretariat</option>
                                <option value="4">Kohsar</option>
                                <option value="5">Bhara Kahu</option>
                                <option value="8">Margalla</option>
                                <option value="11">Tarnol</option>
                                <option value="13">Saddar</option>
                                <option value="14">Shalimar</option>
                                <option value="16">I-9 Industrial Area</option>
                                <option value="19">Shehzad Town</option>
                                <option value="21">Sihala</option>
                                <option value="25">Koral</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Police Station</div>
                        <div>
                            <select name="Police Station" className={styles.formControl}>
                                <option value="0">Select</option>
                                <option value="1">PS Sabzi Mandi</option>
                                <option value="2">PS Secretariat</option>
                                <option value="3">PS Abpara</option>
                                <option value="4">PS Kohsar</option>
                                <option value="5">PS Bhara Kahu</option>
                                <option value="6">PS Phulgaran</option>
                                <option value="7">PS Bani Gala</option>
                                <option value="8">PS Margalla</option>
                                <option value="9">PS Karachi Company</option>
                                <option value="10">PS Golra</option>
                                <option value="11">PS Tarnol</option>
                                <option value="12">PS Sangjani</option>
                                <option value="13">PS Sumbal</option>
                                <option value="14">PS Shalimar</option>
                                <option value="15">PS Ramna</option>
                                <option value="16">PS I-9 Industrial Area</option>
                                <option value="17">PS Noon</option>
                                <option value="18">PS Shams Colony</option>
                                <option value="19">PS Shehzad Town</option>
                                <option value="20">PS Khanna</option>
                                <option value="21">PS Sihala</option>
                                <option value="22">PS Humak</option>
                                <option value="23">PS Lohi Bher</option>
                                <option value="24">PS Nilore</option>
                                <option value="25">PS Koral</option>
                                <option value="26">PS Kirpa</option>
                                <option value="27">PS Women</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Name</div>
                        <div>
                            <input type="text" name="Name" className={styles.formControl} />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Father / Guardian Name</div>
                        <div>
                            <input
                                type="text"
                                name="GuardianName"
                                className={styles.formControl}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>CNIC</div>
                        <div>
                            <input type="number" name="CNIC" className={styles.formControl} />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Contact Number</div>
                        <div>
                            <input
                                type="number"
                                name="ContactNumber"
                                className={styles.formControl}
                            />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>E-Tag</div>
                        <div>
                            <input type="number" name="ETag" className={styles.formControl} />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Status</div>
                        <div>
                            <select name="Status" className={styles.formControl}>
                                <option value="1">Select</option>
                                <option value="2">Active</option>
                                <option value="3">Pending</option>
                                <option value="4">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.row1}>
                    <div className={styles.column}>
                        <div className={styles.label}>Filed Reason</div>
                        <div>
                            <select name="FiledReason" className={styles.formControl}>
                                <option value="1">Select</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Is complaint satisfied</div>
                        <div>
                            <select name="ICS" className={styles.formControl}>
                                <option value="1">Select</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <button className={styles.SearchButton} type="submit">
                    Search
                </button>
            </div>
        </div>
    );
}

export default Search;