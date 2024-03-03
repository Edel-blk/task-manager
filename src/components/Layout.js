import React from 'react'
import { Segment, SidebarPushable, SidebarPusher } from 'semantic-ui-react'

export default function Layout({ children, isDashboard }) {
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
            : <div>
              otra cosa
            </div>
          }
          
        </SidebarPusher>
      </SidebarPushable>

      <div style={{ margin: '0 auto',  maxWidth: '100ch', padding: '1rem', lineHeight: 1.5, fontFamily: 'system-ui' }}>
        {children}
      </div>
    </div>
  )
}
