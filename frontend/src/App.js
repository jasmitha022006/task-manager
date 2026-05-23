import './App.css';

import Navbar from './components/Navbar';
import TaskCard from './components/TaskCard';

import { useState, useEffect } from 'react';

import axios from 'axios';

function App() {

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "https://task-manager-backend-36hm.onrender.com/tasks"
      );

      setTasks(response.data);

    } catch (error) {

      console.log(
        "Error Fetching Tasks",
        error
      );

    }
  };

  // LOAD TASKS WHEN PAGE LOADS
  useEffect(() => {

    fetchTasks();

  }, []);

  // ADD TASK
  const addTask = async () => {

    if(newTask === ""){
      return;
    }

    try {

      await axios.post(
        "https://task-manager-backend-36hm.onrender.com/tasks",
        {
          title: newTask
        }
      );

      fetchTasks();

      setNewTask("");

    } catch (error) {

      console.log(
        "Error Adding Task",
        error
      );

    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `https://task-manager-backend-36hm.onrender.com/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(
        "Error Deleting Task",
        error
      );

    }
  };

  // COMPLETE TASK
  const completeTask = async (id) => {

    try {

      await axios.put(
        `https://task-manager-backend-36hm.onrender.com/tasks/${id}`,
        {
          completed: true
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(
        "Error Updating Task",
        error
      );

    }
  };

  return (

    <div>

      <Navbar />

      <div className="container">

        <h1>
          Task Management Application
        </h1>

        {/* TASK SUMMARY */}

        <div className="task-summary">

          <div className="summary-card">

            <h2>
              {tasks.length}
            </h2>

            <p>Total Tasks</p>

          </div>

          <div className="summary-card">

            <h2>
              {
                tasks.filter(
                  (task) => task.completed
                ).length
              }
            </h2>

            <p>Completed</p>

          </div>

          <div className="summary-card">

            <h2>
              {
                tasks.filter(
                  (task) => !task.completed
                ).length
              }
            </h2>

            <p>Pending</p>

          </div>

        </div>

        {/* TASK INPUT */}

        <div className="task-input">

          <input
            type="text"

            placeholder="Enter task"

            value={newTask}

            onChange={(e) =>
              setNewTask(e.target.value)
            }
          />

          <button onClick={addTask}>
            Add Task
          </button>

        </div>

        {/* TASK LIST */}

        {
          tasks.length === 0 ? (

            <div className="empty-state">

              <h2>No Tasks Yet 📋</h2>

              <p>
                Add your first task to get started!
              </p>

            </div>

          ) : (

            tasks.map((task) => (

              <TaskCard

                key={task._id}

                id={task._id}

                title={task.title}

                status={
                  task.completed
                  ? "Completed"
                  : "Pending"
                }

                deleteTask={deleteTask}

                completeTask={completeTask}
              />

            ))

          )
        }

      </div>

    </div>
  );
}

export default App;