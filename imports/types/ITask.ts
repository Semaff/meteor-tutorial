import { ITag } from "./ITag";

export interface ITask {
  _id: string;
  isChecked: boolean;
  text: string;
  tags: ITag[]
}