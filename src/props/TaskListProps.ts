import { Task } from "../models/Task";

export interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  removeTask: (id: number) => void;
  editTaskName: (id: number, newName: string) => void;
}
