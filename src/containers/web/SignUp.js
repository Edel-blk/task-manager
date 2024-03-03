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
    console.log(data);
    setUserData({});
  }

  return (
    <div style={{ background: WHITE, padding: 40, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', borderRadius: 10 }}>
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
