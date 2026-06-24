import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.ts";
import "../styles/DashboardLayout.css";

export function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore((s) => s.logout);
    const username = useAuthStore((s) => s.username);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="dashboard">
            <aside className="dashboard__sidebar">
                <Link to="/" className="dashboard__brand">Cram</Link>
                <nav className="dashboard__nav">
                    <Link
                        to="/documents"
                        className={`dashboard__link${location.pathname.startsWith("/documents") ? " dashboard__link--active" : ""}`}
                    >
                        Мои документы
                    </Link>
                </nav>
                <div className="dashboard__footer">
                    {username && <span className="dashboard__user mono">{username}</span>}
                    <button type="button" className="btn btn-ghost dashboard__logout" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </aside>
            <main className="dashboard__main">
                <Outlet />
            </main>
        </div>
    );
}
