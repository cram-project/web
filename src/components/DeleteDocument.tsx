import { useState } from "react";
import { deleteDocument } from "../api/library.ts";

interface DeleteDocumentProps {
    id: string;
    onDeleted: () => void;
}

export function DeleteDocument({ id, onDeleted }: DeleteDocumentProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!window.confirm("Удалить этот документ?")) return;
        setError("");
        setLoading(true);
        try {
            await deleteDocument(id);
            onDeleted();
        } catch {
            setError("Не удалось удалить документ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-document">
            <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
            >
                {loading ? "Удаление…" : "Удалить"}
            </button>
            {error && <p className="text-error">{error}</p>}
        </div>
    );
}
