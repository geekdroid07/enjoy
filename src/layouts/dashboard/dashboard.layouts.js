import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function Dashboard({ children }) {
  return (
    <div className="Dashboard">
      <div className="Dashboard__sidebar">
        <Sidebar />
      </div>

      <div className="Dashboard__content">
        <Header />
        {children}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dashboard;
