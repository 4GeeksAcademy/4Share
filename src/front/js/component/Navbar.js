import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ya no necesitamos useNavigate
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import '../../styles/navbar.css';
export const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const handleLoginOpen = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);
    const handleSignupOpen = () => setShowSignupModal(true);
    const handleSignupClose = () => setShowSignupModal(false);
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
                    <button className="btn">
                        <Link to="/">
                            <i className="fas fa-home icon"></i>
                            <span className="m-0 h6">Home</span>
                        </Link>
                    </button>
                    <button className="btn">
                        <Link to="/">
                            <i className="fas fa-users icon"></i>
                            <span className="m-0 h6">About Us</span>
                        </Link>
                    </button>
                    {/* Cambiamos el comportamiento del botón de login */}
                    <button className="btn" onClick={handleLoginOpen}>
                        <i className="fas fa-sign-in-alt icon"></i>
                        <span className="m-0 h6">Log in</span>
                    </button>
                    {/* Cambiamos el comportamiento del botón de signup */}
                    <button className="btn" onClick={handleSignupOpen}>
                        <i className="fas fa-user-plus icon"></i>
                        <span className="m-0 h6">Register</span>
                    </button>
                </div>
            </div>
            {/* Modal de Login */}
            {showLoginModal && <LoginModal onClose={handleLoginClose} />}
            {/* Modal de Signup */}
            {showSignupModal && <SignupModal onClose={handleSignupClose} />}
        </nav>
    );
};
export default Navbar;