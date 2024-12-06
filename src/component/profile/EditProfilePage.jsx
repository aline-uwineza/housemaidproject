import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [circlesMoving, setCirclesMoving] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();

        const interval = setInterval(() => {
            setCirclesMoving((prev) => !prev); // Toggle movement every 5 seconds
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Vibrant background gradient
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: '#fff',
            }}
        >
            {/* Moving circles */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 200 + 100}px`, // Larger circles
                        height: `${Math.random() * 200 + 100}px`,
                        background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
                        borderRadius: '50%',
                        animation: circlesMoving
                            ? `move-${i} 5s linear infinite`
                            : 'none',
                    }}
                />
            ))}

            {/* Edit Profile Form */}
            <div
                style={{
                    zIndex: 2,
                    background: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent background
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)', // Shadow for a floating effect
                    width: '80%',
                    maxWidth: '600px',
                }}
            >
                <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Edit Profile</h1>
                {error && (
                    <p
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                        }}
                    >
                        {error}
                    </p>
                )}
                {user && (
                    <div style={{ textAlign: 'left', fontSize: '1.2rem' }}>
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {user.phoneNumber}
                        </p>
                        <button
                            onClick={handleDeleteProfile}
                            style={{
                                background: '#ff4d4d',
                                color: '#fff',
                                border: 'none',
                                padding: '15px 30px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                marginTop: '20px',
                            }}
                        >
                            Delete Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Circle animations */}
            <style>
                {Array.from({ length: 10 }).map(
                    (_, i) => `
                    @keyframes move-${i} {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px); }
                        100% { transform: translate(0, 0); }
                    }
                `
                )}
            </style>
        </div>
    );
};

export default EditProfilePage;
