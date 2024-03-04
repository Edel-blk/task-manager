import React from 'react'
import Layout from '../../components/Layout'
import TaskList from './TaskList'
import EditModal from './EditModal'
import { useGlobal } from '../../context/UseGlobal'
import { Icon } from 'semantic-ui-react'
import AddTaskModal from './AddTaskModal'
import DeleteModal from './DeleteModal'

export default function Dashboard() {
  const { editModal, taskToEdit, closeEditModal, addModal, closeAddModal, setDataAddModal, deleteModal, taskToDelete, closeDeleteModal } = useGlobal();

  return (
    <Layout isDashboard logOut >
      <div>
        <button className='button-36' onClick={() => setDataAddModal(true)}>
          <Icon name='plus' /> Add New Task
        </button>
      </div>

      <TaskList />

      <AddTaskModal open={addModal} onClose={closeAddModal} />
      <EditModal open={editModal} props={taskToEdit} onClose={closeEditModal} />
      <DeleteModal open={deleteModal} props={taskToDelete} onClose={closeDeleteModal}/>
    </Layout>
  )
}
