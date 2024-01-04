type Props = {
  onSearchTermChange: (searchTerm: string) => void;
};

const TodoSearch = (props: Props) => {
  const { onSearchTermChange } = props;

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <input
      type="search"
      id="search"
      name="search"
      className="input w-full"
      placeholder="Search a task..."
      onChange={handleSearchTermChange}
    />
  );
};

export default TodoSearch;
