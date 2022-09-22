import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TagsCollection } from "../TagsCollection";

Meteor.methods({
    'tags.getAll'({ query, limit } = {}) {
        const fields = {};

        if (query) {
            fields.text = {
                $regex: query,
                $options: "gi"
            }
        }

        const tags = TagsCollection.find(fields, { limit }).fetch();
        return tags;
    },

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