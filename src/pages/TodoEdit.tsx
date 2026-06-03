import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import type { Category, Priority } from "../types/Todo";

export default function TodoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo } = useTodo();

  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return (
      <section className="page">
        <h2>일정을 찾을 수 없습니다.</h2>
      </section>
    );
  }

  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [category, setCategory] = useState<Category>(todo.category);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo(todo.id, text, priority, category, dueDate);
    navigate("/");
  };

  return (
    <section className="page">
      <div className="edit-header">
        <h2>일정 수정</h2>
        <p className="sub-text">내용을 수정한 후 저장 버튼을 눌러주세요.</p>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="edit-field">
          <label>할 일</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
        </div>

        <div className="edit-row">
          <div className="edit-field">
            <label>마감일</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="edit-field">
            <label>우선순위</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="높음">높음</option>
              <option value="보통">보통</option>
              <option value="낮음">낮음</option>
            </select>
          </div>
          <div className="edit-field">
            <label>카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="공부">공부</option>
              <option value="일상">일상</option>
              <option value="쇼핑">쇼핑</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>

        <div className="edit-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            취소
          </button>
          <button type="submit" className="btn-save">
            저장
          </button>
        </div>
      </form>
    </section>
  );
}
