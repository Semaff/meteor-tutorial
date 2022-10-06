import React, { useEffect, useState } from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Checkbox, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { Autocomplete, Box, TextField } from '@mui/material';
import { asyncCallMeteorMethod } from '../../utils/asyncCallMeteorMethod';
import { ITag } from '/imports/api/tags/TagsCollection';
import { ITask } from '/imports/api/tasks/TasksCollection';

interface TaskProps {
  task: ITask,
  onCheckBoxClick: ({ _id, isChecked }: Partial<ITask>) => void;
  onDeleteClick: ({ _id }: Partial<ITask>) => void;
  onTagsChange: (taskId: string, tags: ITag[]) => void;
}

const Task = ({ task, onCheckBoxClick, onDeleteClick, onTagsChange }: TaskProps) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (tags.length === 0) {
      async function fetchTags() {
        const tags = await asyncCallMeteorMethod<ITag[]>("tags.getAll", { limit: 10 });
        if (tags) {
          setTags(tags);
        }
      }

      fetchTags();
    }
  }, []);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerEl = setTimeout(() => {
      setSearch(input);
    }, 500);

    setTimer(timerEl);
  }, [input]);

  useEffect(() => {
    async function fetchTags() {
      let tags: ITag[];
      if (search.length <= 1) {
        tags = await asyncCallMeteorMethod<ITag[]>("tags.getAll", { limit: 10 });
      } else {
        tags = await asyncCallMeteorMethod<ITag[]>("tags.getAll", { query: search, limit: 50 });
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
          <Delete />
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
          onChange={(_, values) => {
            if (task._id) {
              onTagsChange(task._id, values)
            }
          }}

          filterOptions={(x) => x}
          onInputChange={(_, newInputValue) => {
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
};

export default Task;