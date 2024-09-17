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
          className="logo ms-2"
          src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725907654/Logo_in_White_text_Right_kwlc3g.png"
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
          <button className="btn" data-bs-toggle="modal" data-bs-target="#loginModal">
            <i className="fas fa-sign-in-alt icon"></i>
            <span className="m-0 h6">Login</span>
          </button>
          <button className="btn" data-bs-toggle="modal" data-bs-target="#registerModal">
            <i className="fas fa-clipboard-list icon"></i>
            <span className="m-0 h6">Register</span>
          </button>
        </div>
      </div>

      {/* Modal de Login */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <h2 className="mb-4">Login</h2>
              <form>
                <input type="email" className="form-control mb-3 custom-input" placeholder="E-mail" required />
                <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Log in</button>
                <div className="divider">or</div>
                <button className="btn btn-outline-light w-100 mb-2">
                  <i className="fab fa-google me-2"></i> Log in with Google
                </button>
                <button className="btn btn-outline-light w-100 mb-3">
                  <i className="fab fa-apple me-2"></i> Log in with Apple
                </button>
                <p className="mt-4">Don't have an account? <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#registerModal">Sign up</a></p>
              </form>
              <button type="button" className="btn btn-secondary mt-3" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Registro */}
      <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <h2 className="mb-4">Register</h2>
              <form>
                <input type="email" className="form-control mb-3 custom-input" placeholder="E-mail" required />
                <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Sign up via email</button>
                <div className="divider">or</div>
                <button className="btn btn-outline-light w-100 mb-2">
                  <i className="fab fa-google me-2"></i> Sign up with Google
                </button>
                <button className="btn btn-outline-light w-100 mb-3">
                  <i className="fab fa-apple me-2"></i> Sign up with Apple
                </button>
                <p className="mt-4">Already have an account? <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Log in</a></p>
              </form>
              <button type="button" className="btn btn-secondary mt-3" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
