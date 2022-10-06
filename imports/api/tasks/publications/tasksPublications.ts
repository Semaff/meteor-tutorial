import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  const userId: string | null = this.userId;
  if (userId) {
    return TasksCollection.find({ userId });
  }
});