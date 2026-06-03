import TodoItem from "../components/TodoItem";
import { useTodo } from "../context/TodoContext";

export default function Today() {
    const { todayTodos } = useTodo();

    return (
        <section className="page">
            <h2>오늘 할 일</h2>

            {todayTodos.length === 0 ? (
                <p className="empty">오늘 등록한 할 일이 없습니다.</p>
            ) : (
                <ul className="todo-list">
                    {todayTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </section>
    );
}