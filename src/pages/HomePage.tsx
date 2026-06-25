import { Navigate } from "react-router-dom";
import { PublicHeader } from "../components/PublicHeader.tsx";
import { useAuthStore } from "../store/auth.store.ts";
import "../styles/HomePage.css";

export function HomePage() {
    const token = useAuthStore((s) => s.token);

    if (token) return <Navigate to="/documents" replace />;

    return (
        <div className="home">
            <PublicHeader />
            <main className="home__main" />
        </div>
    );
}
