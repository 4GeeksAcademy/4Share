import React, { useState } from 'react';

const Cloudinary = ({ onImageUploaded, uploadPreset, cloudName }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (e) => {
        const files = e.target.files;
        console.log("Files selected for upload:", files);

        if (files.length === 0) {
            console.error('No file selected');
            return;
        }
        
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', uploadPreset); // Usa la prop de uploadPreset

        setLoading(true);
        
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { // Usa la prop de cloudName
                method: 'POST',
                body: data,
            });

            const file = await response.json();
            console.log("Cloudinary response:", file);
            
            if (response.ok) {
                onImageUploaded(file.secure_url); // Llama a la función para actualizar la imagen en el perfil
            } else {
                throw new Error(file.message || "Error uploading image");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setError("Error uploading image: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <input
                type="file"
                name="file"
                placeholder='Upload an image'
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                error && <p className="error-message">{error}</p>
            )}
        </div>
    );
};

export default Cloudinary;
