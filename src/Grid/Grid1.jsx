import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useDispatch } from 'react-redux';
import { setUsers } from '../GlobalRedux/Features/usersSlice';
import { setClients } from '../GlobalRedux/Features/clientsSlice';

import { setCandidates } from '../GlobalRedux/Features/candidatesSlice';

import { updateUser, deleteUser } from '../GlobalRedux/Features/usersSlice';
import { updateCandidate, deleteCandidate } from '../GlobalRedux/Features/candidatesSlice';
import { updateClient, deleteClient } from '../GlobalRedux/Features/clientsSlice';
import { updateUserOnServer, deleteUserOnServer } from '../GlobalRedux/Features/usersSlice';
import { updateCandidateOnServer, deleteCandidateOnServer } from '../GlobalRedux/Features/candidatesSlice';
import { updateClientOnServer, deleteClientOnServer } from '../GlobalRedux/Features/clientsSlice';

import '../styles/Grid1.css';



    async function fetchDataFromAPI(apiEndpoint) {
        try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
    
        const rowsWithIds = data.map((row, index) => ({
            ...row,
            id: index + 1,
        }));
    
        return rowsWithIds;
        } catch (error) {
        console.error('Error fetching data:', error);
        return [];
        }
    }
    
    function EditToolbar(props) {
        // eslint-disable-next-line react/prop-types
        const { setRows } = props;
    
        const handleClick = async () => {
            const id = randomId();
            const newEmptyRow = { id, name: '', age: '', isNew: true };
        
            // Update local state
            setRows((oldRows) => [...oldRows, newEmptyRow]);
        
            // Dispatch action to add new row to Redux store
            // dispatch(addNewUser(newEmptyRow));
        
            // Add new row to the server
            try {
                const response = await fetch('http://localhost:8080/api/users/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEmptyRow),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to add new record on the server');
                }
        
                console.log('New record added successfully');
            } catch (error) {
                console.error('Error adding new record:', error);
                // Handle error, if needed
            }
        };
        

    return (
        <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
        </Button>
        </GridToolbarContainer>
    );
    }

    export default function FullFeaturedCrudGrid(props) {
        // eslint-disable-next-line react/prop-types
        const { apiEndpoint } = props;
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    // const [pinnedColumns, setPinnedColumns] = useState({  right: ['Actions'] });

    const dispatch = useDispatch();
 

    useEffect(() => {
        async function fetchData() {
            // Fetch data from the database
            const data = await fetchDataFromAPI(apiEndpoint);
            if (apiEndpoint === 'http://localhost:8080/api/users/') {
                dispatch(setUsers(data));
                console.log("datas",data);
            } else if (apiEndpoint === 'http://localhost:8080/api/clients/') {
                dispatch(setClients(data));
            } else if (apiEndpoint === 'http://localhost:8080/api/candidates/') {
                dispatch(setCandidates(data));
            }
            setRows(data);
        }

        fetchData();

    }, [dispatch, apiEndpoint]);


   
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
      
      
    };

    const handleDeleteClick = (id) => async () => {
        try {
            const rowData = rows.find(row => row.id === id);
            if (!rowData) {
                console.error('Row data not found for ID:', id);
                return;
            }

            if (apiEndpoint === 'http://localhost:8080/api/users/') {
                const userId = rowData.userId;
                dispatch(deleteUserOnServer(userId));
                dispatch(deleteUser(userId));
            } else if (apiEndpoint === 'http://localhost:8080/api/candidates/') {
                const candidateId = rowData.candidateId;
                dispatch(deleteCandidateOnServer(candidateId));
                dispatch(deleteCandidate(candidateId));
            } else if (apiEndpoint === 'http://localhost:8080/api/clients/') {
                const clientId = rowData.clientId;
                dispatch(deleteClientOnServer(clientId));
                dispatch(deleteClient(clientId));
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
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



    const processRowUpdate = (rowUpdate, row) => {
        const newRow = { ...row, ...rowUpdate };
            if (apiEndpoint === 'http://localhost:8080/api/users/') {
            dispatch(updateUser(newRow));

            dispatch(updateUserOnServer(newRow));

            console.log("User updated successfully:", newRow);
        } else if (apiEndpoint === 'http://localhost:8080/api/candidates/') {
            dispatch(updateCandidate(newRow));
            dispatch(updateCandidateOnServer(newRow));
            console.log("Candidate updated successfully:", newRow);
        } else if (apiEndpoint === 'http://localhost:8080/api/clients/') {
            dispatch(updateClient(newRow));
            dispatch(updateClientOnServer(newRow));

            console.log("Client updated successfully:", newRow);
        }
    
        return newRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    let columns= [];

    if (apiEndpoint === 'http://localhost:8080/api/users/') {
        columns = [
        { field: 'userId', headerName: 'User ID', width:100, editable: true } ,
        { field: 'firstName', headerName: 'First Name', width: 100, editable: true },
        { field: 'lastName', headerName: 'Last Name', width: 100, editable: true },
        { field: 'username', headerName: 'Username', width: 100, editable: true },
        { field: 'email', headerName: 'Email', width: 140, editable: true },
        { field: 'phone', headerName: 'Phone', width: 100, editable: true },
        { field: 'resetToken', headerName: 'Reset Token', width: 100, editable: true },
        { field: 'password', headerName: 'Password', width: 100, editable: true },
        { field: 'isActive', headerName: 'Active', width: 100, editable: true },
        { field: 'currentSessionId', headerName: 'Current Session ID', width: 100, editable: true },
        { field: 'lastLoginTime', headerName: 'Last Login Time', width: 100, editable: true },
        { field: 'createdDate', headerName: 'Created Date', width: 200, editable: true },
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
        { field: 'candidateId', headerName: 'CandidateId', width: 100, editable: true },
        { field: 'candidateName', headerName: 'CandidateName', width: 100, editable: true },
        { field: 'candidateEmail', headerName: 'CandidateEmail', width: 100, editable: true },
        { field: 'candidateContact', headerName: 'CandidateContact', width: 100, editable: true },
        { field: 'technology', headerName: 'Technology', width: 100, editable: true },
        { field: 'totalExperience', headerName: 'TotalExperience', width: 100, editable: true },
        { field: 'currentCtc', headerName: 'CurrentCtc', width: 100, editable: true },
        { field: 'expectedCtc', headerName: 'ExpectedCtc', width: 100, editable: true },
        { field: 'noticePeriod', headerName: 'NoticePeriod', width: 100, editable: true },
        { field: 'modeOfWork', headerName: 'ModeOfWork', width: 100, editable: true },
        { field: 'currentLocation', headerName: 'CurrentLocation', width: 100, editable: true },
        { field: 'candidateStatus', headerName: 'CandidateStatus', width: 100, editable: true },
        { field: 'comments', headerName: 'Comments', width: 100, editable: true },
        { field: 'remarks', headerName: 'Remarks', width: 100, editable: true },
        { field: 'recruiter', headerName: 'Recruiter', width: 100, editable: true },
        { field: 'recruitedSource', headerName: 'RecruitedSource', width: 100, editable: true },
        { field: 'createdDate', headerName: 'CreatedDate', width: 100, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            position:'sticky',
            right:0,
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
        { field: 'clientId', headerName: 'clientId', width: 100, editable: true },
        { field: 'clientName', headerName: 'clientName', width: 100, editable: true },
        { field: 'clientSpocName', headerName: 'clientSpocName', width: 100, editable: true },
        { field: 'clientSpocContact', headerName: 'clientSpocContact', width: 100, editable: true },
        { field: 'clientLocation', headerName: 'clientLocation', width: 100, editable: true },
        { field: 'createdAt', headerName: 'createdAt', width: 100, editable: true },
        {
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
    } 
        return (
            <Box
            sx={{
                
                marginTop: 13,
                marginLeft: 5,
                height: 600,
                width: '95%',
                
                lineHeight:2,
                '& .actions': {
                    color: 'text.secondary',
                    position: 'sticky',
                    right: 0,
                    background: 'white',
                    zIndex: 1,
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                '& .MuiDataGrid-scrollbar': {
                    '&::-webkit-scrollbar': {
                        width: '5px',
                        height: '2px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                    },
                },
            }}
        >
            <DataGrid
                rowHeight={35}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                // pinnedColumns={pinnedColumns}
                components={{
                    Toolbar: EditToolbar,
                }}
            />
        </Box>
    );
    }
