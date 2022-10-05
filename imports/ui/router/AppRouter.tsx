import * as React from 'react';
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Routes>
      {user
        ?
        privateRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
        :
        publicRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      }
    </Routes>
  )
}

export default AppRouter;