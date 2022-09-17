import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TagsCollection } from '../../db/TagsCollection';
import { TasksCollection } from '../../db/TasksCollection';

const onTagAdd = (taskId, tagId) => {
    Meteor.call('tasks.setTags', taskId, tagId);
}

const Task = ({ task, onCheckBoxClick, onDeleteClick }) => {
    const [input, setInput] = useState("");
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [timer, setTimer] = useState(null);

    useTracker(() => {
        const handler = Meteor.subscribe("taskTagsCount", task._id);
        if (!handler.ready()) {
            return { isLoading: true };
        }

        const tagsCount = TasksCollection.findOne();
        console.log(tagsCount)
        return {};
    })

    useTracker(() => {
        const handler = Meteor.subscribe("tags");
        if (!handler.ready()) {
            setIsLoading(true);
            return { isLoading: true };
        }

        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        if (input.length <= 1) {
            const tags = TagsCollection.find({}, { limit: 10 }).fetch().filter(tag => task.tags.find(taskTag => taskTag._id === tag._id) ? false : true);
            setTags([...tags, ...task.tags]);
            setIsLoading(false);
        } else {
            const timerEl = setTimeout(() => {
                const tags = TagsCollection.find().fetch().filter(tag => tag.text.startsWith(input)).filter(tag => task.tags.find(taskTag => taskTag._id === tag._id) ? false : true);
                setTags([...tags, ...task.tags]);
                setIsLoading(false);
            }, 300);
            setTimer(timerEl);
        }

        return {};
    }, [input]);

    return (
        <ListItem
            disablePadding
            style={{ display: "flex", flexDirection: "column" }}
        >
            <Box style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListItemButton role={undefined} onClick={() => onCheckBoxClick(task)} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={!!task.isChecked}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': task._id }}
                        />
                    </ListItemIcon>

                    <ListItemText id={task._id}>
                        {task.text}
                    </ListItemText>
                </ListItemButton >

                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteClick(task)}>
                    <DeleteIcon />
                </IconButton >
            </Box>

            <Box style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Autocomplete
                    id="multiple-limit-tags"
                    multiple
                    limitTags={4}

                    /* Configure options and values */
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    options={tags}
                    value={task.tags}
                    onChange={(event, values) => {
                        onTagAdd(task._id, values)
                    }}

                    loading={isLoading}

                    filterOptions={(x) => x}
                    onInputChange={(event, newInputValue) => {
                        setInput(newInputValue);
                    }}

                    getOptionLabel={(tag) => tag.text}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            placeholder="Favorites"
                        />
                    )}

                    sx={{ width: '500px' }}
                />
            </Box>
        </ListItem >
    )
}

export default Task;