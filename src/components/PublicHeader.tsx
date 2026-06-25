import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.ts";
import "../styles/PublicHeader.css";

export function PublicHeader() {
    const token = useAuthStore((s) => s.token);

    return (
        <header className="public-header">
            <Link to="/" className="public-header__brand">Cram</Link>
            {!token && (
                <nav className="public-header__nav">
                    <Link to="/login" className="btn btn-ghost">Войти</Link>
                    <Link to="/register" className="btn btn-primary">Регистрация</Link>
                </nav>
            )}
        </header>
    );
}
