import React from 'react';
import "../../styles/reviewCard.css";

const ReviewCard = ({ review, onEdit, onDelete }) => {
    if (!review || !review.reviewer_info) {
        return <div>Loading...</div>; 
    }

    const renderStars = (score) => {
        const roundedScore = Math.round(score);
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < roundedScore ? 'filled' : ''}`}>★</span>
        ));
    };

    return (
        <div className="request-item" key={`review-${review.id}`}>
            <img
                className="request-img"
                src={review.reviewer_info.profile_pic || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png"}
                alt={`${review.reviewer_info.name || "Unknown User"} ${review.reviewer_info.last_name || ""}`}
            />
            <div className="request-info">
                <h5>{review.reviewer_info.name || "Unknown User"} {review.reviewer_info.last_name || ""}</h5>
                <div className="rating">{renderStars(review.score)}</div>
                <p>{review.comment || "No comment provided."}</p>

                {onEdit && onDelete && (
                <div className="review-actions">
                    <button className="edit-button" onClick={onEdit}>Modify</button>
                    <button className="delete-button" onClick={onDelete}>Delete</button>
                </div>
                 )}
            </div>
        </div>
    );
};

export default ReviewCard;