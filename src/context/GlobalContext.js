import { createContext, useState, } from "react";
import { createTaskRequest, getAllTasks, deleteTaskRequest, updateTaskRequest } from "../containers/dashboard/api";
import { login } from "../containers/web/api";
import Loading from "../components/Loading";

export const GlobalContext = createContext({
  task: [],
  userData: {},
  loadingUserData: false,
})

export const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);

  const getTasks = async () => {
    console.log('al hacer la consulta: ',userData);
    const res = await getAllTasks(userData._id)
    const data = await res.json();
    console.log('res: ',data);
    setTasks(data);
  }

  const createTask = async (task) => {
    const taskFormat = {...task, userID: userData._id}
    console.log(taskFormat);
    const res = await createTaskRequest(taskFormat);
    const data = await res.json();
    console.log('que pasa: ',data)
    setTasks([...tasks, data]);
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
    const data = await res.json();
  }

  const userLogin = async (userData) => {
    setLoadingUserData(true);
    try {
      const res = await login(userData);
      if (res.status === 201) {
        const data = await res.json();
        setUserData(data);
        setLoadingUserData(false);
        return true;
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoadingUserData(false);
    }
  }

  return (
    <GlobalContext.Provider value={{ getTasks, tasks, createTask, deleteTask, updateTask, userLogin, userData }}>
      {loadingUserData ? <Loading /> : children}
    </GlobalContext.Provider>
  )
}