import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import SearchUserCard from "../component/SearchUserCard";
import "../../styles/profileSearch.css";

const ProfileSearch = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const path = location.pathname.split("/").pop();
            const queryParams = new URLSearchParams(location.search);
            const query = queryParams.get('query');

            try {
                if (path === "all") {
                    await actions.getAllUsers();
                } else if (path === "search" && query) {
                    await actions.searchUsers(query);
                } else if (path) {
                    await actions.searchUsersBySkill(path);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [location.pathname, location.search]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/profilesearch/search?query=${searchTerm}`);
        setSearchTerm("");
    };

    const handleCategorySelect = (category) => {
        setSearchTerm("");
        navigate(`/profilesearch/${category}`);
    };

    const handleGetAllUsers = () => {
        setSearchTerm("");
        navigate(`/profilesearch/all`);
    };

    return (
        <div className="container text-center mt-5 profileSearch">
            <div className="row">
                <div className="col">
                    <h1 className="custom-title">Start Searching!</h1>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-8">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="d-flex">
                            <input
                                type="search"
                                className="form-control custom-search-bar me-2"
                                placeholder="Find by person's name, description, etc..."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="btn custom-search-button">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="d-flex justify-content-between row w-100 px-5 categoriesHome">
                <button onClick={handleGetAllUsers} className="col-1 col-sm-2 btn d-flex justify-content-center">
                    <p>All</p>
                    <i className="fas fa-asterisk"></i>
                </button>
                {["cooking", "languages", "music", "sports", "others"].map((category) => (
                    <Link
                        key={category}
                        className="col-1 col-sm-2 btn d-flex justify-content-center"
                        to={`/profilesearch/${category}`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                        <i className={`fas fa-${category === "cooking" ? "utensils" : category === "languages" ? "language" : category === "music" ? "music" : category === "sports" ? "futbol" : "ellipsis-h"}`}></i>
                    </Link>
                ))}
            </div>

            <div className="row justify-content-center mt-5">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    store.users && store.users.length > 0 ? (
                        store.users.map((user) => (
                            <div className="col-md-4" key={user.id}>
                                <SearchUserCard user={user} />
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default ProfileSearch;