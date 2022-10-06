import { TagsCollection } from "../../imports/api/tags/TagsCollection";
import randowWords from "random-words";

const insertTag = (tagText: string) => {
  const possibleTag = TagsCollection.findOne({ text: tagText });
  if (possibleTag) {
    const newTag = randowWords({ exactly: 1 }).join("");
    insertTag(newTag);
    return;
  }

  TagsCollection.insert({
    text: tagText,
    createdAt: new Date()
  })
};

const tags = randowWords({ exactly: 100 });

export function insertTags() {
  /* Inserting tags if they didn't exist */
  if (TagsCollection.find().count() === 0) {
    tags.forEach(tag => insertTag(tag));
  }
}

