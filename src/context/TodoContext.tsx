import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Category, FilterType, Priority, Todo } from "../types/Todo";

interface TodoContextType {
  todos: Todo[];
  visibleTodos: Todo[];
  todayTodos: Todo[];
  filter: FilterType;
  searchText: string;
  setFilter: (filter: FilterType) => void;
  setSearchText: (text: string) => void;
  addTodo: (
    text: string,
    priority: Priority,
    category: Category,
    dueDate: string
  ) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (
    id: number,
    text: string,
    priority: Priority,
    category: Category,
    dueDate: string
  ) => void;
  getTodosByDate: (date: string) => Todo[];
  totalCount: number;
  completedCount: number;
  remainingCount: number;
  todayCount: number;
}

const TodoContext = createContext<TodoContextType | null>(null);

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

const priorityOrder: Record<Priority, number> = {
  높음: 1,
  보통: 2,
  낮음: 3,
};

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<FilterType>("전체");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    text: string,
    priority: Priority,
    category: Category,
    dueDate: string
  ) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      priority,
      category,
      dueDate,
      completed: false,
      createdDate: getTodayDate(),
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (
    id: number,
    text: string,
    priority: Priority,
    category: Category,
    dueDate: string
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, priority, category, dueDate } : todo
      )
    );
  };

  const sortedTodos = useMemo(() => {
    return [...todos].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return sortedTodos
      .filter((todo) => {
        if (filter === "완료") return todo.completed;
        if (filter === "진행중") return !todo.completed;
        return true;
      })
      .filter((todo) =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [sortedTodos, filter, searchText]);

  const todayTodos = useMemo(() => {
    const today = getTodayDate();
    return sortedTodos.filter((todo) => todo.dueDate === today);
  }, [sortedTodos]);

  const getTodosByDate = (date: string) => {
    return sortedTodos.filter((todo) => todo.dueDate === date);
  };

  const totalCount = todos.length;

  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  const remainingCount = totalCount - completedCount;
  const todayCount = todayTodos.length;

  return (
    <TodoContext.Provider
      value={{
        todos,
        visibleTodos,
        todayTodos,
        filter,
        searchText,
        setFilter,
        setSearchText,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        getTodosByDate,
        totalCount,
        completedCount,
        remainingCount,
        todayCount,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo는 TodoProvider 안에서만 사용할 수 있습니다.");
  }

  return context;
}