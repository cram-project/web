import { Link } from "react-router-dom";
import type { LibraryResponse } from "../types/library.ts";
import { DocumentIcon } from "./DocumentIcon.tsx";
import "../styles/DocumentCard.css";

export function DocumentCard({ doc }: { doc: LibraryResponse }) {
    const date = new Date(doc.created_at).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <article className="doc-card">
            <Link to={`/documents/${doc.id}`} className="doc-card__link">
                <div className="doc-card__icon">
                    <DocumentIcon size={48} />
                </div>
                <h3 className="doc-card__title">{doc.title}</h3>
                <time className="doc-card__date mono" dateTime={doc.created_at}>{date}</time>
            </Link>
        </article>
    );
}
