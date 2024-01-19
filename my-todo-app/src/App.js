import React, { useState, useEffect } from 'react';
import CompletedTasksView from './components/CompletedTasksView';
import DeletedTasksView from './components/DeletedTasksView';
import Task from './components/Tasks';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
// eslint-disable-next-line no-unused-vars
const [showCompleted, setShowCompleted] = useState(true);
// eslint-disable-next-line no-unused-vars
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
      setTasks([...tasks, { text: newTask, completed: false, deleted: false, date: null }]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].deleted = true;
    setTasks(updatedTasks);
  };

  const recoverTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].deleted = false;
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    updatedTasks[index].date = updatedTasks[index].completed ? new Date() : null;
    setTasks(updatedTasks);
  };

  const updateTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks
            .filter((task) => !task.deleted)
            .map((task, index) => (
              <Task
                key={index}
                task={task}
                onToggleCompletion={() => toggleTaskCompletion(index)}
                onRemove={() => removeTask(index)}
                onRecover={() => recoverTask(index)}
                onUpdate={(newText) => updateTask(index, newText)}
              />
            ))}
        </ul>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>

      {showCompleted && <CompletedTasksView tasks={tasks} />}

      {showDeleted && <DeletedTasksView tasks={tasks} />}
    </div>
  );
};

export default App;
