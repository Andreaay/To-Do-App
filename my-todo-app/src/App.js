import React, { useState, useEffect } from 'react';
import CompletedTasksView from './components/CompletedTasksView';
import DeletedTasksView from './components/DeletedTasksView';
import Task from './components/Tasks';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showDeleted, setShowDeleted] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, deleted: false, date: null },
      ]);
      setNewTask('');
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, deleted: true } : task
    );
    setTasks(updatedTasks);
  };

  const recoverTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, deleted: false } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed, date: !task.completed ? new Date() : null }
        : task
    );
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks
            .filter((task) => !task.deleted)
            .map((task) => (
              <Task
                key={task.id}
                task={task}
                onToggleCompletion={() => toggleTaskCompletion(task.id)}
                onRemove={() => removeTask(task.id)}
                onRecover={() => recoverTask(task.id)}
                onUpdate={(newText) => updateTask(task.id, newText)}
              />
            ))}
        </ul>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        <label>
          Show Completed Tasks
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
        {showCompleted && <CompletedTasksView tasks={tasks} />}
      </div>

      <div>
        <label>
          Show Deleted Tasks
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
          />
        </label>
        {showDeleted && <DeletedTasksView tasks={tasks} onRecoverTask={recoverTask} />}
      </div>
    </div>
  );
};

export default App;
