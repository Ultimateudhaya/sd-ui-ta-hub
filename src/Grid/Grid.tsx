"use client";
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

// import './Grid.css';
// import { updateCandidate } from '../GlobalRedux/Features/candidatesSlice'; 
// import {updateClient} from '../GlobalRedux/Features/clientsSlice';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';

import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomCity,
} from '@mui/x-data-grid-generator';

import { setUsers } from '../GlobalRedux/Features/usersSlice';
import { setClients } from '../GlobalRedux/Features/clientsSlice';
import { setCandidates } from '../GlobalRedux/Features/candidatesSlice';

interface Candidate {
  candidateId: number;
}
interface FullFeaturedCrudGridProps {
  apiEndpoint: string;
}

async function fetchDataFromAPI(apiEndpoint: string): Promise<GridRowModel[]> {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    const rowsWithIds = data.map((row: any, index: number) => ({
      ...row,
      id: index + 1, 
    }));

    return rowsWithIds;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid(props: FullFeaturedCrudGridProps) {
    const dispatch = useDispatch();

  const { apiEndpoint } = props;
  const [rows, setRows] = React.useState<GridRowModel[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [currentApi, setCurrentApi] = React.useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const usersData = await fetchDataFromAPI('http://localhost:8080/api/users/');
      const clientsData = await fetchDataFromAPI('http://localhost:8080/api/clients/');
      const candidatesData = await fetchDataFromAPI('http://localhost:8080/api/candidates/');

      dispatch(setUsers(usersData));
      dispatch(setClients(clientsData));
      dispatch(setCandidates(candidatesData));
    }

    fetchData();
  }, [dispatch, apiEndpoint]);

  

  const handleLoadButtonClick = (apiEndpoint: string) => {
    setCurrentApi(apiEndpoint);
  };


  
  React.useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromAPI(apiEndpoint);
      setRows(data);
    }
    fetchData();
  }, [apiEndpoint]); 


  React.useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromAPI(currentApi);
      setRows(data);
    }
    fetchData();
  }, [currentApi]); 

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

 
  const handleSaveClick = (id: GridRowId) => async () => {
    console.log("row called");
    try {
      const editedRow = rows.find((row) => row.id === id);
      if (!editedRow) {
        console.log("row not found");
        throw new Error('Row not found');
      }
  
      // Dispatch an action to update the Redux store with the edited row data
    //   dispatch(updateCandidate({ id: editedRow.id, newData: editedRow }));
      console.log("row edited called");
  
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  
  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      const response = await fetch(`${currentApi}/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete row');
      }
  
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };
  
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  let columns: GridColDef[] = [];
  if (apiEndpoint === 'http://localhost:8080/api/users/') {
    columns = [
      { field: 'userId', headerName: 'User ID', width: 180, editable: true },
      { field: 'firstName', headerName: 'First Name', width: 180, editable: true },
      { field: 'lastName', headerName: 'Last Name', width: 180, editable: true },
      { field: 'username', headerName: 'Username', width: 180, editable: true },
      { field: 'email', headerName: 'Email', width: 180, editable: true },
      { field: 'phone', headerName: 'Phone', width: 180, editable: true },
      { field: 'resetToken', headerName: 'Reset Token', width: 180, editable: true },
      { field: 'password', headerName: 'Password', width: 180, editable: true },
      { field: 'isActive', headerName: 'Active', width: 180, editable: true },
      { field: 'currentSessionId', headerName: 'Current Session ID', width: 180, editable: true },
      { field: 'lastLoginTime', headerName: 'Last Login Time', width: 180, editable: true },
      { field: 'createdDate', headerName: 'Created Date', width: 180, editable: true },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
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
  }  else if (apiEndpoint === 'http://localhost:8080/api/candidates/') {
    columns = [
      { field: 'candidateId', headerName: 'CandidateId', width: 180, editable: true },
      { field: 'candidateName', headerName: 'CandidateName', width: 180, editable: true },
      { field: 'candidateEmail', headerName: 'CandidateEmail', width: 180, editable: true },
      { field: 'candidateContact', headerName: 'CandidateContact', width: 180, editable: true },
      { field: 'technology', headerName: 'Technology', width: 180, editable: true },
      { field: 'totalExperience', headerName: 'TotalExperience', width: 180, editable: true },
      { field: 'currentCtc', headerName: 'CurrentCtc', width: 180, editable: true },
      { field: 'expectedCtc', headerName: 'ExpectedCtc', width: 180, editable: true },
      { field: 'noticePeriod', headerName: 'NoticePeriod', width: 180, editable: true },
      { field: 'modeOfWork', headerName: 'ModeOfWork', width: 180, editable: true },
      { field: 'currentLocation', headerName: 'CurrentLocation', width: 180, editable: true },
      { field: 'candidateStatus', headerName: 'CandidateStatus', width: 180, editable: true },
      { field: 'comments', headerName: 'Comments', width: 180, editable: true },
      { field: 'remarks', headerName: 'Remarks', width: 180, editable: true },
      { field: 'recruiter', headerName: 'Recruiter', width: 180, editable: true },
      { field: 'recruitedSource', headerName: 'RecruitedSource', width: 180, editable: true },
      { field: 'createdDate', headerName: 'CreatedDate', width: 180, editable: true },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
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
  } 
  else if (apiEndpoint === 'http://localhost:8080/api/clients/') {
    columns = [
      { field: 'clientId', headerName: 'clientId', width: 180, editable: true },
      { field: 'clientName', headerName: 'clientName', width: 180, editable: true },
      { field: 'clientSpocName', headerName: 'clientSpocName', width: 180, editable: true },
      { field: 'clientSpocContact', headerName: 'clientSpocContact', width: 180, editable: true },
      { field: 'clientLocation', headerName: 'clientLocation', width: 180, editable: true },
      { field: 'createdAt', headerName: 'createdAt', width: 180, editable: true },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
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
  } 

  return (
    <Box 
      sx={{
        marginTop:10,
        height: 600,
        width: '95%',
        marginLeft:5,
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {/* <Button onClick={() => handleLoadButtonClick('http://localhost:8080/api/candidates/')}>
        Load Candidates
      </Button>
      <Button onClick={() => handleLoadButtonClick('http://localhost:8080/api/clients/')}>
        Load Clients
      </Button>
      <Button onClick={() => handleLoadButtonClick('http://localhost:8080/api/users/')}>
        Load Users
      </Button> */}
      
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
  