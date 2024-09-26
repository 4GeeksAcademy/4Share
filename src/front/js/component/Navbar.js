import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import '../../styles/navbar.css';

export const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.openLoginModal) {
            setShowLoginModal(true);
        }
    }, [location]);

    const handleLoginOpen = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);
    const handleSignupOpen = () => setShowSignupModal(true);
    const handleSignupClose = () => setShowSignupModal(false);

    const handleLogout = () => {
        localStorage.removeItem('jwt-token');
        navigate('/');
    };

    const isLoggedIn = !!localStorage.getItem('jwt-token');

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
                    <button className="btn" onClick={() => window.location.href = '/'}>
                        <i className="fas fa-home icon"></i>
                        <span className="m-0 h6">Home</span>
                    </button>
                    <button className="btn" onClick={() => window.location.href = '/profilesearch/all'}>
                        <i className="fas fa-users icon"></i>
                        <span className="m-0 h6">Search</span>
                    </button>
                    {isLoggedIn ? (
                        <>
                            <button className="btn" onClick={() => navigate('/privateprofile')}>
                                <i className="fas fa-user icon"></i>
                                <span className="m-0 h6">Profile</span>
                            </button>
                            <button className="btn" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt icon"></i>
                                <span className="m-0 h6">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn" onClick={handleLoginOpen}>
                                <i className="fas fa-sign-in-alt icon"></i>
                                <span className="m-0 h6">Log in</span>
                            </button>
                            <button className="btn" onClick={handleSignupOpen}>
                                <i className="fas fa-user-plus icon"></i>
                                <span className="m-0 h6">Register</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
            {showLoginModal && <LoginModal onClose={handleLoginClose} openSignup={handleSignupOpen} />}
            {showSignupModal && <SignupModal onClose={handleSignupClose} openLogin={handleLoginOpen} />}
        </nav>
    );
};

export default Navbar;