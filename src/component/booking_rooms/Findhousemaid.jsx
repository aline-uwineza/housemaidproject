import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const Findhousemaid = () => {
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for confirmation code
  const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
  const [error, setError] = useState(null); // Track any errors

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      // Call API to get booking details
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError(null); // Clear error if successful
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.circle}></div>
        <div style={styles.circle}></div>
        <div style={styles.circle}></div>
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>Find Your Booking</h2>
        <div style={styles.searchContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter your booking confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
          <button style={styles.button} onClick={handleSearch}>
            Find
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {bookingDetails && (
          <div style={styles.details}>
            <h3 style={styles.sectionTitle}>Booking Details</h3>
            <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
            <p>Check-in Date: {bookingDetails.checkInDate}</p>
            <p>Check-out Date: {bookingDetails.checkOutDate}</p>
            <p>Num of House: {bookingDetails.numOfAdults}</p>
            <p>Num of Rooms: {bookingDetails.numOfChildren}</p>

            <hr style={styles.divider} />

            <h3 style={styles.sectionTitle}>Booker Details</h3>
            <p>Name: {bookingDetails.user.name}</p>
            <p>Email: {bookingDetails.user.email}</p>
            <p>Phone Number: {bookingDetails.user.phoneNumber}</p>

            <hr style={styles.divider} />

            <h3 style={styles.sectionTitle}>Housemaid Details</h3>
            <p>Housemaid Type: {bookingDetails.room.roomType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Findhousemaid;

// Styles
const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f0f8ff",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 0,
  },
  circle: {
    position: "absolute",
    borderRadius: "50%",
    animation: "move 20s linear infinite",
    background: "linear-gradient(45deg, #ff6b6b, #ffe66d)",
    opacity: 0.6,
    zIndex: 0,
    width: "200px",
    height: "200px",
  },
  content: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "2rem",
    background: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#333",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    flex: 1,
  },
  button: {
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    background: "#6c63ff",
    color: "white",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  error: {
    color: "red",
    marginTop: "1rem",
    fontSize: "1rem",
  },
  details: {
    textAlign: "left",
    marginTop: "2rem",
    fontSize: "1rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  divider: {
    margin: "1rem 0",
    border: "none",
    borderTop: "1px solid #ddd",
  },
};
