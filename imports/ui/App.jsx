import React, { useState } from 'react';
import Task from './Task';
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from '../api/TasksCollection';
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';
import { Meteor } from "meteor/meteor";

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
    const [hideCompleted, setHideCompleted] = useState(false);
    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();

    const hideCompletedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

    /* "useTracker" is something like "subscribe" in Redux */
    const tasks = useTracker(() => {
        if (!user) {
            return [];
        }

        return TasksCollection.find(
            hideCompleted ? pendingOnlyFilter : userFilter,
            {
                sort: { createdAt: -1 }
            }
        ).fetch();
    });

    const pendingTasksCount = useTracker(() => {
        if (!user) {
            return 0;
        }

        return TasksCollection.find(pendingOnlyFilter).count();
    });

    const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`;

    return (
        <div className="app">
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>
                            📝️ ToDo List
                            {pendingTasksTitle}
                        </h1>
                    </div>
                </div>
            </header>

            <div className="main">
                {user
                    ?
                    <>
                        <div className="user" onClick={logout}>
                            {user.username} 🚪
                        </div>

                        <TaskForm user={user} />

                        <div className="filter">
                            <button onClick={() => setHideCompleted(prev => !prev)}>
                                {hideCompleted ? "Show All" : "Hide Completed"}
                            </button>
                        </div>

                        <ul className="tasks">
                            {tasks.map(task => (
                                <Task
                                    key={task._id}
                                    task={task}
                                    onCheckboxClick={toggleChecked}
                                    onDeleteClick={deleteTask}
                                />
                            ))}
                        </ul>
                    </>
                    :
                    <LoginForm />
                }
            </div>
        </div>
    )
};
