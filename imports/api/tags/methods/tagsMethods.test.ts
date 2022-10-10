import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { expect } from "chai";

import "/imports/api/tags/methods/tagsMethods";
import { ITag, TagsCollection } from "../TagsCollection";

if (Meteor.isServer) {
  const { server } = Meteor as any;
  const userId = Random.id();
  const tag: ITag = {
    _id: Random.id(),
    text: "Test task",
    createdAt: new Date()
  };

  beforeEach(() => {
    TagsCollection.remove({});
    TagsCollection.insert(tag);
  });

  describe("Tag Methods", () => {
    /*
      Tags/Get
      =================
    */
    it("Can get tags, including needed query and limit", () => {
      expect(
        server.method_handlers["tags.getAll"].apply({}, [{}])
      ).length(1);

      expect(
        server.method_handlers["tags.getAll"].apply({}, [{ limit: 1 }])
      ).length(1);

      expect(
        server.method_handlers["tags.getAll"].apply({}, [{ limit: 0 }])
      ).length(1);

      expect(
        server.method_handlers["tags.getAll"].apply({}, [
          { query: "Test task" }
        ])
      ).length(1);

      expect(
        server.method_handlers["tags.getAll"].apply({}, [
          { query: "Test task1" }
        ])
      ).length(0);
    });

    /*
      Tags/Create
      =================
    */
    it("Can create tag", () => {
      const tagText = "Random Tag Text";
      server.method_handlers["tags.insert"].apply({ userId }, [tagText]);
      expect(TagsCollection.findOne({ text: tagText })).to.exist;
    });

    /*
      Tags/Delete
      =================
    */
    it("Can delete tag", () => {
      server.method_handlers["tags.remove"].apply({ userId }, [tag._id]);
      expect(TagsCollection.find().count()).equal(0);
    });
  });
}
