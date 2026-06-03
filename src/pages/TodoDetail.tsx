import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { todos } = useTodo();

  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return (
      <section className="page">
        <h2>일정을 찾을 수 없습니다.</h2>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>일정 상세보기</h2>

      <div className="detail-box">
        <h3>{todo.text}</h3>
        <p>마감일 : {todo.dueDate}</p>
        <p>카테고리 : {todo.category}</p>
        <p>우선순위 : {todo.priority}</p>
        <p>상태 : {todo.completed ? "완료" : "진행중"}</p>
      </div>

      <button onClick={() => navigate("/")}>뒤로가기</button>
    </section>
  );
}