import { createContext, useEffect, useState, } from "react";
import { createTaskRequest, getAllTasks, deleteTaskRequest, updateTaskRequest } from "../containers/dashboard/api";
import { login } from "../containers/web/api";
import Loading from "../components/Loading";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext({
  task: [],
  userData: {},
  loadingUserData: false,
  token: ''
})

export const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [token, setToken] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('user');
    const token = Cookies.get('token');
    if (!user) {
      navigate('/')
    } else {
      const formatUser = JSON.parse(user);
      console.log(formatUser);
      setUserData(formatUser);
      setToken(token);
    }
  }, [])

  const getTasks = async () => {

    if(!userData._id) {
      setLoadingUserData(true);

      setTimeout(async () => {
        console.log('Despues del timeout: ', userData);
        const res = await getAllTasks(userData._id, token.token)
        const data = await res.json();
        console.log('res: ',data);
        setTasks(data);
        setLoadingUserData(false);
      }, 2000);
    }

    const res = await getAllTasks(userData._id, userData.token)
    const data = await res.json();
    console.log('res: ',data);
    setTasks(data);
  }

  const createTask = async (task) => {
    console.log('create task: ',userData, token);
    const taskFormat = {...task, userID: userData._id}
    const res = await createTaskRequest(taskFormat, token);
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
    console.log(data);
  }

  const userLogin = async (userData) => {
    setLoadingUserData(true);
    try {
      const res = await login(userData);
      if (res.status === 201) {
        const data = await res.json();
        setUserData(data);
        Cookies.set('user', JSON.stringify(data));
        Cookies.set('token', data.token);
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