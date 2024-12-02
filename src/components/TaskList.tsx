import React, { useState } from "react";
import { List, Checkbox, Button, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTask } from "../hooks/useTask";
import { Task } from "../models/Task";

export const TaskList: React.FC = () => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const { state, editTaskName, removeTask, toggleComplete } = useTask();
  const { tasks, filter } = state;

  const handleEdit = (taskId: number, currentName: string) => {
    setEditingTaskId(taskId);
    setNewTaskName(currentName);
  };
  const handleSaveEdit = (id: number) => {
    if (newTaskName.trim()) {
      editTaskName(id, newTaskName);
      setEditingTaskId(null);
      setNewTaskName("");
    }
  };

  const filteredTasks = tasks.filter((task: Task) =>
    task.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List
      bordered
      dataSource={filteredTasks}
      renderItem={(task: Task) => (
        <List.Item
          actions={[
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              onClick={() => removeTask(task.id)}
            />,
            editingTaskId === task.id ? null : (
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEdit(task.id, task.name)}
              />
            ),
          ]}
        >
          <Checkbox
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          >
            {editingTaskId === task.id ? (
              <Input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onPressEnter={() => handleSaveEdit(task.id)}
                onBlur={() => handleSaveEdit(task.id)} // Save on blur for better UX
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "inherit",
                }}
              >
                {task.name}
              </span>
            )}
          </Checkbox>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
function editTaskName(id: number, newTaskName: string) {
  throw new Error("Function not implemented.");
}
