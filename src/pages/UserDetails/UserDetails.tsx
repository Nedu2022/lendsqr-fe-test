import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import coloredStar from '../../assets/colored-star.svg';
import uncoloredStar from '../../assets/uncolored-star.svg';
import type { User } from '../../types/index';

import './UserDetails.scss';

interface ExtendedUser extends User {
  bvn?: string;
  gender?: string;
  maritalStatus?: string;
  children?: string;
  residence?: string;
  educationLevel?: string;
  employmentStatus?: string;
  sector?: string;
  employmentDuration?: string;
  officeEmail?: string;
  monthlyIncome?: string;
  loanRepayment?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  accountNumber?: string;
  accountBalance?: string;
  bankName?: string;
  guarantor?: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    relationship?: string;
  };
}

const UserDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('General Details');
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user from location state or fetch by ID
  useEffect(() => {
    const locationUser = location.state?.user as ExtendedUser | undefined;
    
    if (locationUser) {
      setUser(locationUser);
    } else if (params.id) {
      // If no user in state, fetch from API
      fetchUserById(params.id);
    }
  }, [location.state, params.id]);

  const fetchUserById = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // First, fetch all users to find the specific one
      const response = await fetch('https://68823e7e66a7eb81224df7e7.mockapi.io/api/v1/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const foundUser = data.find((item: any) => item.id === userId);
      
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      // Transform the API data
      const transformedUser: ExtendedUser = {
        id: foundUser.id,
        organization: foundUser.organisation || 'Lendsqr',
        username: foundUser.personal_info?.full_name || foundUser.userName || 'User',
        email: foundUser.personal_info?.email || foundUser.email || '',
        phoneNumber: foundUser.personal_info?.phone || '',
        dateJoined: foundUser.date_joined ? new Date(parseInt(foundUser.date_joined)).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }) : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: foundUser.status ? 
          (foundUser.status.charAt(0).toUpperCase() + foundUser.status.slice(1)) as 'Active' | 'Inactive' | 'Pending' | 'Blacklisted' :
          'Active',
        
        // Personal Information
        bvn: foundUser.personal_info?.bvn || 'N/A',
        gender: foundUser.personal_info?.gender || 'N/A',
        maritalStatus: foundUser.personal_info?.marital_status || 'N/A',
        children: foundUser.personal_info?.children?.toString() || 'None',
        residence: foundUser.personal_info?.residence || 'N/A',
        
        // Education and Employment
        educationLevel: foundUser.education_and_employment?.level || 'N/A',
        employmentStatus: foundUser.education_and_employment?.employment_status || 'N/A',
        sector: foundUser.education_and_employment?.sector || 'N/A',
        employmentDuration: foundUser.education_and_employment?.duration || 'N/A',
        officeEmail: foundUser.education_and_employment?.office_email || 'N/A',
        monthlyIncome: foundUser.education_and_employment?.monthly_income ? 
          Array.isArray(foundUser.education_and_employment.monthly_income) ?
            `₦${foundUser.education_and_employment.monthly_income.join(' - ₦')}` :
            `₦${foundUser.education_and_employment.monthly_income}` : 'N/A',
        loanRepayment: foundUser.education_and_employment?.loan_repayment || 'N/A',
        
        // Socials
        twitter: foundUser.socials?.twitter || 'N/A',
        facebook: foundUser.socials?.facebook || 'N/A',
        instagram: foundUser.socials?.instagram || 'N/A',
        
        // Account Details (these might not be in the API, using defaults)
        accountNumber: `22${foundUser.id}${Math.floor(Math.random() * 100)}`,
        accountBalance: `₦${(Math.random() * 1000000).toFixed(2)}`,
        bankName: 'Providus Bank',
        
        // Guarantor
        guarantor: foundUser.guarantor ? {
          fullName: foundUser.guarantor.full_name || 'N/A',
          phoneNumber: foundUser.guarantor.phone_number || 'N/A',
          email: foundUser.guarantor.email || 'N/A',
          relationship: foundUser.guarantor.relationship || 'N/A'
        } : {
          fullName: 'N/A',
          phoneNumber: 'N/A',
          email: 'N/A',
          relationship: 'N/A'
        }
      };
      
      setUser(transformedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
  ];

  const renderStars = (rating: number) => (
    <div className="star-rating">
      {[...Array(3)].map((_, i) => (
        <img
          key={i}
          src={i < rating ? coloredStar : uncoloredStar}
          alt="Star"
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="loading-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <Loader className="loading-spinner" />
          <span>Loading user details...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <div className="error-message">Error loading user: {error}</div>
          <button onClick={() => navigate('/dashboard/users')}>Go Back to Users</button>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>User data not found.</p>
          <button onClick={() => navigate('/dashboard/users')}>Go Back</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="user-details">
        <div className="head-nav">
          <button className="back-button" onClick={() => navigate('/dashboard/users')}>
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
                <span>{user.username?.[0]?.toUpperCase()}</span>
              </div>
              <div className="profile-info">
                <h2>{user.username}</h2>
                <p>{user.accountNumber || user.id}</p>
              </div>
            </div>
            <div className="profile-divider"></div>
            <div className="profile-tier">
              <p className="tier-label">User's Tier</p>
              {renderStars(1)}
            </div>
            <div className="profile-divider"></div>
            <div className="profile-balance">
              <p className="balance-amount">{user.accountBalance || '₦0.00'}</p>
              <p className="balance-account">
                {user.accountNumber || 'XXXXXXX'}/
                {user.bankName || 'Unknown Bank'}
              </p>
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
          {activeTab === 'General Details' && (
            <div className="content">
              <div className="section">
                <h3 className="section-title">Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="info-label">Full Name</p>
                    <p className="info-value">{user.username}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Phone Number</p>
                    <p className="info-value">{user.phoneNumber}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Email Address</p>
                    <p className="info-value">{user.email}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">BVN</p>
                    <p className="info-value">{user.bvn}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Gender</p>
                    <p className="info-value">{user.gender}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Marital Status</p>
                    <p className="info-value">{user.maritalStatus}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Children</p>
                    <p className="info-value">{user.children}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Type of Residence</p>
                    <p className="info-value">{user.residence}</p>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3 className="section-title">Education and Employment</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="info-label">Level of Education</p>
                    <p className="info-value">{user.educationLevel}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Employment Status</p>
                    <p className="info-value">{user.employmentStatus}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Sector of Employment</p>
                    <p className="info-value">{user.sector}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Duration of Employment</p>
                    <p className="info-value">{user.employmentDuration}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Office Email</p>
                    <p className="info-value">{user.officeEmail}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Monthly Income</p>
                    <p className="info-value">{user.monthlyIncome}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Loan Repayment</p>
                    <p className="info-value">{user.loanRepayment}</p>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3 className="section-title">Socials</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="info-label">Twitter</p>
                    <p className="info-value">{user.twitter}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Facebook</p>
                    <p className="info-value">{user.facebook}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Instagram</p>
                    <p className="info-value">{user.instagram}</p>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3 className="section-title">Guarantor</h3>
                <div className="guarantor-section">
                  <div className="info-grid">
                    <div className="info-item">
                      <p className="info-label">Full Name</p>
                      <p className="info-value">{user.guarantor?.fullName}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Phone Number</p>
                      <p className="info-value">{user.guarantor?.phoneNumber}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Email Address</p>
                      <p className="info-value">{user.guarantor?.email}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Relationship</p>
                      <p className="info-value">{user.guarantor?.relationship}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'General Details' && (
            <div className="placeholder-tab-content">
              <p style={{ padding: '1rem' }}>
                No content implemented for <strong>{activeTab}</strong> tab yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;