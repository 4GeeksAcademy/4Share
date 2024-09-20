const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            backendUrl: process.env.REACT_APP_BACKEND_URL, // 
            users: [],      // Almacena los usuarios buscados
            bestSharers: [], // Mejores usuarios valorados
            creators: [],    // Perfiles de los creadores
        },
        actions: {
          
            fetchHello: async () => {
                try {
                    const response = await fetch(`${getStore().backendUrl}/hello`);
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Server response:', data);
                        return data;
                    } else {
                        console.error('Error fetching hello:', data.message);
                        return null;
                    }
                } catch (error) {
                    console.error('Error during fetch request:', error);
                    return null;
                }
            },

            
            signupUser: async (email, password, isActive) => {
                const requestBody = {
                    email,
                    password,
                    is_active: isActive
                };
                try {
                    const response = await fetch(`${getStore().backendUrl}/signup`, {
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

          
            loginUser: async (email, password) => {
                const requestBody = { email, password };
                try {
                    const response = await fetch(`${getStore().backendUrl}/login`, {
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
                    const response = await fetch(`${store.backendUrl}/update_user`, {
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
             // Action: Obtener todos los usuarios
             getAllUsers: async () => {
                try {
                    const response = await fetch('/users');
                    const data = await response.json();
                    
                    if (response.ok) {
                        setStore({ users: data.users });
                    } else {
                        console.error(data.msg);
                    }
                } catch (error) {
                    console.error('Error fetching all users:', error);
                }
            },

            // Action: Buscar usuarios por nombre o query general
            searchUsers: async (query) => {
                try {
                    const response = await fetch('${process.env.BACKEND_URL}search/users?query=${query}');
                    const data = await response.json();
                    
                    if (response.ok) {
                        setStore({ users: data.users });
                    } else {
                        console.error(data.msg);
                    }
                } catch (error) {
                    console.error('Error searching users:', error);
                }
            },

            // Action: Buscar usuarios por habilidad/categoría
            searchUsersBySkill: async (skill) => {
                try {
                    const response = await fetch('${process.env.BACKEND_URL}search/users/skill?skill=${skill}');
                    const data = await response.json();
                    
                    if (response.ok) {
                        setStore({ users: data.users });
                    } else {
                        console.error(data.msg);
                    }
                } catch (error) {
                    console.error('Error searching users by skill:', error);
                }
            },

            // Action: Obtener los mejores valorados
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

            // Action: Obtener perfiles de los creadores
            getCreators: async () => {
                try {
                    const response = await fetch('/creators');
                    const data = await response.json();
                    
                    if (response.ok) {
                        setStore({ creators: data.creators });
                    } else {
                        console.error(data.msg);
                    }
                } catch (error) {
                    console.error('Error fetching creators:', error);
                }
            }
        }
    };
};

export default getState;
