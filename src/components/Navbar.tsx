import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
import FullFeaturedCrudGrid from '../Grid/FullFeaturedCrudGrid';
import Form from './Form';
import MenuPopupState from "./MenuPopupState";
import KanDash from './KanDash';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Board from './Dnd';
import Timeline from './Timeline';
import List from './List';
import Loader from  "../components/Loader";
const Navbar = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState('');
  const [clientDetails, setClientDetails] = useState([]);
  const [activeComponent, setActiveComponent] = useState('board');
  const [loading, setLoading] = useState(false); // Add loading state

  const openForm = (event) => {
    event.preventDefault();
    setFormKey((prevKey) => prevKey + 1);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLoadData = (navItem, endpoint) => {
    setActiveNavItem(navItem);
    setApiEndpoint(endpoint);
    setLoading(true); // Show loader
    setShowGrid(false);
    
    // Simulate data fetching
    setTimeout(() => {
      setShowGrid(true);
      setLoading(false); // Hide loader
    }, 1000); // Simulate a delay
  };

  const handleLoadCandidatesClick = () => handleLoadData('candidates', 'http://localhost:8080/api/candidates/status');
  const handleLoadClientsClick = () => handleLoadData('clients', 'http://localhost:8080/api/clients/clientPositions');
  const handleLoadUsersClick = () => handleLoadData('users', 'http://localhost:8080/api/users/');
  const handleloadlistClients = () => handleLoadData('loadclients', 'http://localhost:8080/api/clients/');

  const GridContainer = styled.div`
    display: ${showGrid ? 'block' : 'none'};
    width: 100%;
    height: 100vh;
    overflow: hidden;
  `;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/navbar">Tringapps</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNavItem === 'candidates' ? 'active' : ''}`}
                  onClick={handleLoadCandidatesClick}
                >
                  Candidates
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNavItem === 'clients' ? 'active' : ''}`}
                  onClick={handleLoadClientsClick}
                >
                  Positions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNavItem === 'users' ? 'active' : ''}`}
                  onClick={handleLoadUsersClick}
                >
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeNavItem === 'users' ? 'active' : ''}`}
                  onClick={handleloadlistClients}
                >
                  Clients
                </a>
              </li>
              <li>
                <button className="btn btn-success" onClick={openForm}>
                  CREATE
                </button>
              </li>
            </ul>
          </div>
          <MenuPopupState />
        </div>
      </nav>
      

      
      {showGrid ? (
        <GridContainer>
          <FullFeaturedCrudGrid apiEndpoint={apiEndpoint} />
        </GridContainer>
      ) : (
        <>
          <Sidebar setActiveComponent={setActiveComponent} />
          <div className='kandash'>
            {activeComponent === 'board' && <Board />}
            {activeComponent === 'timeline' && <Timeline />}
            {activeComponent === 'list' && <List />}
          </div>
        </>
      )}

      {showForm && <Form key={formKey} onClose={closeForm} />}
      
      {/* {clientDetails.length > 0 && (
        <ul>
          {clientDetails.map((client, index) => (
            <li key={index}>
              <div>Client Name: {client.clientName}</div>
              <div>Client SPOC Name: {client.clientSpocName}</div>
              <div>Primary Skill Set: {client.primarySkillSet}</div>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Navbar;
