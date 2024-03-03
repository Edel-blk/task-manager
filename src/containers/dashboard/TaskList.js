import React from 'react'
import TaskCard from './TaskCard'
import { Grid } from 'semantic-ui-react';
import { TASKS_STATUS } from '../../utils/constants';
import { useTasks } from './context/UseTasks';

const { Column } = Grid;

export default function TaskList() {
  const { tasks } = useTasks();

  const pendingTasks = tasks.filter((task) => task.status === TASKS_STATUS.PENDING);
  const progressTasks = tasks.filter((task) => task.status === TASKS_STATUS.IN_PROGRESS);
  const doneTasks = tasks.filter((task) => task.status === TASKS_STATUS.DONE);


  return (
    <div>
      <Grid columns={3} divided >
        <Column>
          {
            pendingTasks.map((task) => {
              return (
                <TaskCard task={task} id={task._id} />
                )
              })
          }
        </Column>

        <Column>
          {
            progressTasks.map((task) => {
              return (
                <TaskCard task={task} id={task._id} />
                )
              })
            }
        </Column>

        <Column>
          {
            doneTasks.map((task) => {
              return (
                <TaskCard task={task} id={task._id} />
                )
              })
            }
        </Column>
      </Grid>
    </div>
  )
}
