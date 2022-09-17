import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TagsCollection } from "../../db/TagsCollection";

Meteor.methods({
    'tags.insert'(tag) {
        check(tag, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TagsCollection.insert({
            text: tag,
            createdAt: new Date()
        });
    },

    'tags.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TagsCollection.findOne({ _id: taskId });
        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TagsCollection.remove(taskId);
    }
});