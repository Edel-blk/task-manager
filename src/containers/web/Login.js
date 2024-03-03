import React, { useState } from 'react'
import { Button, Form, FormField } from 'semantic-ui-react'
import { login } from './api';
import { WHITE } from '../../utils/constants';

export default function Login() {
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    const res = await login(userData);
    const data = await res.json();
    console.log(data);
    setUserData({});
  }

  return (
    <div style={{ background: WHITE, margin: '100px 0px', padding: 40, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', borderRadius: 10 }}>
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

        <Button onClick={handleClick} type='submit' >Login</Button>
      </Form>
    </div>
  )
}
