import React from 'react';

const CompletedTasksView = ({ tasks }) => (
  <div className='fraseContainer'>
    <h2>Completed Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.completed)
        .map((task, index) => (
          <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}></span>
            {task.text} - Completed on: {task.date ? task.date.toLocaleString() : 'N/A'}
          </li>
        ))}
    </ul>
  </div>
);

export default CompletedTasksView;