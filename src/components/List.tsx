"use client";
import  { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/Dnd.css";

import ConfirmDialog from "../Grid/ConfirmationDialog";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const List = () => {
  const [tasks, setTasks] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const handleOpenSnackbar = (message, severity) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
  };
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks/');
        if (response.ok) {
          const data = await response.json();
          setRows(data);
          console.log("Rows",data);
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching tasks:', error);
      }
    };

    fetchTasks();

  }, []);

 
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    event.defaultMuiPrevented = true;
    }
};

const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    console.log("Edit clicked");

};

const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log("save clicked");

    handleOpenSnackbar('Record saved successfully!', 'success');
  
};

const handleDeleteClick = (id) => () => {
    setDeleteId(id);
    console.log("delete clicked");
    // setOpenConfirmDialog(true);
};

   
const handleCancelClick = (id) => () => {
  setRowModesModel({
  ...rowModesModel,
  [id]: { mode: GridRowModes.View, ignoreModifications: true },
  });

  const editedRow = rows.find((row) => row.id === id);
  if (editedRow.isNew) {
  setRows(rows.filter((row) => row.id !== id));
  }
};
  let columns = [
    { field: 'taskId', headerName: 'TaskId', width:100, editable: true , headerAlign: 'center', align:'center'} ,
    { field: 'jobId', headerName: 'JobId', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'jobTitle', headerName: 'JobTitle', width: 100, editable: true , headerAlign: 'center', align:'center'},
    { field: 'roleType', headerName: 'RoleType', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'modeOfWork', headerName: 'ModeOfWork', width: 140, editable: true, headerAlign: 'center', align:'center' },
    { field: 'workLocation', headerName: 'WorkLocation', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'clientBudget', headerName: 'ClientBudget', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'assignedBudget', headerName: 'AssignedBudget', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'primaryAssignee', headerName: 'PrimaryAssignee', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'taskStatus', headerName: 'TaskStatus', width: 100, editable: true, headerAlign: 'center', align:'center',    cellClassName: 'super-app-theme--cell',
  },
    { field: 'secondaryAssignee', headerName: 'SecondaryAssignee', width: 100, editable: true, headerAlign: 'center', align:'center' },
    { field: 'backlogs', headerName: 'Backlogs', width: 200, editable: true, headerAlign: 'center', align:'center' },
    { field: 'description', headerName: 'Description', width: 200, editable: true, headerAlign: 'center', align:'center' },
    { field: 'createdAt', headerName: 'CreatedAt', width: 200, editable: true, headerAlign: 'center', align:'center' },
    { field: 'lastUpdated', headerName: 'LastUpdated', width: 200, editable: true, headerAlign: 'center', align:'center' },
    {
      headerAlign: 'center',
       align:'center',
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      position:'relative',
      cellClassName: 'actions',
      
      getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
          return [
          <GridActionsCellItem
              key="first"
              icon={<SaveIcon />}
              label="Save"
              sx={{
              color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
              key="second"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
          />,
          ];
      } else {
          return [
          <GridActionsCellItem
              key="third"
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
          />,
          <GridActionsCellItem
              key="fourth"
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
          />,
          ];
      }
      },
  },




    
  ];


  const processRowUpdate = (rowUpdate, row) => {
    const newRow = { ...row, ...rowUpdate };
     

    return newRow;
};

    
const handleRowModesModelChange = (newRowModesModel) => {
  setRowModesModel(newRowModesModel);
};


  return (
    
    <Box
            

            
    sx={{
        boxShadow: 2,
        height: 600,
        width: '94%',
        paddingLeft:10,
        marginTop:5,
   
          
    }}
>


<Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={() => setSnackbarOpen(false)}
>
    <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
    >
        {snackbarMessage}
    </MuiAlert>
</Snackbar>

   <DataGrid
        rowHeight={35}
        checkboxSelection
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        getRowId={(r) => r.taskId}

        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        // pinnedColumns={pinnedColumns}
        // components={{
        //     Toolbar: EditToolbar,
        // }}
    />
</Box>
);
};

export default List;
