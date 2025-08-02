import React from 'react';
import StatsGrid from '../../components/StatsGrid/StatsGrid';
import UsersTable from '../../components/UsersTable/UsersTable';
import './Dashboard.scss';
import Layout from '../../components/Layout/Layout';
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <StatsGrid />
     <UsersTable />
      <Outlet />
    </Layout>
  );
};

export default Dashboard;