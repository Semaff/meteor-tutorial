import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from '../api/tasks/TasksCollection';
import { BrowserRouter } from 'react-router-dom';
import { pendingOnlyFilter } from './filters/pendingTodoFilter';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './router/AppRouter';

export const App = () => {
  const user = useTracker(() => {
    return Meteor.user()
  });

  const { pendingTasksCount } = useTracker(() => {
    const noDataAvailable = { pendingTasksCount: 0 };
    if (!user) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe("tasks");
    if (!handler.ready()) {
      return noDataAvailable;
    }

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter(user)).count();
    return { pendingTasksCount };
  });

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`;

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        pendingTasksTitle={pendingTasksTitle}
      />

      <AppRouter />
    </BrowserRouter>
  )
};
