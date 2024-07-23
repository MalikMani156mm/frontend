import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../ScrollToTop";
import PriorBar from "../../Components/PriorBar/PriorBar";
import { useSelector } from "react-redux";

function RootLayouts() {

    const { user } = useSelector(state => state.auth)
    const role = "Admin";
    const Role = "SuperAdmin";
    const location = useLocation();

    return (
        <div>
            <Navbar />
            <ScrollToTop />
            <Outlet />
            {(user && (role=== user.role || Role === user.role) && (location.pathname !== '/ChatPage' && location.pathname !== '/AddAdmin')) ? <PriorBar /> : null}
            <Footer />
        </div>
    );
}

export default RootLayouts;