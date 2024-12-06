import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div
            style={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                background: 'linear-gradient(to bottom right, #4facfe, #00f2fe)',
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            {/* Moving Background Circles */}
            <div
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '400px',
                    height: '400px',
                    backgroundColor: '#ffffff22',
                    borderRadius: '50%',
                    animation: 'moveCircle 15s infinite linear',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-20%',
                    width: '500px',
                    height: '500px',
                    backgroundColor: '#ffffff33',
                    borderRadius: '50%',
                    animation: 'moveCircle 25s infinite linear reverse',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '300px',
                    height: '300px',
                    backgroundColor: '#ffffff22',
                    borderRadius: '50%',
                    animation: 'moveCircle 20s infinite linear',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Profile Content */}
            <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
                {user && <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Welcome, {user.name}</h2>}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#00d4ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </button>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff4d4d',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}
                {user && (
                    <div
                        style={{
                            backgroundColor: '#ffffff33',
                            padding: '20px',
                            borderRadius: '10px',
                            maxWidth: '600px',
                            margin: '0 auto',
                            textAlign: 'center',
                        }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>My Profile Details</h3>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {user.phoneNumber}
                        </p>
                    </div>
                )}
                <div
                    style={{
                        backgroundColor: '#ffffff33',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '600px',
                        margin: '20px auto 0',
                    }}
                >
                    <h3 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '15px' }}>My Booking History</h3>
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div
                                key={booking.id}
                                style={{
                                    backgroundColor: '#ffffff44',
                                    padding: '15px',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                }}
                            >
                                <p>
                                    <strong>Booking Code:</strong> {booking.bookingConfirmationCode}
                                </p>
                                <p>
                                    <strong>Check-in Date:</strong> {booking.checkInDate}
                                </p>
                                <p>
                                    <strong>Check-out Date:</strong> {booking.checkOutDate}
                                </p>
                                <p>
                                    <strong>Total thingd to take care of:</strong> {booking.totalNumOfGuest}
                                </p>
                                <p>
                                    <strong>Housemaid Type:</strong> {booking.room.roomType}
                                </p>
                               
                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>

            {/* Keyframe Animation */}
            <style>
                {`
                    @keyframes moveCircle {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(50px, -50px); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </div>
    );
};

export default ProfilePage;
