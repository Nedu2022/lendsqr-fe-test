import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../../assets/Logo.svg';
import Adedeji from '../../assets/adedeji.svg';
import notification from '../../assets/notification.svg';
import './Header.scss';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = "Dashboard", onMenuClick, isMobile = false }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="logo-img">
            <img src={Logo} alt="Logo" />
          </div>
        </div>

        <div className="header-center">
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
        </div>

        <div className="header-right">
          {/* Mobile search toggle */}


          <div className="user-section">
            <p className="docs-link">Docs</p>
            <img src={notification} alt="Notification" className="notification-icon" />
            <div className="user">
              <div className="avatar">
                <img src={Adedeji} alt="User avatar" />
              </div>
              <span className="username">Adedeji</span>
              <ChevronDown size={16} color="#213F7D" />
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Header;