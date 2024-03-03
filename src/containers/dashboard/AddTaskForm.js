import React, { useState } from 'react'
import { FormField, Button, Form } from 'semantic-ui-react'
import { useTasks } from './context/UseTasks';

function AddTaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const { createTask } = useTasks();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value});
  }

  const onClickSubmit = async (e) => {
    e.preventDefault();
    createTask(task);
  }

  return (
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
  );
}

export default AddTaskForm;