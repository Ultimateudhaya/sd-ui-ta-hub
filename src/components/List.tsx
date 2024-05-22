import  { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/Dnd.css";
import { Card, CardContent, TextField, Button, colors } from '@mui/material';
import { CgProfile } from "react-icons/cg";
import ConfirmDialog from "../Grid/ConfirmationDialog";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';


const List = () => {
  const [tasks, setTasks] = useState([]);
  const [rows, setRows] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // State to control delete confirmation dialog
  const [deleteItemId, setDeleteItemId] = useState(""); // State to store the ID of the item to delete
  const [deleteItemType, setDeleteItemType] = useState(""); // State to store the type of item to delete


  const onDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks/');
        if (response.ok) {
          const data = await response.json();
          setRows(data);
          console.log("ROws",data);
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching tasks:', error);
      }
    };

    fetchTasks();

  }, []);

  const onDrop = async (event, status) => {
    event.preventDefault();
    const droppedTask = JSON.parse(event.dataTransfer.getData("task"));
    const updatedTasks = tasks.map(task => {
      if (task.taskId === droppedTask.taskId) {
        return { ...task, taskStatus: status };
      }
      return task;
    });
    setTasks(updatedTasks);
    event.dataTransfer.clearData();

    try {
      await fetch(`http://localhost:8080/api/tasks/task/${droppedTask.taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskStatus: status }),
      });
      console.log('Task status updated successfully.');
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleAddFormSubmit = async () => {
    setShowAddForm(false);
    setNewTaskStatus("");
    try {
      const response = await fetch('http://localhost:8080/api/board/column', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column: newTaskStatus }),
      });
      if (response.ok) {
        console.log('Column added successfully.');
        const newColumnId = `column-${columns.length}`;
        setColumns([...columns, { id: newColumnId, column: newTaskStatus, title: newTaskStatus.toUpperCase(), count: 0 }]);
      } else {
        console.error('Failed to add column:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding column:', error);
    }
  };

  const handleDeleteColumn = async (id) => {
    setDeleteConfirmation(true);
    setDeleteItemId(id);
    setDeleteItemType("Board");
  };

  const handleDeleteTask = async (taskId) => {
    setDeleteConfirmation(true);
    setDeleteItemId(taskId);
    setDeleteItemType("task");
  };

  const handleConfirmDelete = async () => {
    if (deleteItemType === "column") {
      try {
        const response = await fetch(`http://localhost:8080/api/board/column/${deleteItemId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Column deleted successfully.');
          const updatedColumns = columns.filter(column => column.id !== deleteItemId);
          setColumns(updatedColumns);
        } else {
          console.error('Failed to delete column:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while deleting column:', error);
      }
    } else if (deleteItemType === "task") {
      try {
        const response = await fetch(`http://localhost:8080/api/tasks/task/${deleteItemId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Task deleted successfully.');
          const updatedTasks = tasks.filter(task => task.taskId !== deleteItemId);
          setTasks(updatedTasks);
        } else {
          console.error('Failed to delete task:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while deleting task:', error);
      }
    }
    setDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteItemId("");
    setDeleteItemType("");
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
    { field: 'lastUpdated', headerName: 'LastUpdated', width: 200, editable: true, headerAlign: 'center', align:'center' }



    
  ];
  
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
   <DataGrid
        rowHeight={35}
        rows={rows}
        columns={columns}
        getRowId={(r) => r.taskId}

        editMode="row"
        // rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
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
