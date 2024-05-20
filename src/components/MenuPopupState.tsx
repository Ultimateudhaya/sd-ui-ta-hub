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

export default function MenuPopupState() {
    const navigate = useNavigate();  
    const [email,setEmail]=useState();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); 

    const confirmLogout = () => {
        setLogoutDialogOpen(true);
    }

    useEffect(() => {

        const storedEmail = localStorage.getItem('Email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    
    const handleLogoutConfirm = () => {
        navigate("/Login");
    };
    
    const handleReset=()=>{
        navigate("/reset-password");
    }
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button 
                        style={{color:"darkblue",backgroundColor:"rgb(207, 207, 206)",boxShadow:"none"}}
                        variant="contained" 
                        {...bindTrigger(popupState)}
                    >
                         {email}
                        <IconButton {...bindTrigger(popupState)} size="small">
                            <ArrowDropDownIcon />
                        </IconButton>
                    </Button>
                    
                    <Menu {...bindMenu(popupState)}>
                        {/* <MenuItem onClick={popupState.close}>Profile</MenuItem> */}
                        <MenuItem onClick={handleReset}>
                            Reset Password
                        </MenuItem>
                        <MenuItem onClick={confirmLogout}>Logout</MenuItem>
                    </Menu>
                    <ConfirmDialog 
                        open={logoutDialogOpen} 
                        setOpen={setLogoutDialogOpen} 
                        onConfirm={handleLogoutConfirm}     
                        message="Are you sure you want to logout ?"
                    />
                </React.Fragment>
            )}
        </PopupState>
    );
}
