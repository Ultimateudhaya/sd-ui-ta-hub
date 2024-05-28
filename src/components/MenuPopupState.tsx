import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from "react-router-dom";
import ConfirmDialog from '../Grid/ConfirmationDialog';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../styles/MenuPopupState.css';
import FullScreenPopup from './FullScreenPopup'; // Import the FullScreenPopup component
import InvitePopup from './InvitePopup'; // Import the InvitePopup component

export default function MenuPopupState() {
    const navigate = useNavigate();  
    const [email, setEmail] = useState();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); 
    const [showInvitePopup, setShowInvitePopup] = useState(false); // State for managing the invite popup visibility

    const confirmLogout = () => {
        setLogoutDialogOpen(true);
    }

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleLogoutConfirm = () => {
        navigate("/Login");
    };
    
    const handleReset = () => {
        navigate("/reset-password");
    }

    const openInvitePopup = () => {
        setShowInvitePopup(true);
    };

    const closeInvitePopup = () => {
        setShowInvitePopup(false);
    };

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button 
                        style={{color:"grey",backgroundColor:"rgb(207, 207, 206)",boxShadow:"none",background:"none",textTransform:"lowercase"}}
                        variant="contained" 
                        {...bindTrigger(popupState)}
                    >
                         {email}
                        <IconButton {...bindTrigger(popupState)}  className='arrow' size="small">
                            <ArrowDropDownIcon />
                        </IconButton>
                    </Button>
                    
                    <Menu {...bindMenu(popupState)} className='dropDown'>
                        <MenuItem onClick={handleReset}>
                            Reset Password
                        </MenuItem>
                        <MenuItem onClick={openInvitePopup}>Send Invite</MenuItem>
                        <MenuItem onClick={confirmLogout}>Logout</MenuItem>
                    </Menu>
                    <ConfirmDialog 
                        open={logoutDialogOpen} 
                        setOpen={setLogoutDialogOpen} 
                        onConfirm={handleLogoutConfirm}     
                        message="Are you sure you want to logout ?"
                    />
                    <InvitePopup show={showInvitePopup} handleClose={closeInvitePopup} />
                </React.Fragment>
            )}
        </PopupState>
    );
}
