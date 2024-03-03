import React, { useEffect } from 'react'
import TaskCard from './TaskCard'
import { Grid } from 'semantic-ui-react';
import { TASKS_STATUS } from '../../utils/constants';
import { useGlobal } from '../../context/UseGlobal';

const { Column } = Grid;

export default function TaskList() {
  const { tasks, getTasks, userData } = useGlobal();

  useEffect(() => {
    const fetchData = async () => {
        await getTasks(userData._id);
    };

    fetchData();
  }, []);

  const pendingTasks = tasks.filter((task) => task.status === TASKS_STATUS.PENDING);
  const progressTasks = tasks.filter((task) => task.status === TASKS_STATUS.IN_PROGRESS);
  const doneTasks = tasks.filter((task) => task.status === TASKS_STATUS.DONE);


  return (
    <div>
      <Grid columns={3} >
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
