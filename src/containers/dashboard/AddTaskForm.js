import React, { useState } from 'react'
import { FormField, Button, Form } from 'semantic-ui-react'
import { useGlobal } from '../../context/UseGlobal';
import { WHITE } from '../../utils/constants';

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
    <div style={{ background: WHITE, margin: '100px 0px', padding: 40, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', borderRadius: 10 }}>
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