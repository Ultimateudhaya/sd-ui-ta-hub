import React from 'react';
import "../styles/KanDash.css";

interface GreetingProps {
  name: string;
}

const KanDash: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="dashboard">
    </div>
  );
};

export default KanDash;
