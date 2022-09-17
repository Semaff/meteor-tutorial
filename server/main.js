import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/TasksCollection";
import { TagsCollection } from "../imports/db/TagsCollection";
import '/imports/api/tasks/tasksMethods';
import '/imports/api/tasks/tasksPublications';
import '/imports/api/tags/tagsMethods';
import '/imports/api/tags/tagsPublications';

const insertTask = (taskText, user) => (
    TasksCollection.insert({
        text: taskText,
        userId: user._id,
        tags: [],
        createdAt: new Date()
    })
);

const insertTag = (tag) => (
    TagsCollection.insert({
        text: tag,
        createdAt: new Date()
    })
);

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

const tags = `#love #travel #instagood #tbt #fashion #sunset #photooftheday #sun #art #일상 #photography #wedding #instagram #tagsforlikes #beautiful #workout #nature #vsco #picoftheday #vscocam #follow #yummy #happy #travelphotography #cute #tattoo #맞팔 #style #winter #instadaily
#swag #followme #vintage #travelgram #repost #소통 #summer #데일리 #like4like #weekend #beauty #work #fitness #좋아요 #food #trip #instalike #wanderlust #selfie #vacation #me #training #photo #sweet #girl #usa #friends #vegan #fun #throwback #smile
#sunday #family #tflers #life #москва #music #ootd #explore #makeup #likeforlikes #likeforlike #model #dog #design #motivation #lifestyle #handmade #amazing #follow4follow #igers #beach #foodporn #artist #nofilter #dogsofinstagram #instamood #cat #drawing #followforfollowback #sky #f4f #flowers #followforfollow #moda #l4l #hair #gym #photographer #funny #memes #inspiration #likeforfollow #instafood #baby #foodie #bestoftheday #instapic #naturephotography #girls #nails #home #illustration #fit #india #pretty #landscape #party #insta #catsofinstagram #healthy #puppy
#anime #digitalart #animefan #animelover #weeb #animedrawing #animelove #animememes #lol #illustration
`.split(" ").map(str => str.slice(1));

Meteor.startup(() => {
    /* Inserting default User if it's doesn't exist */
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    const user = Accounts.findUserByUsername(SEED_USERNAME);

    /* Inserting tasks if they didn't exist */
    if (TasksCollection.find().count() === 0) {
        [
            'First Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task'
        ].forEach(taskText => insertTask(taskText, user));
    }

    /* Inserting tags if they didn't exist */
    if (TagsCollection.find().count() === 0) {
        tags.forEach(tag => insertTag(tag));
    }
});


