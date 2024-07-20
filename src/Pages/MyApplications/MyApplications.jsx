import styles from "./MyApplications.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faRightLeft, faHandshake, faFlag, faPrint, faRemove, faArrowDownAZ, faArrowDown19, faArrowUpZA, faArrowUp91 } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'react-tooltip';
import { useGetAllFIRsQuery, useGetCitizensFIRsQuery, useGetPoliceStationFIRsQuery, useGetAllFIRcountQuery, useGetCitizensFIRcountQuery, useGetPoliceStationFIRcountQuery, useChangeFIRStatusMutation, useChangeFIRPoliceStationMutation } from "../../Redux/Features/FIR/FIRApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/Slices/CartSlice";
import LoadingSpinner from "../../Components/Loading/Loading";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stars from "../../Components/Stars/Stars";
import TransferAlert from "../../Components/CustomAlert/TransferAlert";
import MeetingMessageBox from "../../Components/CustomAlert/MeetingMessageBox";
import { useSendMeetingMessageMutation } from "../../Redux/Features/Admin/adminApi";
import { useGetCitizensCertificatesQuery, useGetPoliceStationCertificatesQuery } from "../../Redux/Features/Certificates/CertificateAPI";
import { useGetCitizensRequestsQuery, useGetPoliceStationRequestsQuery } from "../../Redux/Features/VehicleVerification/VVApi";


