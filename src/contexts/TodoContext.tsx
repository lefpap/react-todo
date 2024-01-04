import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { Paging, Todo, TodoAction, TodoFilter } from "../lib/types";
import { todoReducer } from "../reducers/todoReducer";

interface TodoContextProps {
  getTodos: (
    paging?: Paging,
    filters?: {
      searchTerm?: string;
      filter?: TodoFilter;
    }
  ) => { todos: Todo[]; total: number };
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const loadedTodos = JSON.parse(localStorage.getItem("todos") || "[]");

const TodoProvider = ({ children }: React.PropsWithChildren) => {
  const [todos, dispatch] = useReducer(todoReducer, loadedTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const getTodos = (
    paging?: Paging,
    filters?: {
      searchTerm?: string;
      filter?: TodoFilter;
    }
  ) => {
    let filteredTodos = todos;

    // Apply search term
    if (filters?.searchTerm) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.task.toLowerCase().includes(filters.searchTerm!.toLowerCase())
      );
    }

    // Apply filter
    if (filters?.filter) {
      filteredTodos = filteredTodos.filter((todo) => {
        switch (filters.filter) {
          case "ACTIVE":
            return !todo.completed;
          case "COMPLETED":
            return todo.completed;
          default:
            return true;
        }
      });
    }

    // Apply pagination
    const total = filteredTodos.length;
    if (paging) {
      const { page, size } = paging;

      const start = (page - 1) * size;
      const end = start + size;
      filteredTodos = filteredTodos.slice(start, end);
    }

    return { todos: filteredTodos, total };
  };

  return (
    <TodoContext.Provider value={{ getTodos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
