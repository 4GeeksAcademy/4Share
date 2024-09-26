import Swal from 'sweetalert2';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],
            bestSharers: [],
            creators: [],
            incomingRequests: [],
            outgoingRequests: [],
            acceptedContacts: [],
            currentUser: null
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
                        Swal.fire('Success', 'User successfully registered', 'success');
                        return data;
                    } else {
                        Swal.fire('Error', data?.msg || 'Unknown error during registration', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error during registration request', 'error');
                    return null;
                }
            },

            // Action: Send signup email
            sendConfirmationEmail: async (email) => {
                try {
                    const emailResponse = await fetch(`${process.env.BACKEND_URL}send-email`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    });

                    if (emailResponse.ok) {
                        const emailData = await emailResponse.json();
                    } else {
                        const errorData = await emailResponse.json();
                        Swal.fire('Error', errorData?.msg || 'Error sending email', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error sending email', 'error');
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
                        Swal.fire('Success', 'Login successful', 'success');
                        return data;
                    } else {
                        Swal.fire('Error', data?.msg || 'Unknown error during login', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error during login request', 'error');
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
                        Swal.fire('Success', 'Profile updated successfully', 'success');
                        return data;
                    } else {
                        Swal.fire('Error', data?.msg || 'Unknown error during profile update', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error during profile update', 'error');
                    return null;
                }
            },

            //Action: Get one specific user profile
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
                        Swal.fire('Error', data?.msg || 'Unknown error retrieving profile', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error retrieving user profile', 'error');
                    return null;
                }
            },

            //Action: Get your user profile
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
                        setStore({ currentUser: data.user_data });
                        return data.user_data;
                    } else {
                        Swal.fire('Error', 'Error retrieving your user profile', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error retrieving your user profile', 'error');
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
                        Swal.fire('Error', data.msg || 'Unknown error retrieving reviews', 'error');
                        return [];
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error retrieving user reviews', 'error');
                    return [];
                }
            },

            saveReview: async (revieweeId, reviewData) => {
                const token = localStorage.getItem("jwt-token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/add/review`, {
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

                    if (response.ok) {
                        Swal.fire('Success', 'Review saved successfully', 'success');
                        return result;
                    } else {
                        Swal.fire('Error', 'Error saving review', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error saving review', 'error');
                    return null;
                }
            },



            updateReview: async (reviewId, reviewData) => {
                const token = localStorage.getItem("jwt-token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/update/review/${reviewId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            score: reviewData.score,
                            comment: reviewData.comment,
                        }),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        Swal.fire('Success', 'Review updated successfully!', 'success');
                        return result;
                    } else {
                        Swal.fire('Error', result?.msg || "Error updating review", 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error updating review', 'error');
                    return null;
                }
            },

            deleteReview: async (reviewId) => {
                const token = localStorage.getItem("jwt-token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/reviews/${reviewId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const result = await response.json();

                    if (response.ok) {
                        Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                        return result;
                    } else {
                        Swal.fire('Error', result?.msg || "Error deleting review", 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error deleting review', 'error');
                    return null;
                }
            },

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
                        Swal.fire('Error', data?.msg || "Error fetching all users", 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error fetching all users', 'error');
                }
            },

            searchUsers: async (query) => {
                if (!query) return;
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}search/users?query=${query}`);
                    const data = await response.json();
                    if (response.ok && data?.users) {
                        setStore({ users: data.users });
                    } else {
                        Swal.fire('Error', data?.msg || "Error searching users", 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error searching users', 'error');
                }
            },

            searchUsersBySkill: async (skill) => {
                if (!skill) return;
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}search/usersbyskill?skill=${skill}`);
                    const data = await response.json();
                    if (response.ok && data?.users) {
                        setStore({ users: data.users });
                    } else {
                        setStore({ users: [] });
                    }
                } catch (error) {
                    Swal.fire('Error', `Error fetching users by skill (${skill})`, 'error');
                    setStore({ users: [] });
                }
            },

            getTopRatedUsers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}bestsharers`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ bestSharers: data.best_sharers });
                    } else {
                        Swal.fire('Error', data?.msg || "Error fetching top-rated users", 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error fetching top-rated users', 'error');
                }
            },

            fetchCreators: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}our/profiles`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ creators: data.profiles });
                    } else {
                        Swal.fire('Error', data?.msg || "Error fetching creators", 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', 'Error fetching creators', 'error');
                }
            },

            getRequests: async (type) => {
                const token = localStorage.getItem('jwt-token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}match?type=${type}`, {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
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
                        Swal.fire('Error', `Error fetching ${type} requests`, 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', `Error fetching ${type} requests`, 'error');
                }
            },

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
                    Swal.fire('Error', `Error fetching match status: ${error.message}`, 'error');
                    return null;
                }
            },

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
                        Swal.fire('Success', 'Friend request sent successfully!', 'success');
                        return data;
                    } else {
                        Swal.fire('Error', data?.msg || 'Unknown error occurred while creating the match.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', `Error during match creation: ${error.message}`, 'error');
                }
            },

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
                        Swal.fire('Success', 'Match request accepted!', 'success');
                        getActions().getRequests('incoming');
                        getActions().getRequests('accepted');
                    } else {
                        Swal.fire('Error', data?.msg || 'Error accepting match request.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', `Error accepting match request: ${error.message}`, 'error');
                }
            },

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
                        Swal.fire('Success', 'Match request declined.', 'success');
                        getActions().getRequests('incoming');
                    } else {
                        Swal.fire('Error', data?.msg || 'Error declining match request.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', `Error declining match request: ${error.message}`, 'error');
                }
            },

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
                        Swal.fire('Success', 'Friend request cancelled.', 'success');
                        getActions().getRequests('outgoing');
                    } else {
                        Swal.fire('Error', data?.msg || 'Error cancelling friend request.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', `Error cancelling friend request: ${error.message}`, 'error');
                }
            },

            requestPasswordReset: async (email) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}reset-password`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });

                    if (response.ok) {
                        Swal.fire('Success', 'Password reset email sent!', 'success');
                        const data = await response.json();
                        return data;
                    } else {
                        const data = await response.json();
                        Swal.fire('Error', data?.msg || 'Error sending password reset email.', 'error');
                        return null;
                    }
                } catch (error) {
                    Swal.fire('Error', `Error requesting password reset: ${error.message}`, 'error');
                    return null;
                }
            },
        }
    };
};

export default getState;