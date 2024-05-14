"use client";
import React from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowsProp, GridRowModesModel } from '@mui/x-data-grid';

interface EditToolbarProps {
  setRows: (rows: GridRowsProp) => void;
  setRowModesModel: (rowModesModel: GridRowModesModel) => void;
}

const EditToolbar: React.FC<EditToolbarProps> = (props) => {
  const { setRows, setRowModesModel } = props;

  const handleSaveClick = () => {
    setRowModesModel({});
  };

  const handleCancelClick = () => {
    //       setRows((rows) =>
    //   rows.map((row) => ({
    //     ...row,
    //     isNew: false,
    //   }))
    // );
    // setRowModesModel({});
  };
  return (
    
    <ButtonGroup>
      <IconButton color="primary" onClick={handleSaveClick}>
        <SaveIcon />
      </IconButton>
      <IconButton color="secondary" onClick={handleCancelClick}>
        <CancelIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default EditToolbar;