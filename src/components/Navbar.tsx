import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
import FullFeaturedCrudGrid from '../Grid/FullFeaturedCrudGrid';
import Form from './Form';
import MenuPopupState from "./MenuPopupState";

const Navbar = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState('');
  const [clientDetails, setClientDetails] = useState<any[]>([]); // Set type to any[]

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/requirement', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched data:', data);
                // Filter out clientName and clientSPOCName
                const clients = data.map((item) => ({
                  clientName: item.clientName,
                  clientSpocName: item.clientSpocName,
                  primarySkillSet : item.primarySkillSet
                }));
                setClientDetails(clients);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    };

    fetchData();
}, []);

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
    setApiEndpoint('http://localhost:8080/api/candidates/');
    setShowGrid(true);
  };

  const handleLoadClientsClick = () => {
    setActiveNavItem('clients');
    setApiEndpoint('http://localhost:8080/api/clients/');
    setShowGrid(true);
  };

  const handleLoadUsersClick = () => {
    setActiveNavItem('users');
    setApiEndpoint('http://localhost:8080/api/users/');
    setShowGrid(true);
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav ">

          <div className="load">
          <p className="navbar-brand">Tringapps</p>

            <li>
              <a className={`nav-button ${activeNavItem === 'candidates' ? 'active' : ''}`} onClick={handleLoadCandidatesClick}>
                 Candidates
              </a>
            </li>
            <li>
              <a className={`nav-button ${activeNavItem === 'clients' ? 'active' : ''}`} onClick={handleLoadClientsClick}>
                 Clients
              </a>
            </li>
            <li>
              <a className={`nav-button ${activeNavItem === 'users' ? 'active' : ''}`} onClick={handleLoadUsersClick}>
                 Users
              </a>
            </li>
          </div>
        </ul>
        <div>
       
        </div>
        <div>
          
        <button className="btn btn-outline-success " onClick={openForm}>
          Create
          
        </button>
        <MenuPopupState   />
        </div>
      

      
      </nav>
      {showGrid && <FullFeaturedCrudGrid apiEndpoint={apiEndpoint} />}
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
