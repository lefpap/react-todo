import React, { useState } from "react";
import useTodos from "../hooks/useTodos";

const AddTodo = () => {
  const { dispatch } = useTodos();
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task) {
      console.error("handleSubmit: task is empty");
      return;
    }

    const newTodo = {
      id: Date.now().valueOf(),
      task,
      completed: false,
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });
    setTask("");
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        className="input rounded-r-none border-r-0"
        name="task"
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="btn btn-primary rounded-l-none">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
