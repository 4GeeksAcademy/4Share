import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import injectContext from "./store/appContext";

import Home from "./pages/Home";
import Requests from "./pages/Requests";
import ResetPassword from "./pages/ResetPassword";
 import PublicProfile from "./pages/PublicProfile";
import PrivateProfile from "./pages/PrivateProfile";
import ProfileSearch from "./pages/ProfileSearch";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import LoginModal from "./component/LoginModal";
import SignupModal from "./component/SignupModal";
import ProtectedRoute from './component/ProtectedRoute';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<ProtectedRoute />}>
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/profilesearch/:type" element={<ProfileSearch />} />
                    <Route path="/publicprofile/:user_id" element={<PublicProfile />} />
                    <Route path="/privateprofile"  element={<PrivateProfile />} /> 
                </Route>
                <Route element={<LoginModal />} path="/login" />
                <Route element={<SignupModal />} path="/signup" />
                <Route path="/resetpassword" element={<ResetPassword />} />
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default injectContext(Layout);
