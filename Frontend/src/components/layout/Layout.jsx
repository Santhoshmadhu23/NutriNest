import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WeeklyBoxSidebar from '../cart/WeeklyBoxSidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <WeeklyBoxSidebar />
    </div>
  );
};

export default Layout;
