import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth.ts";
import { PublicHeader } from "../components/PublicHeader.tsx";
import "../styles/AuthPage.css";

export function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({ username, password });
            navigate("/login");
        } catch {
            setError("Не удалось зарегистрироваться");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <PublicHeader />
            <main className="auth-page__main">
                <div className="auth-card">
                    <h1 className="auth-card__title">Регистрация</h1>
                    <form className="form-stack" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="reg-username">Имя пользователя</label>
                            <input
                                id="reg-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="reg-password">Пароль</label>
                            <input
                                id="reg-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        {error && <p className="text-error">{error}</p>}
                        <button type="submit" className="btn btn-primary auth-card__submit" disabled={loading}>
                            {loading ? "Создание…" : "Создать аккаунт"}
                        </button>
                    </form>
                    <p className="auth-card__footer text-muted">
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
