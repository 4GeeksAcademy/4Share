import React, { useState, useContext } from "react";
import { FaGuitar, FaUtensils, FaMusic, FaFutbol, FaMapMarkerAlt } from "react-icons/fa";
import "/workspaces/4Share/src/front/styles/ProfilePrivate.css";
import { Context } from "../store/appContext";

export const PrivateProfile = () => {
    const { actions } = useContext(Context);
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSave = async () => {
        const result = await actions.updateProfile(
            null,  // Asegúrate de pasar el id del usuario si es necesario
            name,
            emailAddress,
            gender,
            lastname,
            null,  // Puedes agregar la fecha de nacimiento si está disponible
            phone
        );
        if (result) {
            // Manejar éxito (por ejemplo, mostrar un mensaje o redirigir al usuario)
        } else {
            // Manejar error (por ejemplo, mostrar un mensaje de error)
        }
    };

    return (
        <div className="profile-page">
            {/* Second navbar */}
            <div className="navbar">
                <button className="navbar-btn">My Account</button>
                <button className="navbar-btn">Request</button>
            </div>

            <div className="profile-wrapper">
                {/* Left Section */}
                <div className="profile-left">
                    <div className="general-info section">
                        <h2>General Information</h2>
                        <input onChange={(e) => setGender(e.target.value)} type="text" placeholder="Gender" />
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                        <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name" />
                        <input onChange={(e) => setEmailAddress(e.target.value)} type="email" placeholder="Email address" />
                        <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="User phone" />
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
                    </div>

                    <div className="configuration section">
                        <h2>Configuration</h2>
                        <button>Change my password</button>
                        <button>Notifications</button>
                        <button>Change my skills</button>
                        <button>Log out</button>
                    </div>
                </div>

                {/* Right Section */}
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
                            <FaGuitar /> <FaUtensils /> <FaMusic /> <FaFutbol />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Divider with Title "Añadir habilidades" */}
            <h2 className="section-title">Añadir habilidades</h2>

            {/* Skills Section */}
            <div className="skills-section">
                <div className="skill-card">
                    <FaMusic size={32} />
                    <h4>Music</h4>
                    <p>Electric Guitar and Acoustic Guitar</p>
                    <p>No formal education</p>
                    <p>
                        I started playing 10 years ago, self-taught, and I have a natural talent for string instruments. I can help you learn how to play acoustic guitar or teach you some cool tricks on the electric guitar.
                    </p>
                </div>

                <div className="skill-card">
                    <FaUtensils size={32} />
                    <h4>Cooking</h4>
                    <p>Specialty: Desserts</p>
                    <p>Everything I learned was from my grandmother.</p>
                    <p>
                        I love making cakes, pies, brigadeiro, flan, and my chocolate cookies are the best.
                    </p>
                </div>

                <div className="skill-card">
                    <FaMusic size={32} />
                    <h4>Dance</h4>
                    <p>Styles: Salsa and Hip-Hop</p>
                    <p>No formal training</p>
                    <p>
                        I've been dancing for over 8 years and picked it up through experience.
                    </p>
                </div>
                
                <div className="skill-card">
                    <FaGuitar size={32} />
                    <h4>Guitar</h4>
                    <p>Learn to play beautiful music with the guitar.</p>
                </div>
            </div>
        </div>
    );
};
