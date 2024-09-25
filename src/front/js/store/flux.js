const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],
            bestSharers: [],
            creators: [],
            incomingRequests: [],
            outgoingRequests: [],
            acceptedContacts: [],
        },
        actions: {

            // Action: Register in our page
            signupUser: async (email, password, isActive) => {
                try {
                    const requestBody = { email, password, is_active: isActive };

                    const response = await fetch(`${process.env.BACKEND_URL}signup`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        console.log('Usuario registrado exitosamente:', data);
                        return data;
                    } else {
                        console.error('Error al registrar:', data?.msg || "Error desconocido");
                        return null;
                    }
                } catch (error) {
                    console.error('Error durante la solicitud de registro:', error);
                    return null;
                }
            },

            // Acción send singup email
            sendConfirmationEmail: async (email) => {
                try {
                    const emailResponse = await fetch(`${process.env.BACKEND_URL}send-email`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email }) // Have to send email as an object
                    });

                    if (emailResponse.ok) {
                        const emailData = await emailResponse.json();
                        console.log('Correo enviado:', emailData);
                    } else {
                        const errorData = await emailResponse.json();
                        console.error('Error al enviar el correo:', errorData);
                    }
                } catch (error) {
                    console.error('Error al enviar el correo:', error);
                }
            },

            // Action: Login in our page
            loginUser: async (email, password) => {
                try {
                    const requestBody = { email, password };
                    const response = await fetch(`${process.env.BACKEND_URL}login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem('jwt-token', data.access_token);
                        return data;
                    } else {
                        console.error('Error logging in:', data?.msg || "Unknown error");
                        return null;
                    }
                } catch (error) {
                    console.error('Error during login request:', error);
                    return null;
                }
            },

            // Action: Modify your profile info
            updateProfile: async (name, email, last_name, phone, location, profile_pic, gender, description) => {
                try {
                    const token = localStorage.getItem('jwt-token');
                    const requestBody = {
                        name,
                        email,
                        last_name,
                        phone,
                        location,
                        profile_pic,
                        gender,
                        description
                    };

                    console.log("Sending request body:", requestBody);

                    const response = await fetch(`${process.env.BACKEND_URL}update_user`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(requestBody)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        console.log('Profile updated successfully:', data);
                        return data;
                    } else {
                        console.error('Error updating profile:', data?.msg || data?.message || "Unknown error");
                        return null;
                    }
                } catch (error) {
                    console.error('Error during the update request:', error);
                    return null;
                }
            },

            // Get one specific user profile
            getUserProfile: async (userId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}profile/${userId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();


                    if (response.ok) {
                        return data.user_data;
                    } else {
                        console.error(`Error fetching user profile:`, data?.msg || "Unknown error");
                        return null;
                    }
                } catch (error) {
                    console.error(`Error fetching user profile:`, error);
                    return null;
                }
            },

            // Get one specific user profile
            getYourUserProfile: async () => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}profile`, {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });

                    const text = await response.text();

                    if (response.ok) {
                        const data = JSON.parse(text);
                        return data.user_data;
                    } else {
                        console.error(`Error fetching user profile:`, text);
                        return null;
                    }
                } catch (error) {
                    console.error(`Error fetching user profile:`, error);
                    return null;
                }
            },

            // Action: Get user reviews
            getUserReviews: async (userId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}user/${userId}/reviews`, {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setStore({ userReviews: data.reviews || [] });
                        return data.reviews || [];
                    } else {
                        console.error(`Error fetching user reviews:`, data.msg || "Unknown error");
                        return [];
                    }
                } catch (error) {
                    console.error(`Error fetching user reviews:`, error);
                    return [];
                }
            },

            saveReview: async (revieweeId, reviewData) => {
                const token = localStorage.getItem("jwt-token");
                try {
                    const response = await fetch(`https://obscure-orbit-wp66v45p7rrcq5q-3001.app.github.dev/add/review`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            reviewee_id: revieweeId,
                            score: reviewData.score,
                            comment: reviewData.comment,
                        }),
                    });

                    const result = await response.json();
                    console.log("Response from server:", result);

                    if (response.ok) {
                        return result;
                    } else {
                        console.error("Error saving review:", result);
                        return null;
                    }
                } catch (error) {
                    console.error("Error saving review:", error);
                    return null;
                }
            },

            // Action: Get all Users
            getAllUsers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}users`);
                    const data = await response.json();
                    if (response.ok && data?.users) {
                        const currentUsers = getStore().users;
                        if (JSON.stringify(currentUsers) !== JSON.stringify(data.users)) {
                            setStore({ users: data.users });
                        }
                    } else {
                        console.error("Error fetching all users:", data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error fetching all users:", error);
                }
            },

            // Action: Search users by query
            searchUsers: async (query) => {
                if (!query) return;
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}search/users?query=${query}`);
                    const data = await response.json();
                    if (response.ok && data?.users) {
                        const currentUsers = getStore().users;
                        if (JSON.stringify(currentUsers) !== JSON.stringify(data.users)) {
                            setStore({ users: data.users });
                        }
                    } else {
                        console.error("Error searching users:", data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error searching users:", error);
                }
            },

            // Action: Search users by skill
            searchUsersBySkill: async (skill) => {
                if (!skill) return;
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}search/usersbyskill?skill=${skill}`);
                    const data = await response.json();
                    if (response.ok && data?.users) {
                        setStore({ users: data.users });
                    } else {
                        console.warn("No users found for the specified skill:", data?.msg || "Unknown error");
                        setStore({ users: [] });
                    }
                } catch (error) {
                    console.error(`Error fetching users by skill (${skill}):`, error);
                    setStore({ users: [] });
                }
            },

            // Action: Get Best Sharers
            getTopRatedUsers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}bestsharers`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ bestSharers: data.best_sharers });
                    } else {
                        console.error(data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error('Error fetching top-rated users:', error);
                }
            },

            // Action: Get our profiles
            fetchCreators: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}our/profiles`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ creators: data.profiles });
                    } else {
                        console.error(data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error fetching creators:", error);
                }
            },

            //Action: Get the 3 types of requests
            getRequests: async (type) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}match?type=${type}`, {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        if (type === 'incoming') {
                            setStore({ incomingRequests: data });
                        } else if (type === 'outgoing') {
                            setStore({ outgoingRequests: data });
                        } else if (type === 'accepted') {
                            setStore({ acceptedContacts: data });
                        }
                    } else {
                        console.error(`Error fetching ${type} requests:`, data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error(`Error fetching ${type} requests:`, error);
                }
            },

            // Action: Get specific match between you and the public profile
            getMatchStatus: async (publicUserId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const [outgoingResponse, acceptedResponse] = await Promise.all([
                        fetch(`${process.env.BACKEND_URL}match?type=outgoing`, {
                            method: 'GET',
                            headers: {
                                Authorization: 'Bearer ' + token,
                                'Content-Type': 'application/json',
                            },
                        }),
                        fetch(`${process.env.BACKEND_URL}/match?type=accepted`, {
                            method: 'GET',
                            headers: {
                                Authorization: 'Bearer ' + token,
                                'Content-Type': 'application/json',
                            },
                        })
                    ]);

                    const outgoingMatches = await outgoingResponse.json();
                    const acceptedMatches = await acceptedResponse.json();
                    const outgoingMatch = outgoingMatches.find(match => match.match_to_id == publicUserId);
                    const acceptedMatch = acceptedMatches.find(match => (match.match_from_id == publicUserId || match.match_to_id == publicUserId));

                    if (outgoingMatch) {
                        return { status: 'pending', match_id: outgoingMatch.match_id };
                    }

                    if (acceptedMatch) {
                        return { status: 'accepted', match_id: acceptedMatch.match_id };
                    }

                    return { status: 'none' };

                } catch (error) {
                    console.error(`Error fetching match status:`, error);
                    return null;
                }
            },


            // Action: Create friend request
            createMatch: async (matchToId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}match`, {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ match_to_id: matchToId })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Match request sent successfully:", data);
                        return data;
                    } else {
                        console.error("Error creating match:", data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error during match creation:", error);
                }
            },

            // Action: Accept a match request
            acceptRequest: async (matchId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}match/${matchId}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ match_status: "Accepted" })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Request accepted:", data);
                        getActions().getRequests('incoming');
                        getActions().getRequests('accepted');
                    } else {
                        console.error("Error accepting request:", data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error accepting request:", error);
                }
            },

            // Action: Decline a match request
            declineRequest: async (matchId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}match/${matchId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Request declined:", data);
                        getActions().getRequests('incoming');
                    } else {
                        console.error("Error declining request:", data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error declining request:", error);
                }
            },

            // Action: cancel a friend request that you sent
            cancelRequest: async (matchId) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}match/${matchId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Request cancelled:", data);
                        getActions().getRequests('outgoing');
                    } else {
                        console.error("Error cancelling request:", data?.msg || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error cancelling request:", error);
                }
            },
            // Action: to request a password reset
            requestPasswordReset: async (email) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}reset-password`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Password reset email sent:', data);
                        return data;
                    } else {
                        const data = await response.json();
                        console.error('Error sending password reset email:', data?.msg || "Unknown error");
                        return null;
                    }
                } catch (error) {
                    console.error('Error requesting password reset:', error);
                    return null;
                }
            },
        }
    };
};

export default getState;