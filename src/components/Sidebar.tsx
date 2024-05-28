import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTh, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}

// Styled components
const SidebarContainer = styled.div`
  width: 206px;
  height: 95vh;
  color: black;
  background-color: lightwhite;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  border-left: 1px solid rgb(232, 230, 230);
`;

const MenuItem = styled.div<{ active: boolean }>`
  margin: 8px 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: ${({ active }) => (active ? '#1679AB' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border-radius:2px;


  &:hover {
    background-color: #1679AB;
    color: white;
    border-radius:2px;
  }
`;


const MenuText = styled.span`
  flex: 1;
  text-align: left;
`;

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const [activeComponent, setActive] = useState<string>('board');

  const handleMenuItemClick = (component: string) => {
    setActive(component);
    setActiveComponent(component);
  };

  return (
    <SidebarContainer className="sidebar">

      <MenuItem active={activeComponent === 'board'} onClick={() => handleMenuItemClick('board')}>
        <FaTh />
        <MenuText className="board plan ">Board</MenuText>
      </MenuItem>
      <MenuItem active={activeComponent === 'timeline'} onClick={() => handleMenuItemClick('timeline')}>
        <FaList />
        <MenuText className="board plan">Timeline</MenuText>
      </MenuItem>
      <MenuItem active={activeComponent === 'list'} onClick={() => handleMenuItemClick('list')}>
        <FaList />
        <MenuText className="board plan">List</MenuText>
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
