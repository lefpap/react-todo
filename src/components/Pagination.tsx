import { cn } from "../lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = (props: Props) => {
  const { currentPage, totalPages, setCurrentPage: setPage } = props;

  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        className={cn("btn btn-ghost text-gray-900", {
          "opacity-30": currentPage === 1,
        })}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div>
        <span>{currentPage}</span> / <span>{totalPages}</span>
      </div>
      <button
        className={cn("btn btn-ghost text-gray-900", {
          "opacity-30": currentPage === totalPages,
        })}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
