import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration";
import { insertTags } from "./autoInserts/tagsInsert";
import { insertTasks } from "./autoInserts/tasksInsert";
import { insertUser } from "./autoInserts/userInsert";

import '/imports/api/tasks/methods/tasksMethods';
import '/imports/api/tasks/publications/tasksPublications';
import '/imports/api/tags/methods/tagsMethods';
import '/imports/api/tags/publications/tagsPublications';

if (Meteor.isServer) {
    Meteor.startup(() => {
        insertUser();
        insertTasks();
        insertTags();
    });
}

