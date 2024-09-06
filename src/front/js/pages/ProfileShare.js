import React from "react";

const ProfileShare = () => {
  return (
    <div className="container text-center mt-5">
      {/* Texto "Start Searching" */}
      <div className="row">
        <div className="col">
          <h1>Start Searching!</h1>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <div className="d-flex">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      {/* Sugestões de perfis e placeholders */}
      <div className="row justify-content-center mt-5">
        {/* Card com conteúdo real */}
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Profile"
            />
            <div className="card-body">
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">
                John is an experienced musician with over 10 years of playing guitar professionally.
              </p>
              <a href="#" className="btn btn-primary">
                View Profile
              </a>
            </div>
          </div>
        </div>

        {/* Placeholder para carregar dados */}
        <div className="col-md-4">
          <div className="card" aria-hidden="true">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Placeholder"
            />
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a href="#" className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShare;
