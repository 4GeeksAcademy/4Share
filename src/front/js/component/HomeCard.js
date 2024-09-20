import React from 'react';
import "../../styles/home.css";
import { Link } from "react-router-dom";

const HomeCard = ({ isOwnProfile, user }) => {
    const {
        description = "User has no description.",
        photo: userImg = "https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908776/SunWithLogo_n5wpgr.png",
        name: fullName = "Nombre Apellido",
        github: githubUrl = "#",
        linkedin: linkedinUrl = "#",
    } = user || {};

    return (
        <div className="card cardsBorder">
            <div className="cards">
                <div className="imageContainer">
                    <img src={userImg} alt={fullName} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{fullName}</h5>
                    <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>{description}</p>
                    {isOwnProfile && (
                        <div className="d-flex justify-content-around">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn">Github</a>
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
