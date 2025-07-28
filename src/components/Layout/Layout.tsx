import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header title="Users" />
      <div className="layout-body">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
