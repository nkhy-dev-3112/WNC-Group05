import React, { useContext } from "react";
import { Typography, Button } from "antd";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import TaskContext from "../contexts/TaskContext";

const { Title } = Typography;

const TodoPage: React.FC = () => {
  const { removeAllTasks } = useContext(TaskContext);

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
