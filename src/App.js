import { RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import { router } from "./Router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { clearUserInfo } from "./Redux/Features/Auth/AuthSlice";


function App() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode(token);
      const checkTokenValid = () => {
        if (exp < Date.now() / 1000) {
          alert('Your session expired')
          dispatch(clearUserInfo());
        } 
      }
      const interval = setInterval(checkTokenValid , 3000);
      return ()=> clearInterval(interval);
    }

  }, [token])

  return (
    <div className={styles.container}>
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
