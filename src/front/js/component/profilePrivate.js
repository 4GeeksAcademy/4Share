import React, { useEffect, useRef, useState, useContext } from "react";
import { FaGuitar, FaUtensils, FaMusic, FaFutbol } from "react-icons/fa";
import "/workspaces/4Share/src/front/styles/ProfilePrivate.css"; 
import { Context } from "../store/appContext";


export const PrivateProfile = () => {
    const {actions,store} = useContext(Context);
    const mapRef = useRef(null);
    const [gender, setGender] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(mapRef.current);
            autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
            autocomplete.addListener("place_changed", function () {
                const place = autocomplete.getPlace();
                console.log(place);
            });
        }
    }, []);

        return (
            <div className="wrapper">
                <div className="container-private-profile">
                    {/* Parte superior con información general y configuración */}
                    <div className="profile-header">
                        {/* Información general del usuario */}
                        <div className="general-info">
                            <h2>General Information</h2>
                            <input onChange={(e)=>setGender(e.target.value)} type="text" placeholder="Gender" />
                            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
                            <input onChange={(e)=>setLastName(e.target.value)} type="text" placeholder="Last name" />
                            <input onChange={(e)=>setEmailAddress(e.target.value)} type="email" placeholder="Email address" />
                            <input onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="User phone" />
                            <button onClick={()=>actions.updateProfile(gender,name,lastname,emailAddress,phone)}>Check</button>
                        </div>
        
                        {/* Dirección postal con Google Maps */}
                        <div className="postal-address">
                            <h2>Postal Address</h2>
                            <input
                                ref={mapRef}
                                type="text"
                                placeholder="Enter your address"
                            />
                        </div>
        
                        {/* Configuración de cuenta */}
                        <div className="configuration">
                            <h2>Configuration</h2>
                            <button>Change my password</button>
                            <button>Notifications</button>
                            <button>Change my skills</button>
                            <button>Log out</button>
                        </div>
                    </div>
        
                    {/* Parte derecha con la información del perfil */}
                    <div className="profile-sidebar">
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
                        <div className="my-hobbies">
                            <h3>My Hobbies</h3>
                            <FaGuitar /> <FaUtensils /> <FaMusic /> <FaFutbol />
                        </div>
                    </div>
        
                    {/* Sección para agregar habilidades */}
                    <div className="skills-section">
                        <h2>What do you want to learn?</h2>
                        <button>Add Skills</button>
        
                        <div className="skills-list">
                            <div className="skill-card">
                                <h4>Music <FaGuitar /></h4>
                                <p>Electric Guitar and Acoustic Guitar</p>
                                <p>No formal education</p>
                                <p>Style: Salsa and Hip-Hop</p>
                                <p>I started playing 10 years ago, self-taught.</p>
                            </div>
                            <div className="skill-card">
                                <h4>Cooking <FaUtensils /></h4>
                                <p>Specialty: Desserts</p>
                                <p>Everything I learned is from my grandmother.</p>
                            </div>
                            <div className="skill-card">
                                <h4>Dance <FaMusic /></h4>
                                <p>Style: Salsa and Hip-Hop</p>
                                <p>I've been dancing for 8 years.</p>
                            </div>
                            <div className="skill-card">
                                <h4>Sport <FaFutbol /></h4>
                                <p>Sport: Padel</p>
                                <p>I've been playing padel for 5 years.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }