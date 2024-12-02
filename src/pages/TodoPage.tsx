import React, { useEffect } from "react";
import { Typography, Button } from "antd";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import { useTask } from "../hooks/useTask";

const { Title } = Typography;

const TodoPage: React.FC = () => {
  const { state, removeAllTasks } = useTask();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // const addTask = (taskName: string) => {
  //   if (taskName.trim()) {
  //     const newTask = {
  //       id: Date.now(),
  //       name: taskName,
  //       completed: false,
  //     };
  //     dispatch({ type: TaskActionType.ADD_TASK, payload: newTask });
  //   }
  // };

  // const toggleComplete = (id: number) => {
  //   dispatch({ type: TaskActionType.TOGGLE_COMPLETE, payload: id });
  // };

  // const removeTask = (id: number) => {
  //   dispatch({ type: TaskActionType.REMOVE_TASK, payload: id });
  // };

  // const removeAllTasks = () => {
  //   dispatch({ type: TaskActionType.REMOVE_ALL_TASKS });
  // };

  // const filteredTasks = state.tasks.filter((task: any) =>
  //   task.name.toLowerCase().includes(state.filter.toLowerCase())
  // );

  // const editTaskName = (id: number, newName: string) => {
  //   dispatch({
  //     type: TaskActionType.EDIT_TASK_NAME,
  //     payload: { id, name: newName },
  //   });
  // };

  return (
    <div
      style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={2}>Todo App</Title>
      </div>

      <FilterTask />

      <AddTask />

      <TaskList />

      <Button
        type="link"
        style={{ marginTop: "20px" }}
        onClick={removeAllTasks}
        danger
      >
        Remove All Tasks
      </Button>
    </div>
  );
};

export default TodoPage;
