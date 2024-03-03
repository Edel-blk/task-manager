import React from 'react'
import { Button, Icon } from 'semantic-ui-react';
import { useTasks } from './context/UseTasks';

export default function TaskCard({ task }) {
  const { title, description, date, status, _id} = task;

  const { deleteTask, updateTask } = useTasks();
  
  return (
    <div id={_id} style={{ display: 'flex', padding: 10, border: '1px solid gray', borderRadius: 5, boxShadow: '2px 2px green', margin: 15 }}>
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
  )
}

