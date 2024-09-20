import React from "react";
import "../../styles/profile.css";

export const Profile = () => {
    return (
        <div className="container container-profile">
            {/* Parte izquierda con información general */}
            <div className="profile-main-public">
                {/* Botones de filtro con íconos */}
                <div className="filter-buttons">
                    <button>
                        <FaGuitar /> Guitar
                    </button>
                    <button>
                        <FaUtensils /> Cook
                    </button>
                    <button>
                        <FaMusic /> Dance
                    </button>
                    <button>
                        <FaFutbol /> Padel
                    </button>
                </div>

                {/* Título y descripción */}
                <h2>Hey, everyone! I love a bunch of activities and would love to learn new languages.</h2>
                <p>I'm always up for trying new things and meeting people from different cultures. Shall we do this exchange and learn from each other?</p>

                {/* Sección "About me" */}
                <div className="about-me">
                    <h4>About me</h4>
                    <p>
                        Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect neutral nisi intricate content.
                    </p>
                </div>

                {/* Sección de Reviews */}
                <div className="reviews-section">
                    <h4>Reviews</h4>
                    <div className="review-cards">
                        <div className="review-card">
                            <p className="quote">"Great experience!"</p>
                            <p className="review-title">John Doe</p>
                            <p className="reviewer-info">Reviewed 2 weeks ago</p>
                        </div>
                        <div className="review-card">
                            <p className="quote">"Would definitely recommend."</p>
                            <p className="review-title">Jane Smith</p>
                            <p className="reviewer-info">Reviewed 1 month ago</p>
                        </div>
                        {/* Nuevas tarjetas de reseña */}
                        <div className="review-card">
                            <p className="quote">"Amazing teacher, I learned so much!"</p>
                            <p className="review-title">Alex Brown</p>
                            <p className="reviewer-info">Reviewed 3 days ago</p>
                        </div>
                        <div className="review-card">
                            <p className="quote">"Incredibly helpful and fun!"</p>
                            <p className="review-title">Emily White</p>
                            <p className="reviewer-info">Reviewed 1 week ago</p>
                        </div>
                        <div className="review-card">
                            <p className="quote">"Very engaging sessions."</p>
                            <p className="review-title">Chris Green</p>
                            <p className="reviewer-info">Reviewed 2 months ago</p>
                        </div>
                        <div className="review-card">
                            <p className="quote">"Would love to collaborate again."</p>
                            <p className="review-title">Patricia Blue</p>
                            <p className="reviewer-info">Reviewed 5 days ago</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Parte derecha con la información del perfil */}
            <div className="profile-sidebar-public">
                {/* Aquí es donde agregas la imagen de Cloudinary */}
                <img className="profile-img-public" src="https://images.ctfassets.net/pdf29us7flmy/7F5XUfHuv7dAW6joysWHxE/c5623a1d81518a813ad53b5020282bdb/GettyImages-583665183_optimized__1_.jpg?w=720&q=100&fm=jpg" alt="Profile" />
                <h3>Samantha</h3>
                <div className="stars">
                    {/* <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /> */}
                </div>
                <p>5 opinions</p>

                {/* Añadimos íconos debajo de la imagen de perfil */}
                <div className="activity-icons">
                    {/* <FaGuitar /> <FaUtensils /> <FaMusic /> <FaFutbol /> */}
                </div>
            </div>
        </div>
    );
};

export default Profile;