// Loader.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
