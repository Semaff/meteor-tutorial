import React, { useState } from 'react';
import TaskForm from '../components/Task/TaskForm';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/tasks/TasksCollection';
import { userFilter } from '../filters/userFilter';
import TaskList from '../components/Task/TaskList';
import { ITask } from '/imports/types/ITask';
import { pendingOnlyFilter } from '../filters/pendingTodoFilter';

const TasksPage = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => {
    return Meteor.user()
  });

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    if (!user) {
      return { ...noDataAvailable, isLoading: false };
    }

    const handler = Meteor.subscribe("tasks");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter(user) : userFilter(user),
      {
        sort: { createdAt: -1 }
      }
    ).fetch() as ITask[];

    return { tasks, isLoading: false };
  });

  return (
    <>
      <TaskForm />

      <Stack display={"flex"} justifyContent="center" spacing={2} direction="row">
        <Button variant="contained" onClick={() => setHideCompleted(prev => !prev)}>
          {hideCompleted ? "Show All" : "Hide Completed"}
        </Button>
      </Stack>


      {isLoading && (
        <Box className='box'>
          <CircularProgress />
        </Box>
      )}

      <TaskList tasks={tasks} />
    </>
  )
}

export default TasksPage;