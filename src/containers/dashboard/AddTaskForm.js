import React, { useState } from 'react'
import { FormField, Button, Form } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';
import { BOX_SHADOW, WHITE } from '../../utils/constants';

function AddTaskForm() {

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
  }

  return (
    <div style={{ background: WHITE, margin: '45px 0px', padding: 40, boxShadow: BOX_SHADOW, borderRadius: 10 }}>
      <Form>
        <FormField>
          <label>Title</label>

          <input name='title' placeholder='title' onChange={handleChange} />
        </FormField>

        <FormField>
          <label>Description</label>

          <input name='description' placeholder='description' onChange={handleChange} />
        </FormField>

        <Button type='submit' onClick={onClickSubmit} >Submit</Button>
      </Form>
    </div>
  );
}

export default AddTaskForm;