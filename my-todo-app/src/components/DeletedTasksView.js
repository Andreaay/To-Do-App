import React from 'react';

const DeletedTasksView = ({ tasks, onRecoverTask }) => (
  <div className='fraseContainer'>
    <h2>Deleted Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.deleted)
        .map((task) => (
          <li key={task.id} style={{ marginLeft: '10px', marginRight: '30px' }}>
            <span style={{ marginRight: '10px' }}></span>
            {task.text} - Deleted
            <button onClick={() => onRecoverTask(task.id)} className='recoverButton'>Recover</button>
          </li>
        ))}
    </ul>
  </div>
);

export default DeletedTasksView;
