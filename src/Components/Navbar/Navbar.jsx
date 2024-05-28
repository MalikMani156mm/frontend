import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../images/Logo.png";
import Message from "../../images/Message.png";
import {  useSelector , useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../Redux/Features/Auth/AuthApi";
import { clearUserInfo } from "../../Redux/Features/Auth/AuthSlice";
function Navbar() {

  const {user,token} = useSelector(state=>state.auth)
  const [ logout ]=useLogoutUserMutation();
  const dispatch = useDispatch();
  const handleLogout = async ()=>{
    await logout();
    dispatch(clearUserInfo());
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        
        <NavLink to="/" className={`${styles.title} ${styles.inActiveStyle} `}>
          <img src={logo} alt="Logo unload" height={60} />
          E-FIR System
        </NavLink>
        <div
          className={styles.menu}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? styles.open : ""}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.ActiveStyle : styles.inActiveStyle
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="OnlineFIR"
              className={({ isActive }) =>
                isActive ? styles.ActiveStyle : styles.inActiveStyle
              }
            >
              Online FIR
            </NavLink>
          </li>
          <li>
            <NavLink
              to="MyApplications"
              className={({ isActive }) =>
                isActive ? styles.ActiveStyle : styles.inActiveStyle
              }
            >
              My Applications
            </NavLink>
          </li>
  
          { token ? 
            <li><NavLink to="Search"className={({ isActive }) =>isActive ? styles.ActiveStyle : styles.inActiveStyle}>Search</NavLink></li>
           :<>
          <li><NavLink to="PSJudicary"className={({ isActive }) =>isActive ? styles.ActiveStyle : styles.inActiveStyle}>PS Judiciary</NavLink></li>
          <li><NavLink to="UserGuide"className={({ isActive }) =>isActive ? styles.ActiveStyle : styles.inActiveStyle}>User Guide</NavLink></li> 
          </>
          }
          {user && token ? 
            <>
              <li>
                <NavLink
                  to="/"
                  className={`${styles.Mlogo} ${styles.ActivelyStyle}`}
                >
                  <img src={Message} alt="Messenger unload" height={50} />
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <button
                    className={`${styles.LogOutButton} ${styles.ActivelyStyle}`} onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </NavLink>
              </li>
            </>
           : 
            <>
              <li>
                <NavLink
                  to="LogIn"
                  className={({ isActive }) =>
                    isActive ? styles.ActivelyStyle : styles.inActivelyStyle
                  }
                >
                  <button className={styles.LogInButton}> Log In </button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="SignUp"
                  className={({ isActive }) =>
                    isActive ? styles.ActivelyStyle : styles.inActivelyStyle
                  }
                >
                  <button className={styles.SignUpButton}>Sign Up</button>
                </NavLink>
              </li>
            </>
          }
        </ul>
        {/* <input type="checkbox" name="bars" className={styles.check} />
        <label htmlFor="check" className={styles.checkbtn}>
          <FontAwesomeIcon icon={faBars} />
        </label> */}
      </nav>
      <div className={styles.separator}></div>
    </>
  );
}
export default Navbar;
