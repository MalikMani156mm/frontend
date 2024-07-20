import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { useFormik } from "formik";
import ReactPaginate from "react-paginate";
import { Navigate } from "react-router-dom";
import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import { useGetSearchFIRsQuery } from "../../Redux/Features/FIR/FIRApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown19, faArrowDownAZ, faArrowUp91, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

function Search() {

    const { data: psdata, error: psError, isLoading: psLoading } = useGetAllPoliceStationsQuery();
    const [visible, setVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [year, setYear] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [division, setDivision] = useState("");
    const [circle, setCircle] = useState("");
    const [policeStation, setPoliceStation] = useState("");
    const [name, setName] = useState("");
    const [guardianName, setGuardianName] = useState("");
    const [cnic, setCNIC] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [complaintNumber, setComplaintNumber] = useState("");
    const [status, setStatus] = useState("");
    const [categories, setCategories] = useState([]);
    const [offences, setOffences] = useState([]);
    const [sort, setSort] = useState({ sort: "EntryDate", order: "desc" })
    let Url = `?sort=${sort.sort},${sort.order}&page=${page}&year=${year}&province=${province}&district=${district}&division=${division}&circle=${circle}&policeStation=${policeStation}&name=${name}&guardianName=${guardianName}&cnic=${cnic}&contactNumber=${contactNumber}&complaintNumber=${complaintNumber}&status=${status}`;
    const { isLoading, data, error } = useGetSearchFIRsQuery(Url);

    useEffect(() => {
        const fetchCategoriesAndOffences = async () => {
            try {
                const categoriesResponse = await fetch('http://localhost:5000/api/Categories');
                const offencesResponse = await fetch('http://localhost:5000/api/Offences');

                const categoriesData = await categoriesResponse.json();
                const offencesData = await offencesResponse.json();

                setCategories(Array.isArray(categoriesData) ? categoriesData : []);
                setOffences(Array.isArray(offencesData) ? offencesData : []);
            } catch (error) {
                console.error("Failed to fetch categories and offences", error);
            }
        };

        fetchCategoriesAndOffences();
    }, []);

    const getCategoryNameById = (id) => {
        const category = categories.find(cat => cat._id === id);
        return category ? category.Category : '';
    };

    const getOffenceNameById = (id) => {
        const offence = offences.find(off => off._id === id);
        return offence ? offence.Offence : '';
    };

    const handlePageChange = (e) => {
        setPage(e.selected + 1);
    };

    const handleSort = (field) => {
        setSort(prevSort => ({
            sort: field,
            order: prevSort.order === "asc" ? "desc" : "asc"
        }));
    };

    // eslint-disable-next-line
    const { values, touched, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
        initialValues: {
            Year: '',
            Province: '',
            District: '',
            Division: '',
            Circle: '',
            PoliceStation: '',
            Name: '',
            GuardianName: '',
            CNIC: '',
            ContactNumber: '',
            Status: '',
            ComplaintNumber: '',
        },
        onSubmit: async (values) => {
            setYear(values.Year);
            setProvince(values.Province);
            setDistrict(values.District);
            setDivision(values.Division);
            setCircle(values.Circle);
            setPoliceStation(values.PoliceStation);
            setName(values.Name);
            setGuardianName(values.GuardianName);
            setCNIC(values.CNIC);
            setContactNumber(values.ContactNumber);
            setStatus(values.Status);
            setComplaintNumber(values.ComplaintNumber)
            setVisible(true);
        }
    });
    if (psLoading || isLoading) {
        return <div><LoadingSpinner /></div>;
    }

    if (psError || error) {
        return <Navigate to={'*'} replace={true} />
    }
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <b>Search Complaints</b>
                </div>
                <form action="" method="post" onSubmit={handleSubmit} className={styles.size}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.label}>Year</div>
                            <div>
                                <select name="Year" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
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
                                <select name="Province" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value="">Select</option>
                                    <option value="ICT Islamabad">ICT Islamabad</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>District</div>
                            <div>
                                <select name="District" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value="">Select</option>
                                    <option value="Islamabad">Islamabad</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Division</div>
                            <div>
                                <select name="Division" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value="">Select</option>
                                    <option value="City">City</option>
                                    <option value="Saddar">Saddar</option>
                                    <option value="Industrial Area">Industrial Area</option>
                                    <option value="Rural">Rural</option>
                                    <option value="Soan">Soan</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Circle</div>
                            <div>
                                <select name="Circle" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value="">Select</option>
                                    <option value="Sabzi Mandi">Sabzi Mandi</option>
                                    <option value="Secretariat">Secretariat</option>
                                    <option value="Kohsar">Kohsar</option>
                                    <option value="Bhara Kahu">Bhara Kahu</option>
                                    <option value="Margalla">Margalla</option>
                                    <option value="Tarnol">Tarnol</option>
                                    <option value="Saddar">Saddar</option>
                                    <option value="Shalimar">Shalimar</option>
                                    <option value="Industrial Area">Industrial Area</option>
                                    <option value="Shehzad Town">Shehzad Town</option>
                                    <option value="Sihala">Sihala</option>
                                    <option value="Koral">Koral</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Police Station</div>
                            <div>
                                <select name="PoliceStation" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value="">Select</option>
                                    {
                                        psdata && psdata.map(PS => (
                                            <option value={PS._id} key={PS._id}>{PS.PSName}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.label}>Name</div>
                            <div>
                                <input type="text" name="Name" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Father / Guardian Name</div>
                            <div>
                                <input
                                    type="text"
                                    name="GuardianName"
                                    className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>CNIC</div>
                            <div>
                                <input type="number" name="CNIC" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Contact Number</div>
                            <div>
                                <input
                                    type="number"
                                    name="ContactNumber"
                                    className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Complaint Number</div>
                            <div>
                                <input
                                    type="text" name="ComplaintNumber" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.label}>Status</div>
                            <div>
                                <select name="Status" className={styles.formControl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value="">Select</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Filed">Filed</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonDiv}>
                        <button className={styles.SearchButton} type="submit">
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                    </div>
                </form >
            </div>
            {visible ? <>
                {data.FIRs && data.FIRs.length === 0 ?
                    <h3>
                        No FIR Found...
                    </h3>
                    : <>
                        <div className={styles.container4}>
                            <div className={`${styles.row4} ${styles.fullrow}`}>
                                <div className={styles.cell}>Complaint No {sort.sort === 'ComplaintNumber' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ComplaintNumber")} /> :
                                    <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ComplaintNumber")} />} </div>
                                <div className={styles.cell}>Name {sort.sort === 'Name' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Name")} /> :
                                    <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Name")} />}</div>
                                <div className={styles.cell}>Mobile No {sort.sort === 'ContactNumber' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("ContactNumber")} /> :
                                    <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("ContactNumber")} />} </div>
                                <div className={styles.cell}>CNIC {sort.sort === 'CNIC' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("CNIC")} /> :
                                    <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("CNIC")} />} </div>
                                <div className={styles.cell}>Category {sort.sort === 'Category' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Category")} /> :
                                    <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Category")} />} </div>
                                <div className={styles.cell}>Offence {sort.sort === 'Offence' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Offence")} /> :
                                    <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Offence")} />}</div>
                                <div className={styles.cell}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                                    <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                                <div className={styles.cell}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                                    <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                                    <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                            </div>
                            {
                                data.FIRs && data.FIRs.map(firs => (
                                    <div className={styles.table}>
                                        <div className={`${styles.resprow}`}>
                                            <div className={styles.cell}>Complaint No {sort.sort === 'ComplaintNumber' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ComplaintNumber")} /> :
                                                <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ComplaintNumber")} />} </div>
                                            <div className={styles.cell}>Name {sort.sort === 'Name' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Name")} /> :
                                                <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Name")} />}</div>
                                            <div className={styles.cell}>Mobile No {sort.sort === 'ContactNumber' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("ContactNumber")} /> :
                                                <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("ContactNumber")} />} </div>
                                            <div className={styles.cell}>CNIC {sort.sort === 'CNIC' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("CNIC")} /> :
                                                <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("CNIC")} />} </div>
                                            <div className={styles.cell}>Category {sort.sort === 'Category' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Category")} /> :
                                                <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Category")} />} </div>
                                            <div className={styles.cell}>Offence {sort.sort === 'Offence' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Offence")} /> :
                                                <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Offence")} />}</div>
                                            <div className={styles.cell}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                                                <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                                            <div className={styles.cell}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                                                <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                                                <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                                        </div>
                                        <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                                            <div className={styles.cell}>{firs.ComplaintNumber}</div>
                                            <div className={styles.cell}>{firs.Name}</div>
                                            <div className={styles.cell}>{`0${firs.ContactNumber}`}</div>
                                            <div className={styles.cell}>{firs.CNIC}</div>
                                            <div className={styles.cell}>{getCategoryNameById(firs.Category)}</div>
                                            <div className={styles.cell}>{getOffenceNameById(firs.Offence)}</div>
                                            <div className={styles.cell}>{firs.EntryDate}</div>
                                            <div className={styles.cell}>{firs.Status}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <ReactPaginate
                            breakLabel={"..."} // break Label
                            nextLabel={"next"} // Next Page Button & label
                            previousLabel={"previous"} // Previous Page Button & label
                            pageCount={data.pageCount} Sets Page Counts
                            marginPagesDisplayed={1} // Sets Ending pages range
                            pageRangeDisplayed={5} // Sets Starting pages range
                            onPageChange={(e) => handlePageChange(e)}

                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            pageLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            activeClassName="active"
                        />
                        <h2>{data.total} Records Found</h2>
                    </>}
            </> : null}
        </div>
    );
}

export default Search;