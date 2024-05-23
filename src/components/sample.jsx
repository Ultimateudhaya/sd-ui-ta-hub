import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp, FaRegClock, FaTh, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../styles/Sidebar.css";

// Styled components
const SidebarContainer = styled.div`
  width: 200px;
  height: 95vh;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
`;

const MenuItem = styled.div`
  margin: 20px 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  &:hover {
    background-color: #555;
  }
`;

const MenuText = styled.span`
  flex: 1;
  text-align: left;
`;

const Sidebar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true); // Set to true to show dropdown by default

  const dropdownItems = [
    { name: 'Timeline', icon: <FaRegClock />, path: '/timeline' },
    { name: 'Board', icon: <FaTh />, path: '/board' },
    { name: 'List items', icon: <FaList />, path: '/list' }
  ];

  return (
    <SidebarContainer className='sidebar'>
      <MenuItem onClick={() => setIsDropdownOpen(true)}>
        <MenuText>Planning</MenuText>
        {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
      </MenuItem>
      {isDropdownOpen && (
        <div>
          {dropdownItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <MenuItem>
                {item.icon}
                <MenuText>{item.name}</MenuText>
              </MenuItem>
            </Link>
          ))}
        </div>
      )}
      <Link to="/about"><MenuItem>About</MenuItem></Link>
      <Link to="/services"><MenuItem>Services</MenuItem></Link>
      <Link to="/contact"><MenuItem>Contact</MenuItem></Link>
    </SidebarContainer>
  );
};

export default Sidebar;
