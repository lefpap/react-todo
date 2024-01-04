import useTodos from "../hooks/useTodos";

const DeleteCompletedTodos = () => {
  const { getTodos, dispatch } = useTodos();

  const handleDeleteCompletedTodos = () => {
    const { todos } = getTodos();
    const completedTodos = todos.filter((todo) => todo.completed);

    completedTodos.forEach((todo) => {
      dispatch({ type: "DELETE_TODO", payload: todo.id });
    });
  };

  return (
    <button className="btn btn-danger" onClick={handleDeleteCompletedTodos}>
      Remove Completed
    </button>
  );
};

export default DeleteCompletedTodos;
