import React, { useState } from 'react'
import { Button, Form, FormField, FormGroup, FormInput } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';

export default function SignUp() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const { userSignUp } = useGlobal();

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    userSignUp(userData);
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
          <FormInput
            onChange={handleChange}
            value={userData.first_name ? userData.first_name : ''}
            fluid 
            label='First name'
            placeholder='First name'
            name='first_name'
          />

          <FormInput
            onChange={handleChange}
            value={userData.last_name ? userData.last_name : ''}
            fluid label='Last name'
            placeholder='Last name'
            name='last_name'
          />
        </FormGroup>

        <FormField>
          <label>Email</label>
          
          <input
            onChange={handleChange}
            value={userData.email ? userData.email : ''}
            placeholder='Email'
            name='email'
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
          onClick={handleClick}
          type='submit'
          style={{ width: '100%', marginTop: 20 }}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  )
}
