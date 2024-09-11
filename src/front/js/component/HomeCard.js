import React from 'react';
import "../../styles/home.css";
import { Link } from "react-router-dom";

const HomeCard = ({ isOwnProfile }) => {
    let rating = 3; // change this for store.score or rating later 
    let userId = 4; // change this for  store.user_id or something similar later 
    let description = "Some quick example text to build on the card title and make up the bulk of the card's content..." //change this for store.description
    let userImg = "https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908776/SunWithLogo_n5wpgr.png" //Change here for store.userPic or something like that 

    return (
        <div className="card cardsBorder">
            <div className="cards">
                {!isOwnProfile ? (
                    <div>
                        <img src={userImg} className="card-img-top" alt="User Profile" />
                        <div className="rating d-flex justify-content-center">
                            <i className={`fas fa-star ${rating >= 1 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 2 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 3 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 4 ? 'filled' : ''}`}></i>
                            <i className={`fas fa-star ${rating >= 5 ? 'filled' : ''}`}></i>
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">Nombre Apellido Apellido</h6>
                            <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>{description}</p>
                            <Link to={`/profile/${userId}`} className="btn ">Enter Profile</Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img src={userImg} className="card-img-top" alt="User Profile" />
                        <div className="card-body">
                            <h6 className="card-title">Nombre Apellido Apellido</h6>
                            <p className="card-text" style={{ color: "black", fontSize: "0.9rem" }}>{description}</p>
                            <a to={`/profile/${userId}`} className="btn justify-content-center">Github</a>
                            <a to={`/profile/${userId}`} className="btn justify-content-center">Linkedin</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeCard;