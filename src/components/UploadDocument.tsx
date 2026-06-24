import { type FormEvent, useRef, useState } from "react";
import { uploadDocument } from "../api/library.ts";
import "../styles/UploadDocument.css";

interface UploadDocumentProps {
    onUploaded: () => void;
}

export function UploadDocument({ onUploaded }: UploadDocumentProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const reset = () => {
        setTitle("");
        setFile(null);
        setError("");
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleFileChange = (f: File | null) => {
        setFile(f);
        if (f && !title) {
            const name = f.name.replace(/\.[^.]+$/, "");
            setTitle(name);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setError("");
        setLoading(true);
        try {
            await uploadDocument(file, title.trim() || file.name);
            reset();
            setOpen(false);
            onUploaded();
        } catch {
            setError("Не удалось загрузить документ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!open && (
                <button type="button" className="btn btn-primary upload-trigger" onClick={() => setOpen(true)}>
                    Добавить документ
                </button>
            )}
            {open && (
                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="upload-form__row">
                        <div className="form-field">
                            <label htmlFor="upload-title">Название</label>
                            <input
                                id="upload-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Название документа"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="upload-file">Файл</label>
                            <input
                                id="upload-file"
                                ref={fileRef}
                                type="file"
                                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-error">{error}</p>}
                    <div className="upload-form__actions">
                        <button type="button" className="btn btn-ghost" onClick={() => { reset(); setOpen(false); }}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading || !file}>
                            {loading ? "Загрузка…" : "Загрузить"}
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
