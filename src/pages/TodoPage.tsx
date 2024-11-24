import { Button } from "antd";
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import TaskList from "../components/TaskList";
import Title from "antd/es/typography/Title";
import { useTask } from "../hooks/useTask";
import { useEffect } from "react";
import { TaskActionType } from "../enums/TaskActionType";
import { Task } from "../models/Task";

const TodoPage: React.FC = () => {
  const { state, dispatch } = useTask();
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, state.tasks);

  const addTask = (taskName: string) => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };
      dispatch({ type: TaskActionType.ADD_TASK, payload: newTask });
    }
  };

  const toggleComplete = (id: number) => {
    dispatch({ type: TaskActionType.TOGGLE_COMPLETE, payload: id });
  };

  const removeTask = (id: number) => {
    dispatch({ type: TaskActionType.REMOVE_TASK, payload: id });
  };
  const editTaskName = (id: number, newName: string) => {
    dispatch({
      type: TaskActionType.EDIT_TASK_NAME,
      payload: { id, name: newName },
    });
  };

  const filteredTasks = state.tasks.filter((task: Task) =>
    task.name.toLowerCase().includes(state.filter.toLowerCase())
  );

  const removeAllTasks = () => {
    dispatch({ type: TaskActionType.REMOVE_ALL_TASKS });
  };
  return (
    <div
      style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}
    >
      <Title
        level={2}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        Todo App
      </Title>
      <FilterTask />
      <AddTask addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        editTaskName={editTaskName}
        removeTask={removeTask}
      />
      <Button danger type="link" onClick={removeAllTasks}>
        Remove All Tasks
      </Button>
    </div>
  );
};

export default TodoPage;
