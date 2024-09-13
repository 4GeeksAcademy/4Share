import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import  Home  from "./pages/Home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import MessageMatch from "./pages/MessageMatch";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Profile } from "./component/Profile";
import { PrivateProfile } from "./component/PrivateProfile";
import { Navbar } from "./component/Navbar";

//create your first component
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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<PrivateProfile />} path="/myaccount" />
                        <Route element={<MessageMatch />} path="/messagematch" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
