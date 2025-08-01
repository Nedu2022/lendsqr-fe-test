import React, { useState } from 'react';
import { MoreVertical, Eye, UserX, UserCheck, Calendar, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/index';
import filter from '../../assets/filter-results-button.svg'
import './UsersTable.scss';

interface UsersTableProps {
  users: User[];
}

interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#39CD62';
      case 'Inactive': return '#545F7D';
      case 'Pending': return '#E9B200';
      case 'Blacklisted': return '#E4033B';
      default: return '#545F7D';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Active': return 'rgba(57, 205, 98, 0.06)';
      case 'Inactive': return 'rgba(84, 95, 125, 0.06)';
      case 'Pending': return 'rgba(233, 178, 0, 0.06)';
      case 'Blacklisted': return 'rgba(228, 3, 59, 0.06)';
      default: return 'rgba(84, 95, 125, 0.06)';
    }
  };


  const handleRowClick = (user: User, index: number) => {
    const userId = user.username || user.email || `user-${index}`;
    navigate(`/dashboard/users/${userId}`, { state: { user } });
  };

  const handleActionClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); 
    setDropdownOpen(dropdownOpen === index ? null : index);
  };


  const handleViewDetails = (e: React.MouseEvent, user: User, index: number) => {
    e.stopPropagation();
    const userId = user.username || user.email || `user-${index}`;
    navigate(`/dashboard/users/${userId}`, { state: { user } });
    setDropdownOpen(null);
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: ''
    });
  };

  const handleFilter = () => {
    // Apply filters logic here
    console.log('Applying filters:', filters);
    setFilterModalOpen(false);
  };

  const handleModalClose = () => {
    setFilterModalOpen(false);
  };

  // Get unique organizations and statuses for dropdowns
  const uniqueOrganizations = [...new Set(users.map(user => user.organization))];
  const uniqueStatuses = [...new Set(users.map(user => user.status))];

  return (
    <>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className={`table-header ${filterModalOpen ? 'filter-active' : ''}`}>
                    Organization
                    <img 
                      src={filter} 
                      alt="Filter" 
                      onClick={handleFilterClick}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Filter Modal positioned relative to this header */}
                    {filterModalOpen && (
                      <>
                        <div className="filter-modal-overlay" onClick={handleModalClose} />
                        <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
                          <div className="filter-modal-header">
                            <h3>Filter</h3>
                            <button 
                              className="filter-modal-close"
                              onClick={handleModalClose}
                              aria-label="Close modal"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          <div className="filter-modal-body">
                            <div className="filter-field">
                              <label htmlFor="organization">Organization</label>
                              <select
                                id="organization"
                                className="filter-select"
                                value={filters.organization}
                                onChange={(e) => handleFilterChange('organization', e.target.value)}
                              >
                                <option value="">Select</option>
                                {uniqueOrganizations.map(org => (
                                  <option key={org} value={org}>{org}</option>
                                ))}
                              </select>
                            </div>

                            <div className="filter-field">
                              <label htmlFor="username">Username</label>
                              <input
                                id="username"
                                type="text"
                                className="filter-input"
                                placeholder="User"
                                value={filters.username}
                                onChange={(e) => handleFilterChange('username', e.target.value)}
                              />
                            </div>

                            <div className="filter-field">
                              <label htmlFor="email">Email</label>
                              <input
                                id="email"
                                type="email"
                                className="filter-input"
                                placeholder="Email"
                                value={filters.email}
                                onChange={(e) => handleFilterChange('email', e.target.value)}
                              />
                            </div>

                            <div className="filter-field">
                              <label htmlFor="date">Date</label>
                              <div className="date-input-wrapper">
                                <input
                                  id="date"
                                  type="date"
                                  className="filter-input date-input"
                                  placeholder="Date"
                                  value={filters.date}
                                  onChange={(e) => handleFilterChange('date', e.target.value)}
                                />
                                <Calendar className="date-icon" size={16} />
                              </div>
                            </div>

                            <div className="filter-field">
                              <label htmlFor="phoneNumber">Phone Number</label>
                              <input
                                id="phoneNumber"
                                type="tel"
                                className="filter-input"
                                placeholder="Phone Number"
                                value={filters.phoneNumber}
                                onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                              />
                            </div>

                            <div className="filter-field">
                              <label htmlFor="status">Status</label>
                              <select
                                id="status"
                                className="filter-select"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                              >
                                <option value="">Select</option>
                                {uniqueStatuses.map(status => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="filter-modal-footer">
                            <button 
                              className="filter-btn filter-btn-reset"
                              onClick={handleReset}
                            >
                              Reset
                            </button>
                            <button 
                              className="filter-btn filter-btn-apply"
                              onClick={handleFilter}
                            >
                              Filter
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    Username
                    <img 
                      src={filter} 
                      alt="Filter" 
                      onClick={handleFilterClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    Email
                    <img 
                      src={filter} 
                      alt="Filter" 
                      onClick={handleFilterClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    Phone Number
                    <img 
                      src={filter} 
                      alt="Filter" 
                      onClick={handleFilterClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    Date Joined
                    <img 
                      src={filter} 
                      alt="Filter" 
                      onClick={handleFilterClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    Status
                    <img 
                      src={filter} 
                      alt="Filter" 
                      onClick={handleFilterClick}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={index}
                  className="user-row"
                  onClick={() => handleRowClick(user, index)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.dateJoined}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        color: getStatusColor(user.status),
                        backgroundColor: getStatusBg(user.status)
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-menu">
                      <button
                        aria-label="Action"
                        className="action-btn"
                        onClick={(e) => handleActionClick(e, index)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {dropdownOpen === index && (
                        <div className="dropdown-menu">
                          <button 
                            className="dropdown-item"
                            onClick={(e) => handleViewDetails(e, user, index)}
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <UserX size={16} />
                            Blacklist User
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <UserCheck size={16} />
                            Activate User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing
          <select className="pagination-select" aria-label="Items per page">
            <option>100</option>
            <option>50</option>
            <option>25</option>
          </select>
          out of 100
        </div>

        <div className="pagination-controls">
          <button className="pagination-btn">‹</button>
          <div className="pagination-btn active">1</div>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-btn">15</button>
          <button className="pagination-btn">16</button>
          <button className="pagination-btn">›</button>
        </div>
      </div>
    </>
  );
};

export default UsersTable;