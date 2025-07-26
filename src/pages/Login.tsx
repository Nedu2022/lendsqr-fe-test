import React, { useState } from 'react';
import LogoImg from '../assets/Logo.svg';
import LoginImg from '../assets/Login.svg';
import '../styles/Login.scss';
import '../styles/variables.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">
          <img src={LogoImg} alt="Logo Image" />
        </div>

        <div className="illustration-container">
          <img src={LoginImg} alt="Login Image" />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h1 className="login-title">Welcome!</h1>
            <p className="login-subtitle">Enter details to login.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#forgot" className="forgot-link">FORGOT PASSWORD?</a>
            </div>

            <button type="submit" className="login-button">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
