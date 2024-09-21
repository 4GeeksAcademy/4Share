import React from 'react';
import "../../styles/home.css"; 

const SearchUserCard = ({ user }) => {
    console.log("User Data:", user); 

    const {
        description = "This user currently has no description.",
        profile_pic: userImg,
        name: fullName = "Nombre Apellido",
        average_score: rating = 0
    } = user;

    console.log("Parsed Data:", { fullName, rating }); 

    const profilePicture = userImg || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png";

    const renderStars = (score) => {
        const roundedScore = Math.round(score); 
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="star" style={{ color: index < roundedScore ? 'gold' : 'lightgray' }}>
                ★
            </span>
        ));
    };

    return (
        <div className="card cardsBorder">
            <div className="imageContainer">
                <img src={profilePicture} alt={`${fullName}'s profile`} className="profile-pic" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{fullName}</h5>
                <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>
                    {description}
                </p>
                <div className="stars">
                    {renderStars(rating)} 
                </div>
                <div className="d-flex justify-content-center">
                    <a href={`/profile/${user.id}`} className="btn mt-2">View Profile</a>
                </div>
            </div>
        </div>
    );
};

export default SearchUserCard;
