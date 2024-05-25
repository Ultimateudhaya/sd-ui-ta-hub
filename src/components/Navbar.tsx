import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
import FullFeaturedCrudGrid from '../Grid/FullFeaturedCrudGrid';
import Form from './Form';
import MenuPopupState from "./MenuPopupState";
import KanDash from './KanDash';
import Sidebar from './Sidebar';
import "../styles/KanDash.css";
import styled from 'styled-components';
import Board from './Dnd';
import Timeline from './Timeline';
import List from './List';

const Navbar = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState('');
  const [clientDetails, setClientDetails] = useState([]);
  const [activeComponent, setActiveComponent] = useState('board');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/requirement', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('Fetched data:', data);
  //         const clients = data.map((item) => ({
  //           clientName: item.clientName,
  //           clientSpocName: item.clientSpocName,
  //           primarySkillSet: item.primarySkillSet
  //         }));
  //         setClientDetails(clients);
  //       } else {
  //         console.error('Failed to fetch data:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('An error occurred while fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const openForm = (event) => {
    event.preventDefault();
    setFormKey((prevKey) => prevKey + 1);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLoadCandidatesClick = () => {
    setActiveNavItem('candidates');
    setApiEndpoint('http://localhost:8080/api/candidates/status');
    setShowGrid(true);
  };

  const handleLoadClientsClick = () => {
    setActiveNavItem('clients');
    setApiEndpoint('http://localhost:8080/api/clients/clientPositions');
    setShowGrid(true);
  };

  const handleLoadUsersClick = () => {
    setActiveNavItem('users');
    setApiEndpoint('http://localhost:8080/api/users/');
    setShowGrid(true);
  };

  const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const ProfilePhoto = styled.div`
    width: 35px;
    height: 35px;
    background-color: #bbb;
    border-radius: 50%;
    margin-left: 20px;
    margin-top: 3px;
    background-size: cover;
    padding: 6px;
  `;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ProfileContainer>
            {/* <ProfilePhoto /> */}
          </ProfileContainer>
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
                  Clients
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
            </ul>
          </div>
          <button className="btn btn-primary" onClick={openForm}>
            CREATE
          </button>
          <MenuPopupState />
        </div>
      </nav>
      <Sidebar setActiveComponent={setActiveComponent} />
      {showGrid && <FullFeaturedCrudGrid apiEndpoint={apiEndpoint} />}
      <div className='kandash'>
        {activeComponent === 'board' && <Board />}
        {activeComponent === 'timeline' && <Timeline />}
        {activeComponent === 'list' && <List />}
      </div>
      {showForm && <Form key={formKey} onClose={closeForm} />}
      {clientDetails.length > 0 && (
        <ul>
          {clientDetails.map((client, index) => (
            <li key={index}>
              <div>Client Name: {client.clientName}</div>
              <div>Client SPOC Name: {client.clientSpocName}</div>
              <div>Primary Skill Set: {client.primarySkillSet}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
