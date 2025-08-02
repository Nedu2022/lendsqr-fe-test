import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import coloredStar from "../../assets/colored-star.svg";
import uncoloredStar from "../../assets/uncolored-star.svg";

import "./UserDetails.scss";

interface ExtendedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: number;
  bvn: number;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;

  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: number[];
  loanRepayment: number;

  twitter: string;
  facebook: string;
  instagram: string;

  accountNumber: number;
  bankName: string;

  status: string;
  dateJoined: string;
  organization: string;
  tier: number;

  guarantor: {
    fullName: string;
    phone: number;
    email: string;
    relationship: string;
  };
}


const UserDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("General Details");
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const locationUser = location.state?.user as ExtendedUser | undefined;

  if (locationUser) {
    setUser(locationUser);
  } else if (params.id) {
    fetchUserById(params.id);
  }
}, [location.state, params.id]);


const fetchUserById = async (id: string) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/userDetails/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user data, status: ${response.status}`);
    }

    // The API returns single user object
    const foundUser: ExtendedUser = await response.json();

    // If your API returns differently (like an array), handle accordingly

    // If needed, transform here to ensure all fields match your interface
    const transformedUser: ExtendedUser = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email,
      phone: foundUser.phone,
      bvn: foundUser.bvn,
      gender: foundUser.gender,
      maritalStatus: foundUser.maritalStatus,
      children: foundUser.children,
      residence: foundUser.residence,

      levelOfEducation: foundUser.levelOfEducation,
      employmentStatus: foundUser.employmentStatus,
      sectorOfEmployment: foundUser.sectorOfEmployment,
      durationOfEmployment: foundUser.durationOfEmployment,
      officeEmail: foundUser.officeEmail,
      monthlyIncome: foundUser.monthlyIncome,
      loanRepayment: foundUser.loanRepayment,

      twitter: foundUser.twitter,
      facebook: foundUser.facebook,
      instagram: foundUser.instagram,

      accountNumber: foundUser.accountNumber,
      bankName: foundUser.bankName,

      status: foundUser.status,
      dateJoined: foundUser.dateJoined,
      organization: foundUser.organization,
      tier: foundUser.tier,

      guarantor: {
        fullName: foundUser.guarantor.fullName,
        phone: foundUser.guarantor.phone,
        email: foundUser.guarantor.email,
        relationship: foundUser.guarantor.relationship,
      },
    };

    setUser(transformedUser);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to fetch user");
  } finally {
    setLoading(false);
  }
};


  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
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
        <div className="loading-container">
          <Loader className="loading-spinner" />
          <span>Loading user details...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-container">
          <div className="error-message">Error loading user: {error}</div>
          <button onClick={() => navigate("/dashboard/users")}>
            Go Back to Users
          </button>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="error-container">
          <p>User data not found.</p>
          <button onClick={() => navigate("/dashboard/users")}>Go Back</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="user-details">
        <div className="head-nav">
          <button
            className="back-button"
            onClick={() => navigate("/dashboard/users")}
          >
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
                <p>{user.bvn}</p>
              </div>
            </div>
            <div className="profile-divider"></div>
            <div className="profile-tier">
              <p className="tier-label">User's Tier</p>
              {renderStars(1)}
            </div>
            <div className="profile-divider"></div>
            <div className="profile-balance">
              <p className="balance-amount">{user.accountBalance}</p>
              <p className="balance-account">
                {user.accountNumber} {user.bankName}
              </p>
            </div>
          </div>

          <div className="tabs">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className="tabs-container">
          {activeTab === "General Details" && (
            <div className="content">
              <div className="section">
                <h3 className="section-title">Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="info-label">Full Name</p>
                    <p className="info-value">{user.name}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Phone Number</p>
                    <p className="info-value">{user.phone}</p>
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
          )}

          {activeTab !== "General Details" && (
            <div className="placeholder-tab-content">
              <p style={{ padding: "1rem" }}>
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
