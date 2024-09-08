import React, { useState } from "react";

const ProfileShare = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const profiles = [
    { name: "John Doe", description: "Musician with 10 years of experience.", category: "music", rating: 4 },
    { name: "Jane Smith", description: "Professional painter and artist.", category: "art", rating: 5 },
    { name: "Mike Johnson", description: "Software engineer and developer.", category: "technology", rating: 3 },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProfiles = profiles.filter((profile) => {
    return (
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || profile.category === selectedCategory)
    );
  });

  // Função para renderizar estrelas com base na avaliação
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
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col">
          <h1 className="custom-title">Start Searching!</h1>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <div className="d-flex">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Learn something new"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary"><i className="fas fa-search"></i></button>
          </div>
        </div>
      </div>

      {/* Emojis com categorias */}
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <div className="d-flex justify-content-around">
            <button className="btn btn-light" onClick={() => setSelectedCategory("sports")}>
              🏀 Sports
            </button>
            <button className="btn btn-light" onClick={() => setSelectedCategory("studies")}>
              📚 Studies
            </button>
            <button className="btn btn-light" onClick={() => setSelectedCategory("dance")}>
              💃 Dance
            </button>
            <button className="btn btn-light" onClick={() => setSelectedCategory("languages")}>
              🌍 Languages
            </button>
            <button className="btn btn-light" onClick={() => setSelectedCategory("cooking")}>
              🍳 Cooking
            </button>
            <button className="btn btn-light" onClick={() => setSelectedCategory("music")}>
              🎶 Music
            </button>
            <button className="btn btn-light" onClick={() => setSelectedCategory("")}>
              All
            </button>
          </div>
        </div>
      </div>

      {/* Perfis filtrados */}
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
                {/* Exibição das estrelas */}
                <div className="stars">
                  {renderStars(profile.rating)}
                </div>
                <a href="#" className="btn btn-primary mt-2">
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

export default ProfileShare;
