import { Link } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

export default function Home() {
  const { totalCount, completedCount, remainingCount, todayCount } = useTodo();

  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const cards = [
    { label: "전체 일정", value: totalCount },
    { label: "완료", value: completedCount },
    { label: "남은 일정", value: remainingCount },
    { label: "오늘 할 일", value: todayCount },
  ];

  return (
    <section className="page dashboard">
      <h2>대시보드</h2>
      <p className="sub-text">오늘의 일정과 전체 진행 상황을 확인할 수 있습니다.</p>

      <div className="dashboard-grid">
        {cards.map(({ label, value }) => (
          <div className="dashboard-card" key={label}>
            <h3>{label}</h3>
            <strong>{value}개</strong>
          </div>
        ))}
      </div>

      <div className="progress-box">
        <p>
          <span>전체 진척도</span>
          <span className="progress-percent">{percent}%</span>
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="progress-meta">
          {completedCount}개 완료 · {remainingCount}개 남음
        </div>
      </div>

      <Link className="main-button" to="/todos">
        Todo 작성하러 가기
      </Link>
    </section>
  );
}
