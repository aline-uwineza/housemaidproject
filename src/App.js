

// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import HomePage from './component/home/HomePage';
import Allhousemaid from './component/booking_rooms/Allhousemaid';
import HousemaidDetailsPage from './component/booking_rooms/HousemaidDetailsPage';
import Findhousemaid from './component/booking_rooms/Findhousemaid';
import AdminPage from './component/admin/AdminPage';
import ManageHousemaidPage from './component/admin/ManageHousemaidPage';
import EditHousemaidPage from './component/admin/EditHousemaidPage';
import AddHousemaidPage from './component/admin/AddHousemaidPage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';
import EditBookingPage from './component/admin/EditBookingPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import { ProtectedRoute, AdminRoute } from './service/guard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/housemaid" element={<Allhousemaid />} />
            <Route path="/find-housemaid" element={<Findhousemaid />} />

            {/* Protected Routes */}
            <Route path="/housemaid-details-book/:roomId"
              element={<ProtectedRoute element={<HousemaidDetailsPage />} />}
            />
            <Route path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route path="/admin/manage-housemaid"
              element={<AdminRoute element={<ManageHousemaidPage />} />}
            />
            <Route path="/admin/edit-housemaid/:roomId"
              element={<AdminRoute element={<EditHousemaidPage />} />}
            />
            <Route path="/admin/add-housemaid"
              element={<AdminRoute element={<AddHousemaidPage />} />}
            />
            <Route path="/admin/manage-housemaid-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
