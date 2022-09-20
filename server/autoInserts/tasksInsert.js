import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../../imports/api/tasks/TasksCollection";
import { SEED_USERNAME } from "./userInsert";

const insertTask = (taskText, user) => (
    TasksCollection.insert({
        text: taskText,
        userId: user._id,
        tags: [],
        createdAt: new Date()
    })
);

const tasks = [
    'First Task',
    'Second Task',
    'Third Task',
    'Fourth Task',
    'Fifth Task',
    'Sixth Task',
    'Seventh Task'
];

export function insertTasks() {
    const user = Accounts.findUserByUsername(SEED_USERNAME);

    if (TasksCollection.find().count() === 0) {
        tasks.forEach(taskText => insertTask(taskText, user));
    }
}