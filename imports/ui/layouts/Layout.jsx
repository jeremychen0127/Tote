import React from 'react';
import Navbar from '../../ui/components/Navbar.jsx';
import Logo from '../../ui/components/Logo.jsx';

export const Layout =  ({content}) => (
  <div className="app-root">
    <br />
    <Logo />
    <Navbar />
    <div className="container">
      {content}
    </div>
  </div>
);
