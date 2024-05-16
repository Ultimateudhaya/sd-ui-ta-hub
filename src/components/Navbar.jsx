import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navbar.css';
import FullFeaturedCrudGrid from '../Grid/FullFeaturedCrudGrid';
import Form from './Form';
import MenuPopupState from "../components/MenuPopupState";

const Navbar = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState('');

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
      
    </div>
  );
};

export default Navbar;
