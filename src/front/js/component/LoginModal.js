import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '/workspaces/4Share/src/front/styles/auth.css';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Usar useNavigate
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('jwt-token', data.token);
                onClose();
                navigate('/profile'); // Redirigir a la página de perfil
            } else {
                setError(data.msg);
            }
        } catch (error) {
            setError('Error al intentar iniciar sesión');
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
                        <h2 className="mb-4">Login</h2>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleLogin}>
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
                            <button type="submit" className="btn btn-primary w-100 mb-3 custom-btn">Log in</button>
                            <div className="divider">or</div>
                            <button className="btn btn-outline-light w-100 mb-2">
                                <i className="fab fa-google me-2"></i> Log in with Google
                            </button>
                            <button className="btn btn-outline-light w-100 mb-3">
                                <i className="fab fa-apple me-2"></i> Log in with Apple
                            </button>
                            <p className="mt-4">Don't have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</a></p>
                        </form>
                        <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginModal;