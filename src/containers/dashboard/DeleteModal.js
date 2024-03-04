import React from 'react'
import { Button, Form, FormField, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import { LABELS_STATUS } from '../../utils/constants';
import { useGlobal } from '../../context/UseGlobal';

export default function DeleteModal({open, props, onClose}) {
  const { deleteTask } = useGlobal();

  const onClickSubmit = async (e) => {
    e.preventDefault();
    await deleteTask(props._id);
  }

  return (
    <Modal
        size={'tiny'}
        open={open}
        onClose={onClose}
        dimmer={'blurring'}
      >
        <ModalHeader style={{ wordWrap: 'break-word', overflow: 'hidden' }} >Are you sure you want to delete this task '{props.title}'?</ModalHeader>
        <ModalContent>
          <Form>
            <FormField>
              <label>Description</label>

              <label>{props.description}</label>
            </FormField>

            <FormField>
              <label>Status</label>

              <label>{LABELS_STATUS[props.status]}</label>
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
