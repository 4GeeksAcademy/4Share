import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/auth.css";

function SignupModal({ onClose, openLogin }) {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        const requestBody = { email, password, is_active: isActive };

        try {
            // Sing up new User
            const response = await actions.signupUser(email, password, isActive);
            if (response) {
                console.log('User signed up successfully:', response);

                // Send email before closing and opening new modal
                await actions.sendConfirmationEmail(email);
                onClose();
                openLogin();
            } else {
                console.error('Error signing up:', response?.msg || "Unknown error");
                setError(response?.msg || "Unknown error");
            }
        } catch (error) {
            console.error('Error during signup request:', error);
            setError("Unknown error");
        }
    };

    return (
        <div className="modal fade show d-block" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content custom-modal">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <h2 className="mb-4">Register</h2>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSignup}>
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
                            <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Sign up via email</button>
                            <div className="divider">or</div>
                            {/* <button className="btn btn-outline-light w-100 mb-2">
                                <i className="fab fa-google me-2"></i> Sign up with Google
                            </button>
                            <button className="btn btn-outline-light w-100 mb-3">
                                <i className="fab fa-apple me-2"></i> Sign up with Apple
                            </button> */}
                            <p className="mt-4">Already have an account?
                                <strong><a href="#" onClick={() => { onClose(); openLogin(); }}>Log in</a></strong>
                            </p>
                        </form>
                        <button type="button" className="btn btn-secondary mt-5" style={{marginLeft:"auto",marginRight:"auto"}} onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;
