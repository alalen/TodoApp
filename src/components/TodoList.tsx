import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { visibleTodos } = useTodo();

  if (visibleTodos.length === 0) {
    return <p className="empty">조건에 맞는 일정이 없습니다.</p>;
  }

  return (
    <ul className="todo-list">
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}