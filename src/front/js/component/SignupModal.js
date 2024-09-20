import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '/workspaces/4Share/src/front/styles/auth.css';

const SignupModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Usar useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, is_active: isActive })
            });
            const data = await response.json();

            if (response.ok) {
                onClose();
                navigate('/login'); // Redirigir a la página de login
            } else {
                setError(data.msg);
            }
        } catch (error) {
            setError('Error al intentar registrarse');
        }
    };

    return (
        <div>
            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
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
                                    required
                                />
                                <input
                                    type="password"
                                    className="form-control mb-3 custom-input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                    />
                                    Active
                                </label>
                                <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Sign up via email</button>
                                <div className="divider">or</div>
                                <button className="btn btn-outline-light w-100 mb-2">
                                    <i className="fab fa-google me-2"></i> Sign up with Google
                                </button>
                                <button className="btn btn-outline-light w-100 mb-3">
                                    <i className="fab fa-apple me-2"></i> Sign up with Apple
                                </button>
                                <p className="mt-4">Already have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Log in</a></p>
                            </form>
                            <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;
