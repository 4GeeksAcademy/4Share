import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
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


const Layout = () => {
    // the basename is used when your project is published in a subdirectory and not in the root of the domain
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
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

                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};



export default injectContext(Layout);
