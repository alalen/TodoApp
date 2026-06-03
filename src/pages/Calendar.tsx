import { useState } from "react";
import TodoItem from "../components/TodoItem";
import { useTodo } from "../context/TodoContext";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const { getTodosByDate } = useTodo();

  const dateTodos = getTodosByDate(selectedDate);

  return (
    <section className="page calendar-page">
      <div className="calendar-header">
        <div>
          <h2>달력</h2>
          <p className="sub-text">
            날짜를 선택하면 해당 날짜의 할 일을 확인할 수 있습니다.
          </p>
        </div>

        <div className="calendar-picker">
          <label>날짜 선택</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="calendar-summary">
        <div>
          <span>선택한 날짜</span>
          <strong>{selectedDate}</strong>
        </div>

        <div>
          <span>등록된 일정</span>
          <strong>{dateTodos.length}개</strong>
        </div>
      </div>

      <h3 className="calendar-title">{selectedDate} 일정</h3>

      {dateTodos.length === 0 ? (
        <p className="empty">선택한 날짜에 등록된 일정이 없습니다.</p>
      ) : (
        <ul className="todo-list">
          {dateTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  );
}