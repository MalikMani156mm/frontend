import { Navigate } from "react-router-dom";

function Protected({isAuth,children}){
    if(isAuth){
        return children;
    }
    else{
        return <Navigate to="/LogIn"/>;

    }

}
export default Protected;