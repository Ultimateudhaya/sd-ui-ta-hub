// src/Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp, FaRegClock, FaTh, FaList } from 'react-icons/fa';
import Dropdown from '../components/Dropdown';
import "../styles/Sidebar.css";
import { Link } from 'react-router-dom';


interface SidebarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}
// Styled components
const SidebarContainer = styled.div`
  width: 206px;
  height: 95vh;
  color: black;
  background-color:white;
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

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const handleBoardClick = () => {
    setActiveComponent('board');
  };

  const handleTimelineClick = () => {
    setActiveComponent('timeline');
  };
  const handleListClick = () => {
    setActiveComponent('list');
  };

  return (
   <SidebarContainer className='sidebar'>
          <MenuItem className='plan1'>PLANNING</MenuItem>

      <MenuItem className="menuItem" onClick={handleBoardClick}>
        <FaTh />
        <MenuText className="board plan">Board</MenuText>
      </MenuItem>
      <MenuItem onClick={handleTimelineClick}>
        <FaList />
        <MenuText className="board plan">Timeline</MenuText>
      </MenuItem>
      <MenuItem  onClick={handleListClick}>
        <FaList />
        <MenuText className="board plan">List</MenuText>
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
