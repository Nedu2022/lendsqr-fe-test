import React from 'react';
import multipleusers from '../../assets/multiple-user.svg';
import activeuser from '../../assets/active-users.svg';
import userloan from '../../assets/user-loan.svg';
import usersaving from '../../assets/user-saving.svg';

import './StatsGrid.scss';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  iconClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, iconClass }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass}`}>
        <img src={icon} alt={label} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

const StatsGrid: React.FC = () => {
  const stats = [
    {
      icon: multipleusers,
      label: 'Users',
      value: '2,453',
      iconClass: 'users'
    },
    {
      icon: activeuser,
      label: 'Active Users',
      value: '2,453',
      iconClass: 'active'
    },
    {
      icon: userloan,
      label: 'Users with Loans',
      value: '12,453',
      iconClass: 'loans'
    },
    {
      icon: usersaving,
      label: 'Users with Savings',
      value: '102,453',
      iconClass: 'savings'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;