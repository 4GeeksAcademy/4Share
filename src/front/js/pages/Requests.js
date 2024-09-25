import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import "../../styles/requests.css";
import { useNavigate } from 'react-router-dom';

const RequestsPage = () => {
    const { store, actions } = useContext(Context);
    const [userProfiles, setUserProfiles] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            await actions.getRequests('incoming');
            await actions.getRequests('outgoing');
            await actions.getRequests('accepted');
        };

        fetchRequests();
    }, []);

    const fetchUserProfile = async (userId) => {
        if (!userProfiles[userId]) { // Verify if we already have user
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

    useEffect(() => {
        if (store.acceptedContacts) {
            store.acceptedContacts.forEach(contact => {
                fetchUserProfile(contact.match_from_id || contact.match_to_id);
            });
        }
    }, [store.acceptedContacts]);

    return (
        <div className="container requests-container ">
            <div className="secondNavbar">
                <button
                    className={`btn btn-primary`}
                    onClick={() => navigate('/privateProfile')}
                >
                    <i className="fas fa-user icon"></i>
                    <span className="m-0 h6">Profile</span>
                </button>

                <button
                    className={`btn btn-primary`} disabled
                    onClick={() => navigate('/requests')}
                >
                    <i className="fas fa-tasks icon"></i>
                    <span className="m-0 h6">Requests</span>
                </button>
            </div>
            <div className='requestsMainContent'>
                <h2 className="custom-title">Requesting You</h2>
                <div className="request-list">
                    {store.incomingRequests && store.incomingRequests.length > 0 ? (
                        store.incomingRequests.map((request) => {
                            const userFrom = userProfiles[request.match_from_id] || {};

                            return (
                                <div className="request-item" key={`incoming-${request.match_id}`}>
                                    <img
                                        className="request-img"
                                        src={userFrom.profile_pic || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png"}
                                        alt={userFrom.name || "Unknown User"}
                                    />
                                    <div className="request-info">
                                        <h3>{userFrom.name || "Unknown User"} {userFrom.last_name || ""}  </h3>
                                        <p>{userFrom.description || "No description"}</p>
                                        <div className="skills">
                                            <span>Message: {userFrom.message || "No message provided"}</span>
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
                                        src={userTo.profile_pic || "https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png"}
                                        alt={userTo.name || "Unknown User"}
                                    />
                                    <div className="request-info">
                                        <h3>{userTo.name || "Unknown User"} {userTo.last_name || ""}</h3>
                                        <p>{userTo.description || "No description"}</p>
                                        <div className="skills">
                                            <span>Message: {userTo.message || "No message provided"}</span>
                                        </div>
                                    </div>
                                    <div className="request-actions">
                                        <button className="decline-btn" onClick={() => actions.cancelRequest(request.match_id)}>
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
                            const userContact = userProfiles[contact.match_from_id || contact.match_to_id] || {};

                            return (
                                <div className="contact-item" key={`contact-${contact.id}`}>
                                    <img
                                        className="request-img"
                                        src={userContact.profile_pic || "https://via.placeholder.com/150https://res.cloudinary.com/dam4qhxjr/image/upload/v1726943109/PlaceholderImg_qok6jr.png"}
                                        alt={userContact.name || "Unknown Contact"}
                                    />
                                    <div className="contact-info">
                                        <h3>{userContact.name || "Unknown Contact"} {userContact.last_name || ""}</h3>
                                        <p>Description: {userContact.description || "No description"}</p>
                                        <div className="contact-details">
                                            <span>Phone: {userContact.phone || "Not provided"}</span> <br />
                                            <span>Email: {userContact.email || "Not provided"}</span>
                                        </div>
                                        <div className="skills">
                                            <span>Message: {userContact.message || "No message provided"}</span>
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
        </div>
    );
};

export default RequestsPage;
