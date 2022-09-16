import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ task, onCheckBoxClick, onDeleteClick }) => {
    return (
        <ListItem
            disablePadding
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteClick(task)}>
                    <DeleteIcon />
                </IconButton >
            }
        >
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
            </ListItemButton>
        </ListItem >
    )
}

export default Task;