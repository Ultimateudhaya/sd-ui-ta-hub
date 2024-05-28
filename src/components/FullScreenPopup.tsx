import React from 'react';
import { Modal, Button, TextField, Typography, Box, IconButton, Select, MenuItem, FormControl, InputLabel, Menu, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Clear, Visibility, ThumbUp, Share, NoEncryption, AttachFile, Add } from '@mui/icons-material';
import "../styles/FullScreenPopup.css";
interface FullScreenPopupProps {
  show: boolean;
  handleClose: () => void;
}

const FullScreenPopup: React.FC<FullScreenPopupProps> = ({ show, handleClose }) => {
  const [status, setStatus] = React.useState('');
  const [pinnedField, setPinnedField] = React.useState('');
  const [inProgress, setInProgress] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activityFilter, setActivityFilter] = React.useState('all');

  const handleInProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handlePinnedFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPinnedField(event.target.value);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActivityFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string,
  ) => {
    if (newFilter !== null) {
      setActivityFilter(newFilter);
    }
  };

  return (
    <Modal open={show} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ bgcolor: 'background.paper', width: '90vw', height: '85vh', padding: 4, position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Clear />
        </IconButton>
        {/* Navbar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 2, alignItems: 'center' }}>
          <a href="https://example.com/kaa-1" target="_blank" rel="noopener noreferrer">kan-1 / <a href="https://example.com/kan-2" target="_blank" rel="noopener noreferrer">kan-2</a></a>
          
          <Button variant="text" startIcon={<NoEncryption />}>No Restriction</Button>
          <Button variant="text" startIcon={<Visibility />}>Watch Options</Button>
          <Button variant="text" startIcon={<ThumbUp />}>Vote Options</Button>
          <Button variant="text" startIcon={<Share />}>Share Actions</Button>
        </Box>
        {/* Main content */}
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          {/* Left section */}
          <Box sx={{ flex: 1, paddingRight: 2 }}>
            <Typography variant="h6" gutterBottom>
              Connect Your Tools
            </Typography>
          
            {/* Buttons Row */}
            <Box sx={{ display: 'flex', gap: 1, marginTop: 2 ,paddingTop:2}} >
              <Button className='GreyBtn' variant="contained" startIcon={<AttachFile />}>Attach</Button>
              <Button className='GreyBtn' variant="contained" startIcon={<Add />}>Add a Child Issue</Button>
              <Button className='GreyBtn'variant="contained" onClick={handleMenuClick}>Link Issue</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Link 1</MenuItem>
                <MenuItem onClick={handleMenuClose}>Link 2</MenuItem>
                <MenuItem onClick={handleMenuClose}>Link 3</MenuItem>
              </Menu>
              
            </Box>
          
            <Typography variant="h6" gutterBottom sx={{paddingTop:5}}>
              Description
            </Typography>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            {/* Create Activity Heading */}
            <Typography variant="h6" gutterBottom>
              Create Activity
            </Typography>
            {/* Activity Filter */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 ,paddingTop:7}}>
              <Typography variant="subtitle1">
                Activity
              </Typography>
              <Typography variant="body2">
                Show:
              </Typography>
              <ToggleButtonGroup
                value={activityFilter}
                exclusive
                onChange={handleActivityFilterChange}
                aria-label="activity filter"
              >
                <ToggleButton value="all" aria-label="all">
                  All
                </ToggleButton>
                <ToggleButton value="comments" aria-label="comments">
                  Comments
                </ToggleButton>
                <ToggleButton value="history" aria-label="history">
                  History
                </ToggleButton>
                <ToggleButton value="newest" aria-label="newest">
                  Newest first
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {/* Show All Comments and History Buttons */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
                Save Changes
              </Button>
            </Box> */}
          </Box>
          {/* Right section */}
          <Box sx={{ flex: 1, paddingLeft: 2 }}>
            <Box sx={{  padding: 2, marginBottom: 2 }}>
            
            <Box sx={{display:'flex'}}>
              <FormControl sx={{width:150, marginRight:10,    }}>
                <InputLabel id="inprogress-label">In Progress</InputLabel>
                <Select
                  labelId="inprogress-label"
                  id="inprogress"
                  value={inProgress}
                  label="In Progress"
                  onChange={handleInProgressChange}
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value="Todo">Todo</MenuItem>
                  <MenuItem value="In-progress">In-progress</MenuItem>
                  <MenuItem value="In-review">In-review</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              {/* Actions */}

              <FormControl sx={{width:150,height:50}}>
                <InputLabel id="status-label">Actions</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={status}
                  label="Actions"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Action 1">Action 1</MenuItem>
                  <MenuItem value="Action 2">Action 2</MenuItem>
                  <MenuItem value="Action 3">Action 3</MenuItem>
                </Select>
              </FormControl>
              {/* Pinned Fields */}

              </Box>


              
              <Box sx={{marginTop:10}}>
                <Typography variant="h6" gutterBottom>
                  Pinned Fields
                </Typography>
                <Typography gutterBottom>
                  Click on the next to a field label to start pinning.
                </Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="pinned-label">Pinned Fields</InputLabel>
                  <Select
                    labelId="pinned-label"
                    id="pinned"
                    value={pinnedField}
                    label="Pinned Fields"
                    onChange={handlePinnedFieldChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Assignee">Assignee</MenuItem>
                    <MenuItem value="Labels">Labels</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Reporter">Reporter</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {/* Details section */}
            <Box sx={{  padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography gutterBottom>
                Assignee, Labels, Parent, Reporter with dropdown
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FullScreenPopup;
