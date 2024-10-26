// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  // Check if the task prop is defined
  if (!task) {
    return null; // Optionally render nothing or a placeholder
  }

  // Destructure task properties safely
  const { title, description, status } = task;

  return (
    <div className={`task-item ${status}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Status: {status}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
