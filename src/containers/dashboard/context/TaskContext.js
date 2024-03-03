import { createContext, useState, useEffect } from "react";
import { createTaskRequest, getAllTasks, deleteTaskRequest, updateTaskRequest } from "../api";

export const TaskContext = createContext({
  task: [],
})

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks()
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const createTask = async (task) => {
    console.log(task);
    const res = await createTaskRequest(task);
    const data = await res.json();
    setTasks([...tasks, data]);
    console.log(data);
  }

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    if (res.status === 204) {
      const newTasks = tasks.filter(task => task._id !== id);
      setTasks(newTasks);
    }
  }

  const updateTask = async (id, task) => {
    const res = await updateTaskRequest(id, task);
    const data = await res.json;
    console.log(data);
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  )
}