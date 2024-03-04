import React, { useState } from 'react'
import { Button, Form, FormField } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { userLogin } = useGlobal();

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    const succesfull = userLogin(userData);
    if (succesfull) {
      navigate('/dashboard')
    }
    setUserData({});
  }

  return (
    <div>
      <div>
        <h2 style={{ textAlign: 'center', fontFamily: 'system-ui', marginBottom: 15 }}>
          LOGIN
        </h2>
      </div>

      <Form>
        <FormField>
          <label>Email</label>
          
          <input 
            onChange={handleChange}
            value={userData.email ? userData.email : ''}
            name='email'
            placeholder='email'
            />
        </FormField>

        <FormField>
          <label>Password</label>

          <input
            onChange={handleChange}
            value={userData.password ? userData.password : ''}
            placeholder='Password'
            name='password'
          />
        </FormField>

        <Button
          style={{ width: '100%', marginTop: 20 }}
          onClick={handleClick}
          type='submit'
        >
          Login
        </Button>
      </Form>
    </div>
  )
}
