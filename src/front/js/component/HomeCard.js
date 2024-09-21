import React from 'react';
import "../../styles/home.css";
import "../../styles/searchUserCard.css";

const HomeCard = ({ isOwnProfile, user }) => {
    const userData = user.user || user; 

    const {
        description,
        profile_pic: userImg,
        name: fullName = "Nombre Apellido",
        last_name: lastName = "",
        github: githubUrl = "#",
        linkedin: linkedinUrl = "#",
        average_score: rating = 0,
        photo: creatorImg 
    } = userData;

    const imageSrc = creatorImg || userImg || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png";
    const effectiveDescription = description || "This user currently has no description.";

    const renderStars = (score) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < Math.round(score) ? 'filled' : ''}`}>
                ★
            </span>
        ));
    };

    return (
        <div className="card cardsBorder">
            <div className="cards">
                <div className="imageContainer">
                    <img src={imageSrc} alt={fullName} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{`${fullName} ${lastName}`}</h5>

                    {isOwnProfile ? (
                        // If Creator type of Card
                        <>
                            <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>
                                {effectiveDescription}
                            </p>
                            <div className="d-flex justify-content-around">
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn">Github</a>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
                            </div>
                        </>
                    ) : (
                        // If BestSharer type of Card
                        <>
                            <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>
                                {effectiveDescription}
                            </p>
                            <div className="stars d-flex justify-content-center">
                                 {renderStars(rating)}  
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href={`/profile/${user.user.id}`} className="btn mt-2">View Profile</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
