import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import coloredStar from '../../assets/colored-star.svg';
import uncoloredStar from '../../assets/uncolored-star.svg';

import './UserDetails.scss'

interface UserDetailsProps {}

const UserDetails: React.FC<UserDetailsProps> = () => {
  const [activeTab, setActiveTab] = useState('General Details');

  const tabs = [
    'General Details',
    'Documents', 
    'Bank Details',
    'Loans',
    'Savings',
    'App and System'
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="star-rating">

<img src={coloredStar} alt="Star" />
<img src={uncoloredStar} alt="Star" />
<img src={uncoloredStar} alt="Star" />
      </div>
    );
  };

  return (
    <Layout>


    <div className="user-details">
      <div className="head-nav">
        <button className="back-button">
          <ArrowLeft size={16} />
          Back to Users
        </button>
           </div>
        <div className="action-main">
        <h1 className="page-title">User Details</h1>
        <div className="action-buttons">
          <button className="btn btn-outline-danger">Blacklist User</button>
          <button className="btn btn-outline-primary">Activate User</button>
        </div>
        </div>

   

      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-avatar">
              <span>G</span>
            </div>
            <div className="profile-info">
              <h2>Grace Effiom</h2>
              <p>LSQFf587g90</p>
            </div>
          </div>
          <div className="profile-divider"></div>
          <div className="profile-tier">
            <p className="tier-label">User's Tier</p>
            {renderStars(1)}
          </div>
          <div className="profile-divider"></div>
          <div className="profile-balance">
            <p className="balance-amount">₦200,000.00</p>
            <p className="balance-account">9912345678/Providus Bank</p>
          </div>
        </div>
                <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="tabs-container">


        <div className="content">
          <div className="section">
            <h3 className="section-title">Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Full Name</p>
                <p className="info-value">Grace Effiom</p>
              </div>
              <div className="info-item">
                <p className="info-label">Phone Number</p>
                <p className="info-value">07060780922</p>
              </div>
              <div className="info-item">
                <p className="info-label">Email Address</p>
                <p className="info-value">grace@gmail.com</p>
              </div>
              <div className="info-item">
                <p className="info-label">BVN</p>
                <p className="info-value">07060780922</p>
              </div>
              <div className="info-item">
                <p className="info-label">Gender</p>
                <p className="info-value">Female</p>
              </div>
              <div className="info-item">
                <p className="info-label">Marital Status</p>
                <p className="info-value">Single</p>
              </div>
              <div className="info-item">
                <p className="info-label">Children</p>
                <p className="info-value">None</p>
              </div>
              <div className="info-item">
                <p className="info-label">Type of Residence</p>
                <p className="info-value">Parent's Apartment</p>
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Education and Employment</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Level of Education</p>
                <p className="info-value">B.Sc</p>
              </div>
              <div className="info-item">
                <p className="info-label">Employment Status</p>
                <p className="info-value">Employed</p>
              </div>
              <div className="info-item">
                <p className="info-label">Sector of Employment</p>
                <p className="info-value">FinTech</p>
              </div>
              <div className="info-item">
                <p className="info-label">Duration of Employment</p>
                <p className="info-value">2 years</p>
              </div>
              <div className="info-item">
                <p className="info-label">Office Email</p>
                <p className="info-value">grace@lendsqr.com</p>
              </div>
              <div className="info-item">
                <p className="info-label">Monthly Income</p>
                <p className="info-value">₦200,000.00- ₦400,000.00</p>
              </div>
              <div className="info-item">
                <p className="info-label">Loan Repayment</p>
                <p className="info-value">40,000</p>
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Socials</h3>
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Twitter</p>
                <p className="info-value">@grace_effiom</p>
              </div>
              <div className="info-item">
                <p className="info-label">Facebook</p>
                <p className="info-value">Grace Effiom</p>
              </div>
              <div className="info-item">
                <p className="info-label">Instagram</p>
                <p className="info-value">@grace_effiom</p>
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Guarantor</h3>
            <div className="guarantor-section">
              <div className="info-grid">
                <div className="info-item">
                  <p className="info-label">Full Name</p>
                  <p className="info-value">Debby Ogana</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Phone Number</p>
                  <p className="info-value">07060780922</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Email Address</p>
                  <p className="info-value">debby@gmail.com</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Relationship</p>
                  <p className="info-value">Sister</p>
                </div>
              </div>
            </div>
            <div className="guarantor-section">
              <div className="info-grid">
                <div className="info-item">
                  <p className="info-label">Full Name</p>
                  <p className="info-value">Debby Ogana</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Phone Number</p>
                  <p className="info-value">07060780922</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Email Address</p>
                  <p className="info-value">debby@gmail.com</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Relationship</p>
                  <p className="info-value">Sister</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </Layout>
  );
};

export default UserDetails;