import React, { useState, useEffect } from 'react';
import CompletedTasksView from './components/CompletedTasksView';
import DeletedTasksView from './components/DeletedTasksView';
import Task from './components/Tasks';
import './App.css';
import { getStoredTasks, saveTasksToLocalStorage } from './components/LocalStorageTasks';

const App = () => {
  const [tasks, setTasks] = useState(getStoredTasks());
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showDeleted, setShowDeleted] = useState(true);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
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
    <div className='outsideContainer'>
      <div className='insideContainer'>
        <div className='tasksContainer'>
          <h1>One Task at a Time</h1>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            aria-label="New Task Input"
            style={{
              width: '89%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              opacity: '0.6',
            }}
          />
          <button onClick={addTask} className="toggleButton">
            Add
          </button>
          <ul>
            {tasks
              .filter((task) => !task.deleted)
              .map((task) => (
                <Task
                  onRecover={() => recoverTask(task.id)}
                  onUpdate={(newText) => updateTask(task.id, newText)}
                  onToggleCompletion={() => toggleTaskCompletion(task.id)}
                  key={task.id}
                  task={task}
                  onRemove={() => removeTask(task.id)}
                />
              ))}
          </ul>
        </div>

        <div className='completedContainer'>
          <label>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="toggleButton"
              style={{
                backgroundColor: showCompleted ? '#7FA7E5' : '#C2C9F2',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Show Completed Tasks
            </button>
          </label>
          {showCompleted && <CompletedTasksView tasks={tasks} />}
        </div>

        <div className='deletedContainer'>
          <label>
            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className="toggleButton"
              style={{
                backgroundColor: showDeleted ? '#7FA7E5' : '#C2C9F2',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Show Deleted Tasks
            </button>
          </label>
          {showDeleted && <DeletedTasksView tasks={tasks} onRecoverTask={recoverTask} />}
        </div>
      </div>
    </div>
  );
};

export default App;
