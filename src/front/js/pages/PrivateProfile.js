import React, { useState, useContext, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import "../../styles/profilePrivate.css"; // Asegúrate de tener estilos responsive aquí
import { Context } from "../store/appContext";
import ReviewCard from '../component/ReviewCard';
import Cloudinary from '../component/Cloudinary'; // Mantener este import
export const PrivateProfile = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [reviews, setReviews] = useState([]);
    const [imageFile, setImageFile] = useState(null); // Almacena el archivo de imagen en lugar de la URL
    const [imageUrl, setImageUrl] = useState(''); // Almacena la URL de la imagen
    const preset_name = process.env.REACT_APP_CLOUDINARY_PRESET;
    const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const userProfileData = await actions.getYourUserProfile();
                if (userProfileData) {
                    setUserProfile(userProfileData);
                    setEditedProfile(userProfileData);
                    await loadUserReviews(userProfileData.id);
                } else {
                    setError("Failed to load user profile.");
                }
            } catch (err) {
                setError("Error loading user profile: " + (err.message || "Unknown error"));
            }
        };
        loadUserProfile();
    }, []);
    const loadUserReviews = async (userId) => {
        try {
            const userReviews = await actions.getUserReviews(userId);
            setReviews(userReviews);
        } catch (error) {
            setError("Error loading reviews: " + (error.message || "Unknown error"));
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prev) => ({
            ...prev,
            [name]: value === "" ? null : value,
        }));
    };
    const handleSave = async () => {
        if (!editedProfile.name || !editedProfile.email || !editedProfile.phone) {
            alert("Please fill in all required fields.");
            return;
        }
        // Subir imagen a Cloudinary si se seleccionó una
        if (imageFile) {
            try {
                const url = await uploadImageToCloudinary(imageFile); // Función para subir a Cloudinary
                setImageUrl(url);
                setEditedProfile((prev) => ({ ...prev, profile_pic: url })); // Actualizar el perfil con la nueva URL
            } catch (err) {
                setError("Error uploading image: " + (err.message || "Unknown error"));
                return; // Detener ejecución si hay error
            }
        }
        try {
            await actions.updateProfile(
                editedProfile.name,
                editedProfile.email,
                editedProfile.last_name,
                editedProfile.phone,
                editedProfile.location,
                editedProfile.profile_pic,
                editedProfile.gender,
                editedProfile.description,
                editedProfile.password // Agrega password a la función de actualización
            );
            setUserProfile(editedProfile);
            setIsEditingProfile(false);
        } catch (err) {
            setError("Error updating profile: " + (err.message || "Unknown error"));
        }
    };
    // Subir archivo a Cloudinary y obtener la URL segura
    const uploadImageToCloudinary = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name); // Usar el preset
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: data,
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Error uploading image");
        }
        return result.secure_url; // Retorna la URL de la imagen subida
    };
    const handleEdit = () => setIsEditingProfile((prev) => !prev);
    const handleImageSelected = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Almacena el archivo en el estado
            setImageUrl(URL.createObjectURL(file)); // Muestra la vista previa de la imagen seleccionada
        }
    };
    // Renderiza las estrellas con base en la puntuación
    const renderStars = (score) => {
        const roundedScore = Math.round(score);
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < roundedScore ? 'filled' : ''}`}>★</span>
        ));
    };
    if (!userProfile) {
        return null;
    }
    return (
        <div className="profile-page">
            <div className="secondNavbar">
                <button className="btn btn-primary" disabled>
                    <i className="fas fa-user icon"></i>
                    <span className="m-0 h6">Profile</span>
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/requests')}>
                    <i className="fas fa-tasks icon"></i>
                    <span className="m-0 h6">Requests</span>
                </button>
            </div>
            <div className="profile-wrapper">
                <div className="profile-left">
                    <div className="general-info section">
                        <h2>General Information</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            value={editedProfile.name || ""}
                            disabled={!isEditingProfile}
                            maxLength="35"
                        />
                        <input
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            value={editedProfile.last_name || ""}
                            disabled={!isEditingProfile}
                            maxLength="35"
                        />
                        <input
                            onChange={handleInputChange}
                            placeholder="User phone"
                            name="phone"
                            required
                            value={editedProfile.phone || ""}
                            disabled={!isEditingProfile}
                            type="number"
                            maxLength="35"
                        />
                        <input
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Gender"
                            name="gender"
                            value={editedProfile.gender || ""}
                            disabled={!isEditingProfile}
                            maxLength="35"
                        />
                        <input
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Address"
                            name="location"
                            value={editedProfile.location || ""}
                            disabled={!isEditingProfile}
                            maxLength="35"
                        />
                    </div>
                    <div className="general-info section">
                        <h2>Security</h2>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Email address"
                            name="email"
                            required
                            value={editedProfile.email || ""}
                            disabled={!isEditingProfile}
                            maxLength="35"
                        />
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleEdit} className="edit-btn">
                            <i className="fas fa-edit icon" style={{ marginRight: '5px' }}></i>
                            {isEditingProfile ? "Cancel" : "Edit"}
                        </button>
                        {isEditingProfile && (
                            <button onClick={handleSave} className="save-btn" style={{ marginLeft: '10px' }}>
                                Save All
                            </button>
                        )}
                    </div>
                </div>
                <div className="profile-right">
                    <div className="profile-description section">
                        <div className="profile-image-container">
                            <img
                                className="profile-img"
                                src={imageUrl || userProfile.profile_pic || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png"}
                                alt="Profile"
                            />
                            {isEditingProfile && (
                                <input
                                    type="file"
                                    onChange={handleImageSelected} 
                                />
                            )}
                        </div>
                        <hr />
                        <div className="rating d-flex justify-content-center">{renderStars(userProfile.average_score)}</div>
                        <h6>Average Score: {userProfile.average_score || "N/A"}</h6>
                    </div>
                    <div className="postal-address section">
                        <h2>My Description</h2>
                        <div className="address-input">
                
                            <textarea
                                placeholder="Enter your Description"
                                name="description"
                                value={editedProfile.description || ""}
                                onChange={handleInputChange}
                                disabled={!isEditingProfile}
                                rows={3}
                                maxLength="300"
                                className="auto-expand"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-wrapper p-5 mt-4">
                <div className="profile-left">
                    <div className="general-info section">
                        <h2>Reviews</h2>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))
                        ) : (
                            <p>No reviews found for this user.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PrivateProfile;