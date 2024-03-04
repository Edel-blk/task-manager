import React, { useEffect } from 'react'
import TaskCard from './TaskCard'
import { Grid, Icon } from 'semantic-ui-react';
import { BOX_SHADOW, GRAY, GREEN, ORANGE, TASKS_STATUS, WHITE } from '../../utils/constants';
import { useGlobal } from '../../context/UseGlobal';

const { Column } = Grid;

export default function TaskList() {
  const { tasks, getTasks } = useGlobal();

  useEffect(() => {
    const fetchData = async () => {
        await getTasks();
    };

    fetchData();
  }, []);

  const pendingTasks = tasks.filter((task) => task.status === TASKS_STATUS.PENDING);
  const progressTasks = tasks.filter((task) => task.status === TASKS_STATUS.IN_PROGRESS);
  const doneTasks = tasks.filter((task) => task.status === TASKS_STATUS.DONE);


  return (
    <div style={{ background: WHITE, margin: '45px 0px', padding: 40, boxShadow: BOX_SHADOW, borderRadius: 10 }}>
      <Grid columns={3} >
        <Column>
          <div>
            <Icon name='dot circle' style={{ color: '#574f4fb0' }}/>
            
            <span style={{ fontWeight: 'bold' }}>
              PENDING
            </span>
          </div>

          <div>
            {
              pendingTasks.map((task, i) => {
                return (
                  <TaskCard task={task} id={`${i}-${task._id}`} />
                  )
              })
            }
          </div>
        </Column>

        <Column>
          <div>
            <Icon name='dot circle' style={{ color: ORANGE }} />
            
            <span style={{ fontWeight: 'bold' }}>
              IN PROGRESS
            </span>
          </div>

          <div>
            {
              progressTasks.map((task, i) => {
                return (
                  <TaskCard task={task} id={`${i}-${task._id}`} />
                  )
              })
            }
          </div>
        </Column>

        <Column>
          <div>
            <Icon name='dot circle' style={{ color: GREEN }} />
            
            <span style={{ fontWeight: 'bold' }}>
              DONE
            </span>
          </div>

          <div>
            {
              doneTasks.map((task, i) => {
                return (
                  <TaskCard task={task} id={`${i}-${task._id}`} />
                  )
              })
            }
          </div>
        </Column>
      </Grid>
    </div>
  )
}
