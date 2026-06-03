import { useNavigate } from "react-router-dom";
import type { Todo } from "../types/Todo";
import { useTodo } from "../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodo();
  const navigate = useNavigate();

  return (
    <li className={`todo-item priority-${todo.priority}`}>
      <div className="todo-left">
        <div
          onClick={() => toggleTodo(todo.id)}
          className={todo.completed ? "todo-title completed" : "todo-title"}
        >
          <span className="badge">{todo.priority}</span>
          <span className="badge light">{todo.category}</span>
          <span>{todo.text}</span>
        </div>
        <small className="due-date">마감일: {todo.dueDate}</small>
      </div>
      <div className="todo-buttons">
        <button onClick={() => navigate(`/detail/${todo.id}`)}>상세</button>
        <button onClick={() => navigate(`/edit/${todo.id}`)}>수정</button>
        <button onClick={() => deleteTodo(todo.id)}>삭제</button>
      </div>
    </li>
  );
}
