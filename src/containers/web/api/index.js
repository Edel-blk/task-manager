import { API_URL } from '../../../utils/constants';

export const login = (userData) => {
  console.log(userData);
  return (
    fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json'
      }
    })
  )
}

export const signUp = (userData) => {
  console.log(userData);
  return (
    fetch(`${API_URL}/users/sign-up`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json'
      }
    })
  )
}