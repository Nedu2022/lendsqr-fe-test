import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar when switching to mobile
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        // On desktop, sidebar should be visible by default
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="layout">
      {isMobile && (
        <button 
          className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}
      
      <Header 
        title="Users" 
        onMenuClick={toggleSidebar}
        isMobile={isMobile}
      />
      <div className="layout-body">
        {!isMobile && (
          <aside className={`sidebar-wrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
            <Sidebar 
              isOpen={isSidebarOpen}
              isMobile={isMobile}
              onClose={closeSidebar}
            />
          </aside>
        )}
        
        {isMobile && (
          <Sidebar 
            isOpen={isSidebarOpen}
            isMobile={isMobile}
            onClose={closeSidebar}
          />
        )}
        
        <main className={`layout-content ${!isMobile && isSidebarOpen ? 'sidebar-open' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;