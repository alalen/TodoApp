import { useTodo } from "../context/TodoContext";
import type { FilterType } from "../types/Todo";

export default function TodoTools() {
  const {
    filter,
    setFilter,
    searchText,
    setSearchText,
  } = useTodo();

  const filters: FilterType[] = ["전체", "진행중", "완료"];

  return (
    <div className="todo-tools">

      <input
        type="text"
        placeholder="일정 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="filter-buttons">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active-filter" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
}