import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Stats from "../components/Stats";
import TodoTools from "../components/TodoTools";

export default function Todos() {
  return (
    <section className="page">
      <h2>Todo 관리</h2>

      <TodoForm />

      <TodoTools />

      <Stats />

      <TodoList />
    </section>
  );
}