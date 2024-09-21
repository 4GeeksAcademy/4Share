import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import '../../styles/navbar.css';

export const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const location = useLocation(); 

    const handleLoginOpen = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);
    const handleSignupOpen = () => setShowSignupModal(true);
    const handleSignupClose = () => setShowSignupModal(false);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = window.innerWidth > 768 ? +200 : -30;
            const topPosition = section.getBoundingClientRect().top + window.scrollY + offset;

            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleHomeClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = '/';
        }
    };

    const handleAboutUsClick = () => {
        if (location.pathname === '/') {
            scrollToSection('aboutUs');
        } else {
            window.location.href = '/#aboutUs';
        }
    };

    return (
        <nav className="navbar mainDiv">
            <img
                className="backgroundImg"
                src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725648426/Background_txdnev.png"
                alt="Background"
            />
            <img
                className="overlayImg1"
                src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725651541/Background_Stars_lefooa.png"
                alt="Overlay 1"
            />
            <img
                className="overlayImg2"
                src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725651541/Background_Stars_lefooa.png"
                alt="Overlay 2"
            />
            <div className="container-fluid">
                <img
                    className="logo"
                    src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725897267/Logo_in_White_text_ddxzuv.png"
                    alt="Logo"
                />
                <div className="d-flex justify-content-end buttonsList" id="navbarSupportedContent">
                    <button className="btn" onClick={handleHomeClick}>
                        <i className="fas fa-home icon"></i>
                        <span className="m-0 h6">Home</span>
                    </button>
                    <button className="btn" onClick={handleAboutUsClick}>
                        <i className="fas fa-users icon"></i>
                        <span className="m-0 h6">About Us</span>
                    </button>
                    <button className="btn" onClick={handleLoginOpen}>
                        <i className="fas fa-sign-in-alt icon"></i>
                        <span className="m-0 h6">Log in</span>
                    </button>
                    <button className="btn" onClick={handleSignupOpen}>
                        <i className="fas fa-user-plus icon"></i>
                        <span className="m-0 h6">Register</span>
                    </button>
                </div>
            </div>
            {showLoginModal && <LoginModal onClose={handleLoginClose} />}
            {showSignupModal && <SignupModal onClose={handleSignupClose} />}
        </nav>
    );
};

export default Navbar;
