import React from 'react';

const Task = ({ task, onToggleCompletion, onRemove, onRecover, onUpdate }) => {
  return (
    <li>
      <button onClick={onToggleCompletion}>{task.completed ? 'Uncomplete' : 'Complete'}</button>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
      <button onClick={onRemove}>Delete</button>
      {task.deleted && <button onClick={onRecover}>Recover</button>}
      <button onClick={onUpdate}>Update</button>
      {task.completed && <span>Completed on: {task.date.toLocaleString()}</span>}
    </li>
  );
};

export default Task;
