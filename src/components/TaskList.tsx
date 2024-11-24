import { Button, Checkbox, Input, List } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TaskListProps } from "../props/TaskListProps";
import { useState } from "react";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleComplete,
  removeTask,
  editTaskName,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const handleEdit = (taskId: number, currentName: string) => {
    setEditingTaskId(taskId);
    setNewTaskName(currentName);
  };

  const handleSaveEdit = (taskId: number) => {
    if (newTaskName.trim()) {
      editTaskName(taskId, newTaskName);
      setEditingTaskId(null);
      setNewTaskName("");
    }
  };

  return (
    <List
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          actions={[
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
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
                onBlur={() => handleSaveEdit(task.id)}
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
