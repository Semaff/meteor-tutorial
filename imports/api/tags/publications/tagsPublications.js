import { Meteor } from "meteor/meteor";
import { TagsCollection } from "../TagsCollection";

Meteor.publish("tags", function publishTasks(query) {
    const search = {};

    if (query) {
        search.text = {
            $regex: query,
            $options: "gi"
        }
    }

    return TagsCollection.find(search, { limit: 50 });
})