import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import HomeCard from "../component/HomeCard";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        actions.getTopRatedUsers();
        actions.fetchCreators();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/profilesearch/search?query=${searchQuery}`);
        }
    };

    // Permitir que el input funcione con Enter
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const handleCategorySelect = async (category) => {
        await actions.searchUsersBySkill(category);
        navigate(`/profilesearch/${category}`);
    };

    // Animaciones de scroll (sin cambios)
    useEffect(() => {
        let ground = document.getElementById('ground');
        let leftP = document.getElementById('leftP');
        let rightP = document.getElementById('rightP');
        let sunLogo = document.getElementById('sunLogo');
        let water = document.getElementById('water');
        let sky = document.getElementById('sky');

        if (ground && leftP && rightP && sunLogo && water && sky) {
            const handleScroll = () => {
                let value = window.scrollY;
                if (value < 500) {
                    sunLogo.style.transform = `translateY(${value * 2}px)`;
                }
                leftP.style.transform = `translateX(${value * -0.5}px)`;
                rightP.style.transform = `translateX(${value * 0.5}px)`;
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className="container-fluid" id="home">
            <div className="parallax">
                <img id="sky" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908773/Sky_pyb4cm.png" alt="" />
                <img id="sunLogo" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908776/SunWithLogo_n5wpgr.png" alt="" />
                <img id="water" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908910/Water_yamzvh.png" alt="" />
                <img id="rightP" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908072/Right_Palms_COPY_sennpc.png" alt="" />
                <img id="leftP" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725908777/Left_Palms_kjelhd.png" alt="" />
                <img id="ground" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1725909418/Ground_xtihyr.png" alt="" />
            </div>

            <div className="mainHome">
                <div className="imageTextContainer backgroundMain">
                    <img className="jumboTwo" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1726064828/7bfd621f88bcf22b8a27b87f84297228_xg9m1i.png" alt="Image 1" />
                    <img className="jumboOne" src="https://res.cloudinary.com/dmkw4vacw/image/upload/v1726054101/2429e1b1914a898551911a26c60f563a_fv26mn.png" alt="Image 2" />
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center backgroundMain">
                    <br /><br /><br /><br />
                    <div className="titlesBorder">
                        <h1 className="titles">Start Searching!</h1>
                    </div>

                    <div className="searchBar input-group px-1 px-sm-5 mb-2">
                        <input
                            type="text"
                            className="form-control search"
                            placeholder="Find by person's name, description, etc..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress} // Añadir evento de teclado
                        />
                        <button className="btn me-0" onClick={handleSearchSubmit}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>

                    <div className="d-flex justify-content-between row w-100 px-5 categoriesHome">
                        {["all", "cooking", "languages", "music", "sports", "others"].map((category) => (
                            <button
                                key={category}
                                className="col-1 col-sm-2 btn d-flex justify-content-center"
                                onClick={() => handleCategorySelect(category)}
                            >
                                <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                                <i className={`fas fa-${category === "all" ? "asterisk" : category === "cooking" ? "utensils" : category === "languages" ? "language" : category === "music" ? "music" : category === "sports" ? "futbol" : "ellipsis-h"}`}></i>
                            </button>
                        ))}
                    </div>

                    <br /><br /><br /><br />
                </div>

                <div className="topProfiles d-flex flex-column justify-content-center align-items-center backgroundMain">
                    <div className="titlesBorder">
                        <h1 className="titles">Top rated profiles</h1>
                    </div>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            {store.bestSharers.length > 0 ? (
                                store.bestSharers.map((sharer) => (
                                    <div className="col-10 col-md-4" key={sharer.user.id}>
                                        <HomeCard isOwnProfile={false} user={sharer} />
                                    </div>
                                ))
                            ) : (
                                <p>No top-rated profiles found.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="aboutUs d-flex flex-column justify-content-center align-items-center backgroundMain" id="aboutUs">
                    <div className="titlesBorder">
                        <h1 className="titles">Who are we?</h1>
                    </div>
                    <div className="container">
                        <div className="row d-flex">
                            {store.creators.length > 0 ? (
                                store.creators.map((creator, index) => (
                                    <div className="col-10 col-md-4" key={index}>
                                        <HomeCard isOwnProfile={true} user={creator} />
                                    </div>
                                ))
                            ) : (
                                <p>No profiles found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;