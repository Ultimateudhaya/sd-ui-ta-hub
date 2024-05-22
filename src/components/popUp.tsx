import React from 'react';
import '../styles/popup.css';

interface PopupProps {
    children: React.ReactNode; 
    onClose: () => void;  
}
  

const SimplePopup: React.FC<PopupProps> = ({ onClose, children }) => {
  return (
    <div className="popup-container backdrop" onClick={onClose}>
      <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default SimplePopup;
