import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Todos" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/today", label: "Today" },
  { to: "/calendar", label: "Calendar" },
];

export default function Header() {
  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/" || pathname === "/todos";
    return pathname.startsWith(to);
  };

  return (
    <header className="header">
      <h1>Todo 관리 앱</h1>
      <nav>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={isActive(to) ? "nav-link active" : "nav-link"}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
