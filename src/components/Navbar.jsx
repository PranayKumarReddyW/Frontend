import React from 'react';
import { Link } from 'react-router-dom';
import { getTokenFromCookie, getUserRoleFromCookie } from '../utils/auth';

const Navbar = () => {
  const token = getTokenFromCookie();
  const userRole = getUserRoleFromCookie();

  const renderNavLinks = () => {
    if (!token) {
      return (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      );
    }

    // Admin navigation items
    if (userRole === 'admin') {
      return (
        <>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/users" className="nav-link">Manage Users</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
          <Link to="/logout" className="nav-link">Logout</Link>
        </>
      );
    }

    // Regular user navigation items
    return (
      <>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/logout" className="nav-link">Logout</Link>
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link">Home</Link>
      </div>
      <div className="navbar-links">
        {renderNavLinks()}
      </div>
    </nav>
  );
};

export default Navbar; 