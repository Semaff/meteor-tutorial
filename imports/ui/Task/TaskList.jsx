import React from 'react';
import List from '@mui/material/List';
import Task from './Task';
import { Box, Typography } from '@mui/material';
import { Meteor } from "meteor/meteor";

const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
};

const deleteTask = ({ _id }) => {
    Meteor.call('tasks.remove', _id);
}

const changeTaskTags = (taskId, tags) => {
    Meteor.call('tasks.setTags', taskId, tags);
}

const TaskList = ({ tasks }) => {
    return (
        <Box className='box'>
            {tasks.length > 0
                ? (
                    <List sx={{ width: "100%" }}>
                        {tasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                onCheckBoxClick={toggleChecked}
                                onDeleteClick={deleteTask}
                                onTagsChange={changeTaskTags}
                            />
                        ))}
                    </List>
                )
                : (
                    <Typography>
                        There are no tasks yet!
                    </Typography>
                )
            }
        </Box>
    );
}

export default TaskList;