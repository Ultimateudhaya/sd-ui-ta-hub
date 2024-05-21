import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/Dnd.css";
import { Card, CardContent, TextField, Button } from '@mui/material';
import { CgProfile } from "react-icons/cg";

const Board = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks/');
        if (response.ok) {
          const data = await response.json();
          const tasksWithDefaultStatus = data.map(task => ({
            ...task,
            taskStatus: task.taskStatus || "todo" 
          }));
          setTasks(tasksWithDefaultStatus);
          console.log("tasks", tasksWithDefaultStatus);
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const onDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

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

  return (
    <div className="board-container">
      <div className="header1">
        <h4>Projects / My Kandan Project</h4>
        <h8>KAN Board</h8>
        <div className="search-container">
          <TextField label="Search" variant="outlined" size="small" />
          <Button variant="contained" color="primary">Search</Button>
        </div>
      </div>
      <div className="kanboard">
        <div className="column" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, "todo")}>
          <div className='cards'>
            <h5>TODO</h5>
            {tasks.map((task) => (
              (task.taskStatus === "todo") && (
                <div className="draggable-item" key={task.taskId.toString()} draggable="true" onDragStart={(event) => onDragStart(event, task)}>
                  <Card>
                    <CardContent>
                      <p>Ticket Details: {task.taskId}</p>
                      <h7>Get started</h7>
                      <div className='mt-4 cardcontent'>
                        <h8 className="taskId">Task ID : {task.taskStatus}</h8>
                        <a href="#">
                          <CgProfile color='black' size={25} />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="column" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, "in-progress")}>
          <div className='cards'>
            <h5>IN-PROGRESS</h5>
            {tasks.map((task) => (
              (task.taskStatus === "in-progress") && (
                <div className="draggable-item" key={task.taskId.toString()} draggable="true" onDragStart={(event) => onDragStart(event, task)}>
                  <Card>
                    <CardContent>
                      <p>Ticket Details: {task.taskId}</p>
                      <h7>Get started</h7>
                      <div className='mt-4 cardcontent'>
                        <h8 className="taskId">Task ID : {task.taskStatus}</h8>
                        <a href="#">
                          <CgProfile color='black' />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="column" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, "in-review")}>
          <div className='cards'>
            <h5>IN-REVIEW</h5>
            {tasks.map((task) => (
              (task.taskStatus === "in-review") && ( // Update this line
                <div className="draggable-item" key={task.taskId.toString()} draggable="true" onDragStart={(event) => onDragStart(event, task)}>
                  <Card>
                    <CardContent>
                      <p>Ticket Details: {task.taskId}</p>
                      <h7>Get started</h7>
                      <div className='mt-4 cardcontent'>
                        <h8 className="taskId">Task ID : {task.taskStatus}</h8> 
                        <a href="#">
                          <CgProfile color='black' />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="column" onDragOver={(event) => onDragOver(event)} onDrop={(event) => onDrop(event, "completed")}>
          <div className='cards'>
            <h5>COMPLETED</h5>
            {tasks.map((task) => (
              (task.taskStatus === "completed") && ( // Update this line
                <div className="draggable-item" key={task.taskId.toString()} draggable="true" onDragStart={(event) => onDragStart(event, task)}>
                  <Card>
                    <CardContent>
                      <p>Ticket Details: {task.taskId}</p>
                      <h7>Get started</h7>
                      <div className='mt-4 cardcontent'>
                        <h8 className="taskId">Task ID : {task.taskStatus}</h8> 
                        <a href="#">
                          <CgProfile color='black' />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
