import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ setSearchQuery }) {
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert('You have been logged out.');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <a href="/">DalBhaat</a>
      </div>
      <nav className="header-nav">
        <a href="/admin">Admin</a>
        <a href="/cart">Cart</a>
        {!isLoggedIn ? (
          <a href="/login">Login</a>
        ) : (
          <a href="/login" onClick={handleLogout}>
            Logout
          </a>
        )}
      </nav>
      <form className="header-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </header>
  );
}

export default Header;
