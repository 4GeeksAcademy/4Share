import React from "react";
import { FaGuitar, FaUtensils, FaMusic, FaFutbol, FaCamera } from "react-icons/fa";
import "/workspaces/4Share/src/front/styles/profilePrivate.css"; // Asegúrate de adaptar el camino según tu proyecto

export const PrivateProfile = () => {
    return (
        <div className="container container-private-profile">
            {/* Parte superior con información general y configuración */}
            <div className="profile-main-private">
                {/* Información general del usuario */}
                <div className="general-info">
                    <h2>General Information</h2>
                    <input type="text" placeholder="Gender" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Last name" />
                    <input type="email" placeholder="Email address" />
                    <input type="number" placeholder="Phone Number" />
                    <button className="button-private">Check</button>
                </div>

                {/* Configuración de cuenta */}
                <div className="configuration">
                    <h2>Configuration</h2>
                    <button className="button-private">Change my password</button>
                    <button className="button-private">Notifications</button>
                    <button className="button-private">Change my skills</button>
                    <button className="button-private">Log out</button>
                </div>
            </div>

            {/* Sección de imagen de perfil, descripción y hobbies */}
            <div className="profile-sidebar">
                <div className="profile-info-box"> {/* Caja combinada para foto, hobbies y descripción */}
                    <div className="profile-image-section">
                        <img
                            className="profile-img-private"
                            src="https://cdn.create.vista.com/api/media/small/157947226/stock-photo-man-looking-at-camera"
                            alt="Profile"
                        />
                        <label className="change-image-label">
                            <FaCamera /> {/* Icono de cámara */}
                            <input type="file" className="change-image-input" />
                        </label>
                    </div>

                    {/* Hobbies debajo de la imagen */}
                    <div className="my-hobbies">
                        <h3>My Hobbies</h3>
                        <FaGuitar /> <FaUtensils /> <FaMusic /> <FaFutbol />
                    </div>

                    {/* Descripción debajo de hobbies */}
                    <div className="description-box">
                        <h3>My description</h3>
                        <p>
                            Passionate about music, cooking, and sports. I enjoy learning
                            new things and exploring new cultures.
                        </p>
                    </div>
                </div>
            </div>

            {/* Dirección postal */}
            <div className="postal-address">
                <h2>Postal Address</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13333381.99881003!2d-17.581064739370582!3d35.3253526618782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc42e3783261bc8b%3A0xa6ec2c940768a3ec!2sEspanha!5e0!3m2!1spt-BR!2ses!4v1726490113789!5m2!1spt-BR!2ses"
                    width="1250"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Sección para agregar habilidades */}
            <div className="skills-section">
                <button className="button-private">Add Skills</button>

                <div className="skills-list">
                    <div className="skill-card">
                        <h4>Music</h4>
                        <p>Electric Guitar and Acoustic Guitar</p>
                        <p>No formal education</p>
                        <p>Style: Salsa and Hip-Hop</p>
                        <p>
                            I learned playing 10 years ago, self-taught, and I
                            enjoy playing in my free time. People have told me I
                            have good rhythm!
                        </p>
                    </div>
                    <div className="skill-card">
                        <h4>Cooking</h4>
                        <p>Specialty: Desserts</p>
                        <p>
                            Everything I learned is from my grandmother. I love
                            making cakes, pies, brigadeiros, and my chocolate
                            cookies are the best.
                        </p>
                    </div>
                    <div className="skill-card">
                        <h4>Dance</h4>
                        <p>Style: Salsa and Hip-Hop</p>
                        <p>
                            I've been dancing for 8 years and picked it up
                            watching videos online. I used to take classes for 2
                            years.
                        </p>
                    </div>
                    <div className="skill-card">
                        <h4>Sport</h4>
                        <p>Sport: Padel</p>
                        <p>
                            I've been playing padel for 5 years now, and it's my
                            go-to activity when I want to stay active. I'm part
                            of a local team and often join competitions!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateProfile;
