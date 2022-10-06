import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TagsCollection } from "../TagsCollection";

interface GetAllProps {
  query?: string;
  limit?: number;
}

Meteor.methods({
  'tags.getAll'({ query, limit }: GetAllProps = {}) {
    const fields: any = {};

    if (query) {
      fields.text = {
        $regex: query,
        $options: "gi"
      }
    }

    const tags = TagsCollection.find(fields, { limit }).fetch();
    return tags;
  },

  'tags.insert'(tagText: string) {
    check(tagText, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TagsCollection.insert({
      text: tagText,
      createdAt: new Date()
    });
  },

  'tags.remove'(taskId: string) {
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