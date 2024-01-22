import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CompletedTasksView = ({ tasks }) => (
  <div className='fraseContainer'>
    <h2>Completed Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.completed)
        .map((task, index) => (
          <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faCheck} style={{ color: '#7FA7E5', marginRight: '10px' }} />
            {task.text} - Completed on: {task.date ? task.date.toLocaleString() : 'N/A'}
          </li>
        ))}
    </ul>
  </div>
);

export default CompletedTasksView;
