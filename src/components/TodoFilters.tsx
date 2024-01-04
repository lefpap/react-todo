import { useState } from "react";
import { TodoFilter } from "../lib/types";

type Props = {
  onFilterChange: (filter: TodoFilter) => void;
};

const todoFilters = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
];

const TodoFilters = (props: Props) => {
  const { onFilterChange } = props;

  const [selectedFilter, setSelectedFilter] = useState<TodoFilter>("ALL");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as TodoFilter);
    onFilterChange(e.target.value as TodoFilter);
  };

  return (
    <select
      name="filter"
      id="filter"
      className="input bg-white w-full h-full"
      value={selectedFilter}
      onChange={handleFilterChange}
    >
      {todoFilters.map((filter) => (
        <option key={filter.value} value={filter.value}>
          {filter.label}
        </option>
      ))}
    </select>
  );
};

export default TodoFilters;
