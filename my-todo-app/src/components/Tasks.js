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
      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <button
          onClick={onToggleCompletion}
          style={{
            border: '1px solid #7FA7E5',
            background: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            color: task.completed ? '#7FA7E5' : 'transparent',
            marginRight: '10px',
          }}
          aria-label={`Toggle Completion for "${task.text}"`}
        >
          {task.completed ? '✔' : '◻️'}
        </button>
        <span
          style={{
            flex: 1,
            marginRight: '30px',
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.text}
        </span>
        <button onClick={onRemove} aria-label={`Remove Task "${task.text}"`}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        {task.deleted && (
          <button onClick={onRecover} aria-label={`Recover Task "${task.text}"`}>
            <FontAwesomeIcon icon={faUndo} />
          </button>
        )}

        {!isUpdating && (
          <button onClick={() => setIsUpdating(true)} aria-label={`Edit Task "${task.text}"`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}

        {isUpdating && (
          <>
            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <button onClick={handleUpdate} aria-label={`Accept Update for Task "${task.text}"`}>
              Accept
            </button>
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
