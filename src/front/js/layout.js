import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
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
    console.log("Rendering Layout component");

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route path="/requests" element={<ProtectedRoute element={<MessageMatch />} />} />
                <Route path="/profilesearch/:type" element={<ProtectedRoute element={<ProfileSearch />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/profileprivate" element={<ProtectedRoute element={<ProfilePrivate />} />} />
                <Route element={<LoginModal />} path="/login" />
                <Route element={<SignupModal />} path="/signup" />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default injectContext(Layout);
