import React, { useState, useContext } from "react";
import "/workspaces/4Share/src/front/styles/profilePrivate.css";
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

export const ProfilePrivate = () => {
    const { actions } = useContext(Context);
    const [location,setLocation] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    const handleSave = async () => {
        console.log('Handling save...');
    
        if (!name || !emailAddress || !phone) {
            setError("Please fill in all required fields.");
            console.log('Missing required fields');
            return;
        }
    
        console.log('Calling updateProfile action with:', { name, emailAddress, location, lastname, phone });
    
        const result = await actions.updateProfile(
            location,
            name,
            emailAddress,
            lastname,
            phone
        );
    
        if (result) {
            console.log('Profile updated successfully');
            setError(null);
            alert("Profile updated successfully");
        } else {
            console.log('Failed to update profile');
            setError("Failed to update profile. Please try again.");
        }
    };
  
    return (
        <div className="profile-page">
        
            {/* Segundo navbar */}
            <div className="navbar">
                <button className="navbar-btn">My Account</button>
                <button className="navbar-btn">Request</button>
            </div>

            <div className="profile-wrapper">
                {/* Sección izquierda */}
                <div className="profile-left">
                    <div className="general-info section">
                        <h2>General Information</h2>
                        {error && <p className="error-message">{error}</p>}
                        <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location" />
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required />
                        <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name" />
                        <input onChange={(e) => setEmailAddress(e.target.value)} type="email" placeholder="Email address" required />
                        <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="User phone" required />
                        <button onClick={()=>handleSave()} className="save-btn">
                            Save
                        </button>
                    </div>

                    {/* Sección de la dirección postal */}
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
                    </div>

                    {/* Sección de configuración */}
                    <div className="configuration section">
                        <h2>Configuration</h2>
                        <button>Change my password</button>
                        <button>Notifications</button>
                        <button>Change my skills</button>
                        <button>Log out</button>
                    </div>
                </div>

                {/* Sección derecha */}
                <div className="profile-right">
                    <div className="profile-description section">
                        <img
                            className="profile-img"
                            src="https://images.ctfassets.net/pdf29us7flmy/7F5XUfHuv7dAW6joysWHxE/c5623a1d81518a813ad53b5020282bdb/GettyImages-583665183_optimized__1_.jpg?w=720&q=100&fm=jpg"
                            alt="Profile"
                        />
                        <h3>My description</h3>
                        <p>
                            Passionate about music, cooking, and sports. I enjoy learning
                            new things and exploring new cultures.
                        </p>
                    </div>

                    <div className="my-hobbies section">
                        <h3>My Hobbies</h3>
                        <div className="hobby-icons">
                            <FaGuitar /> <i className="fas fa-utensils"> </i><FaMusic /> <FaFutbol />
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider con el título "Añadir habilidades" */}
            <h2 className="section-title">Añadir habilidades</h2>

            {/* Sección de habilidades */}
            <div className="skills-section">
                <SkillCard
                    icon={FaMusic}
                    title="Music"
                    description={[
                        "Electric Guitar and Acoustic Guitar",
                        "No formal education",
                        "I started playing 10 years ago, self-taught, and am still learning!"
                    ]}
                />
                <SkillCard
                    icon={FaUtensils}
                    title="Cooking"
                    description={[
                        "Started cooking as a hobby 2 years ago",
                        "Not a professional chef, but I make great food",
                        "Enjoy experimenting with recipes"
                    ]}
                />
                <SkillCard
                    icon={FaFutbol}
                    title="Football"
                    description={[
                        "Started playing in my teens",
                        "I play for fun every weekend with friends",
                        "Enjoy watching football leagues"
                    ]}
                />
            </div>
        </div>
    );
};

export default ProfilePrivate;