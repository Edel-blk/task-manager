import { createContext, useEffect, useState, } from "react";
import { createTaskRequest, getAllTasks, deleteTaskRequest, updateTaskRequest } from "../containers/dashboard/api";
import { login, signUp } from "../containers/web/api";
import Loading from "../components/Loading";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const GlobalContext = createContext({
  task: [],
  userData: {},
  loadingUserData: false,
  editModal: false,
  taskToEdit: {},
  addModal: false,
  deleteModal: false,
})

export const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState({});

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
  }, []);

  const handlingErrors = (data) => {
    if (Array.isArray(data.message)) {
      data.message.forEach((e) => {
        toast.error(e, {
          position: "bottom-right"
        });
      })
    } else {
      toast.error(data.message, {
        position: "bottom-right"
      });
    }
  }

  const getTasks = async () => {

    if(!userData._id) {
      setLoadingUserData(true);

      setTimeout(async () => {
        const res = await getAllTasks(userData._id)
        const data = await res.json();
        setTasks(data);
        setLoadingUserData(false);
      }, 2000);
    }

    const res = await getAllTasks(userData._id)
    const data = await res.json();
    setTasks(data);
  }

  const createTask = async (task) => {
    const taskFormat = {...task, userID: userData._id}
    const res = await createTaskRequest(taskFormat);
    const data = await res.json();

    if (data.error) {
      handlingErrors(data);
      return false;
    } else {
      toast.success("Task Created Succesfully!", {
        position: "top-right"
      });
      closeAddModal();
      setTasks([...tasks, data]);
      return true;
    }
  }

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    if (res.status === 204) {
      const newTasks = tasks.filter(task => task._id !== id);
      setTasks(newTasks);
      setDeleteModal(false);

      toast.success("Task Eliminated Succesfully!", {
        position: "top-right"
      });
    }
  }

  const updateTask = async (id, task) => {
    const res = await updateTaskRequest(id, task);
    const data = await res.json();

    if (data.error) {
      handlingErrors(data);
    } else {
      const newTasks = tasks.filter(actualTask => actualTask._id !== id);
      setTasks([...newTasks, data]);
      setEditModal(false);
    }
  }

  const userLogin = async (props) => {
    setLoadingLogin(true);
    const res = await login(props);
    const data = await res.json();

    if (data.error) {
      handlingErrors(data);
    } else {
      setUserData(data);
      Cookies.set('user', JSON.stringify(data));
      navigate('/dashboard');
    }

    setLoadingLogin(false);
  }

  const userSignUp = async (props) => {
    const res = await signUp(props);
    const data = await res.json();

    if (data.error) {
      handlingErrors(data);
    } else {
      setUserData(data);
      navigate('/dashboard');
      Cookies.set('user', JSON.stringify(data));
    }
  }

  const userLogOut = () => {
    setUserData({});
    Cookies.remove('user');
    navigate('/');
  }

  const setDataEditModal = (open, task) => {
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

  const setDataDeleteModal = (open, task) => {
    setDeleteModal(open);
    setTaskToDelete(task);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
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
    addModal,
    setDataDeleteModal,
    closeDeleteModal,
    deleteModal,
    taskToDelete,
    loadingLogin
  }

  return (
    <GlobalContext.Provider value={value}>
      {loadingUserData ? <Loading /> : children}
    </GlobalContext.Provider>
  )
}