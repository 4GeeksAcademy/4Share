import React, { useState, useContext } from "react";
import { FaGuitar, FaMusic, FaFutbol, FaMapMarkerAlt, FaUtensils, FaCamera, FaEdit, FaSave, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "/workspaces/4Share/src/front/styles/ProfilePrivate.css";
import { Context } from "../store/appContext";

const SkillCard = ({ icon: Icon, title, description }) => (
    <div className="skill-card" style={{ backgroundColor: '#e0d5e6' }}> {/* Color de fondo lila */}
        <Icon size={32} />
        <h4>{title}</h4>
        {description.map((line, index) => (
            <p key={index}>{line}</p>
        ))}
    </div>
);

export const PrivateProfile = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleSave = async () => {
        if (!name || !emailAddress || !phone) {
            setError("Please fill in all required fields.");
            return;
        }

        const profileResult = await actions.updateProfile(
            gender,
            name,
            emailAddress,
            lastname,
            phone
        );

        const addressResult = await actions.updateAddress(address);

        if (profileResult && addressResult) {
            setError(null);
            alert("Profile and address updated successfully");
            setIsEditingProfile(false);
        } else {
            setError("Failed to update profile or address. Please try again.");
        }
    };

    const handleEdit = () => {
        setIsEditingProfile(!isEditingProfile);
    };

    const handleUploadImage = () => {
        window.open("https://cloudinary.com", "_blank");
    };

    const handleLogout = () => {
        console.log("Logged out");
    };

    return (
        <div className="profile-page">
            <div className="navbar">
                <button className="btn" onClick={() => navigate('/profile')}>
                    <i className="fas fa-user icon"></i>
                    <span className="m-0 h6">Profile</span>
                </button>
                
                <button className="btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt icon"></i>
                    <span className="m-0 h6">Logout</span>
                </button>
            </div>

            <div className="profile-wrapper">
                <div className="profile-left">
                    <div className="general-info section">
                        <h2>General Information</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input
                            onChange={(e) => setGender(e.target.value)}
                            type="text"
                            placeholder="Gender"
                            value={gender}
                            disabled={!isEditingProfile}
                        />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            disabled={!isEditingProfile}
                        />
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last name"
                            value={lastname}
                            disabled={!isEditingProfile}
                        />
                        <input
                            onChange={(e) => setEmailAddress(e.target.value)}
                            type="email"
                            placeholder="Email address"
                            required
                            value={emailAddress}
                            disabled={!isEditingProfile}
                        />
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="User phone"
                            required
                            value={phone}
                            disabled={!isEditingProfile}
                        />
                    </div>

                    <div className="postal-address section">
                        <h2>Postal Address</h2>
                        <div className="address-input">
                            <FaMapMarkerAlt className="location-icon" />
                            <input
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={!isEditingProfile}
                            />
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button onClick={handleEdit} className="edit-btn">
                            <FaEdit style={{ marginRight: '5px' }} />
                            {isEditingProfile ? "Cancel" : "Edit"}
                        </button>

                        <button 
                            onClick={handleSave} 
                            className="save-btn" 
                            disabled={!isEditingProfile}
                            style={{ marginLeft: '10px' }}
                        >
                            <FaSave style={{ marginRight: '5px' }} />
                            Save All
                        </button>
                    </div>
                </div>

                <div className="profile-right">
                    <div className="profile-description section">
                        <div className="profile-image-container">
                            <img
                                className="profile-img"
                                src="https://images.ctfassets.net/pdf29us7flmy/7F5XUfHuv7dAW6joysWHxE/c5623a1d81518a813ad53b5020282bdb/GettyImages-583665183_optimized__1_.jpg?w=720&q=100&fm=jpg"
                                alt="Profile"
                            />
                            <div className="camera-icon" onClick={handleUploadImage}>
                                <FaCamera size={20} />
                            </div>
                        </div>
                        <h3>My description</h3>
                        <p>Passionate about music, cooking, and sports.</p>
                    </div>

                    <div className="my-hobbies section">
                        <h3>My Hobbies</h3>
                        <div className="hobby-icons">
                            <i className="fas fa-utensils"></i>
                            <FaGuitar />
                            <FaMusic />
                            <FaFutbol />
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="section-title" style={{ color: '#6c63ff' }}>Add Skills</h2>

            <div className="skills-section">
                <SkillCard
                    icon={FaMusic}
                    title="Music"
                    description={[
                        "Electric and Acoustic Guitar",
                        "Self-taught for 10 years",
                    ]}
                />
                <SkillCard
                    icon={FaUtensils}
                    title="Cooking"
                    description={[
                        "Started 2 years ago",
                        "Enjoy experimenting with recipes",
                    ]}
                />
                <SkillCard
                    icon={FaFutbol}
                    title="Football"
                    description={[
                        "Playing since teens",
                        "Watch football leagues regularly",
                    ]}
                />
                <SkillCard
                    icon={FaHeart} // Icono de danza
                    title="Dance"
                    description={[
                        "Enjoy various dance styles",
                        "Regularly take classes",
                    ]}
                />
            </div>
        </div>
    );
};
