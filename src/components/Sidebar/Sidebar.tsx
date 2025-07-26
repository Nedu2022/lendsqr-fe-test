import React from 'react';
import { ChevronDown, Users, Briefcase, PiggyBank } from 'lucide-react';
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onClose }) => {
  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />
      
      <div className={`sidebar ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="logo">
            <div className="logo-icon">🏢</div>
            <span className="logo-text">lendsqr</span>
          </div>

          <div className="org-switcher">
            <Briefcase className="org-icon" />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </div>

          <div className="nav-section">
            <div className="nav-item">
              <span className="nav-icon">🏠</span>
              <span>Dashboard</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Customers</div>
            <div className="nav-item active">
              <Users className="nav-icon" />
              <span>Users</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👥</span>
              <span>Guarantors</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💰</span>
              <span>Loans</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">⚖️</span>
              <span>Decision Models</span>
            </div>
            <div className="nav-item">
              <PiggyBank className="nav-icon" />
              <span>Savings</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">📋</span>
              <span>Loan Requests</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">❌</span>
              <span>Whitelist</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">⭐</span>
              <span>Karma</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Businesses</div>
            <div className="nav-item">
              <Briefcase className="nav-icon" />
              <span>Organization</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💼</span>
              <span>Loan Products</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🏦</span>
              <span>Savings Products</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💳</span>
              <span>Fees and Charges</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">📊</span>
              <span>Transactions</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🔧</span>
              <span>Services</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👤</span>
              <span>Service Account</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🏛️</span>
              <span>Settlements</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">📈</span>
              <span>Reports</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Settings</div>
            <div className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span>Preferences</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💰</span>
              <span>Fees and Pricing</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">📋</span>
              <span>Audit Logs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
