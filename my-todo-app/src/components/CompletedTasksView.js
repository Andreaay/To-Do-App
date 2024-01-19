import React from 'react';

const CompletedTasksView = ({ tasks }) => (
  <div>
    <h2>Completed Tasks</h2>
    <ul>
      {tasks
        .filter((task) => task.completed)
        .map((task, index) => (
          <li key={index}>
            {task.text} - Completed on: {task.date ? task.date.toLocaleString() : 'N/A'}
          </li>
        ))}
    </ul>
  </div>
);

export default CompletedTasksView;