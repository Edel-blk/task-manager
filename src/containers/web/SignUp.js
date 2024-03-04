import React, { useState } from 'react'
import { Button, Form, FormField, FormGroup, FormInput } from 'semantic-ui-react'
import { signUp } from './api';
import { WHITE } from '../../utils/constants';

export default function SignUp() {
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    const res = await signUp(userData);
    const data = await res.json();
    setUserData({});
  }

  return (
    <div>
      <div>
        <h2 style={{ textAlign: 'center', fontFamily: 'system-ui', marginBottom: 15 }}>
          SIGN UP
        </h2>
      </div>

      <Form>
        <FormGroup widths='equal'>
          <FormInput onChange={handleChange} value={userData.first_name ? userData.first_name : ''}fluid label='First name' placeholder='First name' name='first_name' />

          <FormInput onChange={handleChange} fluid label='Last name' placeholder='Last name' name='last_name' />
        </FormGroup>

        <FormField>
          <label>Email</label>
          
          <input onChange={handleChange} placeholder='Email' name='email' />
        </FormField>

        <FormField>
          <label>Password</label>

          <input onChange={handleChange} placeholder='Password' name='password'/>
        </FormField>

        <Button onClick={handleClick} type='submit' >Sign Up</Button>
      </Form>
    </div>
  )
}
