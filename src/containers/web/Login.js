import React, { useState } from 'react'
import { Button, Form, FormField } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';
import Loading from '../../components/Loading';

export default function Login() {
  const [userData, setUserData] = useState({});
  const { userLogin, loadingLogin } = useGlobal();

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    userLogin(userData);
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

        {loadingLogin
          ? <Loading />
          : <Button
            style={{ width: '100%', marginTop: 20 }}
            onClick={handleClick}
            type='submit'
          >
            Login
          </Button>
        }
      </Form>
    </div>
  )
}
