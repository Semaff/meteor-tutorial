import { Meteor } from "meteor/meteor";
import { TagsCollection } from "../TagsCollection";

Meteor.publish("tags", function publishTasks() {
  return TagsCollection.find({}, { limit: 50 });
})