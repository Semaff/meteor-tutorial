import React, { memo, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Box, TextField } from '@mui/material';
import { Meteor } from "meteor/meteor";

const asyncCallMethod = (methodName, ...args) => {
    return new Promise((resolve, reject) => {
        Meteor.call(methodName, ...args, (error, result) => {
            if (error) {
                reject(error);
            }

            resolve(result);
        });
    });
}

const Task = memo(({ task, /* tags ,*/ onCheckBoxClick, onDeleteClick, onInputChange, onTagsChange }) => {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        async function fetchTags() {
            const tags = await asyncCallMethod("tags.getAll", { limit: 10 });
            if (tags) {
                setTags(tags);
            }
        }

        fetchTags();
    }, []);

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

    useEffect(() => {
        async function fetchTags() {
            let tags;
            if (search.length <= 1) {
                tags = await asyncCallMethod("tags.getAll", { limit: 10 });
            } else {
                tags = await asyncCallMethod("tags.getAll", { query: search, limit: 50 });
            }

            if (tags) {
                setTags(tags);
            }
        }

        fetchTags();
    }, [search])

    const filteredTags = tags.filter(tag => task.tags.find(taskTag => taskTag._id === tag._id) ? false : true);

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
                    options={[...filteredTags, ...task.tags]}
                    value={task.tags}
                    onChange={(event, values) => {
                        onTagsChange(task._id, values)
                    }}

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
});

export default Task;