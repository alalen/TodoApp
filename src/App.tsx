import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Today from "./pages/Today";
import Calendar from "./pages/Calendar";
import TodoDetail from "./pages/TodoDetail";
import TodoEdit from "./pages/TodoEdit";

export default function App() {
  return (
    <TodoProvider>
      <BrowserRouter basename="/TodoApp">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Todos />} />
            <Route path="todos" element={<Todos />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="today" element={<Today />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="detail/:id" element={<TodoDetail />} />
            <Route path="edit/:id" element={<TodoEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}