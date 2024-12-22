import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disappear, setDisappear] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response && response.success) {
        alert('Login successful');
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isAdmin', response.isAdmin || false); // Store isAdmin status
        navigate('/');
      } else {
        alert(response.message || 'Login failed: Incorrect email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      alert(
        error.response?.data?.message || 'Login failed: An error occurred. Please try again.'
      );
    }
  };

  const handleRegisterRedirect = () => {
    setDisappear(true);
    setTimeout(() => {
      navigate('/register');
    }, 1400);
  };

  return (
    <div className={`login-container ${disappear ? 'disappear' : ''}`}>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="register-btn" onClick={handleRegisterRedirect}>
        Register
      </button>
    </div>
  );
}

export default Login;
