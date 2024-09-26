import React, { useState, useEffect } from 'react';
import "../../styles/reviewCard.css";

const WriteReview = ({ onSave, initialComment, initialScore }) => {
    const [comment, setComment] = useState(initialComment || '');
    const [score, setScore] = useState(initialScore || 0);

    useEffect(() => {
        setComment(initialComment || '');
        setScore(initialScore || 0);
    }, [initialComment, initialScore]);

    const renderStars = (currentScore) => (
        Array.from({ length: 5 }, (_, index) => (
            <span 
                key={index} 
                className={`star ${index < currentScore ? 'filled' : ''}`} 
                onClick={() => setScore(index + 1)} 
            >
                ★
            </span>
        ))
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave(score, comment);
            setComment('');  
            setScore(0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="write-review-form">
            <h3 style={{color:"white"}}>{initialComment ? "Edit Your Review" : "Write a Review"}</h3>
            <div className="review-form">
                <div className="star-rating">{renderStars(score)}</div>
                <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                />
                <button type="submit">{initialComment ? "Update Review" : "Submit Review"}</button>
            </div>
        </form>
    );
};

export default WriteReview;