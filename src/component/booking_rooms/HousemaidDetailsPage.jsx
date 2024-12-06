import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const HousemaidDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Housemaid not Available for selected date range');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    const totalGuests = numAdults + numChildren;
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      const formattedCheckInDate = new Date(
        checkInDate.getTime() - checkInDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split('T')[0];
      const formattedCheckOutDate = new Date(
        checkOutDate.getTime() - checkOutDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split('T')[0];

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };

      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
          navigate('/housemaid');
        }, 10000);
      }
    } catch (error) {
      setErrorMessage('This Housemaid not Available for selected date range');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) {
    return <p className="loading-message">Loading Housemaid details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!roomDetails) {
    return <p className="loading-message">Housemaid not found.</p>;
  }

  const { roomType, roomPrice, description, bookings } = roomDetails;

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7f7f7, #fff)',
    }}>
      {/* Background circles */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        backgroundColor: '#A2DFF7',
        animation: 'moveCircle1 10s linear infinite',
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        backgroundColor: '#F4A261',
        animation: 'moveCircle2 12s linear infinite',
      }}></div>

      {/* Content section */}
      <div style={{
        position: 'relative',
        padding: '40px',
        zIndex: 1,
        backgroundColor: '#fff',
        marginTop: '30px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}>
        {showMessage && (
          <div className="success-message">
            <p>Recruitment successful! Confirmation code: {confirmationCode}.</p>
            <p>Details have been sent to your profile.</p>
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="room-header">
          <h2>{roomType}</h2>
          <p className="room-price">Price: {roomPrice} RWF / Day</p>
        </div>

        <div className="room-content">
          <p className="room-description">{description}</p>
        </div>

        {bookings && bookings.length > 0 && (
          <div className="room-bookings">
            <h3>Existing Booking Details</h3>
            <ul>
              {bookings.map((booking, index) => (
                <li key={booking.id}>
                  <span>Booking {index + 1}: </span>
                  <span>Check-in: {booking.checkInDate}</span>
                  <span> | Check-out: {booking.checkOutDate}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="booking-section">
          <button onClick={() => setShowDatePicker(true)} className="primary-button">
            Recruit Now
          </button>
          {showDatePicker && (
            <div className="date-picker-section">
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Check-in Date"
                dateFormat="dd/MM/yyyy"
                className="date-picker"
              />
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="Check-out Date"
                dateFormat="dd/MM/yyyy"
                className="date-picker"
              />

<div className="guest-inputs">
  <label>
    House:
    <input
      type="number"
      min="1"
      value={numAdults}
      onChange={(e) => setNumAdults(parseInt(e.target.value))}
    />
  </label>
  <label>
    Rooms/Children/Adults:
    <input
      type="number"
      min="1"
      value={numChildren}
      onChange={(e) => setNumChildren(parseInt(e.target.value))}
    />
  </label>

  {/* Inline CSS to improve input appearance */}
  <style>
    {`
      .guest-inputs {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
        margin: 0 auto;
      }

      .guest-inputs label {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .guest-inputs input {
        padding: 10px;
        font-size: 1.2rem;
        border: 2px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s ease;
        width: 100%;
      }

      .guest-inputs input:focus {
        border-color: #007bff;
      }
    `}
  </style>
</div>


              <button onClick={handleConfirmBooking} className="confirm-button">
                Confirm Recruitment
              </button>
            </div>
          )}

          {totalPrice > 0 && (
            <div className="booking-summary">
              <p>Total Price: {totalPrice} RWF</p>
              <p>Total Things to take care of: {totalGuests}</p>
              <button onClick={acceptBooking} className="primary-button">
                Accept Recruitment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS animation for moving circles */}
      <style>{`
        @keyframes moveCircle1 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20%) translateX(20%); }
           100% { transform: translateY(0) translateX(0); }
        }
        @keyframes moveCircle2 {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20%) translateX(-20%); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default HousemaidDetailsPage;
