import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Sidebar.scss';
import briefcase from '../../assets/briefcase.svg';
import home from '../../assets/home.svg';
import user from '../../assets/user-times.svg';
import users from '../../assets/users.svg';
import sack from '../../assets/sack.svg';
import handshakeRegular from '../../assets/handshake-regular.svg';
import piggybank from '../../assets/piggy-bank.svg';
import loanrequest from '../../assets/loan-request.svg';
import whitelist from '../../assets/whitelist.svg';
import usercancel from '../../assets/user-times.svg';
import savingproduct from '../../assets/saving-products.svg';
import coins from '../../assets/coins-solid.svg';
import transaction from '../../assets/transaction.svg';
import service from '../../assets/galaxy.svg';
import serviceaccount from '../../assets/service.svg';
import settlement from '../../assets/settlement.svg';
import graph from '../../assets/chart-bar.svg';
import preferences from '../../assets/preferences.svg';
import badge from '../../assets/badge-percent.svg';
import clipboard from '../../assets/clipboard-list.svg';


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

          <div className="org-switcher">
            <img src={briefcase} alt="Briefcase" />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </div>

          <div className="nav-section">
            <div className="nav-item">
              <img src={home} alt="Home" />
              <span>Dashboard</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Customers</div>
            <div className="nav-item active">
              <img src={user} alt="Users" />
              <span>Users</span>
            </div>
            <div className="nav-item">
              <img src={users} alt="Users" />
              <span>Guarantors</span>
            </div>
            <div className="nav-item">
              <img src={sack} alt="Sack" />
              <span>Loans</span>
            </div>
            <div className="nav-item">
              <img src={handshakeRegular} alt="Settlement" />
              <span>Decision Models</span>
            </div>
            <div className="nav-item">
              <img src={piggybank} alt="PiggyBank" />
              <span>Savings</span>
            </div>
            <div className="nav-item">
              <img src={loanrequest} alt="Loan Request" />
              <span>Loan Requests</span>
            </div>
            <div className="nav-item">
              <img src={whitelist} alt="WhiteList" />
              <span>Whitelist</span>
            </div>
            <div className="nav-item">
              <img src={usercancel} alt="User Cancel" />
              <span>Karma</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Businesses</div>
            <div className="nav-item">
              <img src={briefcase} alt="Briefcase" />
              <span>Organization</span>
            </div>
            <div className="nav-item">
              <img src={loanrequest} alt="Loan Request" />
              <span>Loan Products</span>
            </div>
            <div className="nav-item">
              <img src={savingproduct} alt="Saving Products" />
              <span>Savings Products</span>
            </div>
            <div className="nav-item">
              <img src={coins} alt="Fees and Charges" />
              <span>Fees and Charges</span>
            </div>
            <div className="nav-item">
              <img src={transaction} alt="Transactions" />
              <span>Transactions</span>
            </div>
            <div className="nav-item">
              <img src={service} alt="Services" />
              <span>Services</span>
            </div>
            <div className="nav-item">
              <img src={serviceaccount} alt="Service Account" />
              <span>Service Account</span>
            </div>
            <div className="nav-item">
              <img src={settlement} alt="Settlements" />
              <span>Settlements</span>
            </div>
            <div className="nav-item">
              <img src={graph} alt="Reports" />
              <span>Reports</span>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Settings</div>
            <div className="nav-item">
              <img src={preferences} alt="Preferences" />
              <span>Preferences</span>
            </div>
            <div className="nav-item">
              <img src={badge} alt="Fees and Pricing" />
              <span>Fees and Pricing</span>
            </div>
            <div className="nav-item">
              <img src={clipboard} alt="Audit Logs" />
              <span>Audit Logs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
