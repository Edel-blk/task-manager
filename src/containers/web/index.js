import React from 'react'
import Layout from '../../components/Layout'
import Login from './Login'
import SignUp from './SignUp'

export default function Dashboard() {
  return (
    <Layout isDashboard={false}>
      <Login />

      <SignUp />
    </Layout>
  )
}