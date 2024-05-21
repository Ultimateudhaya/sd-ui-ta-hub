import React from 'react';
import styled from 'styled-components';
import { FaRegClock, FaTh, FaList } from 'react-icons/fa';

// Styled components
const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #444;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ItemIcon = styled.div`
  margin-right: 10px;
`;

interface DropdownProps {
  items: { name: string, icon: JSX.Element }[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <DropdownContainer>
      {items.map(item => (
        <DropdownItem key={item.name}>
          <ItemIcon>{item.icon}</ItemIcon>
          {item.name}
        </DropdownItem>
      ))}
    </DropdownContainer>
  );
};

export default Dropdown;
