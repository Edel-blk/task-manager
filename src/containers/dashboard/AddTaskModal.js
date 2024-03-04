import React, { useState } from 'react'
import { FormField, Button, Form, Modal, ModalHeader, ModalContent, ModalActions } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';
import { GREEN, WHITE } from '../../utils/constants';

const INITIAL_STATE = {
  title: '',
  description: ''
}

function AddTaskModal({open, onClose}) {

  const [task, setTask] = useState({title: '',  description: ''});

  const { createTask } = useGlobal();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value});
  }

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const succesfully = await createTask(task);
    if (succesfully) setTask(INITIAL_STATE);
  }

  const disabledButton = !task.title.length || !task.description.length;

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
            <label>Title *</label>

            <input value={task.title} name='title' placeholder='title' onChange={handleChange} />
          </FormField>

          <FormField>
            <label>Description *</label>

            <input value={task.description} name='description' placeholder='description' onChange={handleChange} />
          </FormField>

        </Form>
      </ModalContent>

      <ModalActions>
        <Button disabled={disabledButton} style={{ background: GREEN, color: WHITE }} type='submit' onClick={onClickSubmit} >Create</Button>
      </ModalActions>

      <div style={{ textAlign: 'right', padding: 10, marginRight: 10 }}>
        * required
      </div>
    </Modal>
  );
}

export default AddTaskModal;