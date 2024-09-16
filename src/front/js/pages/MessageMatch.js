import React from 'react';
import { FaMusic, FaUtensils, FaStar } from "react-icons/fa"; // Ícones usados para aprender e ensinar
import "/workspaces/4Share/src/front/styles/MessageMatch.css"; // Arquivo de estilo

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

const RequestsPage = () => {
    return (
        <div>
            {/* Conteúdo da página de requests */}
            <div className="container requests-container">
                <h2>My Requests</h2>
                <div className="request-list">
                    {/* Request 1 */}
                    <div className="request-item">
                        <img
                            className="request-img"
                            src="https://64.media.tumblr.com/b8faf7f71c5a2fc1a293313d9d8b95fc/tumblr_inline_oabqy457YV1undx97_500.jpg"
                            alt="Profile"
                        />
                        <div className="request-info">
                            <h3>Teresa Lisbon</h3>
                            <div className="rating">
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                            <div className="skills">
                                <span>Wants to learn: <FaMusic /></span>
                                <span>Can teach: <FaUtensils /></span>
                            </div>
                        </div>
                        <div className="request-actions">
                            <button className="accept-btn">Accept</button>
                            <button className="decline-btn">Decline</button>
                        </div>
                    </div>

                    {/* Request 2 */}
                    <div className="request-item">
                        <img
                            className="request-img"
                            src="https://media.themoviedb.org/t/p/w500/oay0Lo2zl0lJdguptxgx1BK9Xq7.jpg"
                            alt="Profile"
                        />
                        <div className="request-info">
                            <h3>Patrick Jane</h3>
                            <div className="rating">
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                            <div className="skills">
                                <span>Wants to learn: <FaMusic /></span>
                                <span>Can teach: <FaUtensils /></span>
                            </div>
                        </div>
                        <div className="request-actions">
                            <button className="accept-btn">Accept</button>
                            <button className="decline-btn">Decline</button>
                        </div>
                    </div>
                </div>

                <h2>Contacts Added</h2>
                <div className="contacts-list">
                    {/* Contact 1 */}
                    <div className="contact-item">
                        <img
                            className="request-img"
                            src="https://www.clarin.com/2024/02/27/6vvUfw5w__2000x1500__1.jpg"
                            alt="Profile"
                        />
                        <div className="contact-info">
                            <h3>Gregory House</h3>
                            <div className="rating">
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                            <div className="skills">
                                <span>Wants to learn: <FaMusic /></span>
                                <span>Can teach: <FaUtensils /></span>
                            </div>
                            <p>Phone: (123) 456-7890</p>
                            <p>Email: greg.house@example.com</p>
                        </div>
                    </div>

                    {/* Contact 2 */}
                    <div className="contact-item">
                        <img
                            className="request-img"
                            src="https://pbs.twimg.com/profile_images/1793368388/emilydeschanel_profile_400x400.jpg"
                            alt="Profile"
                        />
                        <div className="contact-info">
                            <h3>Temperance Brennan</h3>
                            <div className="rating">
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                            <div className="skills">
                                <span>Wants to learn: <FaMusic /></span>
                                <span>Can teach: <FaUtensils /></span>
                            </div>
                            <p>Phone: (987) 654-3210</p>
                            <p>Email: brennan.bones@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestsPage;
