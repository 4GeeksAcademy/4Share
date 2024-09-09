import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaSignInAlt, FaSignOutAlt, FaClipboardList,FaPowerOff,FaUser } from "react-icons/fa";
import "../../styles/navbar.css";

export const Navbar = () => {
  // This would be replaced with a store variable but works for now
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              <FaHome className="icon" />
              <span className="m-0 h6">Home</span>
            </Link>
          </button>
          <button className="btn">
            <Link to="/">
              <FaUsers className="icon" />
              <span className="m-0 h6">About Us</span>
            </Link>
          </button>
          {isAuthenticated ? (
            <>
              <button className="btn">
                <Link to="/profile">
                  <FaUser className="icon" />
                  <span className="m-0 h6">Profile</span>
                </Link>
              </button>
              <button className="btn">
                <Link to="/logout">
                  <FaPowerOff className="icon" />
                  <span className="m-0 h6">Logout</span>
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="btn">
                <Link to="/login">
                  <FaSignInAlt className="icon" />
                  <span className="m-0 h6">Login</span>
                </Link>
              </button>
              <button className="btn">
                <Link to="/register">
                  <FaClipboardList className="icon" />
                  <span className="m-0 h6">Register</span>
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
