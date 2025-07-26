import React from 'react';
import { Menu, Bell } from 'lucide-react';
import './MobileHeader.scss';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="mobile-header">
      <button aria-label="Search" className="mobile-menu-btn" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <div className="mobile-logo">
        <div className="mobile-logo-icon">🏢</div>
        <span className="mobile-logo-text">lendsqr</span>
      </div>
      <div className="mobile-actions">
        <Bell size={18} color="#213F7D" />
        <div className="avatar mobile-avatar">A</div>
      </div>
    </div>
  );
};

export default MobileHeader;