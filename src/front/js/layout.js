import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import Home from "./pages/Home";
import MessageMatch from "./pages/MessageMatch";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./component/Profile";
import ProfilePrivate from "./component/ProfilePrivate";
import ProfileSearch from "./pages/ProfileSearch";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import LoginModal from "./component/LoginModal";
import SignupModal from "./component/SignupModal";

//Modyfied scroll to top for starting always at the top of the page
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<MessageMatch />} path="/requests" />
                <Route element={<ProfileSearch />} path="/profilesearch/:type" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<ProfilePrivate />} path="/profileprivate" />
                <Route element={<LoginModal />} path="/login" />
                <Route element={<SignupModal />} path="/signup" />
                <Route element={<ResetPassword />} path="/resetpassword" />
                <Route element={<h1>Not found!</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default injectContext(Layout);
