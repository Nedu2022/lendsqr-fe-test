import React, { useState, useEffect, useRef } from "react";
import {
  MoreVertical,
  Eye,
  UserX,
  UserCheck,
  Calendar,
  X,
  Loader
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/index";
import filter from "../../assets/filter-results-button.svg";
import "./UsersTable.scss";

interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterState>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: ""
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/userDetails");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const transformedUsers: User[] = data.map((item: any) => ({
          id: item.id,
          organization:
            item.organisation || item.orgName || item.organization || "Lendsqr",
          username:
            item.personal_info?.full_name ||
            item.name ||
            item.name ||
            (item.profile?.firstName
              ? `${item.profile.firstName} ${
                  item.profile.lastName || ""
                }`.trim()
              : item.profile?.firstName || "User"),
          email:
            item.personal_info?.email ||
            item.email ||
            item.profile?.email ||
            `${item.id}@example.com`,
          phoneNumber:
            item.personal_info?.phone ||
            item.profile?.phoneNumber ||
            item.phoneNumber ||
            item.phone ||
            `+234${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          dateJoined: item.date_joined
            ? new Date(parseInt(item.date_joined)).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })
            : item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })
            : new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              }),
          status: item.status
            ? ((item.status.charAt(0).toUpperCase() + item.status.slice(1)) as
                | "Active"
                | "Inactive"
                | "Pending"
                | "Blacklisted")
            : (["Active", "Inactive", "Pending", "Blacklisted"][
                Math.floor(Math.random() * 4)
              ] as "Active" | "Inactive" | "Pending" | "Blacklisted")
        }));

        setUsers(transformedUsers);
        setFilteredUsers(transformedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = users;

    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }

    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.phoneNumber) {
      filtered = filtered.filter((user) =>
        user.phoneNumber.includes(filters.phoneNumber)
      );
    }

    if (filters.status) {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    if (filters.date) {
      filtered = filtered.filter((user) => user.dateJoined === filters.date);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [filters, users]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#39CD62";
      case "Inactive":
        return "#545F7D";
      case "Pending":
        return "#E9B200";
      case "Blacklisted":
        return "#E4033B";
      default:
        return "#545F7D";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "Active":
        return "rgba(57, 205, 98, 0.06)";
      case "Inactive":
        return "rgba(84, 95, 125, 0.06)";
      case "Pending":
        return "rgba(233, 178, 0, 0.06)";
      case "Blacklisted":
        return "rgba(228, 3, 59, 0.06)";
      default:
        return "rgba(84, 95, 125, 0.06)";
    }
  };

  const handleRowClick = (user: User) => {
    navigate(`/dashboard/users/${user.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleViewDetails = (e: React.MouseEvent, user: User) => {
    e.stopPropagation();
    navigate(`/dashboard/users/${user.id}`);
    setDropdownOpen(null);
  };

  const handleFilterClick = (event: React.MouseEvent) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const top = rect.bottom + 8;
    let left = rect.left;

    const modalWidth = 270;
    const viewportWidth = window.innerWidth;

    if (left + modalWidth > viewportWidth - 20) {
      left = viewportWidth - modalWidth - 20;
    }

    if (left < 20) {
      left = 20;
    }

    setModalPosition({ top, left });
    setFilterModalOpen(true);
  };

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: ""
    });
  };

  const handleFilter = () => {
    setFilterModalOpen(false);
  };

  const handleModalClose = () => {
    setFilterModalOpen(false);
  };

  const uniqueOrganizations = [
    ...new Set(users.map((user) => user.organization))
  ];
  const uniqueStatuses = [...new Set(users.map((user) => user.status))];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="loading-spinner" />
        <span>Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error loading users: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="table-header">
                    Organization
                    <img
                      src={filter}
                      alt="Filter"
                      onClick={handleFilterClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    Username
                    <img
                      src={filter}
                      alt="Filter"
                      onClick={handleFilterClick}
                      style={{ cursor: "pointer" }}
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
                      style={{ cursor: "pointer" }}
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
                      style={{ cursor: "pointer" }}
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
                      style={{ cursor: "pointer" }}
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
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                const globalIndex = startIndex + index;
                return (
                  <tr
                    key={user.id}
                    className="user-row"
                    onClick={() => handleRowClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    <td data-label="Organization">{user.organization}</td>
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
                              onClick={(e) =>
                                handleViewDetails(e, user, globalIndex)
                              }
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filterModalOpen && (
        <>
          <div className="filter-modal-overlay" onClick={handleModalClose} />
          <div
            className="filter-modal"
            style={{
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
                  onChange={(e) =>
                    handleFilterChange("organization", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {uniqueOrganizations.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
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
                  onChange={(e) =>
                    handleFilterChange("username", e.target.value)
                  }
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
                  onChange={(e) => handleFilterChange("email", e.target.value)}
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
                    onChange={(e) => handleFilterChange("date", e.target.value)}
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
                  onChange={(e) =>
                    handleFilterChange("phoneNumber", e.target.value)
                  }
                />
              </div>

              <div className="filter-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  className="filter-select"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">Select</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
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

      <div className="pagination">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)}{" "}
          of
          <select
            className="pagination-select"
            aria-label="Items per page"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          out of {filteredUsers.length}
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            ‹
          </button>

        
          {totalPages > 0 &&
            Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="pagination-ellipsis">...</span>
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="pagination-btn"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1
            }}
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
