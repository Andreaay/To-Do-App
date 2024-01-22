import React from 'react';

const DeletedTasksView = ({ tasks, onRecoverTask }) => (
  <div className='fraseContainer'>
    <h2>Deleted Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.deleted)
        .map((task) => (
          <li key={task.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <button onClick={() => onRecoverTask(task.id)} className='recoverButton'style={{ marginRight: '25px'}}>
              Recover Task
            </button>
            <span style={{ marginLeft: '10px' }}>{task.text}</span>
          </li>
        ))}
    </ul>
  </div>
);

export default DeletedTasksView;
