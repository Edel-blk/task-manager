import React, { useState } from 'react'
import { Button, Dropdown, Form, FormField, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import { GREEN, RED, STATUS, WHITE } from '../../utils/constants';
import { useGlobal } from '../../context/UseGlobal';

export default function EditModal({open, props, onClose}) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
  });
  const { updateTask } = useGlobal();

  const handleChange = (e, data) => {
    if (data) {
      setTask({ ...task, status: data.value});
    } else {
      setTask({ ...task, [e.target.name]: e.target.value});
    }
  }

  const onClickSubmit = async (e) => {
    e.preventDefault();
    let newValues = {...task};
    Object.keys(task).forEach((key) => {
      const element = task[key];

      if (!element) {
        delete newValues[key];
      }
    });

    updateTask(props._id, newValues);
  }

  return (
    <Modal
        size={'tiny'}
        open={open}
        onClose={onClose}
      >
        <ModalHeader style={{ wordWrap: 'break-word', overflow: 'hidden' }} >Edit Task '{props.title}'</ModalHeader>
        <ModalContent>
          <Form>
            <FormField>
              <label>Title</label>

              <input defaultValue={props.title} name='title' placeholder='title' onChange={handleChange} />
            </FormField>

            <FormField>
              <label>Description</label>

              <input defaultValue={props.description} name='description' placeholder='description' onChange={handleChange} />
            </FormField>

            <FormField>
              <label>Status</label>

              <Dropdown
                selection
                defaultValue={props.status}
                options={STATUS}
                name='status'
                onChange={handleChange}
              />
            </FormField>
          </Form>

          
        </ModalContent>

        <ModalActions>
          <Button style={{ background: RED, color: WHITE }} onClick={onClose}>
            No
          </Button>
          <Button style={{ background: GREEN, color: WHITE }} onClick={onClickSubmit}>
            Yes
          </Button>
        </ModalActions>
      </Modal>
  )
}
