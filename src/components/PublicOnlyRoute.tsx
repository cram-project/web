import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export function PublicOnlyRoute() {
    const token = useAuthStore((s) => s.token);
    if (token) return <Navigate to="/documents" replace />;
    return <Outlet />;
}

