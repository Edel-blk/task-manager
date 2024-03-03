import React from 'react'
import Layout from '../../components/Layout'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'
import { TaskProvider } from './context/TaskContext'

export default function Dashboard() {
  return (
    <TaskProvider>
      <Layout>
        <AddTaskForm />

        <TaskList />
      </Layout>
    </TaskProvider>
  )
}
