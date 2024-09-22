import React, { useState, useContext } from "react";
import { FaGuitar, FaMusic, FaFutbol, FaMapMarkerAlt } from "react-icons/fa";
import "/workspaces/4Share/src/front/styles/ProfilePrivate.css";
import { Context } from "../store/appContext";

// Componente SkillCard
const SkillCard = ({ icon: Icon, title, description }) => (
    <div className="skill-card">
        <Icon size={32} />
        <h4>{title}</h4>
        {description.map((line, index) => (
            <p key={index}>{line}</p>
        ))}
    </div>
);

export const PrivateProfile = () => {
    const { actions } = useContext(Context);
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    const handleSave = async () => {
        if (!name || !emailAddress || !phone) {
            setError("Please fill in all required fields.");
            return;
        }

        const result = await actions.updateProfile(
            gender,
            name,
            emailAddress,
            lastname,
            phone
        );

        if (result) {
            setError(null);
            alert("Profile updated successfully");
        } else {
            setError("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="profile-page">
            <div className="navbar">
                <button className="navbar-btn">My Account</button>
                <button className="navbar-btn">Request</button>
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
                        />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                            required
                        />
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last name"
                        />
                        <input
                            onChange={(e) => setEmailAddress(e.target.value)}
                            type="email"
                            placeholder="Email address"
                            required
                        />
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="User phone"
                            required
                        />
                        <button onClick={handleSave} className="save-btn">
                            Save
                        </button>
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
                            />
                        </div>
                        <button onClick={() => actions.updateAddress(address)} className="save-btn">
                            Save Address
                        </button>
                    </div>

                    <div className="configuration section">
                        <h2>Configuration</h2>
                        <button>Change my password</button>
                        <button>Notifications</button>
                        <button>Change my skills</button>
                        <button>Log out</button>
                    </div>
                </div>

                <div className="profile-right">
                    <div className="profile-description section">
                        <img
                            className="profile-img"
                            src="https://images.ctfassets.net/pdf29us7flmy/7F5XUfHuv7dAW6joysWHxE/c5623a1d81518a813ad53b5020282bdb/GettyImages-583665183_optimized__1_.jpg?w=720&q=100&fm=jpg"
                            alt="Profile"
                        />
                        <h3>My description</h3>
                        <p>Passionate about music, cooking, and sports.</p>
                    </div>

                    <div className="my-hobbies section">
                        <h3>My Hobbies</h3>
                        <div className="hobby-icons">
                            <i className="fas fa-utensils"></i>
                            <FaMusic />
                            <FaFutbol />
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="section-title">Add Skills</h2>

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
                    icon={() => <i className="fas fa-utensils"></i>}
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
            </div>
        </div>
    );
};
