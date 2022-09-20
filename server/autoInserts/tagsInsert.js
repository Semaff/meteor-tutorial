import { TagsCollection } from "../../imports/api/tags/TagsCollection";

const insertTag = (tag) => (
    TagsCollection.insert({
        text: tag,
        createdAt: new Date()
    })
);

const tags = `#love #travel #instagood #tbt #fashion #sunset #photooftheday #sun #art #일상 #photography #wedding #instagram #tagsforlikes #beautiful #workout #nature #vsco #picoftheday #vscocam #follow #yummy #happy #travelphotography #cute #tattoo #맞팔 #style #winter #instadaily
#swag #followme #vintage #travelgram #repost #소통 #summer #데일리 #like4like #weekend #beauty #work #fitness #좋아요 #food #trip #instalike #wanderlust #selfie #vacation #me #training #photo #sweet #girl #usa #friends #vegan #fun #throwback #smile
#sunday #family #tflers #life #москва #music #ootd #explore #makeup #likeforlikes #likeforlike #model #dog #design #motivation #lifestyle #handmade #amazing #follow4follow #igers #beach #foodporn #artist #nofilter #dogsofinstagram #instamood #cat #drawing #followforfollowback #sky #f4f #flowers #followforfollow #moda #l4l #hair #gym #photographer #funny #memes #inspiration #likeforfollow #instafood #baby #foodie #bestoftheday #instapic #naturephotography #girls #nails #home #illustration #fit #india #pretty #landscape #party #insta #catsofinstagram #healthy #puppy
#anime #digitalart #animefan #animelover #weeb #animedrawing #animelove #animememes #lol #illustration
`.split(" ").map(str => str.slice(1));

export function insertTags() {
    /* Inserting tags if they didn't exist */
    if (TagsCollection.find().count() === 0) {
        tags.forEach(tag => insertTag(tag));
    }
}

