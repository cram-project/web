import { useCallback, useEffect, useState } from "react";
import { getDocuments } from "../api/library.ts";
import type { LibraryResponse } from "../types/library.ts";
import { DocumentCard } from "../components/DocumentCard.tsx";
import { UploadDocument } from "../components/UploadDocument.tsx";
import { getMe } from "../api/auth.ts";
import { useAuthStore } from "../store/auth.store.ts";
import "../styles/DocumentsPage.css";

export function DocumentsPage() {
    const setUsername = useAuthStore((s) => s.setUsername);
    const [documents, setDocuments] = useState<LibraryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDocuments = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const [docs, me] = await Promise.all([getDocuments(), getMe()]);
            setDocuments(docs);
            setUsername(me.username);
        } catch {
            setError("Не удалось загрузить документы");
        } finally {
            setLoading(false);
        }
    }, [setUsername]);

    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);

    return (
        <div className="documents-page">
            <header className="documents-page__header">
                <h1>Мои документы</h1>
                <p className="text-muted">Все загруженные материалы в одном месте</p>
            </header>

            <div className="documents-page__toolbar">
                <UploadDocument onUploaded={loadDocuments} />
            </div>

            {loading && <p className="documents-page__status mono">loading…</p>}
            {error && <p className="text-error">{error}</p>}

            {!loading && !error && documents.length === 0 && (
                <div className="documents-page__empty">
                    <p className="text-muted">Пока нет документов</p>
                </div>
            )}

            {!loading && documents.length > 0 && (
                <div className="documents-page__grid">
                    {documents.map((doc) => (
                        <DocumentCard key={doc.id} doc={doc} />
                    ))}
                </div>
            )}
        </div>
    );
}
