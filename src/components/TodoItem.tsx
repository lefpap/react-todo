import { useState } from "react";
import useTodos from "../hooks/useTodos";
import { cn } from "../lib/utils";
import { Todo } from "../lib/types";

type Props = {
  todo: Todo;
};

const TodoItem = (props: Props) => {
  const { todo } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(todo.task);

  const { dispatch } = useTodos();

  const handleEdit = () => {
    isEditing
      ? dispatch({
          type: "EDIT_TODO",
          payload: { id: todo.id, task: editingTask },
        })
      : setEditingTask(todo.task);

    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  };

  const handleToggleCompleted = () => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask(e.target.value);
  };

  const handleEditSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  return (
    <li
      className={cn("card flex gap-4 items-center justify-between", {
        "bg-gray-300 text-gray-700/50": todo.completed,
      })}
    >
      <input
        type="checkbox"
        name="completed"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={handleToggleCompleted}
      />
      <div className="relative flex-grow">
        {isEditing ? (
          <input
            type="text"
            name="editingTask"
            onBlur={handleEditCancel}
            onChange={handleEditChange}
            onKeyDown={handleEditSubmit}
            className="input w-full"
            value={editingTask}
            autoFocus
          />
        ) : (
          <span className="line-clamp-1">{todo.task}</span>
        )}

        {todo.completed && !isEditing && (
          <span className="absolute -left-1 right-0 top-1/2 h-0.5 bg-gray-800/50 opacity-80" />
        )}
      </div>

      <div className="flex items center justify-end">
        <button
          className={cn("btn btn-ghost", {
            "hover:bg-gray-500/40 hover:text-gray-300": todo.completed,
          })}
          onClick={handleEdit}
        >
          {isEditing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
              <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
            </svg>
          )}
        </button>

        <button
          className={cn("btn btn-ghost", {
            "hover:bg-gray-500/40 hover:text-gray-300": todo.completed,
          })}
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
