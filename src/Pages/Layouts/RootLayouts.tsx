import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

function RootLayouts(){
    return(
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default RootLayouts;