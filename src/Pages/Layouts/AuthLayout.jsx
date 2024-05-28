import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayouts(){

    const {token} = useSelector(state=>state.auth)
// (user && role !== user.role)
    if(!token){
        return <Navigate to={'/login'}/>
    }

    return(
        <div>
            <Outlet/>
        </div>
    );
}

export default AuthLayouts;