import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ConfirmDialog from '../Grid/ConfirmationDialog';
import fetchDataFromAPI from '../Grid/FetchApi';
import EditToolbar from "../Grid/EditToolbar";
// import "../styles/FullFeaturedCrudGrid.css";



export default function FullFeaturedCrudGrid(props) {
    // eslint-disable-next-line react/prop-types
    const { apiEndpoint } = props;
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [deleteId, setDeleteId] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const dispatch = useDispatch();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const handleOpenSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
    

useEffect(() => {
    async function fetchData() {
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

const handleDeleteClick = (id) => () => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
};


const handleConfirmDelete = async () => {
    try {
        const rowData = rows.find(row => row.id === deleteId);
        if (!rowData) {
            console.error('Row data not found for ID:', deleteId);
            return;
        }

        if (apiEndpoint === 'http://localhost:8080/api/users/') {
            const userId = rowData.userId;
            dispatch(deleteUserOnServer(userId));
            dispatch(deleteUser(userId));
            handleOpenSnackbar('Record deleted successfully!', 'success');

        } else if (apiEndpoint === 'http://localhost:8080/api/candidates/') {
            const candidateId = rowData.candidateId;
            dispatch(deleteCandidateOnServer(candidateId));
            dispatch(deleteCandidate(candidateId));
            handleOpenSnackbar('Record deleted successfully!', 'success');

        } else if (apiEndpoint === 'http://localhost:8080/api/clients/') {
            const clientId = rowData.clientId;
            dispatch(deleteClientOnServer(clientId));
            dispatch(deleteClient(clientId));
            handleOpenSnackbar('Record deleted successfully!', 'success');

        }

        setRows(rows.filter(row => row.id !== deleteId));
    } catch (error) {
        console.error('Error deleting record:', error);
      handleOpenSnackbar('Error deleting record. Please try again.', 'error');

    }
    setOpenConfirmDialog(false);
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

const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
};


const processRowUpdate = (rowUpdate, row) => {
    const newRow = { ...row, ...rowUpdate };
        if (apiEndpoint === 'http://localhost:8080/api/users/') {
        dispatch(updateUser(newRow));

        dispatch(updateUserOnServer(newRow));
        handleOpenSnackbar('Record Updated successfully!', 'success');

        console.log("User updated successfully:", newRow);
    } else if (apiEndpoint === 'http://localhost:8080/api/candidates/') {
        console.log("newcandiaterow",newRow);

    dispatch(updateCandidate(newRow));
        dispatch(updateCandidateOnServer(newRow));
        handleOpenSnackbar('Record Updated successfully!', 'success');

        console.log("Candidate updated successfully:", newRow);
    } else if (apiEndpoint === 'http://localhost:8080/api/clients/') {
        dispatch(updateClient(newRow));
        dispatch(updateClientOnServer(newRow));
        handleOpenSnackbar('Record Updated successfully!', 'success');

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
    { field: 'userId', headerName: 'User ID', width:100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'} ,
    { field: 'firstName', headerName: 'First Name', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'lastName', headerName: 'Last Name', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'username', headerName: 'Username', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'email', headerName: 'Email', width: 140, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'phone', headerName: 'Phone', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'resetToken', headerName: 'Reset Token', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'password', headerName: 'Password', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'isActive', headerName: 'Active', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'currentSessionId', headerName: 'Current Session ID', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'lastLoginTime', headerName: 'Last Login Time', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'createdDate', headerName: 'Created Date', width: 200, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    {
        field: 'actions',
        type: 'actions',
        headerClassName: 'custom-header',
        headerName: 'Actions',
        width: 100,
         headerAlign: 'center', 
         align:'center',
      
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
    { field: 'candidateId', headerName: 'CandidateId', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'candidateEmail', headerName: 'CandidateEmail', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'candidateContact', headerName: 'CandidateContact', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header' },
    { field: 'technology', headerName: 'Technology', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'totalExperience', headerName: 'TotalExperience', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header' },
    { field: 'currentCtc', headerName: 'CurrentCtc', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header' },
    { field: 'expectedCtc', headerName: 'ExpectedCtc', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'noticePeriod', headerName: 'NoticePeriod', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'modeOfWork', headerName: 'ModeOfWork', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'currentLocation', headerName: 'CurrentLocation', width: 100, editable: true, headerAlign: 'center', align:'center' ,headerClassName: 'custom-header'},
    { field: 'candidateStatus', headerName: 'CandidateStatus', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header' },
    { field: 'comments', headerName: 'Comments', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header' },
    { field: 'remarks', headerName: 'Remarks', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'recruiter', headerName: 'Recruiter', width: 100, editable: true, headerAlign: 'center', align:'center',headerClassName: 'custom-header' },
    { field: 'recruitedSource', headerName: 'RecruitedSource', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    { field: 'createdDate', headerName: 'CreatedDate', width: 100, editable: true , headerAlign: 'center', align:'center',headerClassName: 'custom-header'},
    {
         headerAlign: 'center', align:'center',
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        right:0,
        headerClassName: 'custom-header',
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
    { field: 'clientId', align:'center', headerName: 'clientId', width: 100, editable: true,    headerAlign: 'center',    headerClassName: 'custom-header',

},
    { field: 'clientName', align:'center',headerName: 'clientName', width: 100, editable: true ,    headerAlign: 'center',headerClassName: 'custom-header',
},
    { field: 'clientSpocName', align:'center',headerName: 'clientSpocName', width: 100, editable: true,    headerAlign: 'center',headerClassName: 'custom-header',
},
    { field: 'clientSpocContact', align:'center',headerName: 'clientSpocContact', width: 100, editable: true ,    headerAlign: 'center',headerClassName: 'custom-header',
},
    { field: 'clientLocation', align:'center',headerName: 'clientLocation', width: 100, editable: true,    headerAlign: 'center',headerClassName: 'custom-header',
},
    { field: 'createdAt', align:'center',headerName: 'createdAt', width: 100, editable: true,    headerAlign: 'center',headerClassName: 'custom-header',
},
    {
        headerAlign: 'center',
        headerClassName: 'custom-header',
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
} 
    return (
        
        <Box
        

        
        sx={{
            // boxShadow: 2,
            marginBottom:30,
            paddingLeft:30,
            backgroundColor:'white',
            height: 600,
            width: '95%',
            marginTop:5,
            background:'none',
            "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
                height: 39,

              },
                    
                    // lineHeight:2,
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

            <ConfirmDialog
                open={openConfirmDialog}
                setOpen={setOpenConfirmDialog} 
                onConfirm={handleConfirmDelete}
                onClose={handleCloseDialog}
                deleteId={deleteId}
                message="Are you sure you want to delete this row?"
            />

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
