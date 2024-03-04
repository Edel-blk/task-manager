import React, { useState } from 'react'
import { FormField, Button, Form, Modal, ModalHeader, ModalContent, ModalActions } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';
import { GREEN, WHITE } from '../../utils/constants';

function AddTaskModal({open, onClose}) {

  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const { createTask } = useGlobal();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value});
  }

  const onClickSubmit = async (e) => {
    e.preventDefault();
    createTask(task);
    onClose();
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
      style={{ width: 550 }}
    >
      <ModalHeader>Create Task</ModalHeader>

      <ModalContent image>
        <Form style={{ width: '100%' }}>
          <FormField>
            <label>Title</label>

            <input name='title' placeholder='title' onChange={handleChange} />
          </FormField>

          <FormField>
            <label>Description</label>

            <input name='description' placeholder='description' onChange={handleChange} />
          </FormField>

        </Form>
      </ModalContent>

      <ModalActions>
        <Button style={{ background: GREEN, color: WHITE }} type='submit' onClick={onClickSubmit} >Create</Button>
      </ModalActions>
    </Modal>
  );
}

export default AddTaskModal;