import React from 'react'
import { Button, Form, FormField, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react'
import { GREEN, LABELS_STATUS, RED, WHITE } from '../../utils/constants';
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
