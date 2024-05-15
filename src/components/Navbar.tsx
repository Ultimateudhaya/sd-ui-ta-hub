
"use client"
import React, { useState } from 'react';
import type { NextPage } from 'next';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
// import FullFeaturedCrudGrid from "../Grid/Grid";
// import FullFeaturedCrudGrid from '../Grid/FullFeaturedCrudGrid';


import FullFeaturedCrudGrid from '../Grid/Grid1';

import Form from '../components/Form';  

const Navbar: NextPage = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const openForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setFormKey((prevKey) => prevKey + 1);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLoadCandidatesClick = () => {
    setApiEndpoint('http://localhost:8080/api/candidates/');
    setShowGrid(true);
  };

  const handleLoadClientsClick = () => {
    setApiEndpoint('http://localhost:8080/api/clients/');
    setShowGrid(true);
  };

  const handleLoadUsersClick = () => {
    setApiEndpoint('http://localhost:8080/api/users/');
    setShowGrid(true);
  };

  return (
    <div>
      <nav className="navbar ">
        <p className="navbar-brand">Tringapps</p>
        <ul className="navbar-nav ">
          <div className="load">
          <li>
            <a className=" nav-button" onClick={handleLoadCandidatesClick}>
               Candidates
            </a>

            
          </li>
          <li>
            <a className="nav-button" onClick={handleLoadClientsClick}>
               Clients
            </a>
          </li>
          <li>
            <a className=" nav-button" onClick={handleLoadUsersClick}>
               Users
            </a>
          </li>
          </div>
        
          
        </ul>
        <button className="btn btn-outline-success my-2 my-sm-0 create-button" onClick={openForm}>
              Create
            </button>
      </nav>
      {showGrid && <FullFeaturedCrudGrid apiEndpoint={apiEndpoint} />}
      {showForm && <Form key={formKey} {...closeForm} />}
    </div>
  );
};

export default Navbar;