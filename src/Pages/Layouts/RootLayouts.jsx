import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../ScrollToTop";

function RootLayouts() {
    return (
        <div>
            <Navbar />
            <ScrollToTop />
            <Outlet />
            <Footer />
        </div>
    );
}

export default RootLayouts;