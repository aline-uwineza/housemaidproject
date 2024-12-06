import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult = ({ bookingSearchResults }) => {
  // Define inline styles
  const styles = {
    resultsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
      background: 'linear-gradient(to bottom, #f7f8fc, #e6ebf5)',
      animation: 'fadeIn 1.5s ease-in-out',
    },
    cardContainer: {
      flex: '1 1 300px',
      maxWidth: '350px',
      minWidth: '250px',
      animation: 'slideInUp 1s ease-in-out',
    },
    card: {
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      padding: '20px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    },
    cardTitle: {
      fontSize: '1.5em',
      color: '#333',
      textAlign: 'center',
      marginBottom: '15px',
      textTransform: 'uppercase',
    },
    bookingInfo: {
      fontSize: '1em',
      color: '#555',
      lineHeight: '1.6',
      margin: '8px 0',
    },
    infoLabel: {
      fontWeight: 'bold',
      color: '#222',
    },
    editLink: {
      display: 'inline-block',
      marginTop: '15px',
      padding: '10px 20px',
      fontSize: '1em',
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#4a90e2',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    editLinkHover: {
      backgroundColor: '#357abd',
    },
  };

  return (
    <div style={styles.resultsContainer}>
      {bookingSearchResults.map((booking) => (
        <div key={booking.id} style={styles.cardContainer}>
          <div
            className="booking-card"
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style = styles.cardHover)}
            onMouseLeave={(e) => (e.currentTarget.style = styles.card)}
          >
            <h3 style={styles.cardTitle}>Booking Details</h3>
            <div>
              <p style={styles.bookingInfo}>
                <span style={styles.infoLabel}>Housemaid ID:</span> {booking.roomId}
              </p>
              <p style={styles.bookingInfo}>
                <span style={styles.infoLabel}>User ID:</span> {booking.userId}
              </p>
              <p style={styles.bookingInfo}>
                <span style={styles.infoLabel}>Start Date:</span> {booking.startDate}
              </p>
              <p style={styles.bookingInfo}>
                <span style={styles.infoLabel}>End Date:</span> {booking.endDate}
              </p>
              <p style={styles.bookingInfo}>
                <span style={styles.infoLabel}>Status:</span> {booking.status}
              </p>
            </div>
            <Link
              to={`/admin/edit-booking/${booking.id}`}
              style={styles.editLink}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.editLinkHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.editLink.backgroundColor)}
            >
              Edit Booking
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingResult;
