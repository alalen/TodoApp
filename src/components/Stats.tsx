import { useTodo } from "../context/TodoContext";

export default function Stats() {
    const { totalCount, completedCount, remainingCount, todayCount } = useTodo();

    return (
        <div className="stats">
            <p>전체: {totalCount}개</p>
            <p>완료: {completedCount}개</p>
            <p>남은 할 일: {remainingCount}개</p>
            <p>오늘 할 일: {todayCount}개</p>
        </div>
    );
}