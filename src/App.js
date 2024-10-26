import React, { useState, useEffect } from 'react';
import TaskForm from './controller/TaskForm';
import TaskList from './controller/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (task) => {
    const updatedTask = await updateTask(currentTask._id, task);
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
  };

  const clearCurrentTask = () => {
    setCurrentTask(null);
  };

  const handleSubmit = (task) => {
    if (currentTask) {
      handleUpdateTask(task);
    } else {
      handleCreateTask(task);
    }
  };

  return (
    <div className="app">
      <h1>Task Management Application</h1>
      <TaskForm currentTask={currentTask} onSubmit={handleSubmit} clearCurrentTask={clearCurrentTask} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
