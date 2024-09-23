import React, { useState } from 'react';
import axios from 'axios';

const Cloudinary = () => {
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); 
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "4share"); //ESTO ES EL PRESET NAME TIENE QUE ESTAR EN EL .ENV
        setUploading(true);

        try {
            // Upload the image to Cloudinary
            const res = await axios.post("https://api.cloudinary.com/v1_1/dam4qhxjr/image/upload", formData); //CAMBIAR EL DAM4Q A .ENV
            const imageUrl = res.data.url;  // Uploaded image URL
            console.log(imageUrl);

            // Here we call the second fetch to save this URL to the user profile
            await saveImageToUserProfile(imageUrl);

            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    };

    // Function that sends the image URL to the backend
    const saveImageToUserProfile = async (imageUrl) => {
        const token = localStorage.getItem('token');  // Get user token (needs adjustment)

        try {
            // PUT request to update 
            const res = await axios.put(
                `${process.env.BACKEND_URL}update_user`, // Altere conforme o seu backend
                { imageUrl },  // Envia a URL da imagem
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Passa o token no cabeçalho
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Imagem salva no perfil:", res.data);
        } catch (err) {
            console.error("Erro ao salvar imagem no perfil:", err);
        }
    };

    return (
        <div>
            <h1>Upload de Imagem</h1>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Pré-visualização" width="200" />}
            <button onClick={handleImageUpload} disabled={uploading}>
                {uploading ? "Enviando..." : "Enviar Imagem"}
            </button>


        </div>
    );
};

export default Cloudinary;
