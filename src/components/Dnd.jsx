import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/Dnd.css";
import { Card, CardContent, TextField, Button } from '@mui/material';
// import { CgProfile } from "react-icons/cg";
import ConfirmDialog from "../Grid/ConfirmationDialog";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(""); 
  const [deleteItemType, setDeleteItemType] = useState(""); 
  const [showPreview, setShowPreview] = useState(false); 

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/board/columns');
        if (response.ok) {
          const data = await response.json();
-          setColumns(data.map(column => ({
            id: column.id,
            column: column.column,
            title: column.column.toUpperCase(),
            count: 0
          })));
          console.log("columns",columns);
        } else {
          console.error('Failed to fetch columns:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching columns:', error);
      }
    };

    fetchColumns();
  }, []);

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
          setTasks(data);
   
          const updatedTasks = data.map(task => {
            // Check if taskStatus is null, default it to "todo"
            if (!task.taskStatus) {
              return { ...task, taskStatus: "todo" };
            }
            return task;
          });
          setTasks(updatedTasks);
          console.log("task datas", updatedTasks);
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
    setShowPreview(true);
  };

  const handlePreviewClose = () => {
    setShowPreview(false);
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
    setDeleteItemType("column");
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

  return (
    <div className="board-container">
      <div className="header1">
        <h8>Projects / My Kandan Project</h8>
        <h8>KAN Board</h8>
        <div className="search-container">
          <TextField label="Search" variant="outlined" size="small" />
          <Button variant="contained" color="primary">Search</Button>
        </div>
      </div>
      <div className={columns.length > 4 ? "kanboard-container scrollable" : "kanboard-container"}>

      <div className="kanboard">
        
        {columns.map(column => (
          <div key={column.id} className="column" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, column.column)}>
            <div className='cards'>
              <div className="column-header d-flex justify-content-between">
                <h6 className='columnTitle'>{column.title }{"  "}{ column.count}</h6>
                <div className="delete-button" onClick={() => handleDeleteColumn(column.id)}>
                  <span className="bi bi-trash"></span>
                </div>
              </div>
              {tasks.map((task) => (
                (task.taskStatus === column.column) && (
                  <div className="draggable-item" key={task.taskId.toString()} draggable="true" onDragStart={(event) => onDragStart(event, task)}>
                    <Card className='card'>
                      <CardContent >
                        <p className='task-detail d-flex justify-content-between'>Ticket Details: {task.taskId}
                          <div className="delete-task-button" onClick={() => handleDeleteTask(task.taskId)}>
                            <span className="bi bi-trash"></span>
                          </div>
                        </p>
                        <h7 className="getstat">Get started</h7>
                        <div className='mt-1 cardcontent'>
                          {/* <h8 className="taskId">{task.taskStatus}</h8> */}
                          <a href="#">
                            {/* <CgProfile color='black' /> */}
                            <AccountCircleIcon color='primary'/>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}


        <div className="add-button-container">
          <div onClick={handleAddButtonClick}><AddBoxIcon color='primary' sx={{ fontSize: 40 }}/></div>
        </div>
        {showPreview && (
          <div className="kanboard1">
            <Card className='card'>
              <CardContent>
                <TextField
                  label="Enter Status"
                  variant="outlined"
                  size="small"
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                />
                <div className='addBtn'>
                <Button variant="contained" color="primary" onClick={handleAddFormSubmit}>Submit</Button>
                <Button variant="contained" color="primary" onClick={handlePreviewClose}>Cancel</Button>
                </div>
               
              </CardContent>
            </Card>
          </div>
        )}
        {/* Show add form when showAddForm is true and showPreview is false */}
        {showAddForm && !showPreview && (
          <div className="add-form-container">
            <TextField
              label="Enter Status"
              variant="outlined"
              size="small"
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddFormSubmit}>Submit</Button>
          </div>
        )}
      </div>
      </div>

      {/* Confirmation dialog for delete */}
      <ConfirmDialog
        open={deleteConfirmation}
        setOpen={setDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={`Are you sure you want to delete this ${deleteItemType}?`}
      />
    </div>
  );
};

export default Board;
