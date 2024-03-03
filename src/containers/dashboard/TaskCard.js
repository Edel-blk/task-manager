import React from 'react'
import { Button, Icon } from 'semantic-ui-react';
import { useGlobal } from '../../context/UseGlobal';
import { WHITE } from '../../utils/constants';

export default function TaskCard({ task }) {
  const { title, description, date, status, _id} = task;

  const { deleteTask, updateTask } = useGlobal();
  
  return (
    <div style={{ background: WHITE, margin: '10px 0px', padding: 10, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', borderRadius: 10 }}>
      <div id={_id} style={{ display: 'flex', margin: 15 }}>
        <div style={{ flex: 3 }}>
          <h3>
            {title}
          </h3>

          <p>
            {description}
          </p>

          <div style={{ color: 'gray' }}>
            {date}
          </div>

          <div>
            {status}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Button
            onClick={async() => await updateTask(task._id, )}
            >
            <Icon color='grey' name='edit outline' />
          </Button>

          <Button 
            onClick={
              async () => {
                if (!window.confirm("Are you sure you want to delete this task?")) return;
                await deleteTask(_id);
              }
            }
            >
            <Icon color='grey' name='trash alternate outline' />
          </Button>
        </div>
      </div>
    </div>
  )
}

