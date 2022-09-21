import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import Task from './Task';
import { Box, Typography } from '@mui/material';
import { Meteor } from "meteor/meteor";
// import { useTracker } from "meteor/react-meteor-data";
// import { TagsCollection } from '../../api/tags/TagsCollection';

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
    // const [tags, setTags] = useState([]);
    // const [input, setInput] = useState("");
    // const [timer, setTimer] = useState(null);

    // useEffect(() => {
    //     const handler = Meteor.subscribe("tags");

    //     if (timer) {
    //         clearTimeout(timer);
    //         setTimer(null);
    //     }

    //     if (input.length <= 1) {
    //         setTags(TagsCollection.find().fetch().slice(0, 10));
    //     } else {
    //         const timerEl = setTimeout(() => {
    //             setTags(TagsCollection.find({
    //                 text: {
    //                     $regex: input,
    //                     $options: "gi"
    //                 }
    //             }).fetch());
    //         }, 300);

    //         setTimer(timerEl);
    //     }

    //     return () => handler.stop();
    // }, [input]);

    return (
        <Box className='box'>
            {tasks.length > 0
                ? (
                    <List sx={{ width: "100%" }}>
                        {tasks.map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                // tags={tags}
                                onCheckBoxClick={toggleChecked}
                                onDeleteClick={deleteTask}
                                onTagsChange={changeTaskTags}
                                // onInputChange={setInput}
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