import React, { useState } from 'react';
import { Filter, MoreVertical, Eye, UserX, UserCheck } from 'lucide-react';
import type { User } from '../../types/index';
import './UsersTable.scss';

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

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

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="table-header">
                  Organization
                  <Filter size={16} />
                </div>
              </th>
              <th>
                <div className="table-header">
                  Username
                  <Filter size={16} />
                </div>
              </th>
              <th>
                <div className="table-header">
                  Email
                  <Filter size={16} />
                </div>
              </th>
              <th>
                <div className="table-header">
                  Phone Number
                  <Filter size={16} />
                </div>
              </th>
              <th>
                <div className="table-header">
                  Date Joined
                  <Filter size={16} />
                </div>
              </th>
              <th>
                <div className="table-header">
                  Status
                  <Filter size={16} />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
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
                      onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {dropdownOpen === index && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item">
                          <Eye size={16} />
                          View Details
                        </button>
                        <button className="dropdown-item">
                          <UserX size={16} />
                          Blacklist User
                        </button>
                        <button className="dropdown-item">
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

      {/* Pagination */}
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
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-btn">15</button>
          <button className="pagination-btn">16</button>
          <button className="pagination-btn">›</button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
