import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import HousemaidResult from "../common/HousemaidResult";

const ManageHousemaidPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        const allRooms = response.roomList;
        setRooms(allRooms);
        setFilteredRooms(allRooms);
      } catch (error) {
        console.error("Error fetching housemaids:", error.message);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error("Error fetching Housemaid types:", error.message);
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    filterRooms(e.target.value);
  };

  const filterRooms = (type) => {
    if (type === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === type);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: "20px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Moving Circles */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          top: "20%",
          left: "10%",
          animation: "moveCircle1 10s infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          top: "50%",
          left: "60%",
          animation: "moveCircle2 12s infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.25)",
          borderRadius: "50%",
          bottom: "10%",
          left: "30%",
          animation: "moveCircle3 15s infinite",
        }}
      ></div>

      <style>
        {`
          @keyframes moveCircle1 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
          @keyframes moveCircle2 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
            100% { transform: translateY(0); }
          }
          @keyframes moveCircle3 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      {/* Content Wrapper */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff", // Semi-transparent background
          borderRadius: "10px",
          padding: "20px",
          color: "#fff",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
          zIndex: 2,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", textShadow: "1px 1px 5px rgba(0, 0, 0, 0.8)" }}>
          All Available Housemaids
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
              }}
            >
              Filter by Housemaid Type:
            </label>
            
            <select
              value={selectedRoomType}
              onChange={handleRoomTypeChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              <option value="">All</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => navigate("/admin/add-housemaid")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e68900")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
          >
            Add Housemaid
          </button>
        </div>

        <HousemaidResult roomSearchResults={currentRooms} />

        <Pagination
          roomsPerPage={roomsPerPage}
          totalRooms={filteredRooms.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ManageHousemaidPage;
