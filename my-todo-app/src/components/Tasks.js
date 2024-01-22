import React, { useState } from 'react';

const Task = ({ task, onToggleCompletion, onRemove, onRecover, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleUpdate = () => {
    setIsUpdating(false);
    onUpdate(updatedText);
  };

  return (
    <li>
      <button onClick={onToggleCompletion}>
        {task.completed ? '✅' : '◻️'}
      </button>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={onRemove}>Delete</button>
      {task.deleted && <button onClick={onRecover}>Recover</button>}

      {!isUpdating && <button onClick={() => setIsUpdating(true)}>Update</button>}

      {isUpdating && (
        <>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button onClick={handleUpdate}>Accept</button>
        </>
      )}

      {task.completed && task.date && (
        <span>Completed on: {task.date.toLocaleString()}</span>
      )}
    </li>
  );
};

export default Task;
