import React, { useState } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import TaskForm from './Task/TaskForm';
import LoginForm from './Auth/LoginForm';
import Navbar from './Navbar/Navbar';
import TaskList from './Task/TaskList';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { TasksCollection } from '../api/tasks/TasksCollection';

export const App = () => {
    const [hideCompleted, setHideCompleted] = useState(false);
    const user = useTracker(() => Meteor.user());

    const hideCompletedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

    /* "useTracker" is something like "subscribe" in Redux */
    const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
        if (!Meteor.user()) {
            return noDataAvailable;
        }

        const handler = Meteor.subscribe("tasks");
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const tasks = TasksCollection.find(
            hideCompleted ? pendingOnlyFilter : userFilter,
            {
                sort: { createdAt: -1 }
            }
        ).fetch();
        const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
        return { tasks, pendingTasksCount };
    })

    const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`;

    return (
        <div className="app">
            <Navbar
                user={user}
                pendingTasksTitle={pendingTasksTitle}
            />

            <div className="main">
                {user
                    ?
                    <>
                        <TaskForm user={user} />

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
                    :
                    <LoginForm />
                }
            </div>
        </div>
    )
};
