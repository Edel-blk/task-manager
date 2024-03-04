import { createContext, useEffect, useState, } from "react";
import { createTaskRequest, getAllTasks, deleteTaskRequest, updateTaskRequest } from "../containers/dashboard/api";
import { login, signUp } from "../containers/web/api";
import Loading from "../components/Loading";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext({
  task: [],
  userData: {},
  loadingUserData: false,
  editModal: false,
  taskToEdit: {},
  addModal: false,
})

export const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [addModal, setAddModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('user');
    if (!user) {
      navigate('/')
    } else {
      const formatUser = JSON.parse(user);
      setUserData(formatUser);
      navigate('/dashboard');
    }
  }, [])

  const getTasks = async () => {

    if(!userData._id) {
      setLoadingUserData(true);

      setTimeout(async () => {
        console.log('Despues del timeout: ', userData);
        const res = await getAllTasks(userData._id)
        const data = await res.json();
        console.log('res: ',data);
        setTasks(data);
        setLoadingUserData(false);
      }, 2000);
    }

    const res = await getAllTasks(userData._id)
    const data = await res.json();
    console.log('res: ',data);
    setTasks(data);
  }

  const createTask = async (task) => {
    console.log('create task: ',userData);
    const taskFormat = {...task, userID: userData._id}
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
    const newTasks = tasks.filter(actualTask => actualTask._id !== id);
    setTasks([...newTasks, data]);
  }

  const userLogin = async (props) => {
    setLoadingUserData(true);
    try {
      const res = await login(props);
      if (res.status === 201) {
        const data = await res.json();
        setUserData(data);
        Cookies.set('user', JSON.stringify(data));
        setLoadingUserData(false);
        return true;
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoadingUserData(false);
    }
  }

  const userSignUp = async (props) => {
    const res = await signUp(props);
    const data = await res.json();
    console.log('response: ',data);
    setUserData(data);
    navigate('/dashboard');
    Cookies.set('user', JSON.stringify(data));
  }

  const userLogOut = () => {
    setUserData({});
    Cookies.remove('user');
    navigate('/');
  }

  const setDataEditModal = (open, task) => {
    console.log('Se clickea')
    setEditModal(open);
    setTaskToEdit(task);
  }

  const closeEditModal = () => {
    setEditModal(false);
  }

  const setDataAddModal = (open) => {
    setAddModal(open);
  }

  const closeAddModal = () => {
    setAddModal(false);
  }

  const value = {
    getTasks,
    tasks,
    createTask,
    deleteTask,
    updateTask,
    userLogin,
    userSignUp,
    userLogOut,
    userData,
    setDataEditModal,
    taskToEdit,
    editModal,
    closeEditModal,
    setDataAddModal,
    closeAddModal,
    addModal
  }

  return (
    <GlobalContext.Provider value={value}>
      {loadingUserData ? <Loading /> : children}
    </GlobalContext.Provider>
  )
}