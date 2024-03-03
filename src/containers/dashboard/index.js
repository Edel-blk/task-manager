import React from 'react'
import Layout from '../../components/Layout'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'

export default function Dashboard() {
  return (
    <Layout isDashboard >
      <AddTaskForm />

      <TaskList />
    </Layout>
  )
}
