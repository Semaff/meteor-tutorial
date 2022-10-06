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
import { pendingOnlyFilter } from '../filters/pendingTodoFilter';
import Navbar from '../components/Navbar/Navbar';

const TasksPage = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => {
    return Meteor.user()
  });

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!user) {
      return { ...noDataAvailable, isLoading: false };
    }

    const handler = Meteor.subscribe("tasks");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    let filter;
    if (hideCompleted) {
      filter = pendingOnlyFilter(user);
    } else {
      filter = userFilter(user);
    }

    const tasks = TasksCollection.find(filter, { sort: { createdAt: -1 } }).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter(user)).count();
    return { tasks, pendingTasksCount, isLoading: false };
  });

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`;

  return (
    <>
      <Navbar
        user={user}
        pendingTasksTitle={pendingTasksTitle}
      />

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