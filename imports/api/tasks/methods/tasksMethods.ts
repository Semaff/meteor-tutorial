import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../TasksCollection";
import { ITag } from "../../tags/TagsCollection";

Meteor.methods({
  'tasks.insert'(text: string) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text,
      tags: [],
      createdAt: new Date(),
      isChecked: false,
      userId: this.userId,
    });
  },

  'tasks.remove'(taskId: string) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId: string, isChecked: boolean) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },

  'tasks.setTags'(taskId: string, tags: ITag[]) {
    check(taskId, String);
    check(tags, Array);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        tags,
      },
    });
  },
});