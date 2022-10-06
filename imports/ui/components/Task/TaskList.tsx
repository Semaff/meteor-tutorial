import React from 'react';
import List from '@mui/material/List';
import Task from './Task';
import { Box, Typography } from '@mui/material';
import { Meteor } from "meteor/meteor";
import { ITask } from '/imports/api/tasks/TasksCollection';
import { ITag } from '/imports/api/tags/TagsCollection';

const toggleChecked = ({ _id, isChecked }: Partial<ITask>) => {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
};

const deleteTask = ({ _id }: Partial<ITask>) => {
  Meteor.call('tasks.remove', _id);
}

const changeTaskTags = (taskId: string, tags: ITag[]) => {
  Meteor.call('tasks.setTags', taskId, tags);
}

interface TaskListProps {
  tasks: ITask[]
}

const TaskList = ({ tasks }: TaskListProps) => {
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