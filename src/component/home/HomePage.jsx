import React, { useState } from "react";
// import { FaBroom, FaTshirt, FaUtensils, FaBaby } from "react-icons/fa"; // Icons for services
import HousemaidResult from "../common/HousemaidResult";
import HousemaidSearch from "../common/HousemaidSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* Animated Banner Section */}
            <section className="animated-banner">
                <div className="background-animation">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <div className="header-content">
                    <h1>
                        Welcome to <span className="phegon-color">Housemaid Recruitment/booking Portal</span>
                    </h1>
                    <p>
                        Your trusted platform for finding professional housemaids tailored to your needs.
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <HousemaidSearch handleSearchResult={handleSearchResult} />
            <HousemaidResult roomSearchResults={roomSearchResults} />

            {/* View All Section */}
            <h4>
                <a className="view-rooms-home" href="/housemaid">
                    All Housemaid Recruitment Jobs
                </a>
            </h4>

            {/* Services Section */}
            <h2 className="home-services">
                Services at <span className="phegon-color">Housemaid Recrutiment Portal</span>
            </h2>
            <section className="service-section">
                <div className="service-card">
                    {/* <FaBroom className="service-icon" /> */}
                    <h3>House Cleaning</h3>
                    <p>
                        Enjoy a spotless and tidy home with our professional house cleaning services.
                    </p>
                </div>
                <div className="service-card">
                    {/* <FaTshirt className="service-icon" /> */}
                    <h3>Laundry Service</h3>
                    <p>
                        Let us take care of your laundry with our meticulous washing, drying, and ironing.
                    </p>
                </div>
                <div className="service-card">
                    {/* <FaUtensils className="service-icon" /> */}
                    <h3>Cooking Assistance</h3>
                    <p>
                        Delicious meals prepared based on your preferences and dietary needs.
                    </p>
                </div>
                <div className="service-card">
                    {/* <FaBaby className="service-icon" /> */}
                    <h3>Childcare</h3>
                    <p>
                        Trusted and caring childcare services to ensure your little ones are safe.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
