import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bookings-container">
            {/* Background Circles */}
            <div className="background-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-4"></div>
            </div>

            <h2>All Bookings</h2>
            <div className="search-div">
                <label>Filter by Booking Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                />
            </div>

            <div className="booking-results">
                {currentBookings.map((booking) => (
                    <div key={booking.id} className="booking-result-item">
                        <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check In Date:</strong> {booking.checkInDate}</p>
                        <p><strong>Check out Date:</strong> {booking.checkOutDate}</p>
                        <p><strong>Total things to care of:</strong> {booking.totalNumOfGuest}</p>
                        <button
                            className="edit-room-button"
                            onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                        >Manage Booking/recruits</button>
                    </div>
                ))}
            </div>

            <Pagination
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />

            {/* Inline CSS */}
            <style>
                {`
                    /* Background Circles */
                    .background-circles {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: -1;
                        pointer-events: none;
                        overflow: hidden;
                    }

                    .circle {
                        position: absolute;
                        border-radius: 50%;
                        opacity: 0.5;
                        animation: moveCircles 20s infinite linear;
                    }

                    .circle-1 {
                        width: 250px;
                        height: 250px;
                        background-color: #ff4f68;
                        animation-duration: 15s;
                        animation-timing-function: ease-in-out;
                        top: 10%;
                        left: 10%;
                    }

                    .circle-2 {
                        width: 300px;
                        height: 300px;
                        background-color: #4f83ff;
                        animation-duration: 18s;
                        animation-timing-function: ease-in-out;
                        top: 30%;
                        left: 50%;
                    }

                    .circle-3 {
                        width: 200px;
                        height: 200px;
                        background-color: #ffbb33;
                        animation-duration: 22s;
                        animation-timing-function: ease-in-out;
                        top: 60%;
                        left: 75%;
                    }

                    .circle-4 {
                        width: 350px;
                        height: 350px;
                        background-color: #32c988;
                        animation-duration: 25s;
                        animation-timing-function: ease-in-out;
                        top: 80%;
                        left: 20%;
                    }

                    @keyframes moveCircles {
                        0% {
                            transform: translate(0, 0);
                        }
                        50% {
                            transform: translate(300px, 200px);
                        }
                        100% {
                            transform: translate(0, 0);
                        }
                    }

                    /* Additional Styles */
                    .bookings-container {
                        position: relative;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }

                    h2 {
                        font-size: 2rem;
                        margin-bottom: 20px;
                    }

                    .search-div {
                        margin-bottom: 20px;
                    }

                    .search-div input {
                        padding: 10px;
                        width: 300px;
                        font-size: 1rem;
                    }

                    .booking-results {
                        margin-bottom: 20px;
                    }

                    .booking-result-item {
                        padding: 15px;
                        background-color: #f9f9f9;
                        margin-bottom: 10px;
                        border-radius: 5px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    }

                    .booking-result-item p {
                        margin: 5px 0;
                    }

                    .edit-room-button {
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .edit-room-button:hover {
                        background-color: #0056b3;
                    }
                `}
            </style>
        </div>
    );
};

export default ManageBookingsPage;
