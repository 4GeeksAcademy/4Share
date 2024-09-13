import React from 'react';

const MessageMatch = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">My Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">My Requests</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MessageMatch;
