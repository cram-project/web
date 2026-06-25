import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/auth.store.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute.tsx";
import { DashboardLayout } from "./components/DashboardLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { DocumentsPage } from "./pages/DocumentsPage.tsx";
import { DocumentDetailPage } from "./pages/DocumentDetailPage.tsx";

function App() {
    const loadFromStorage = useAuthStore((s) => s.loadFromStorage);

    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/documents" element={<DocumentsPage />} />
                        <Route path="/documents/:id" element={<DocumentDetailPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
