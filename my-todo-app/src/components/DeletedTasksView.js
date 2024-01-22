import React from 'react';

const DeletedTasksView = ({ tasks, onRecoverTask }) => (
  <div>
    <h2>Deleted Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.deleted)
        .map((task) => (
          <li key={task.id}>
            {task.text} - Deleted
            <button onClick={() => onRecoverTask(task.id)} className='recoverButton'>Recover</button>
          </li>
        ))}
    </ul>
  </div>
);

export default DeletedTasksView;
