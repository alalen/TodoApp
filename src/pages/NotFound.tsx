import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="container">
            <h2>404 오류 페이지</h2>
            <p>존재하지 않는 페이지입니다.</p>
            <Link to="/">메인으로 이동</Link>
        </main>
    );
}

export default NotFound;