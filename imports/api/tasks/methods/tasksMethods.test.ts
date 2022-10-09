import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { TasksCollection } from "../TasksCollection";
import { expect } from "chai";

import "/imports/api/tasks/methods/tasksMethods";

if (Meteor.isServer) {
  describe("Tasks", () => {
    describe("Methods", () => {
      const { server } = Meteor as any;
      const userId = Random.id();
      const task = {
        _id: "task",
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

      it("Can delete owned task", () => {
        server.method_handlers["tasks.remove"].apply({ userId }, [
          task._id
        ]);
        expect(TasksCollection.find().count()).equal(0);
      });

      it("Can't delete task if not authentificated", () => {
        expect(() =>
          server.method_handlers["tasks.remove"].apply({}, [task._id])
        ).throw();
      });
    });
  });
}
