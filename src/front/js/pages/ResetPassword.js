import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../styles/resetPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setToken(query.get('token'));
  }, [location]);
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword, token })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.msg || "Password reset successfully!");
        setErrorMessage(""); // Limpiar mensaje de error

        // Navegar a la página de inicio y abrir el modal de login
        navigate('/', { state: { openLoginModal: true } });
      } else {
        setErrorMessage(data.msg || "Error resetting password");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container text-center mt-5 resetPassword">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="custom-title">Reset Password</h1>
          <p className="instruction-text">Please enter your new password below to reset your account.</p>

          <form onSubmit={handlePasswordReset}>
            <input type="hidden" name="token" value={token} /> {/* Token oculto */}
            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control custom-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control custom-input"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            {successMessage && <p className="text-success mt-2">{successMessage}</p>}

            <button type="submit" className="btn btn-primary custom-button mt-4">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;