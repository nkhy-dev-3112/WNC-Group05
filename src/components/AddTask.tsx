import { Button, Input } from "antd";
import { AddTaskProps } from "../props/AddTaskProps";
import { useState } from "react";

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState<string>("");

  const handleAddTask = () => {
    addTask(taskName);
    setTaskName("");
  };
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <Input
        placeholder="Add a new task"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        onPressEnter={handleAddTask}
      ></Input>
      <Button type="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
