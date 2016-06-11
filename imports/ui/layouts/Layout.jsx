import React from 'react';
import Navbar from '../../ui/components/Navbar.jsx';

export const Layout =  ({content}) => (
  <div className="app-root">
    <br />
    <Navbar />
    <div className="container">
      {content}
    </div>
  </div>
);
