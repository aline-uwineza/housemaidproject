import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
// Importing external CSS for styling

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home" className="brand-link">
                    Housemaids Recruitment
                </NavLink>
            </div>
            <button className="navbar-toggle" aria-label="Toggle menu">
                ☰
            </button>
            <ul className="navbar-menu">
                <li><NavLink to="/home" className="nav-item" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/housemaid" className="nav-item" activeClassName="active">Housemaid</NavLink></li>
                <li><NavLink to="/find-housemaid" className="nav-item" activeClassName="active">Find housemaid</NavLink></li>
                {isUser && <li><NavLink to="/profile" className="nav-item" activeClassName="active">Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" className="nav-item" activeClassName="active">Admin</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/login" className="nav-item" activeClassName="active">Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" className="nav-item" activeClassName="active">Register</NavLink></li>}
                {isAuthenticated && (
                    <li>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
