const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            backendUrl: process.env.REACT_APP_BACKEND_URL
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
                const requestBody = { email, password, is_active: isActive };
                try {
                    const response = await fetch(`${getStore().backendUrl}/signup`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
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
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem('jwt-token', data.token); // Guarda el token en localStorage
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
            }
        }
    };
};

export default getState;
