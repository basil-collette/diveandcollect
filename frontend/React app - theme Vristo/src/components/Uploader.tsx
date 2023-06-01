import React, { useState } from 'react';

export const Uploader: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    // const [profileImage, setProfileImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleDownload = () => {
        if (selectedImage) {
            const downloadLink = document.createElement('a');
            const imageUrl = URL.createObjectURL(selectedImage);
            downloadLink.href = imageUrl;
            downloadLink.download = selectedImage.name;
            downloadLink.click();
            URL.revokeObjectURL(imageUrl);
        }
    };

    return (
        <div>
            <h1>Télécharger une image</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleDownload} disabled={!selectedImage}>
                Télécharger
            </button>
            {profileImage && (
                <div>
                    <h2>Image de profil</h2>
                    <img src={profileImage} alt="Profile" />
                </div>
            )}
        </div>
    );
};
