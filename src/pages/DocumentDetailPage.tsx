import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDocument, getDocumentBlob } from "../api/library.ts";
import type { LibraryResponse } from "../types/library.ts";
import { DocumentIcon } from "../components/DocumentIcon.tsx";
import { DeleteDocument } from "../components/DeleteDocument.tsx";
import "../styles/DocumentDetailPage.css";

export function DocumentDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [doc, setDoc] = useState<LibraryResponse | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [contentType, setContentType] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        (async () => {
            try {
                const meta = await getDocument(id);
                if (cancelled) return;
                setDoc(meta);

                const blob = await getDocumentBlob(id);
                if (cancelled) return;
                const objectUrl = URL.createObjectURL(blob);
                setPreviewUrl(objectUrl);
                setContentType(blob.type);
            } catch {
                if (!cancelled) setError("Не удалось загрузить документ");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [id]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    if (loading) {
        return <p className="detail-page__status mono">loading…</p>;
    }

    if (error || !doc) {
        return (
            <div className="detail-page">
                <Link to="/documents" className="detail-page__back">← Назад</Link>
                <p className="text-error">{error || "Документ не найден"}</p>
            </div>
        );
    }

    const date = new Date(doc.created_at).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const isPdf = contentType === "application/pdf";
    const isImage = contentType?.startsWith("image/");

    return (
        <div className="detail-page">
            <div className="detail-page__top">
                <Link to="/documents" className="detail-page__back">← Мои документы</Link>
                <DeleteDocument id={doc.id} onDeleted={() => navigate("/documents")} />
            </div>

            <header className="detail-page__header">
                <div className="detail-page__icon-wrap">
                    <DocumentIcon size={56} />
                </div>
                <div className="detail-page__meta">
                    <h1>{doc.title}</h1>
                    <time className="detail-page__date mono" dateTime={doc.created_at}>{date}</time>
                </div>
            </header>

            <section className="detail-page__preview">
                {previewUrl && isPdf && (
                    <iframe src={previewUrl} title={doc.title} className="detail-page__iframe" />
                )}
                {previewUrl && isImage && (
                    <img src={previewUrl} alt={doc.title} className="detail-page__image" />
                )}
                {previewUrl && !isPdf && !isImage && (
                    <div className="detail-page__fallback">
                        <p className="text-muted">Предпросмотр недоступен для этого формата</p>
                        <a href={previewUrl} download={doc.document_url || doc.title} className="btn btn-outline">
                            Скачать файл
                        </a>
                    </div>
                )}
            </section>
        </div>
    );
}