function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MyApplications() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const Id = user.PoliceStation;

  const role = "Admin";
  const Role = "SuperAdmin";
  const cRole = "Citizen";

  const [sort, setSort] = useState({ sort: "EntryDate", order: "desc" })
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showTransferBox, setShowTransferBox] = useState(false);
  const [showMeetingBox, setShowMeetingBox] = useState(false);
  const [policeStation, setPoliceStation] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [offences, setOffences] = useState([]);
  const [isFIR, setIsFIR] = useState(true);
  let url = `?sort=${sort.sort},${sort.order}&page=${page}&search=${debouncedSearch}&limit=${limit}`;
  let pUrl = `?sort=${sort.sort},${sort.order}&page=${page}&search=${debouncedSearch}&limit=${limit}&policeStation=${Id}`;
  let cUrl = `?sort=${sort.sort},${sort.order}&page=${page}&search=${debouncedSearch}&limit=${limit}&cnic=${user.cnic}`;
  const dUrl = '';
  const pcUrl = `?policeStation=${Id}`;
  const ccUrl = `?cnic=${user.cnic}`;
  const { isLoading, data, error, refetch } = useGetAllFIRsQuery(url);
  const { isLoading: dLoading, data: dData, error: dError, refetch: dRefetch } = useGetAllFIRcountQuery(dUrl);
  const { isLoading: pLoading, data: pData, error: pError, refetch: PSRefetch } = useGetPoliceStationFIRsQuery(pUrl);
  const { isLoading: cerLoading, data: cerData, error: cerError, refetch: cerRefetch } = useGetPoliceStationCertificatesQuery(pUrl);
  const { isLoading: ccerLoading, data: ccerData, error: ccerError, refetch: ccerRefetch } = useGetCitizensCertificatesQuery(cUrl);
  const { isLoading: vvLoading, data: vvData, error: vvError, refetch: vvRefetch } = useGetPoliceStationRequestsQuery(url);
  const { isLoading: cvvLoading, data: cvvData, error: cvvError, refetch: cvvRefetch } = useGetCitizensRequestsQuery(cUrl);
  console.log(ccerData);
  console.log(cvvData);
  const { isLoading: pcLoading, data: pcData, error: pcError, refetch: PSCRefetch } = useGetPoliceStationFIRcountQuery(pcUrl);
  const { isLoading: cLoading, data: cData, error: cError, refetch: CRefetch } = useGetCitizensFIRsQuery(cUrl);
  const { isLoading: ccLoading, data: ccData, error: ccError, refetch: CCRefetch } = useGetCitizensFIRcountQuery(ccUrl);
  const [updateStatus, { error: csError }] = useChangeFIRStatusMutation();
  const [updatePoliceStation, { error: upsError }] = useChangeFIRPoliceStationMutation();
  const [sendMeetingMessage, { error: messageError }] = useSendMeetingMessageMutation();

  const [showIcon, setShowIcon] = useState(() => {
    const storedState = localStorage.getItem("showIcon");
    return storedState ? JSON.parse(storedState) : {};
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user.role === Role) {
        refetch();
        dRefetch();
      } else if (user.role === role) {
        PSRefetch();
        PSCRefetch();
        cerRefetch();
        vvRefetch();
      } else {
        CRefetch();
        CCRefetch();
        ccerRefetch();
        cvvRefetch();
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [user.role, refetch, dRefetch, PSRefetch, PSCRefetch, CRefetch, CCRefetch, cerRefetch, vvRefetch, cvvRefetch, ccerRefetch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

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

  const handleSort = (field) => {
    setSort(prevSort => ({
      sort: field,
      order: prevSort.order === "asc" ? "desc" : "asc"
    }));
  };

  const SetStatusHandler = async (id, value) => {
    const res = await updateStatus({ id, data: { Status: value } }).unwrap();
    console.log(res);
    if (res.success) {
      toast.success(res.message);
    }
    else {
      toast.error(res.message);
    }

  }

  const handleTransferBox = async (id) => {
    setId(id);
    setShowTransferBox(true);
  };

  const handleConfirmTransferBox = async () => {
    console.log(id);
    const res = await updatePoliceStation({ id, data: { PoliceStation: policeStation } }).unwrap();
    setShowTransferBox(false);
    if (res.success) {
      toast.success(res.message);
    }
    else {
      toast.error(res.message);
    }
  };

  const handleCancelTransferBox = () => {
    setShowTransferBox(false);
  };

  const handleMeetingBox = async (id) => {
    setId(id);
    setShowMeetingBox(true);
  };

  const handleConfirmMeetingBox = async () => {
    console.log(id);
    const res = await sendMeetingMessage({ id, data: { message: message } }).unwrap();
    setShowMeetingBox(false);
    if (res.success) {
      toast.success(res.message);
    }
    else {
      toast.error(res.message);
    }
  };
  const handleCancelMeetingBox = () => {
    setShowMeetingBox(false);
  };

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [target1, setTarget1] = useState(0);
  const [target2, setTarget2] = useState(0);
  const [target3, setTarget3] = useState(0);
  const [target4, setTarget4] = useState(0);

  useEffect(() => {
    if (user.role === Role) {
      if (dData) {
        setTarget1(dData.total);
      }
    } else if (user.role === role) {
      if (pcData) {
        setTarget1(pcData.totalPoliceStaionFIRs);
      }
    } else {
      if (ccData) {
        setTarget1(ccData.totalCitizenFIRs);
      }

    }
  }, [dData, pcData, ccData, user.role]);

  useEffect(() => {
    if (user.role === Role) {
      if (dData) {
        setTarget2(dData.totalFiled);
      }
    } else if (user.role === role) {
      if (pcData) {
        setTarget2(pcData.totalPoliceStaionFiledFIRsTotal);
      }
    } else {
      if (ccData) {
        setTarget2(ccData?.totalCitizenFiledFIRsTotal);
      }
    }
  }, [dData, pcData, ccData, user.role]);

  useEffect(() => {
    if (user.role === Role) {
      if (dData) {
        setTarget3(dData.totalPending);
      }
    } else if (user.role === role) {
      if (pcData) {
        setTarget3(pcData.totalPoliceStaionPendingFIRsTotal);
      }
    } else {
      if (ccData) {
        setTarget3(ccData?.totalCitizenPendingFIRsTotal);
      }
    }
  }, [dData, pcData, ccData, user.role]);

  useEffect(() => {
    if (user.role === Role) {
      if (dData) {
        setTarget4(dData.totalCompleted);
      }
    } else if (user.role === role) {
      if (pcData) {
        setTarget4(pcData.totalPoliceStaionCompletedFIRsTotal);
      }
    } else {
      if (ccData) {
        setTarget4(ccData?.totalCitizenCompletedFIRsTotal);
      }
    }
  }, [dData, pcData, ccData, user.role]);

  useEffect(() => {
    const animateCount = (currentCount, targetCount, setter) => {
      const increment = targetCount > currentCount ? 1 : -1;
      const speed = 10; // milliseconds

      const timer = setInterval(() => {
        if (currentCount === targetCount) {
          clearInterval(timer);
        } else {
          setter((prevCount) => {
            if (prevCount !== targetCount) {
              return prevCount + increment;
            } else {
              return prevCount;
            }
          });
        }
      }, speed);

      return () => clearInterval(timer);
    };

    animateCount(count1, target1, setCount1);
    animateCount(count2, target2, setCount2);
    animateCount(count3, target3, setCount3);
    animateCount(count4, target4, setCount4);
  }, [count1, count2, count3, count4, target1, target3, target2, target4]);

  const handleChangePassword = () => {
    if (user.role === Role) {
      navigate("/admin/ConfirmPassword");
    } else if (user.role === role) {
      navigate("/adminConfirmPassword");
    } else {
      navigate("/ConfirmPassword");
    }
  }

  const handleChangeUsername = () => {
    navigate("/ChangeUsername");
  }

  const handleChangeAdminName = () => {
    navigate("/adminNewName");
  }

  const handleAddPoliceStation = () => {
    navigate("/AddPoliceStation");
  }

  const handleViewMessages = () => {
    navigate("/ViewMessages");
  }

  const handleUpdatePoliceStation = () => {
    navigate(`/UpdatePoliceStation/${Id}`);
  }

  const handleDeletePoliceStation = () => {
    navigate('/DeletePoliceStation');
  }

  const handleAddAdmin = () => {
    navigate('/AddAdmin');
  }

  const handleAddOffence = () => {
    if (user.role === Role) {
      navigate('/admin/AddOffence');
    } else {
      navigate('/AddOffence');
    }
  }

  const handleAddCategory = () => {
    if (user.role === Role) {
      navigate('/admin/AddCategory');
    } else {
      navigate('/AddCategory');
    }
  }

  useEffect(() => {
    localStorage.setItem("showIcon", JSON.stringify(showIcon));
  }, [showIcon]);

  const handleCart = (FIRData) => {
    dispatch(addToCart(FIRData));
    setShowIcon((prevShowIcon) => ({
      ...prevShowIcon,
      [FIRData._id]: !prevShowIcon[FIRData._id],
    }));
  }
  const handleRemove = (FIRData) => {
    dispatch(removeFromCart(FIRData));
    setShowIcon((prevShowIcon) => ({
      ...prevShowIcon,
      [FIRData._id]: !prevShowIcon[FIRData._id],
    }));
  }

  const toggler = () => {
    setIsFIR(prevIsFIR => !prevIsFIR);
  };

  const handlePageChange = (e) => {
    setPage(e.selected + 1);
  };

  if (error || cError || pError || dError || ccError || pcError || csError || upsError || messageError || cerError || vvError || cvvError || ccerError) {
    return (<>
      <h1 style={{ textAlign: 'center' }}>Something Wrong Happened</h1>
      <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
      <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
    </>)
  }
  if (isLoading || dLoading || pLoading || pcLoading || cLoading || ccLoading || cerLoading || vvLoading || cvvLoading || ccerLoading) {
    return <div><LoadingSpinner /></div>;
  }



  return (
    <>
      <div className={styles.topBarBody}>
        <div className={styles.topBar}>
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Settings
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {(user && Role === user.role) ? <>
                <li><button className="dropdown-item" type="button" onClick={handleAddPoliceStation}>Add Police Station</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleDeletePoliceStation}>Delete Police Station</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddAdmin}>Add Admin</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleViewMessages}>View Messages</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddCategory}>Add Category</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddOffence}>Add Offence</button></li>
              </> : null}
              {(user && role === user.role) ? <>
                <li><button className="dropdown-item" type="button" onClick={handleUpdatePoliceStation}>Update Police Station</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddCategory}>Add Category</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddOffence}>Add Offence</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleChangeAdminName}>Change Username</button></li>
              </> : null}
              {(user && cRole === user.role) ? <>
                <li><button className="dropdown-item" type="button" onClick={handleChangeUsername}>Change Username</button></li>
              </> : null}
              <li><button className="dropdown-item" type="button" onClick={handleChangePassword}>Change Password</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.infoBody}>
        <div className={styles.Info}>
          <div className={styles.infoRow}>
            {(user && Role === user.role) ?
              <div className={styles.avatarIG}></div>
              : (role === user.role) ? <div className={styles.avatarPolice}></div> : <div className={styles.avatarCitizen}></div>}
            <div className={styles.infoColumn}>
              {(user && (role === user.role || Role === user.role)) ?
                <div className={styles.name}>Welcome, {user.name}</div> :
                <div className={styles.name}>Hi,{user.name}</div>}
              <div className={styles.email}>{user.email}</div>
              <div className={styles.role}>{user.role}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.header}>
            <b>Complaints</b>
          </div>
          <div className={styles.boxesContainer}>
            <div className={styles.box1}>
              <div className={styles.num}>{formatNumberWithCommas(count1)}</div>
              <div className={styles.text}>Total</div>
            </div>
            <div className={styles.box2}>
              <div className={styles.num}>{formatNumberWithCommas(count2)}</div>
              <div className={styles.text}>Filed</div>
            </div>
            <div className={styles.box3}>
              <div className={styles.num}>{formatNumberWithCommas(count3)}</div>
              <div className={styles.text}>Pending</div>
            </div>
            <div className={styles.box4}>
              <div className={styles.num}>{formatNumberWithCommas(count4)}</div>
              <div className={styles.text}>Completed</div>
            </div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.row5}>
            <div className={styles.row5}>
              <div className={styles.label}>Show</div>
              <select name="showEntries" className={styles.formControl2} onChange={(e) => setLimit(e.target.value)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <div className={styles.label}>entries</div>
            </div>
            <div className={styles.row3}>
              <div className={styles.label}>Search:</div>
              <input type="text" name="Search" className={styles.formControl3} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        {(user && Role === user.role) ?
          <>
            {data && data?.FIRs?.length === 0 ? <h2>No FIR Registered Yet</h2> :
              <div className={styles.container0}>
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
                  <div className={styles.cell}>Actions</div>
                </div>
                {
                  data?.FIRs && data?.FIRs.map(firs => (
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
                        <div className={styles.cell}>Actions</div>
                      </div>
                      <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                        <div className={styles.cell}>{firs.ComplaintNumber}</div>
                        <div className={styles.cell}>{firs.Name}</div>
                        <div className={styles.cell}>{`0${firs.ContactNumber}`}</div>
                        <div className={styles.cell}>{firs.CNIC}</div>
                        <div className={styles.cell}>{getCategoryNameById(firs.Category)}</div>
                        <div className={styles.cell}>{getOffenceNameById(firs.Offence)}</div>
                        <div className={styles.cell}>{firs.EntryDate}</div>
                        <div className={styles.cell}>
                          <select name="status" id="status" className={`form-control ${styles.select}`} defaultValue={firs.Status} onChange={(e) => SetStatusHandler(firs._id, e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="approved">approved</option>
                            <option value="filed">Filed</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <div className={`${styles.cell} ${styles.icon}`}>
                          <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" onClick={() => { navigate(`/ViewFIR/${firs._id}`) }} />
                          <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" onClick={() => { navigate(`/DownloadFIRPDF/${firs._id}`) }} />
                          <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" onClick={() => handleMeetingBox(firs._id)} />
                          <FontAwesomeIcon icon={faRightLeft} data-tooltip-id="Tooltip" data-tooltip-content="Trasfer" onClick={() => handleTransferBox(firs._id)} />
                          {showIcon[firs._id] ? <FontAwesomeIcon icon={faRemove} data-tooltip-id="Tooltip" data-tooltip-content="Remove From Priority" onClick={() => handleRemove(firs)} />
                            : <FontAwesomeIcon icon={faFlag} onClick={() => handleCart(firs)} data-tooltip-id="Tooltip" data-tooltip-content="Add to Priority" />
                          }
                          <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>}
            <ReactPaginate
              breakLabel={"..."} // break Label
              nextLabel={"next"} // Next Page Button & label
              previousLabel={"previous"} // Previous Page Button & label
              pageCount={data.pageCount} // Sets Page Counts
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
            /></> : null}




        {(user && role === user.role) ? <>

          <div className={styles.buttonBody}>
            <div className={styles.uiCheck}>
              <button className={styles.checkButton} onClick={toggler}>
                <input type="checkbox" />
                <strong></strong>
                <label></label>
              </button>
            </div>
          </div>
          {isFIR ?
            <>
              {pData && pData?.PoliceStaionFIRs.length === 0 ? <h2>No FIR Registered Yet</h2> :
                <div className={styles.container0}>
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
                    <div className={styles.cell}>Actions</div>
                  </div>
                  {
                    pData?.PoliceStaionFIRs && pData?.PoliceStaionFIRs.map(firs => (
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
                          <div className={styles.cell}>Actions</div>
                        </div>
                        <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                          <div className={styles.cell}>{firs.ComplaintNumber}</div>
                          <div className={styles.cell}>{firs.Name}</div>
                          <div className={styles.cell}>{`0${firs.ContactNumber}`}</div>
                          <div className={styles.cell}>{firs.CNIC}</div>
                          <div className={styles.cell}>{getCategoryNameById(firs.Category)}</div>
                          <div className={styles.cell}>{getOffenceNameById(firs.Offence)}</div>
                          <div className={styles.cell}>{firs.EntryDate}</div>
                          <div className={styles.cell}>
                            <select name="status" id="status" className={`form-control ${styles.select}`} defaultValue={firs.Status} onChange={(e) => SetStatusHandler(firs._id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="approved">approved</option>
                              <option value="filed">Filed</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                          <div className={`${styles.cell} ${styles.icon}`}>
                            <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" onClick={() => { navigate(`/ViewFIR/${firs._id}`) }} />
                            <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" onClick={() => { navigate(`/DownloadFIRPDF/${firs._id}`) }} />
                            <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" onClick={() => handleMeetingBox(firs._id)} />
                            <FontAwesomeIcon icon={faRightLeft} data-tooltip-id="Tooltip" data-tooltip-content="Trasfer" onClick={() => handleTransferBox(firs._id)} />
                            {showIcon[firs._id] ? <FontAwesomeIcon icon={faRemove} data-tooltip-id="Tooltip" data-tooltip-content="Remove From Priority" onClick={() => handleRemove(firs)} />
                              : <FontAwesomeIcon icon={faFlag} onClick={() => handleCart(firs)} data-tooltip-id="Tooltip" data-tooltip-content="Add to Priority" />
                            }
                            <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                          </div>
                        </div>
                      </div>))
                  }
                </div>}</> : user.email === "15CarCell@gmail.com" ?
              <> {vvData && vvData?.Requests.length === 0 ? <h2>No Vehicle Verification Request found!</h2> :
                <div className={styles.container0}>
                  <div className={`${styles.row4} ${styles.fullrow}`}>
                    <div className={styles.cell}>Request No {sort.sort === 'RequestNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RequestNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RequestNumber")} />} </div>
                    <div className={styles.cell}>Name {sort.sort === 'Name' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Name")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Name")} />}</div>
                    <div className={styles.cell}>Mobile No {sort.sort === 'ContactNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("ContactNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("ContactNumber")} />} </div>
                    <div className={styles.cell}>CNIC {sort.sort === 'CNIC' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("CNIC")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("CNIC")} />} </div>
                    <div className={styles.cell}>Register No {sort.sort === 'RegistrationNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RegistrationNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RegistrationNumber")} />} </div>
                    <div className={styles.cell}>Car Maker {sort.sort === 'Make' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Make")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Make")} />}</div>
                    <div className={styles.cell}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                    <div className={styles.cell}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                    <div className={styles.cell}>Actions</div>
                  </div>
                  {
                    vvData?.Requests && vvData?.Requests.map(firs => (
                      <div className={styles.table}>
                        <div className={`${styles.resprow}`}>
                          <div className={styles.cell}>Request No {sort.sort === 'RequestNumber' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RequestNumber")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RequestNumber")} />} </div>
                          <div className={styles.cell}>Name {sort.sort === 'Name' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Name")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Name")} />}</div>
                          <div className={styles.cell}>Mobile No {sort.sort === 'ContactNumber' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("ContactNumber")} /> :
                            <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("ContactNumber")} />} </div>
                          <div className={styles.cell}>CNIC {sort.sort === 'CNIC' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("CNIC")} /> :
                            <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("CNIC")} />} </div>
                          <div className={styles.cell}>Register No {sort.sort === 'RegistrationNumber' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RegistrationNumber")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RegistrationNumber")} />} </div>
                          <div className={styles.cell}>Car Maker {sort.sort === 'Make' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Make")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Make")} />}</div>
                          <div className={styles.cell}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                            <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                          <div className={styles.cell}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                          <div className={styles.cell}>Actions</div>
                        </div>
                        <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                          <div className={styles.cell}>{firs.RequestNumber}</div>
                          <div className={styles.cell}>{firs.Name}</div>
                          <div className={styles.cell}>{`0${firs.ContactNumber}`}</div>
                          <div className={styles.cell}>{firs.CNIC}</div>
                          <div className={styles.cell}>{firs.RegistrationNumber}</div>
                          <div className={styles.cell}>{firs.Make}</div>
                          <div className={styles.cell}>{firs.EntryDate}</div>
                          <div className={styles.cell}>
                            <select name="status" id="status" className={`form-control ${styles.select}`} defaultValue={firs.Status} onChange={(e) => SetStatusHandler(firs._id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="verified">Verified</option>
                              <option value="stolen">Stolen</option>
                            </select>
                          </div>
                          <div className={`${styles.cell} ${styles.icon}`}>
                            <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" onClick={() => { navigate(`/ViewFIR/${firs._id}`) }} />
                            <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" onClick={() => { navigate(`/DownloadFIRPDF/${firs._id}`) }} />
                            <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" onClick={() => handleMeetingBox(firs._id)} />
                            <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                          </div>
                        </div>
                      </div>))
                  }
                </div>}</> :
              <>{cerData && cerData?.PoliceStaionCertificates.length === 0 ? <h2>No Certificate and Vehicle Verification Request found!</h2> :
                <div className={styles.container0}>
                  <div className={`${styles.row4} ${styles.fullrow}`}>
                    <div className={styles.cell}>Application No {sort.sort === 'ApplicationtNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ApplicationtNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ApplicationtNumber")} />} </div>
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
                    <div className={styles.cell}>District {sort.sort === 'District' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("District")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("District")} />}</div>
                    <div className={styles.cell}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                    <div className={styles.cell}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                    <div className={styles.cell}>Actions</div>
                  </div>
                  {
                    cerData?.PoliceStaionCertificates && cerData?.PoliceStaionCertificates.map(firs => (
                      <div className={styles.table}>
                        <div className={`${styles.resprow}`}>
                          <div className={styles.cell}>Application No {sort.sort === 'ApplicationtNumber' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ApplicationtNumber")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ApplicationtNumber")} />} </div>
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
                          <div className={styles.cell}>District {sort.sort === 'District' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("District")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("District")} />}</div>
                          <div className={styles.cell}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                            <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                          <div className={styles.cell}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                            <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                            <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                          <div className={styles.cell}>Actions</div>
                        </div>
                        <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                          <div className={styles.cell}>{firs.ApplicationtNumber}</div>
                          <div className={styles.cell}>{firs.Name}</div>
                          <div className={styles.cell}>{`0${firs.ContactNumber}`}</div>
                          <div className={styles.cell}>{firs.CNIC}</div>
                          <div className={styles.cell}>{firs.Category}</div>
                          <div className={styles.cell}>{firs.District}</div>
                          <div className={styles.cell}>{firs.EntryDate}</div>
                          <div className={styles.cell}>
                            <select name="status" id="status" className={`form-control ${styles.select}`} defaultValue={firs.Status} onChange={(e) => SetStatusHandler(firs._id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="filed">Rejected</option>
                            </select>
                          </div>
                          <div className={`${styles.cell} ${styles.icon}`}>
                            <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" onClick={() => { navigate(`/ViewFIR/${firs._id}`) }} />
                            <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" onClick={() => { navigate(`/DownloadFIRPDF/${firs._id}`) }} />
                            <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" onClick={() => handleMeetingBox(firs._id)} />
                            <FontAwesomeIcon icon={faRightLeft} data-tooltip-id="Tooltip" data-tooltip-content="Trasfer" onClick={() => handleTransferBox(firs._id)} />
                            <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                          </div>
                        </div>
                      </div>))
                  }
                </div>}</>}
          <ReactPaginate
            breakLabel={"..."} // break Label
            nextLabel={"next"} // Next Page Button & label
            previousLabel={"previous"} // Previous Page Button & label
            pageCount={(pData?.PoliceStaionFIRspageCount) || (cerData?.PoliceStaionCertificatespageCount) || (vvData?.pageCount)}
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
          /></> : null}




        {(user && cRole === user.role) ? <>
          <div className={styles.buttonBody}>
            <div className={styles.uiCheck}>
              <button className={styles.checkButton} onClick={toggler}>
                <input type="checkbox" />
                <strong></strong>
                <label></label>
              </button>
            </div>
          </div>
          {isFIR ?
            <>
              {cData && cData?.CitizenFIRs.length === 0 ? <h2>No FIR Registered Yet</h2> :
                <div className={styles.container4}>
                  <div className={`${styles.row4} ${styles.fullrow}`}>
                    <div className={styles.cell1}>Complaint No {sort.sort === 'ComplaintNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ComplaintNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ComplaintNumber")} />} </div>
                    <div className={styles.cell1}>Category {sort.sort === 'Category' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Category")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Category")} />} </div>
                    <div className={styles.cell1}>Offence {sort.sort === 'Offence' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Offence")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Offence")} />}</div>
                    <div className={styles.cell1}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                    <div className={styles.cell1}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                    <div className={styles.cell1}>Rating</div>
                  </div>
                  {
                    cData?.CitizenFIRs && cData?.CitizenFIRs.map(firs => (
                      <>
                        <div className={styles.table}>
                          <div className={`${styles.resprow}`}>
                            <div className={styles.cell1}>Complaint No {sort.sort === 'ComplaintNumber' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ComplaintNumber")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ComplaintNumber")} />} </div>
                            <div className={styles.cell1}>Category {sort.sort === 'Category' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Category")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Category")} />} </div>
                            <div className={styles.cell1}>Offence {sort.sort === 'Offence' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Offence")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Offence")} />}</div>
                            <div className={styles.cell1}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                              <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                            <div className={styles.cell1}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                            <div className={styles.cell1}>Rating</div>
                          </div>
                          <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                            <div className={styles.cell1}>{firs.ComplaintNumber}</div>
                            <div className={styles.cell1}>{getCategoryNameById(firs.Category)}</div>
                            <div className={styles.cell1}>{getOffenceNameById(firs.Offence)}</div>
                            <div className={styles.cell1}>{firs.EntryDate}</div>
                            <div className={styles.cell1}>{firs.Status}</div>
                            <div className={styles.cell1}><Stars rating={firs.Rating} /></div>
                            <div className={styles.respButtonfull}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                          </div>
                        </div>
                        <div className={styles.respButton}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                      </>
                    ))
                  }
                </div>}</> :
            <>
              <h2>Certificates:</h2>
              {ccerData && ccerData?.CitizenCertificates?.length === 0 ? <h3>No Certificate Found!</h3> :
                <div className={styles.container4}>
                  <div className={`${styles.row4} ${styles.fullrow}`}>
                    <div className={styles.cell1}>Application No {sort.sort === 'ApplicationtNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ApplicationtNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ApplicationtNumber")} />} </div>
                    <div className={styles.cell1}>Name {sort.sort === 'Name' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Name")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Name")} />} </div>
                    <div className={styles.cell1}>Category {sort.sort === 'Category' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Category")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Category")} />}</div>
                    <div className={styles.cell1}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                    <div className={styles.cell1}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                    <div className={styles.cell1}>Rating</div>
                  </div>
                  {
                    ccerData?.CitizenCertificates && ccerData?.CitizenCertificates.map(firs => (
                      <>
                        <div className={styles.table}>
                          <div className={`${styles.resprow}`}>
                            <div className={styles.cell1}>Application No {sort.sort === 'ApplicationtNumber' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("ApplicationtNumber")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("ApplicationtNumber")} />} </div>
                            <div className={styles.cell1}>Name {sort.sort === 'Name' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Name")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Name")} />} </div>
                            <div className={styles.cell1}>Category {sort.sort === 'Category' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Category")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Category")} />}</div>
                            <div className={styles.cell1}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                              <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                            <div className={styles.cell1}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                            <div className={styles.cell1}>Rating</div>
                          </div>
                          <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                            <div className={styles.cell1}>{firs.ApplicationtNumber}</div>
                            <div className={styles.cell1}>{firs.Name}</div>
                            <div className={styles.cell1}>{firs.Category}</div>
                            <div className={styles.cell1}>{firs.EntryDate}</div>
                            <div className={styles.cell1}>{firs.Status}</div>
                            <div className={styles.cell1}><Stars rating={firs.Rating} /></div>
                            <div className={styles.respButtonfull}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                          </div>
                        </div>
                        <div className={styles.respButton}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                      </>
                    ))
                  }
                </div>}
              <h2>Vehicle Verification Request:</h2>
              {cvvData && cvvData?.CitizenRequests?.length === 0 ? <h3>No Verification Request Found!</h3> :
                <div className={styles.container4}>
                  <div className={`${styles.row4} ${styles.fullrow}`}>
                    <div className={styles.cell1}>Request No {sort.sort === 'RequestNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RequestNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RequestNumber")} />} </div>
                    <div className={styles.cell1}>Registration No {sort.sort === 'RegistrationNumber' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RegistrationNumber")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RegistrationNumber")} />} </div>
                    <div className={styles.cell1}>Car Maker {sort.sort === 'Make' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Make")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Make")} />}</div>
                    <div className={styles.cell1}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                      <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                    <div className={styles.cell1}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                      <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                      <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                    <div className={styles.cell1}>Rating</div>
                  </div>
                  {
                    cvvData?.CitizenRequests && cvvData?.CitizenRequests.map(firs => (
                      <>
                        <div className={styles.table}>
                          <div className={`${styles.resprow}`}>
                            <div className={styles.cell1}>Request No {sort.sort === 'RequestNumber' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RequestNumber")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RequestNumber")} />} </div>
                            <div className={styles.cell1}>Registration No {sort.sort === 'RegistrationNumber' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("RegistrationNumber")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("RegistrationNumber")} />} </div>
                            <div className={styles.cell1}>Car Maker {sort.sort === 'Make' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Make")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Make")} />}</div>
                            <div className={styles.cell1}>Date {sort.sort === 'EntryDate' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUp91} onClick={() => handleSort("EntryDate")} /> :
                              <FontAwesomeIcon icon={faArrowDown19} onClick={() => handleSort("EntryDate")} />} </div>
                            <div className={styles.cell1}>Status {sort.sort === 'Status' && sort.order === 'asc' ?
                              <FontAwesomeIcon icon={faArrowUpZA} onClick={() => handleSort("Status")} /> :
                              <FontAwesomeIcon icon={faArrowDownAZ} onClick={() => handleSort("Status")} />}</div>
                            <div className={styles.cell1}>Rating</div>
                          </div>
                          <div className={`${styles.row4} ${styles.datarow}`} key={firs._id}>
                            <div className={styles.cell1}>{firs.RequestNumber}</div>
                            <div className={styles.cell1}>{firs.RegistrationNumber}</div>
                            <div className={styles.cell1}>{firs.Make}</div>
                            <div className={styles.cell1}>{firs.EntryDate}</div>
                            <div className={styles.cell1}>{firs.Status}</div>
                            <div className={styles.cell1}><Stars rating={firs.Rating} /></div>
                            <div className={styles.respButtonfull}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                          </div>
                        </div>
                        <div className={styles.respButton}><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                      </>
                    ))
                  }
                </div>}
            </>}
          <ReactPaginate
            breakLabel={"..."} // break Label
            nextLabel={"next"} // Next Page Button & label
            previousLabel={"previous"} // Previous Page Button & label
            pageCount={cData?.CitizenFIRspageCount} // Sets Page Counts
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
        </> : null}
      </div>
      {showTransferBox && (
        <TransferAlert
          onConfirm={handleConfirmTransferBox}
          onCancel={handleCancelTransferBox}
          setPoliceStation={setPoliceStation}
        />
      )}
      {showMeetingBox && (
        <MeetingMessageBox
          onConfirm={handleConfirmMeetingBox}
          onCancel={handleCancelMeetingBox}
          setMessage={setMessage}
        />
      )}
      <ToastContainer />
    </>
  );
}
export default MyApplications;
