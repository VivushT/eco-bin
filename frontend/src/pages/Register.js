import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Include the CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    district: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  const { name, email, password, address, district, phoneNumber } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateName = (name) => {
    const namePattern = /^[A-Za-z\s]+$/; // Allow only letters and spaces
    if (!namePattern.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Email must contain "@"';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 20) {
      return 'Password must be between 8 and 20 characters';
    }
    return '';
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^0[0-9]{9}$/; // Phone number must start with 0 and have exactly 10 digits
    if (!phonePattern.test(phoneNumber)) {
      return 'Phone number must start with 0 and contain exactly 10 digits';
    }
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate the inputs
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const phoneNumberError = validatePhoneNumber(phoneNumber);
    
    if (nameError || emailError || passwordError || phoneNumberError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        phoneNumber: phoneNumberError,
      });
      return;
    }

    try {
      const res = await axios.post('http://localhost:8070/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      
      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('User registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="input-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>District:</label>
            <input
              type="text"
              name="district"
              value={district}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <p className="register-footer">
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
