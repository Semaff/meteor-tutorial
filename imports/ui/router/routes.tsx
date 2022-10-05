import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import TasksPage from "../pages/TasksPage";

export interface IRoute {
  path: string;
  element: ReactNode;
}

export enum RouteNames {
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  TASKS = "/",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.SIGNIN, element: <SignInPage /> },
  { path: RouteNames.SIGNUP, element: <SignUpPage /> },
  { path: "*", element: <Navigate replace to={RouteNames.SIGNIN} /> },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.TASKS, element: <TasksPage /> },
  { path: "*", element: <Navigate replace to={RouteNames.TASKS} /> },
];