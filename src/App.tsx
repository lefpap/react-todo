import { useState } from "react";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import Pagination from "./components/Pagination";
import { TodoFilter } from "./lib/types";
import AddTodo from "./components/AddTodo";
import DeleteCompletedTodos from "./components/DeleteCompletedTodos";
import useDebouncedState from "./hooks/useDebouncedState";

const PAGE_SIZE = 8;

function App() {
  const { getTodos } = useTodos();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useDebouncedState("", 500);
  const [filter, setFilter] = useState<TodoFilter>("ALL");

  const { todos, total } = getTodos(
    { page: currentPage, size: PAGE_SIZE },
    {
      searchTerm,
      filter,
    }
  );
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);

    console.log("Search term changed");
  };

  const handleFilterChange = (filter: TodoFilter) => {
    setFilter(filter);
    setCurrentPage(1);

    console.log("Filter changed");
  };

  return (
    <div className="container mx-auto h-screen py-5 px-2 grid grid-rows-[auto_1fr_auto] gap-8">
      <div className="flex items-center justify-between">
        <AddTodo />
        <DeleteCompletedTodos />
      </div>
      <TodoList
        todos={todos}
        onSearch={handleSearchTermChange}
        onFilter={handleFilterChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
