import React, { Fragment, useEffect, useState } from 'react';
import List from '@mui/material/List';
import Task from './Task';
import { useTracker } from "meteor/react-meteor-data";
import { Box, Typography } from '@mui/material';
import { TagsCollection } from '../../api/tags/TagsCollection';

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
    const [search, setSearch] = useState("");
    const [input, setInput] = useState("");
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        const timerEl = setTimeout(() => {
            setSearch(input);
        }, 300);

        setTimer(timerEl);
    }, [input]);

    const { tags, areTagsLoading } = useTracker(() => {
        const handler = Meteor.subscribe("tags", search);
        if (!handler.ready()) {
            return { areTagsLoading: true };
        }

        if (search.length <= 1) {
            return { tags: TagsCollection.find().fetch().slice(0, 10) }
        }

        return { tags: TagsCollection.find().fetch() }
    });

    return (
        <Box className='box'>
            {tasks.length > 0
                ? (
                    <List sx={{ width: "100%" }}>
                        {tasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                tags={tags}
                                areTagsLoading={areTagsLoading}
                                onCheckBoxClick={toggleChecked}
                                onDeleteClick={deleteTask}
                                onTagsChange={changeTaskTags}
                                onInputChange={setInput}
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