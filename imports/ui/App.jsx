import React from 'react';
import Task from './Task';
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from '../api/TasksCollection';
import TaskForm from './TaskForm';

const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
        $set: {
            isChecked: !isChecked
        }
    })
};

const deleteTask = ({ _id }) => {
    TasksCollection.remove(_id);
}

export const App = () => {
    /* "useTracker" is something like "subscribe" in Redux */
    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

    return (
        <div>
            <h1>Welcome to Meteor!</h1>

            <TaskForm />

            <ul>
                {tasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        onCheckBoxClick={toggleChecked}
                        onDeleteClick={deleteTask}
                    />
                ))}
            </ul>
        </div>
    )
};
