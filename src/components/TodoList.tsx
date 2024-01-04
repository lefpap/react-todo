import { Todo, TodoFilter } from "../lib/types";
import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";
import TodoSearch from "./TodoSearch";

type Props = {
  todos: Todo[];
  onSearch: (searchTerm: string) => void;
  onFilter: (filter: TodoFilter) => void;
};

const TodoList = (props: Props) => {
  const { todos, onSearch, onFilter } = props;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center border-b-2 pb-5 gap-8">
        <TodoSearch onSearchTermChange={onSearch} />
        <TodoFilters onFilterChange={onFilter} />
      </div>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
