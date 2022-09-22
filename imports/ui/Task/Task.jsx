import React, { memo, useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Box, TextField } from '@mui/material';
import { TagsCollection } from '../../api/tags/TagsCollection';

const Task = memo(({ task, /* tags ,*/ onCheckBoxClick, onDeleteClick, onInputChange, onTagsChange }) => {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
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
    }, [input])

    useEffect(() => {
        const handler = Meteor.subscribe("tags");

        if (search.length <= 1) {
            setTags(TagsCollection.find().fetch().slice(0, 10));
        } else {
            setTags(TagsCollection.find({
                text: {
                    $regex: search,
                    $options: "gi"
                }
            }).fetch());
        }

        return () => handler.stop();
    }, [search]);

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