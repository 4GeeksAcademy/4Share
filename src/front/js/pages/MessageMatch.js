import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import "../../styles/messageMatch.css";

const RequestsPage = () => {
    const { store, actions } = useContext(Context);
    const [userProfiles, setUserProfiles] = useState({});

    useEffect(() => {
        const fetchRequests = async () => {
            await actions.getRequests('incoming');
            await actions.getRequests('outgoing');
            await actions.getRequests('accepted');
        };

        fetchRequests();
    }, []);

    const fetchUserProfile = async (userId) => {
        if (!userProfiles[userId]) { // Verificar si ya tenemos el perfil
            const userProfile = await actions.getUserProfile(userId);
            if (userProfile) {
                setUserProfiles(prev => ({ ...prev, [userId]: userProfile }));
            }
        }
    };

    useEffect(() => {
        if (store.incomingRequests) {
            store.incomingRequests.forEach(request => {
                fetchUserProfile(request.match_from_id);
            });
        }
    }, [store.incomingRequests]);

    useEffect(() => {
        if (store.outgoingRequests) {
            store.outgoingRequests.forEach(request => {
                fetchUserProfile(request.match_to_id);
            });
        }
    }, [store.outgoingRequests]);

    // Carga de perfiles para accepted requests
    useEffect(() => {
        if (store.acceptedContacts) {
            store.acceptedContacts.forEach(contact => {
                fetchUserProfile(contact.match_from_id || contact.match_to_id); // Ajusta según tu estructura
            });
        }
    }, [store.acceptedContacts]);

    return (
        <div className="container requests-container ">
            <h2 className="custom-title">Requesting You</h2>
            <div className="request-list">
                {store.incomingRequests && store.incomingRequests.length > 0 ? (
                    store.incomingRequests.map((request) => {
                        const userFrom = userProfiles[request.match_from_id] || {};
                        
                        return (
                            <div className="request-item" key={`incoming-${request.match_id}`}>
                                <img
                                    className="request-img"
                                    src={userFrom.profile_pic || "https://via.placeholder.com/150"}
                                    alt={userFrom.name || "Unknown User"}
                                />
                                <div className="request-info">
                                    <h3>{userFrom.name || "Unknown User"}</h3>
                                    <p>{userFrom.description || "No description"}</p>
                                    <div className="skills">
                                        <span>Wants to learn: {Array.isArray(userFrom.skillsToLearn) ? userFrom.skillsToLearn.join(', ') : "N/A"}</span>
                                        <span>Can teach: {Array.isArray(userFrom.skillsToTeach) ? userFrom.skillsToTeach.join(', ') : "N/A"}</span>
                                    </div>
                                </div>
                                <div className="request-actions">
                                    <button className="accept-btn" onClick={() => actions.acceptRequest(request.match_id)}>
                                        Accept
                                    </button>
                                    <button className="decline-btn" onClick={() => actions.declineRequest(request.match_id)}>
                                        Decline
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No incoming requests.</p>
                )}
            </div>

            <h2 className="custom-title">Your Requests</h2>
            <div className="request-list">
                {store.outgoingRequests && store.outgoingRequests.length > 0 ? (
                    store.outgoingRequests.map((request) => {
                        const userTo = userProfiles[request.match_to_id] || {};

                        return (
                            <div className="request-item" key={`outgoing-${request.match_id}`}>
                                <img
                                    className="request-img"
                                    src={userTo.profile_pic || "https://via.placeholder.com/150"}
                                    alt={userTo.name || "Unknown User"}
                                />
                                <div className="request-info">
                                    <h3>{userTo.name || "Unknown User"}</h3>
                                    <p>{userTo.description || "No description"}</p>
                                    <div className="skills">
                                        <span>Wants to learn: {Array.isArray(userTo.skillsToLearn) ? userTo.skillsToLearn.join(', ') : "N/A"}</span>
                                        <span>Can teach: {Array.isArray(userTo.skillsToTeach) ? userTo.skillsToTeach.join(', ') : "N/A"}</span>
                                    </div>
                                </div>
                                <div className="request-actions">
                                    <button className="cancel-btn" onClick={() => actions.cancelRequest(request.match_id)}>
                                        Cancel Request
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No outgoing requests.</p>
                )}
            </div>

            <h2 className="custom-title">Added Contacts</h2>
            <div className="contacts-list">
                {store.acceptedContacts && store.acceptedContacts.length > 0 ? (
                    store.acceptedContacts.map((contact) => {
                        const userContact = userProfiles[contact.match_from_id || contact.match_to_id] || {}; // Ajustar según la estructura

                        return (
                            <div className="contact-item" key={`contact-${contact.id}`}>
                                <img
                                    className="request-img"
                                    src={userContact.profile_pic || "https://via.placeholder.com/150"}
                                    alt={userContact.name || "Unknown Contact"}
                                />
                                <div className="contact-info">
                                    <h3>{userContact.name || "Unknown Contact"}</h3>
                                    <p>{userContact.description || "No description"}</p>
                                    <div className="skills">
                                        <span>Wants to learn: {Array.isArray(userContact.skillsToLearn) ? userContact.skillsToLearn.join(', ') : "N/A"}</span>
                                        <span>Can teach: {Array.isArray(userContact.skillsToTeach) ? userContact.skillsToTeach.join(', ') : "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No added contacts.</p>
                )}
            </div>
        </div>
    );
};

export default RequestsPage;
