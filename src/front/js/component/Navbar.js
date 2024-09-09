import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
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
          <button className="btn">
            <Link to="/">
              <i className="fas fa-sign-in-alt icon"></i>
              <span className="m-0 h6">Login</span>
            </Link>
          </button>
          <button className="btn">
            <Link to="/">
              <i className="fas fa-clipboard-list icon"></i>
              <span className="m-0 h6">Register</span>
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
