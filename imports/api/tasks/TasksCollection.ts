import { Mongo } from "meteor/mongo";
import { ITag } from "../tags/TagsCollection";

export interface ITask {
  _id?: string;
  text: string;
  tags: ITag[];
  isChecked: boolean;
  userId: string;
  createdAt: Date;
}

export const TasksCollection = new Mongo.Collection<ITask>("tasks");