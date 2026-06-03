import { useRef, useState } from "react";
import { useTodo } from "../context/TodoContext";
import type { Category, Priority } from "../types/Todo";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function TodoForm() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("보통");
  const [category, setCategory] = useState<Category>("공부");
  const [dueDate, setDueDate] = useState(getTodayDate());

  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("할 일을 입력하세요.");
      inputRef.current?.focus();
      return;
    }
    addTodo(text, priority, category, dueDate);
    setText("");
    setPriority("보통");
    setCategory("공부");
    setDueDate(getTodayDate());
    inputRef.current?.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-form-text"
        ref={inputRef}
        type="text"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="todo-form-row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="높음">높음</option>
          <option value="보통">보통</option>
          <option value="낮음">낮음</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          <option value="공부">공부</option>
          <option value="일상">일상</option>
          <option value="쇼핑">쇼핑</option>
          <option value="기타">기타</option>
        </select>
        <button type="submit">추가</button>
      </div>
    </form>
  );
}
