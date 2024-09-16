const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            backendUrl: process.env.BACKEND_URL // Asegúrate de definir REACT_APP_BACKEND_URL en tu archivo .env
        },
        actions: {
            updateProfile: async (id,name, email, gender, lastname, birthdate, phone) => {
                const store = getStore();  // Obtén el store para acceder a la URL
                const requestBody = {
                    name: name,
                    email: email,
                    gender: gender,
                    lastname: lastname,
                    birthdate: birthdate,
                    phone: phone,
                };
                try {
                    const response = await fetch(`${store.backendUrl}/api/update_profile/${id}`, { // Ajusta el endpoint de la API según tu backend
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
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