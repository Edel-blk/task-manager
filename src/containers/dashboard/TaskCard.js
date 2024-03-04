import React, { useState } from 'react'
import { Icon, List, Popup } from 'semantic-ui-react';
import { useGlobal } from '../../context/UseGlobal';
import { GRAY } from '../../utils/constants';

export default function TaskCard({ task, id }) {
  const { title, description } = task;

  const { setDataDeleteModal, setDataEditModal  } = useGlobal();
  const [showButtons, setShowButtons] = useState(false);

  const popUp = (
    <Popup
      position={'top left'}
      hoverable
      on="click"
      trigger={
        <div style={{ cursor: 'pointer', marginTop: -6 }}>
          <Icon
            style={{
              marginTop: 10,
              cursor: 'pointer',
              color: 'gray'
            }}
            name='ellipsis vertical'
          />
        </div>
      }
    >
        <Popup.Content>
          <List selection>
            <List.Item
              onClick={() => setDataEditModal(true, task)}
            >
              <List.Content><Icon name='edit' />Edit Item</List.Content>
            </List.Item>

            <List.Item
              onClick={() => setDataDeleteModal(true, task)}
            >
              <List.Content><Icon name='trash' />Remove Item</List.Content>
            </List.Item>
          </List>
      </Popup.Content>
      </Popup>
  )
  
  return (
    <div 
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <div style={{ background: GRAY, borderRadius: 5, padding: 10, margin: '10px 0px', display: 'flex', justifyContent: 'space-between', wordWrap: 'break-word' }}>
        <div style={{ wordWrap: 'break-word', overflow: 'hidden' }}>
          <h3>
            {title}
          </h3>

          <p>
            {description}
          </p>
        </div>

        {showButtons
          ? popUp
          : null
        }
      </div>
    </div>
  )
}

