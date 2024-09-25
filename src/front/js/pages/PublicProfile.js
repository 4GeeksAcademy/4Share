import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../../styles/profilePrivate.css";
import { Context } from "../store/appContext";
import ReviewCard from '../component/ReviewCard';
import WriteReview from '../component/WriteReview';

export const PublicProfile = () => {
    const { actions } = useContext(Context);
    const { user_id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [matchStatus, setMatchStatus] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        loadData();
        return () => setIsMounted(false);
    }, [user_id]);

    const loadData = async () => {
        setLoading(true);
        try {
            const userProfileData = await actions.getUserProfile(user_id);
            if (isMounted && userProfileData) {
                setUserProfile(userProfileData);
                await loadUserReviews(user_id);
                await checkMatchStatus();
            } else {
                setError("Failed to load user profile.");
            }
        } catch (error) {
            if (isMounted) {
                setError("Error loading user profile: " + (error.message || "Unknown error"));
            }
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    const loadUserReviews = async (userId) => {
        try {
            const userReviews = await actions.getUserReviews(userId);
            setReviews(userReviews);

            const currentUserProfile = await actions.getYourUserProfile();

            if (!currentUserProfile) {
                throw new Error("Could not fetch current user profile");
            }

            const currentUserId = currentUserProfile.id;

            const currentUserReview = userReviews.find(review => {
                return Number(review.reviewer_id) === Number(currentUserId);
            });

            setUserReview(currentUserReview);
        } catch (error) {
            setError("Error loading reviews: " + (error.message || "Unknown error"));
        }
    };

    const checkMatchStatus = async () => {
        try {
            const matchData = await actions.getMatchStatus(user_id);
            if (isMounted && matchData) setMatchStatus(matchData);
        } catch (error) {
            if (isMounted) {
                setError("Error loading match status: " + (error.message || "Unknown error"));
            }
        }
    };

    const handleSendMatchRequest = async () => {
        try {
            const result = await actions.createMatch(user_id);
            if (result) setMatchStatus({ status: 'pending', match_id: result.match_id });
        } catch (error) {
            console.error("Failed to send match request:", error);
        }
    };

    const handleSaveReview = async (score, comment) => {
        try {
            const reviewData = {
                reviewee_id: user_id,
                score,
                comment
            };

            let savedReview;
            if (editingReview) {
                savedReview = await actions.updateReview(editingReview.id, reviewData);
            } else {
                savedReview = await actions.saveReview(user_id, reviewData);
            }

            if (savedReview) {
                setReviews(prevReviews => {
                    if (editingReview) {
                        return prevReviews.map(r => (r.id === editingReview.id ? savedReview : r));
                    } else {
                        return [...prevReviews, savedReview];
                    }
                });
                setUserReview(savedReview);
                setEditingReview(null);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error("Error saving review:", error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await actions.deleteReview(reviewId);
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));

            if (userReview && userReview.id === reviewId) {
                setUserReview(null);
                setEditingReview(null);
            }

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
    };

    const renderStars = (score) => {
        const roundedScore = Math.round(score);
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < roundedScore ? 'filled' : ''}`}>★</span>
        ));
    };

    const renderMatchButton = () => {
        if (!matchStatus) return null;

        if (matchStatus.status === 'none') {
            return <button onClick={handleSendMatchRequest}>Send Friend Request</button>;
        }

        if (matchStatus.status === 'pending') {
            return <button disabled>Friend Request Already Sent</button>;
        }

        if (matchStatus.status === 'accepted') {
            if (!userReview) {
                return (
                    <div className="profile-wrapper p-5 mt-4">
                        <div className="profile-right">
                            <div className="profile-actions">
                                <WriteReview onSave={handleSaveReview} />
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return null;
    };

    if (loading) return null;

    return (
        <div className="profile-page">
            {error && <p className="error">{error}</p>}

            <div className="profile-wrapper">
                <div className="profile-left">
                    <div className="profile-description section">
                        <div className="profile-image-container">
                            <img
                                className="profile-img"
                                src={userProfile.profile_pic || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png"}
                                alt="Profile"
                            />
                        </div>
                        <hr />
                        <div className="rating d-flex justify-content-center">{renderStars(userProfile.average_score)}</div>
                        <h5>Average Score: {userProfile.average_score || "N/A"}</h5>
                    </div>
                </div>

                <div className="general-info section">
                    <h2>General Information</h2>
                    <h5>Name: {userProfile.name || "N/A"}</h5>
                    <h5>Last Name: {userProfile.last_name || "N/A"}</h5>
                    <h5>Gender: {userProfile.gender || "N/A"}</h5>
                </div>

                <div className="postal-address section">
                    <h2>Description</h2>
                    <h6>{userProfile.description || "No description provided."}</h6>
                </div>
            </div>

            {renderMatchButton()}

            <div className="profile-wrapper p-5 mt-4">
                <div className="profile-left">
                    <div className="general-info section">
                        <h2>Reviews</h2>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <ReviewCard
                                    key={review.id || index}
                                    review={review}
                                    currentUserProfile={userProfile}
                                    onEdit={() => handleEditReview(review)}
                                    onDelete={() => handleDeleteReview(review.id)}
                                />
                            ))
                        ) : (
                            <p>No reviews found for this user.</p>
                        )}
                    </div>
                </div>
            </div>

            {editingReview && (
                <div className="editing-review">
                    <WriteReview
                        onSave={handleSaveReview}
                        revieweeId={user_id}
                        initialComment={editingReview.comment}
                        initialScore={editingReview.score}
                    />
                    <button onClick={() => handleDeleteReview(editingReview.id)}>Delete Review</button>
                </div>
            )}
        </div>
    );
};

export default PublicProfile;