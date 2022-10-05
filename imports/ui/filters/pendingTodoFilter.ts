import { Meteor } from "meteor/meteor";
import { completedTodoFilter } from "./completedTodoFilter";
import { userFilter } from "./userFilter";

export const pendingOnlyFilter = (user: Meteor.User | null) => ({
  ...completedTodoFilter(),
  ...userFilter(user)
});