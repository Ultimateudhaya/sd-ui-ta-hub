// src/Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp, FaRegClock, FaTh, FaList } from 'react-icons/fa';
import Dropdown from '../components/Dropdown';
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

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePhoto = styled.div`
  width: 50px;
  height: 50px;
  background-color: #bbb;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProjectName = styled.h2`
  font-size: 18px;
  margin: 0;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownItems = [
    { name: 'Timeline', icon: <FaRegClock /> },
    { name: 'Board', icon: <FaTh /> },
    { name: 'List items', icon: <FaList /> }
  ];

  return (
    <SidebarContainer className='sidebar'>
      {/* <ProfileContainer>
        <ProfilePhoto />
        <ProjectName>Ta-hub</ProjectName>
      </ProfileContainer> */}
      <MenuItem onClick={toggleDropdown}>
        <MenuText >Planning</MenuText>
        {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
      </MenuItem>
      {isDropdownOpen && <Dropdown items={dropdownItems} />}
      <MenuItem>About</MenuItem>
      <MenuItem>Services</MenuItem>
      <MenuItem>Contact</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
