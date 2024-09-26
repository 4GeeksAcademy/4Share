import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/auth.css";
function LoginModal({ onClose, openSignup }) {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [resetMessage, setResetMessage] = useState(null); // New state to show reset message
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const requestBody = { email, password };
        try {
            const response = await fetch(`${process.env.BACKEND_URL}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('jwt-token', data.access_token);
                actions.loginUser(email, password);
                onClose();
                navigate('/privateprofile');
            } else {
                console.error('Error logging in:', data?.msg || "Unknown error");
                setError(data?.msg || "Unknown error");
            }
        } catch (error) {
            console.error('Error during login request:', error);
            setError("Unknown error");
        }
    };
    // Function to handle sending the password reset email
    const handlePasswordReset = async () => {
        const response = await actions.requestPasswordReset(email);
        if (response) {
            setResetMessage("Password reset email sent successfully!");
        } else {
            setError("Failed to send reset email.");
        }
    };
    return (
        <div className="modal fade show d-block" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content custom-modal">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <img src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725897267/Logo_in_White_text_ddxzuv.png" alt="4Share Logo" className="login-logo mb-4" />
                        <h2 className="mb-4">Log in</h2>
                        {error && <p className="error">{error}</p>}
                        {resetMessage && <p className="success">{resetMessage}</p>} {/* Show reset success message */}
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                className="form-control mb-3 custom-input"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <input
                                type="password"
                                className="form-control mb-3 custom-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Log in</button>
                            <div className="divider">or</div>
                            {/* <button className="btn btn-outline-light w-100 mb-2">
                                <i className="fab fa-google me-2"></i> Log in with Google
                            </button>
                            <button className="btn btn-outline-light w-100 mb-3">
                                <i className="fab fa-apple me-2"></i> Log in with Apple
                            </button> */}
                            <p className="mt-4">Don't have an account?
                                <strong><a href="#" onClick={() => { onClose(); openSignup(); }}> Sign up</a> </strong>
                            </p>
                            <p className="mt-4">
                                <strong><a href="#" onClick={handlePasswordReset}>Send Reset Password Email</a> </strong>
                            </p>
                        </form>
                        <button type="button" className="btn btn-secondary mt-5" style={{ marginLeft: "auto", marginRight: "auto" }} onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginModal;