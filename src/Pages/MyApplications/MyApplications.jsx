import styles from "./MyApplications.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faPenToSquare, faRightLeft, faHandshake, faFile, faFlag, faStar, faPrint, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'react-tooltip';
import { useGetAllFIRsQuery } from "../../Redux/Features/FIR/FIRApi";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../Components/Filters/Filters";
import { addToCart, removeFromCart } from "../../Redux/Slices/CartSlice";
import { useGetPoliceStationByIdQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MyApplications() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth)
  const Id = user.PoliceStation;
  const { isLoading: psLoading, data: psData, error: psError } = useGetPoliceStationByIdQuery(Id);


  const role = "Admin";
  const Role = "SuperAdmin";
  const cRole = "Citizen";




  // eslint-disable-next-line 
  const { isLoading, data, error } = useGetAllFIRsQuery();

  const [showIcon, setShowIcon] = useState(() => {
    const storedState = localStorage.getItem("showIcon");
    return storedState ? JSON.parse(storedState) : {};
  });

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [target1, setTarget1] = useState(0);
  const target2 = 0; // Filed
  const [target3, setTarget3] = useState(0);
  const target4 = 0; // Completed

  useEffect(() => {
    if (data) {
      setTarget1(data.length); // Set target1 to data.length when data is available
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setTarget3(data.length); // Set target1 to data.length when data is available
    }
  }, [data]);

  useEffect(() => {
    const animateCount = (currentCount, targetCount, setter) => {
      const increment = targetCount > currentCount ? 1 : -1;
      const speed = 1; // milliseconds

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
  }, [count1, count2, count3, count4, target1, target3]);

  const handleChangePassword = () => {
    navigate("/ConfirmPassword");
  }

  const handleAddPoliceStation = () => {
    navigate("/AddPoliceStation");
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
    if(user.role===Role){
    navigate('/admin/AddOffence');
    }else{
      navigate('/AddOffence');
    }
  }

  const handleAddCategory = () => {
    if(user.role===Role){
      navigate('/admin/AddCategory');
      }else{
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


  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  if (error || psError) {
    return (<>
      <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
      <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
      <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className={styles.homelink}>Home</Link></h3>
    </>)
  }

  if (isLoading || psLoading) {
    return <div>Loading...</div>;
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
                <li><button className="dropdown-item" type="button" onClick={handleAddCategory}>Add Category</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddOffence}>Add Offence</button></li>
              </> : null}
              {(user && role === user.role) ? <>
                <li><button className="dropdown-item" type="button" onClick={handleUpdatePoliceStation}>Update Police Station</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddCategory}>Add Category</button></li>
                <li><button className="dropdown-item" type="button" onClick={handleAddOffence}>Add Offence</button></li>
              </> : null}
              <li><button className="dropdown-item" type="button">Change Username</button></li>
              <li><button className="dropdown-item" type="button" onClick={handleChangePassword}>Change Password</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.infoBody}>
        <div className={styles.Info}>
          <div className={styles.infoRow}>
            {(user && (role === user.role || Role === user.role)) ?
              <div className={styles.avatarPolice}></div>
              : <div className={styles.avatarCitizen}></div>}
            <div className={styles.infoColumn}>
              {(user && (role === user.role || Role === user.role)) ?
                <div className={styles.name}>Welcome, {psData && psData.PSs.PSName}</div> :
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
        {(user && (role === user.role || Role === user.role)) ? <>
          <Filters />
        </> : null}
        <div className={styles.container3}>
          <div className={styles.row5}>
            <div className={styles.row5}>
              {(user && (role === user.role || Role === user.role)) ? <>
                <div className={styles.label}>Show</div>
                <select name="showEntries" className={styles.formControl2}>
                  <option value="1">10</option>
                  <option value="1">20</option>
                  <option value="1">30</option>
                  <option value="1">40</option>
                  <option value="1">50</option>
                </select>
                <div className={styles.label}>entries</div></> : null}
            </div>
            <div className={styles.row3}>
              <div className={styles.label}>Search:</div>
              <input type="text" name="Search" className={styles.formControl3} />
            </div>
          </div>
        </div>
        {(user && (role === user.role || Role === user.role)) ? <>
          <div className={styles.container0}>
            <div className={styles.row4}>
              <div className={styles.cell}>Complaint No</div>
              <div className={styles.cell}>Name</div>
              <div className={styles.cell}>Phone Number</div>
              <div className={styles.cell}>CNIC</div>
              <div className={styles.cell}>Category</div>
              <div className={styles.cell}>Offence</div>
              <div className={styles.cell}>Date</div>
              <div className={styles.cell}>Status</div>
              <div className={styles.cell}>Actions</div>
            </div>
            {
              data && data.map(firs => (
                <div className={styles.row4} key={firs._id}>
                  <div className={styles.cell}>{firs.ComplaintNumber}</div>
                  <div className={styles.cell}>{firs.Name}</div>
                  <div className={styles.cell}>{`0${firs.ContactNumber}`}</div>
                  <div className={styles.cell}>{firs.CNIC}</div>
                  <div className={styles.cell}>{firs.Category}</div>
                  <div className={styles.cell}>{firs.Offence}</div>
                  <div className={styles.cell}>{firs.EntryDate}</div>
                  <div className={styles.cell}>{firs.Status}</div>
                  <div className={`${styles.cell} ${styles.icon}`}>
                    <FontAwesomeIcon icon={faTh} data-tooltip-id="Tooltip" data-tooltip-content="View" />
                    <FontAwesomeIcon icon={faPrint} data-tooltip-id="Tooltip" data-tooltip-content="Print" />
                    <FontAwesomeIcon icon={faFile} data-tooltip-id="Tooltip" data-tooltip-content="View File Mode" />
                    <FontAwesomeIcon icon={faHandshake} data-tooltip-id="Tooltip" data-tooltip-content="Meeting Notification" />
                    <FontAwesomeIcon icon={faRightLeft} data-tooltip-id="Tooltip" data-tooltip-content="Trasfer" />
                    <FontAwesomeIcon icon={faPenToSquare} data-tooltip-id="Tooltip" data-tooltip-content="Edit" />
                    {showIcon[firs._id] ? <FontAwesomeIcon icon={faRemove} data-tooltip-id="Tooltip" data-tooltip-content="Remove From Priority" onClick={() => handleRemove(firs)} />
                      : <FontAwesomeIcon icon={faFlag} onClick={() => handleCart(firs)} data-tooltip-id="Tooltip" data-tooltip-content="Add to Priority" />
                    }
                    <Tooltip id="Tooltip" place="top" type="dark" effect="solid" />
                  </div>
                </div>
              ))
            }
          </div></> : null}
        {(user && cRole === user.role) ? <>
          <div className={styles.container4}>
            <div className={styles.row4}>
              <div className={styles.cell1}>Complaint No</div>
              <div className={styles.cell1}>Category</div>
              <div className={styles.cell1}>Offence</div>
              <div className={styles.cell1}>Date</div>
              <div className={styles.cell1}>Status</div>
              <div className={styles.cell1}>Rating</div>
            </div>
            {
              data && data.map(firs => (
                <>
                  <div className={styles.row4} key={firs._id}>
                    <div className={styles.cell1}>{firs.ComplaintNumber}</div>
                    <div className={styles.cell1}>{firs.Category}</div>
                    <div className={styles.cell1}>{firs.Offence}</div>
                    <div className={styles.cell1}>{firs.EntryDate}</div>
                    <div className={styles.cell1}>{firs.Status}</div>
                    <div className={styles.cell1}>{stars}</div>
                    <div><button className="btn btn-primary mx-3 my-2" onClick={() => { navigate(`/FIRDetail/${firs._id}`) }}>View Details</button></div>
                  </div>
                </>
              ))
            }
          </div>
          </> : null}
        </div>
      </>
      );
}
      export default MyApplications;
