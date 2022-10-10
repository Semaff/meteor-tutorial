import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { ITask, TasksCollection } from "../TasksCollection";
import { expect } from "chai";

import "/imports/api/tasks/methods/tasksMethods";
import { ITag, TagsCollection } from "../../tags/TagsCollection";

if (Meteor.isServer) {
  const { server } = Meteor as any;
  const userId = Random.id();
  const task: ITask = {
    _id: Random.id(),
    text: "Test task",
    isChecked: false,
    createdAt: new Date(),
    tags: [],
    userId
  };

  beforeEach(() => {
    TasksCollection.remove({});
    TasksCollection.insert(task);
  });

  describe("Task Methods", () => {
    /*
      Tasks/Create
      =================
    */
    describe("Creating Tasks", () => {
      it("Can create task if authorized", () => {
        const taskName = "Random Task Text";
        server.method_handlers["tasks.insert"].apply({ userId }, [taskName]);
        expect(TasksCollection.findOne({ text: taskName })).to.exist;
      });

      it("Can't create task if not authorized", () => {
        expect(() =>
          server.method_handlers["tasks.insert"].apply({}, ["Random Task Text"])
        ).throw();
      });
    });

    /*
      Tasks/Delete
      =================
    */
    describe("Deleting Tasks", () => {
      it("Can delete owned task", () => {
        server.method_handlers["tasks.remove"].apply({ userId }, [task._id]);
        expect(TasksCollection.find().count()).equal(0);
      });

      it("Can't delete task if not authentificated", () => {
        expect(() =>
          server.method_handlers["tasks.remove"].apply({}, [task._id])
        ).throw();
      });
    });

    /*
      Tasks/Update
      =================
    */
    describe("Updating Tasks", () => {
      const tag: ITag = {
        _id: Random.id(),
        text: "tag",
        createdAt: new Date()
      };

      beforeEach(() => {
        TagsCollection.remove({});
        TagsCollection.insert(tag);
      });

      it("Switches isChecked false to true and vice versa", () => {
        /* False => True */
        server.method_handlers["tasks.setIsChecked"].apply({ userId }, [
          task._id,
          true
        ]);

        expect(TasksCollection.findOne({ _id: task._id })?.isChecked).equal(
          true
        );

        /* True => False */
        server.method_handlers["tasks.setIsChecked"].apply({ userId }, [
          task._id,
          false
        ]);

        expect(TasksCollection.findOne({ _id: task._id })?.isChecked).equal(
          false
        );
      });

      it("Changes tags", () => {
        /* Contains 1 tag */
        server.method_handlers["tasks.setTags"].apply({ userId }, [
          task._id,
          [tag]
        ]);
        expect(TasksCollection.findOne({ _id: task._id })?.tags).length(1);

        /* Removes all tags */
        server.method_handlers["tasks.setTags"].apply({ userId }, [
          task._id,
          []
        ]);
        expect(TasksCollection.findOne({ _id: task._id })?.tags).length(0);
      });
    });
  });
}
