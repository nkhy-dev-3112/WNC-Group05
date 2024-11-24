import { Task } from "../models/Task";

export type TaskState = {
  tasks: Task[];
  filter: string;
};
