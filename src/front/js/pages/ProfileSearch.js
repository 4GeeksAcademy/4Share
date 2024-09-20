import React, { useState } from "react";
import '../../styles/profileSearch.css';
const ProfileSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const profiles = [
        { name: "John Doe", description: "I am a musician with 10 years of experience. I love teaching and learning new things.", category: "music", rating: 4 },
        { name: "Jane Smith", description: "I've worked with languages and am currently fluent in 3: English, Portuguese and Spanish.", category: "languages", rating: 5 },
        { name: "Mike Johnson", description: "I love cooking and know various recipes; my specialty is desserts.", category: "cooking", rating: 3 },
        { name: "Emily Davis", description: "I'm passionate about sports and fitness. With 5 years as a pro athlete.", category: "sports", rating: 4 },
        { name: "Sophia Lee", description: "I've been a dancer for over 8 years, focusing on contemporary. I love teaching dance.", category: "dance", rating: 5 },
        { name: "David Brown", description: "Education is my life. I have experience helping students improve their skills.", category: "studies", rating: 5 },
    ];
    const [selectedCategory, setSelectedCategory] = useState("");
    const filteredProfiles = profiles.filter((profile) => {
        return (
            profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "" || profile.category === selectedCategory)
        );
    });
    // Function to render stars based on rating
    const renderStars = (rating) => {
        const totalStars = 5;
        let stars = [];
        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span key={i} className="star">
                    {i <= rating ? "★" : "☆"}
                </span>
            );
        }
        return stars;
    };
    return (
        <div className="container text-center mt-5 profileSearch">
            <div className="row">
                <div className="col">
                    <h1 className="custom-title">Start Searching!</h1>
                </div>
            </div>
            {/* search bar */}
            <div className="row justify-content-center mt-3">
                <div className="col-md-8">
                    <div className="d-flex">
                        <input
                            type="search"
                            className="form-control custom-search-bar me-2"
                            placeholder="Find by person's name"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn custom-search-button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* Emojis categories */}
            <div className="row justify-content-center mt-3">
                <div className="col-md-8">
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-light" onClick={() => setSelectedCategory("sports")}>
                            :baloncesto: Sports
                        </button>
                        <button className="btn btn-light" onClick={() => setSelectedCategory("studies")}>
                            :libros: Studies
                        </button>
                        <button className="btn btn-light" onClick={() => setSelectedCategory("dance")}>
                            :bailarín: Dance
                        </button>
                        <button className="btn btn-light" onClick={() => setSelectedCategory("languages")}>
                            :tierra_áfrica: Languages
                        </button>
                        <button className="btn btn-light" onClick={() => setSelectedCategory("cooking")}>
                            :huevo_frito: Cooking
                        </button>
                        <button className="btn btn-light" onClick={() => setSelectedCategory("music")}>
                            :notas: Music
                        </button>
                        <button className="btn btn-light" onClick={() => setSelectedCategory("")}>
                            All
                        </button>
                    </div>
                </div>
            </div>
            {/* Filter profiles */}
            <div className="row justify-content-center mt-5">
                {filteredProfiles.map((profile, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/150"
                                className="card-img-top"
                                alt="Profile"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{profile.name}</h5>
                                <p className="card-text">{profile.description}</p>
                                {/* Stars */}
                                <div className="stars">
                                    {renderStars(profile.rating)}
                                </div>
                                <a href="#" className="btn custom-btn mt-2">
                                    View Profile
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSearch;