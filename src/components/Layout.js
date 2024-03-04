import React from 'react'
import { Button, Segment, SidebarPushable, SidebarPusher } from 'semantic-ui-react'
import { useGlobal } from '../context/UseGlobal'
import { RED, WHITE } from '../utils/constants';

export default function Layout({ children, isDashboard, logOut }) {
  const { userData, userLogOut } = useGlobal();

  const logOutButton = (
    <Button style={{ background: RED, color: WHITE }} onClick={userLogOut}>
      Log Out
    </Button>
  )

  return (
    <div>
      <SidebarPushable as={Segment}>
        <SidebarPusher>
          {
            !isDashboard
            ? <Segment basic style={{ display: 'flex'}}>
              <h2 style={{ textAlign: 'center', fontFamily: 'system-ui', marginBottom: 15 }}>
                TASK MANAGER
              </h2>
              </Segment>
            : <Segment basic style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center', fontFamily: 'system-ui', marginBottom: 15 }}>
                  WELCOME {userData.first_name} {userData.last_name}
                </h2>

                <div style={{ textAlign: 'center', fontFamily: 'system-ui', marginBottom: 15 }}>
                  {logOut ? logOutButton : null}
                </div>
            </Segment>
          }
          
        </SidebarPusher>
      </SidebarPushable>

      <div style={{ margin: '0 auto',  maxWidth: '130ch', padding: '1rem', lineHeight: 1.5, fontFamily: 'system-ui' }}>
        {children}
      </div>
    </div>
  )
}
