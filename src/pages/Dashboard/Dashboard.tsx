import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import StatsGrid from '../../components/StatsGrid/StatsGrid';
import UsersTable from '../../components/UsersTable/UsersTable';
import type { User } from '../../types/index';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const [users] = useState<User[]>([
    {
      organization: 'Lendsqr',
      username: 'Adedeji',
      email: 'adedeji@lendsqr.com',
      phoneNumber: '08078903721',
      dateJoined: 'May 15, 2020 10:00 AM',
      status: 'Inactive'
    },
    {
      organization: 'Irorun',
      username: 'Debby Ogana',
      email: 'debby2@irorun.com',
      phoneNumber: '08160780928',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Pending'
    },
    {
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Blacklisted'
    },
    {
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '07003309226',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'Pending'
    },
    {
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Active'
    },
    {
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '08060780900',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'Active'
    },
    {
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Blacklisted'
    },
    {
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '08060780900',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'Inactive'
    },
    {
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'Inactive'
    }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar 
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        <Header title="Users" />
        
        <div className="content">
          <StatsGrid />
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;