const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],
            bestSharers: [],
            creators: [],
        },
        actions: {
            // Action: Register in our page
            signupUser: async (email, password, isActive) => {
                const requestBody = {
                    email,
                    password,
                    is_active: isActive
                };
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}signup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log('User signed up successfully:', data);
                        return data;
                    } else {
                        console.error('Error signing up:', data.msg);
                        return null;
                    }
                } catch (error) {
                    console.error('Error during signup request:', error);
                    return null;
                }
            },

            // Action: Login in our page
            loginUser: async (email, password) => {
                const requestBody = { email, password };
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem('jwt-token', data.token); // Guardar token en localStorage
                        console.log('User logged in successfully:', data);
                        return data;
                    } else {
                        console.error('Error logging in:', data.msg);
                        return null;
                    }
                } catch (error) {
                    console.error('Error during login request:', error);
                    return null;
                }
            },

            // Action: Modify your profile info
            updateProfile: async (id, name, email, gender, lastname, birthdate, phone) => {
                const store = getStore();
                const token = localStorage.getItem('jwt-token');
                const requestBody = {
                    name,
                    email,
                    gender,
                    lastname,
                    birthdate,
                    phone
                };
                try {
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
                        console.error('Error updating profile:', data.error || data.message);
                        return null;
                    }
                } catch (error) {
                    console.error('Error during the update request:', error);
                    return null;
                }
            },

            // Action: Get all Users
            getAllUsers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}users`);
                    const data = await response.json();

                    if (response.ok) {
                        const currentUsers = getStore().users;
                        if (JSON.stringify(currentUsers) !== JSON.stringify(data.users)) {
                            setStore({ users: data.users });
                        }
                    } else {
                        console.error("Error fetching all users:", data.msg);
                    }
                } catch (error) {
                    console.error("Error fetching all users:", error);
                }
            },

            // Action: Search users by "query" (It means anything you search)
            searchUsers: async (query) => {
                if (!query) return;
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}search/users?query=${query}`);
                    const data = await response.json();
            
                    if (response.ok) {
                        const currentUsers = getStore().users;
                        if (JSON.stringify(currentUsers) !== JSON.stringify(data.users)) {
                            setStore({ users: data.users });
                        }
                    } else {
                        console.error("Error searching users:", data.msg);
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
            
                    if (response.ok && data.users) {
                        const currentUsers = getStore().users;
                        if (JSON.stringify(currentUsers) !== JSON.stringify(data.users)) {
                            setStore({ users: data.users });
                        }
                    } else {
                        console.warn("No users found for the specified skill:", data.msg);
                        setStore({ users: [] });  // Vacía la lista si no hay usuarios encontrados
                    }
                } catch (error) {
                    console.error(`Error fetching users by skill (${skill}):`, error);
                    setStore({ users: [] });  // Asegúrate de no obtener todos los usuarios aquí
                }
            },

            // Action: Get BestSharers
            getTopRatedUsers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}bestsharers`);
                    const data = await response.json();
            
                    if (response.ok) {
                        setStore({ bestSharers: data.best_sharers });
                    } else {
                        console.error(data.msg);
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

                    setStore({ creators: data.profiles });
                } catch (error) {
                    console.error("Error fetching creators:", error);
                }
            },
        }
    };
};

export default getState;
