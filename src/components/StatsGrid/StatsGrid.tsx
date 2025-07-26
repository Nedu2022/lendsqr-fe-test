import React from 'react';
import { Users, DollarSign, PiggyBank } from 'lucide-react';
import './StatsGrid.scss';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, iconClass }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass}`}>
        {icon}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

const StatsGrid: React.FC = () => {
  const stats = [
    {
      icon: <Users size={20} />,
      label: 'Users',
      value: '2,453',
      iconClass: 'users'
    },
    {
      icon: <Users size={20} />,
      label: 'Active Users',
      value: '2,453',
      iconClass: 'active'
    },
    {
      icon: <DollarSign size={20} />,
      label: 'Users with Loans',
      value: '12,453',
      iconClass: 'loans'
    },
    {
      icon: <PiggyBank size={20} />,
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