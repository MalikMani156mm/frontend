import React, { useState } from "react";
import styles from "./Search.module.css";
import { useFormik } from "formik";
import ReactPaginate from "react-paginate";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import LoadingSpinner from "../../Components/Loading/Loading";
import { useGetSearchFIRsQuery } from "../../Redux/Features/FIR/FIRApi";

function Search() {

    const { data: psdata, error: psError, isLoading: psLoading } = useGetAllPoliceStationsQuery();
    const navigate = useNavigate();
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
    let Url = `?page=${page}&year=${year}&province=${province}&district=${district}&division=${division}&circle=${circle}&policeStation=${policeStation}&name=${name}&guardianName=${guardianName}&cnic=${cnic}&contactNumber=${contactNumber}&complaintNumber=${complaintNumber}&status=${status}`;
    const { isLoading, data, error } = useGetSearchFIRsQuery(Url);

    const handlePageChange = (e) => {
        setPage(e.selected + 1);
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
                    {/* <div className={styles.row1}>
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
                    </div> */}
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
                        <div className={styles.row4}>
                            <div className={styles.cell1}>Complaint No</div>
                            <div className={styles.cell1}>Category</div>
                            <div className={styles.cell1}>Offence</div>
                            <div className={styles.cell1}>Date</div>
                            <div className={styles.cell1}>Status</div>
                        </div>
                        {
                            data.FIRs && data.FIRs.map(firs => (
                                <>
                                    <div className={styles.row4} key={firs._id}>
                                        <div className={styles.cell1}>{firs.ComplaintNumber}</div>
                                        <div className={styles.cell1}>{firs.Category}</div>
                                        <div className={styles.cell1}>{firs.Offence}</div>
                                        <div className={styles.cell1}>{firs.EntryDate}</div>
                                        <div className={styles.cell1}>{firs.Status}</div>
                                        <div><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                                    </div>
                                </>
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
                    /></>}
                   </> : null}
        </div>
    );
}

export default Search;