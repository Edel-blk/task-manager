import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import { BLUE_PLUS, BOX_SHADOW, WHITE } from '../../utils/constants';

export default function LandingPage() {

  const [openLogin, setOpenLogin] = useState(true);

  const handleClick = () => {
    setOpenLogin(!openLogin);
  }

  let text = "Don't have an account? ";

  if (!openLogin) {
    text = "If you already have an account "
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 460, background: WHITE, margin: '100px 0px', padding: 40, boxShadow: BOX_SHADOW, borderRadius: 10 }}>
        <div>
          { openLogin
            ? <Login />
            : <SignUp />
          }
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <span>{text}</span>

          <span onClick={handleClick} style={{ color: BLUE_PLUS, cursor: 'pointer' }}>
            { openLogin ? 'Sign Up' : 'Login' }
          </span>
        </div>
      </div>
    </div>
  )
}
