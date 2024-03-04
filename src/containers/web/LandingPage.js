import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import { BOX_SHADOW, WHITE } from '../../utils/constants';

export default function LandingPage() {

  const [openLogin, setOpenLogin] = useState(false);

  const handleClick = () => {
    setOpenLogin(!openLogin);
  }

  return (
    <div style={{ background: WHITE, margin: '100px 0px', padding: 40, boxShadow: BOX_SHADOW, borderRadius: 10 }}>
      <div>
        { openLogin
          ? <Login />
          : <SignUp />
        }
      </div>

      <p onClick={handleClick}>
        { openLogin ? 'Sign Up' : 'Login' }
      </p>
    </div>
  )
}
