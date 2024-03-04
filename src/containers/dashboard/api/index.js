import { API_URL } from '../../../utils/constants';

export const createTaskRequest = (task, token) => {
  return (
    fetch(`${API_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
  )
}

export const getAllTasks = (id, token) => {
  return (
    fetch(`${API_URL}/tasks/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
  )
}

export const deleteTaskRequest = (id) => {
  return (
    fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
  )
}

export const updateTaskRequest = (id, task) => {
  return (
    fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json'
      }
    })
  )
}

