import React, { useState } from "react";
import '../../styles/resetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      // Aqui você chamaria sua API para fazer o reset da senha
      setSuccessMessage("Password reset successfully!");
      setErrorMessage(""); // Limpar mensagem de erro
    }
  };

  return (
    <div className="container text-center mt-5 resetPassword">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="custom-title">Reset Password</h1>
          <p className="instruction-text">Please enter your new password below to reset your account.</p>

          <form onSubmit={handlePasswordReset}>
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

          <p className="mt-3">
            <a href="/login" className="back-to-login">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
