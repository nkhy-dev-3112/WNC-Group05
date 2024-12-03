import { TaskActionType } from "./actionTypes";
import { Task } from "../types";

export type TaskAction =
  | {
    type: TaskActionType.SET_FILTER;
    payload: string
  }
  | {
    type: TaskActionType.ADD_TASK;
    payload: Task
  }
  | {
    type: TaskActionType.TOGGLE_COMPLETE;
    payload: number
  }
  | {
    type: TaskActionType.REMOVE_TASK;
    payload: number
  }
  | {
    type: TaskActionType.REMOVE_ALL_TASKS
  }
  | {
    type: TaskActionType.EDIT_TASK_NAME;
    payload: { id: number; name: string };
  };
