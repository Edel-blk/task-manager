import React, { useState } from 'react'
import { Button, Dropdown, Form, FormField, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import { STATUS } from '../../utils/constants';
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

    onClose();
    updateTask(props._id, newValues);
  }

  return (
    <Modal
        size={'tiny'}
        open={open}
        onClose={onClose}
        dimmer={'blurring'}
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
          <Button negative onClick={onClose}>
            No
          </Button>
          <Button positive onClick={onClickSubmit}>
            Yes
          </Button>
        </ModalActions>
      </Modal>
  )
}
