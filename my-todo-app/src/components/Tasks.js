import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, onToggleCompletion, onRemove, onRecover, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleUpdate = () => {
    setIsUpdating(false);
    onUpdate(updatedText);
  };

  return (
    <div className='fraseContainer'>
    <li>
      <button onClick={onToggleCompletion} 
      style={{
        border: '1px solid #7FA7E5',
        background: 'transparent',
        outline: 'none',
        cursor: 'pointer',
        color: task.completed ? '#7FA7E5' : 'transparent',
          }}>
        {task.completed ? ' ✔' : '◻️'}
      </button>
      <span style={{ marginLeft: '10px', marginRight: '30px', textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={onRemove}><FontAwesomeIcon icon={faTrash} /></button>
      {task.deleted && <button onClick={onRecover}><FontAwesomeIcon icon={faUndo} /></button>}

      {!isUpdating && <button onClick={() => setIsUpdating(true)}><FontAwesomeIcon icon={faEdit} /></button>}

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
    </div>
  );
};

export default Task;
