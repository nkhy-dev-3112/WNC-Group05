
export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export type TaskState = {
  tasks: Task[];
  filter: string;
};
