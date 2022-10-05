import React, { useState, FormEvent } from 'react';
import { Meteor } from 'meteor/meteor';
import { Box, Button, Input } from '@mui/material';

const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      return;
    };

    Meteor.call("tasks.insert", text);
    setText("");
  }

  return (
    <Box className='box'>
      <form className='form' onSubmit={handleSubmit}>
        <Input
          color='primary'
          type='text'
          placeholder="Type to add new tasks"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <Button type='submit' variant='contained'>
          Add Task
        </Button>
      </form>
    </Box>
  )
}

export default TaskForm;