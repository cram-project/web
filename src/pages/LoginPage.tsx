import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getMe } from "../api/auth.ts";
import { useAuthStore } from "../store/auth.store.ts";
import { PublicHeader } from "../components/PublicHeader.tsx";
import "../styles/AuthPage.css";

export function LoginPage() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);
    const setUsername = useAuthStore((s) => s.setUsername);
    const [username, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await login({ username, password });
            setAuth(data.access_token, data.refresh_token);
            const me = await getMe();
            setUsername(me.username);
            navigate("/documents");
        } catch {
            setError("Неверный логин или пароль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <PublicHeader />
            <main className="auth-page__main">
                <div className="auth-card">
                    <h1 className="auth-card__title">Вход</h1>
                    <form className="form-stack" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="login-username">Имя пользователя</label>
                            <input
                                id="login-username"
                                value={username}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="login-password">Пароль</label>
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        {error && <p className="text-error">{error}</p>}
                        <button type="submit" className="btn btn-primary auth-card__submit" disabled={loading}>
                            {loading ? "Вход…" : "Войти"}
                        </button>
                    </form>
                    <p className="auth-card__footer text-muted">
                        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
