import { Mongo } from "meteor/mongo";

export interface ITag {
  _id?: string;
  text: string;
  createdAt: Date;
}

export const TagsCollection = new Mongo.Collection<ITag>("tags");