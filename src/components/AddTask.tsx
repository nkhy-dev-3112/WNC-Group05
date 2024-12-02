import React, { useState } from "react";
import { Input, Button } from "antd";
import { useTask } from "../hooks/useTask";

const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const { addTask } = useTask();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask(taskName);
      setTaskName("");
    }
  };
  const handleAddTask = () => {
    addTask(taskName);
    setTaskName("");
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task"
        onKeyDown={handleKeyDown}
      />
      <Button type="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
