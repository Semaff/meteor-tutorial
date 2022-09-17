import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../../db/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
    return TasksCollection.find({ userId: this.userId });
});

Meteor.publish("taskTagsCount", function publishTaskTagsCount(taskId) {
    check(taskId, String);

    let count = 0;
    let initializing = true;

    const handle = TasksCollection.find({ _id: taskId }).observeChanges({
        added: (id) => {
            count++;

            if (!initializing) {
                this.changed("counts", taskId, { count });
            }
        },

        removed: (id) => {
            count--;
            this.changed("counts", taskId, { count });
        }
    });

    initializing = false;
    this.added("counts", taskId, { count });
    this.ready();

    this.onStop(() => handle.stop());
});