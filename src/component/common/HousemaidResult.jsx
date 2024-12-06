import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const HousemaidResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="room-results">
            {roomSearchResults && roomSearchResults.length > 0 && (
                <div className="room-list">
                    {roomSearchResults.map(room => (
                        <div key={room.id} className="room-list-item">
                           
                            <div className="room-details">
                                <h3>{room.roomType}</h3>
                                <p>
  Housemaid work Price: {(room.roomPrice)}{" "}
  <span style={{ color: "darkgreen", fontWeight: "bold" }}>RWF</span>
</p>

                                <p>Description: {room.roomDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-room-button"
                                        onClick={() => navigate(`/admin/edit-housemaid/${room.id}`)} 
                                    >
                                        Edit Housemaid
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/housemaid-details-book/${room.id}`)} 
                                    >
                                        View/Recruit Now
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default HousemaidResult;
