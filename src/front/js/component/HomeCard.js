import React from 'react';
import "../../styles/home.css";
import { Link } from "react-router-dom";

const HomeCard = ({ isOwnProfile, user }) => {
    const {
        rating = 0,
        id: userId,
        description = "User has no description.",
        userPic: userImg = "https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908776/SunWithLogo_n5wpgr.png",
        fullName = "Nombre Apellido",
        githubUrl = "#",
        linkedinUrl = "#"
    } = user || {}; // Establecer valores predeterminados

    return (
        <div className="card cardsBorder">
            <div className="cards">
                {!isOwnProfile ? (
                    <div>
                        <img src={userImg} className="card-img-top" alt="User Profile" />
                        <div className="rating d-flex justify-content-center">
                            <i className={`fas fa-star ${rating >= 1 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 2 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 3 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 4 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 5 ? 'filled' : ''}`}></i>
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">{fullName}</h6>
                            <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>{description}</p>
                            <Link to={`/profile/${userId}`} className="btn">Enter Profile</Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img src={userImg} className="card-img-top" alt="User Profile" />
                        <div className="card-body">
                            <h6 className="card-title">{fullName}</h6>
                            <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>{description}</p>
                            <div className="d-flex justify-content-around">
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn">Github</a>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeCard;
