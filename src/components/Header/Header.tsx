import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for anything" 
            className="search-input"
          />
          <button className="search-btn" aria-label="Search">
            <Search size={16} color="white" />
          </button>
        </div>
        <div className="user-section">
          <a href="#" className="docs-link">Docs</a>
          <Bell className="notification-icon" />
          <div className="user-profile">
            <div className="avatar">A</div>
            <span className="username">Adedeji</span>
            <ChevronDown size={16} color="#213F7D" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
