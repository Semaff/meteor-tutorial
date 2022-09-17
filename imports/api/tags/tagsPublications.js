import { Meteor } from "meteor/meteor";
import { TagsCollection } from "../../db/TagsCollection";

Meteor.publish("tags", function publishTasks() {
    return TagsCollection.find({});
})