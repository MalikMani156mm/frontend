import { RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import { router } from "./Router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { clearUserInfo } from "./Redux/Features/Auth/AuthSlice";
import CustomAlert from "./Components/CustomAlert/CustomAlert";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [showSessionExpiryAlert, setShowSessionExpiryAlert] = useState(false);


  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode(token);
      const checkTokenValid = () => {
        if (exp < Date.now() / 1000) {
          setShowSessionExpiryAlert(true);
        } 
      }
      const interval = setInterval(checkTokenValid , 3000);
      return ()=> clearInterval(interval);
    }

  }, [token])

  const handleConfirmSessionExpiry = () => {
    setShowSessionExpiryAlert(false);
    dispatch(clearUserInfo());
  };

  const handleCancelSessionExpiry = () => {
    setShowSessionExpiryAlert(false);
    dispatch(clearUserInfo());
  };

  return (
    <div className={styles.container}>
      <RouterProvider router={router} /> 
      <ToastContainer/>
      {showSessionExpiryAlert && (
        <CustomAlert
          message="Your session has expired. Please log in again."
          onConfirm={handleConfirmSessionExpiry}
          onCancel={handleCancelSessionExpiry}
          buttonLabel={"OK"}
        />
      )}
    </div>
  );
}

export default App;
