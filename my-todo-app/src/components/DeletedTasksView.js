import React from 'react';

const DeletedTasksView = ({ tasks }) => (
  <div>
    <h2>Deleted Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.deleted)
        .map((task, index) => (
          <li key={index}>
            {task.text} - Deleted
          </li>
        ))}
    </ul>
  </div>
);

export default DeletedTasksView;
